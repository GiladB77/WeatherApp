const api = {
    // key: "bcd696b99e40703a79b644515f95e72d",
    base: "https://goweather.herokuapp.com/"
    
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress' , setQuery);

function setQuery(evt){
    if (evt.keyCode == 13){
        getResults(searchbox.value)
        // console.log(searchbox.value);
    }
}

function getResults(query){
    fetch(`${api.base}weather/${query}`)
    .then(weather => {
        return weather.json();
    }).then(displayWeather);
}

function displayWeather(weather){
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerText = searchbox.value;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerText = weather.temperature.replace("+","").replace(" ","");

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.description;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = 'Wind: '+weather.wind
}

function dateBuilder(d){
    let months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
    "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}
