


async function getAllCountries(){


    const response = await fetch('https://restcountries.com/v3.1/all')
    const countries = await response.json()

    
    console.log(countries)
   
    
}

getAllCountries()




