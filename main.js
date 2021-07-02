const api = {
    key: '1f3adba4ae0a6c9ec300b109af9f959a',
    url: 'https://api.openweathermap.org/data/2.5/weather'
}
const card = document.getElementById('weather-card');
const city = document.getElementById('city');
const date = document.getElementById('date');
const tempImage = document.getElementById('temp-image');
const temp = document.getElementById('temp');
const weather = document.getElementById('weather');
const range = document.getElementById('range');

function updateImage(data) {
    const temp = toCelsius(data.main.temp);
    let src = 'img/temp-mid.png';
    if(temp > 26) {
        src = 'img/temp-high.png';
    } else if(temp < 20 ) {
        src = 'img/temp-low.png';
    }
    tempImage.src = src;
}

async function search(query) {
    try {
        const res = await fetch(`${api.url}?q=${query}&appid=${api.key}&lang=es`);
        const data = await res.json();
        card.style.display = 'block';
        city.innerHTML = `${data.name}, ${data.sys.country}`;
        data.innerHTML = (new Date()).toLocaleDateString();
        temp.innerHTML = `${toCelsius(data.main.temp)}°c`;
        weather.innerHTML = data.weather[0].description;
        range.innerHTML = `${toCelsius(data.main.temp_min)}°c / ${toCelsius(data.main.temp_max)}°c`;
        updateImage(data);
    } catch(err) {
        city.innerHTML = `Verifique la ciudad.`;
        city.style.background = '#ec0b0b';
        console.error(err);
    }
}
function toCelsius(kelvin) {
    return Math.round(kelvin - 273.15);
}

function onSubmit(event) {
    event.preventDefault();
    search(searchBox.value);
}

const searchForm = document.getElementById('search-form');
const searchBox = document.getElementById('searchbox');
searchForm.addEventListener('submit', onSubmit, true);



/** OBTENER UBICACION DEL NAVEGADOR */
/* window.onload = function() {
    var startPos;
    var geoSuccess = function(position) {
      startPos = position;
      alert(startPos.coords.latitude);
      alert(startPos.coords.longitude);
    };
    navigator.geolocation.getCurrentPosition(geoSuccess);
  };  */