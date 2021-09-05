const API_KEY = "cc3f87264302b5e51f3a477bbe25e100";

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  // fetch는 promise (당장 일어나지 않고 시간이 좀 걸린 뒤에 일어나는 현상)
  // URL을 fetch하고 response를 받아야 한다. 그리고 response의 json을 얻어야 한다.
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const weather = document.querySelector("#weather span:first-child");
      const city = document.querySelector("#weather span:last-child");
      city.innerText = data.name;
      weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;
    });
}
function onGeoError() {
  alert("Can't find you. No weather for you.");
}

// 사용자의 현재 위치를 요청한다.
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
