

let countries = [];
let isAscending = true;


let itemsPerPage = 10
let totalPages = 0

let pagination = {
    offset : 0,
    limit : 9,
    selectedPage : 1
}


function createPages() {
    
    let container = document.getElementById('pagination')

    totalPages =  countries.length / itemsPerPage

    
    for(let x = 0; x < totalPages; x++){


        if( ( x >= 0 && x <= 3 ) || ( x >= totalPages - 4 ) ){


                
            let page = document.createElement('a')

            
            page.classList.add('bg-white')
            page.classList.add('border-gray-300')
            page.classList.add('text-gray-500')
            page.classList.add('hover:bg-gray-50')
            page.classList.add('relative')
            page.classList.add('inline-flex')
            page.classList.add('items-center')
            page.classList.add('px-4')
            page.classList.add('py-2')
            page.classList.add('border')
            page.classList.add('text-sm')
            page.classList.add('font-medium')
            page.href='#'
            page.dataset.page = x+1

            if ( x == 3 ) {
                page.classList.add('mr-5')
            }

            if ( x == totalPages - 4){
                page.classList.add('ml-5')
            }

            page.innerText = x + 1
            page.addEventListener('click', handleClickFromPage )
            container.appendChild(page)
        } 

        // Add middle buttons
        


    }

}





function handleClickFromPage(event) {
    
    let page = event.target.dataset.page

    pagination.offset = (page - 1) * itemsPerPage
    pagination.limit = pagination.offset + itemsPerPage - 1
    pagination.selectedPage = page 
    console.log('page clicked: ' + page + ', offset: ' + pagination.offset + ', limit:' + pagination.limit)


    let container = document.getElementById('pagination')



    for (let x = 0; x < container.childNodes.length; x++) {
        console.log(container.childNodes[x]);
        container.childNodes[x].classList.remove('bg-sky-300')
        container.childNodes[x].classList.remove('bg-white')
        if( page == container.childNodes[x].dataset.page){
            console.log('adding class');
            container.childNodes[x].classList.add('bg-sky-300')
        }
    }

    refreshRows( countries )



    



}





async function getAllCountries(){


    const response = await fetch('https://restcountries.com/v3.1/all')
    const cts = await response.json()

    for(const country of cts){

        let ct = {} 
        ct.name = country.name.official;
        ct.capital = country.capital ? country.capital[0] : 'No capital'
        ct.region = country.region
        ct.language  = country.languages ? Object.values(country.languages).toString() : 'No language to display'
        ct.population = country.population
        ct.flag = country.flags.png
        ct.visible = true

        countries.push(ct)
    }

    countries = countries.sort(sortArrayAscending)
    
    refreshRows( countries )

    createPages()

}

function refreshRows( countries ){

    console.log('offset: ' + pagination.offset + ', limit:' + pagination.limit)


    // Clear rows
    const tableBody = document.getElementById('rows');
    tableBody.innerText = '';

    let counter = 0

    for(const country of countries){

        if( counter >= pagination.offset && counter <= pagination.limit ){
            //console.log( counter >= pagination.offset  )
            //console.log( counter <= pagination.limit  )


            if( country.visible ){

                let row = document.createElement('tr');
                row.classList.add('even:bg-zinc-200')
                
                let officialName = row.insertCell()
                officialName.innerText = country.name;
                officialName.dataset.country = country.name
        
                let capital = row.insertCell()
                capital.innerText = country.capital
                capital.dataset.country = country.name
        
                let region = row.insertCell()
                region.innerText = country.region
                region.dataset.country = country.name
        
                let language = row.insertCell()
                language.innerText = country.language
                language.dataset.country = country.name
        
                let population = row.insertCell()
                population.innerText = country.population
                population.dataset.country = country.name
        
                let flag = row.insertCell()
        
                let img = document.createElement("img");
                img.src = country.flag
                img.style.minWidth = "100px";
                img.dataset.country = country.name
                flag.appendChild(img) 
                flag.dataset.country = country.name
        
        
                row.dataset.country = country.name
                row.addEventListener('click', openModal)
        
                tableBody.appendChild(row)
    
            }  

        }

        counter++
            
    }

    
    if ( tableBody.childElementCount == 0){
        let row = document.createElement('tr');
        let noData = row.insertCell()
        noData.innerText = 'No data to display'
        tableBody.appendChild(row)
    }


    

}


function sortArrayAscending(x, y){
    if (x.name < y.name) {return -1;}
    if (x.name > y.name) {return 1;}
    return 0;
}


function sortArrayDescending(x, y){
    if (y.name < x.name) {return -1;}
    if (y.name > x.name) {return 1;}
    return 0;
}

function sortCountries(){


    console.log('toggle clicked')
    

    if( isAscending ){
        countries = countries.sort( sortArrayDescending )
        isAscending = false
    } else {
        countries = countries.sort(sortArrayAscending)
        isAscending = true
    }
  
    refreshRows( countries )
    

}


async function openModal( event ){
    
    console.log(event.target.dataset.country)
    let countryName = event.target.dataset.country

    const response = await fetch('https://en.wikipedia.org/api/rest_v1/page/summary/' + countryName)
    const country = await response.json()

    var modal = new tingle.modal({
        footer: true,
        stickyFooter: false,
        closeMethods: ['overlay', 'button', 'escape'],
        closeLabel: "Close",
        cssClass: ['custom-class-1', 'custom-class-2'],
        onOpen: function() {},
        onClose: function() {},
        beforeClose: function() {
            return true;
        }
    });

    modal.setContent(country.extract_html);

    modal.open();
}


function search(event){

    let term = event.target.value

    if(term.length > 3 ){

        
        let column = document.getElementById('searchColumn').value

        console.log('searching for: ' + term + ' in column ' + column)
        
        
        for(let country of countries){
            
            //console.log( 'the term ' + term + ' includes in ' + country[column].toLowerCase() )
            //console.log( country[column].toLowerCase().includes( term.toLowerCase() ) )
            if( column == 'all'){
                
                for(let key in country){

                    console.log(key)
                    
                    if( key == 'name' || key == 'capital' || key == 'region' || key == 'language' ){
                        
                        country.visible = country[key].toLowerCase().includes( term.toLowerCase() )
                        
                        //console.log( ' country[key]' + country[key] )
                        
                        if(country[key].toLowerCase().includes( term.toLowerCase() )){
                            break;
                        }
                    }
                
                }

            } else {

                country.visible = country[column].toLowerCase().includes( term.toLowerCase() )

            }
        
        } 


    } else {

        for(let country of countries){
            country.visible = true
        }
    }

    refreshRows( countries )

}


getAllCountries()

let toggle = document.getElementById('sortCountriesToggle')
toggle.addEventListener('click', sortCountries)


let searchTerm = document.getElementById('searchTerm') 
searchTerm.addEventListener('input', search)




