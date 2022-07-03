var apiKey = "dc59efda6dcfcd24394d36278ae042b0"

function locationApi(city) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`)
        .then(res => res.json())
        .then(data => { weatherApi(data[0].lat, data[0].lon, data[0].name); saveLocalStg(data[0].name) })
}

function weatherApi(lat, lon, name) {
    console.log(lat, lon)
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=imperial&appid=${apiKey}`)
        .then(res => res.json())
        .then(info => {
            displayCurrent(info.current, name)
            displayFuture(info.daily)
        })
}

function displayCurrent(current, name) {
    let icon = current.weather[0].icon
    let title = document.getElementById("city-name")
    let date = new Date(current.dt * 1000).toLocaleDateString()
    let temperature = document.getElementById("temp")
    let winds = document.getElementById("wind")
    let hum = document.getElementById("humidity")
    let ultv = document.getElementById("UV")
    title.innerText = `${name} ${date}`
    temperature.innerText = `Temp: ${current.temp} deg`
    winds.innerText = `Wind Speed: ${current.wind_speed}`
    hum.innerText = `Humitidity: ${current.humitidy}`
    ultv.innerText = `UV: ${current.uvi}`
    if (current.uvi < 4) {
        ultv.style.backgroundColor = "lightblue"
    }
    else if (current.uvi >= 4 && current.uvi < 7) {
        ultv.style.backgroundColor = "yellow"
    }
    else { ultv.style.backgroundColor = "red" }

    document.getElementById("icon").src = `http://openweathermap.org/img/wn/${icon}@2x.png`
}
function displayFuture(daily) {
    let futureHtml = ""
    for (let i = 1; i < 6; i++) {
        let time = new Date(daily[i].dt * 1000).toDateString()
        let icon = daily[i].weather[0].icon
        let temperature = daily[i].temp.day
        let wind = daily[i].wind_speed
        let humidity = daily[i].humidity
        let card = `
        <div class="card" style="width: 18rem;">
        <img src="http://openweathermap.org/img/wn/${icon}@2x.png" class="card-img-top" alt="${daily[i].weather[0].description}">
        <div class="card-body">
            <h5 class="card-title">${time}</h5>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Temp; ${temperature}</li>
            <li class="list-group-item">Wind; ${wind}</li>
            <li class="list-group-item">Humidity; ${humidity}</li>
        </ul>
    </div>
        `
        futureHtml += card
    }
    document.getElementById("future").innerHTML = futureHtml

}