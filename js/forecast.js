//http://api.openweathermap.org/data/2.5/forecast?q=mumbai&units=metric&APPID=518a1c2b7f0c39911f1bfadb19dc414b

const key = "518a1c2b7f0c39911f1bfadb19dc414b";

const getForcast = async (city) =>{
    
    const base = "http://api.openweathermap.org/data/2.5/forecast";
    const query = `?q=${city}&units=metric&APPID=${key}`;
    
    const response = await fetch(base + query);
//    console.log(response);
    if(response.ok){
        const data = await response.json();
        return data;
    }else{
        throw new Error("Error Status : " + response.status);
    }
    
}

//getForcast()
//    .then(data => console.log(data))
//    .catch(err => console.error(err));