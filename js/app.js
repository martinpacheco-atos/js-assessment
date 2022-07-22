

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
        countries.push(ct)
    }

    countries = countries.sort(sortArrayAscending)
    
    appendRows( countries )
  
}

function appendRows(countries ){

    const tableBody = document.getElementById('rows');
    
    for(const country of countries){

        let row = document.createElement('tr');;
        row.classList.add('even:bg-zinc-200')
        
        let officialName = row.insertCell()
        officialName.innerText = country.name;
        
        let capital = row.insertCell()
        capital.innerText = country.capital
        
        let region = row.insertCell()
        region.innerText = country.region
       

        let language = row.insertCell()
        language.innerText = country.language
        
        let population = row.insertCell()
        population.innerText = country.population
        
        let flag = row.insertCell()

        let img = document.createElement("img");
        img.src = country.flag
        img.style.minWidth = "100px";
        flag.appendChild(img) 

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

    const tableBody = document.getElementById('rows');
    

    console.log('toggle clicked')
    

    if( isAscending ){
        countries = countries.sort( sortArrayDescending )
        isAscending = false
    } else {
        countries = countries.sort(sortArrayAscending)
        isAscending = true
    }
  
    tableBody.innerText = '';

    appendRows( countries )
    

}



getAllCountries()

let toggle = document.getElementById('sortCountriesToggle')
toggle.addEventListener('click', sortCountries)




