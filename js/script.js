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