
const api = { // Connects to API
    key: "8027ac74e57f307a1753ea83071b2ad1",
    base: "https://api.openweathermap.org/data/2.5/"
  }
  const searchbox = document.querySelector('.search-box');
  searchbox.addEventListener('keypress', setQuery);
  
  function setQuery(e) {   // sets up enter key
    if (e.keyCode == 13) {
      getResults(searchbox.value);
    }
  }
  
  function getResults (query) {   // gets results from openweathermap.org
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(weather => {
        return weather.json();
      }).then(displayResults);
  }
  
  function displayResults (weather) {   // Displays results
    var city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}` ;  //city name+country name
  
    var now = new Date();
    var date = document.querySelector('.location .date'); // displays the date
    date.innerText = dateBuilder(now);
  
    var temp = document.querySelector('.current .temp');  //displays temp
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>:C</span>`;
    temp.innerHTML=temp.innerHTML+" " +`${Math.round(weather.main.temp*1.8+32)}<span>:F</span>`;
  
    var weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;
  }
  
  function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
  }
