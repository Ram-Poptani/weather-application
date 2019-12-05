(function($, document, window) {

    $(document).ready(function() {

        // Cloning main navigation for mobile menu
        $(".mobile-navigation").append($(".main-navigation .menu").clone());

        // Mobile menu toggle 
        $(".menu-toggle").click(function() {
            $(".mobile-navigation").slideToggle();
        });
    });

    $(window).load(function() {
        getForcast('Mumbai')
            .then(data => updateUI(data, 'Mumbai'))
            .catch(err => console.error(err));
    });

})(jQuery, document, window);



/*************************************************************************************
****************************COMMUNICATING WITH FORECAST.JS****************************
*************************************************************************************/


const defaultCity = 'Mumbai';
const cityForm = document.querySelector('form');
const cityTextField = document.getElementById('city');

const daysName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthsName = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

function updateUI(data, cityName){
    
    const days = document.getElementsByClassName('day');
    const date = document.getElementsByClassName('date');
    const location = document.getElementsByClassName('location');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind-speed');
    const windDegree = document.getElementById('wind-degree');
    const temps = document.getElementsByClassName('temp');
    const icons = document.getElementsByClassName('weather-icon');
    const baseImagePath = "images/icons/";
    
    
    location[0].innerHTML = cityName;
    humidity.innerHTML = data.list[0].main.humidity + "%";
    
    //1 m/sec = 3.6 km/h
    windSpeed.innerHTML = Math.round((data.list[0].wind.speed * 3.6 * 100))/100 + "km/h";
    windDegree.innerHTML = data.list[0].wind.deg + "<sup>o</sup>";
    
    const todaysDate = new Date(data.list[0].dt_txt);
    const todaysMonth = monthsName[todaysDate.getMonth()];
    const todaysDay = todaysDate.getDay();
    date[0].innerHTML = todaysDate.getDate() + " " + todaysMonth;
    
    var i = 0, j = 0;
    for(let element of days){
        const dayName = daysName[(todaysDay + i) % 7];
        element.innerHTML = dayName;
        
        const temp = Math.round(data.list[j].main.temp * 100) / 100;
        temps[i].innerHTML = temp + "<sup>o</sup>";
        icons[i].src = baseImagePath + data.list[j].weather[0].icon + ".svg";
        i++;
        j += 8;
    }
}

cityForm.addEventListener('submit', e => {
    e.preventDefault();
    let cityName = cityTextField.value;
    if(cityName == ""){
        cityName = defaultCity;
    }
    
        getForcast(cityName)
            .then(data => updateUI(data, cityName))
            .catch(err => console.error(err));
});
























