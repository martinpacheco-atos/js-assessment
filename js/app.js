

let countries = [];
let isAscending = true;


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

}

function refreshRows( countries ){



    // Clear rows
    const tableBody = document.getElementById('rows');
    tableBody.innerText = '';

    
    for(const country of countries){

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
    let column = document.getElementById('searchColumn').value

    console.log('searching for: ' + term + ' in column ' + column)
    
    
    for(let country of countries){
        
        //console.log( 'the term ' + term + ' includes in ' + country[column].toLowerCase() )
        //console.log( country[column].toLowerCase().includes( term.toLowerCase() ) )
    
        country.visible = country[column].toLowerCase().includes( term.toLowerCase() )
    
    }

    refreshRows( countries )

}


getAllCountries()

let toggle = document.getElementById('sortCountriesToggle')
toggle.addEventListener('click', sortCountries)


let searchTerm = document.getElementById('searchTerm') 
searchTerm.addEventListener('input', search)




