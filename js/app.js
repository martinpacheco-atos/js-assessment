
const countries = [];

async function getAllCountries(){


    const response = await fetch('https://restcountries.com/v3.1/all')
    const cts = await response.json()

    
    console.log(cts)
   
 
    const table = document.getElementById('countries');

    for(const country of cts){

        let row = table.insertRow();
        row.classList.add('even:bg-zinc-200')
        let officialName = row.insertCell()
        officialName.innerText = country.name.official;

        let capital = row.insertCell()
        capital.innerText = country.capital ? country.capital[0] : 'No capital'

        let region = row.insertCell()
        region.innerText = country.region

        let language = row.insertCell()
        language.innerText = country.languages ? Object.values(country.languages).toString() : 'No language to display'
        
        let population = row.insertCell()
        population.innerText = country.population

        let flag = row.insertCell()

        let img = document.createElement("img");
        img.src = country.flags.png
        flag.appendChild(img) 

    }
    
}

getAllCountries()




