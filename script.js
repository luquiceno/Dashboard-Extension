
fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(response => response.json())
    .then(data => {
        //console.log(data);
        document.body.style.backgroundImage = `url(${data.urls.full})`
        document.getElementById("author").textContent = `By: ${data.user.name}`
})
.catch (err => {
    document.body.style.backgroundImage = `url('img/pass.jpg')`;
})


fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    .then(response =>  {
        // when the response is not ok, the code status is 
        // 400 o 500 something, throw an error
        if (!response.ok) {
            throw Error("Something went wrong");
        }
        return response.json();
    })
    .then(data =>  {
        document.getElementById("crypto-top").innerHTML = `
            <img src=${data.image.small} />
            <span>${data.name}</span>
        `
        // To obtain the current value for a crypto currency, low value and high value
        document.getElementById("crypto").innerHTML += `
            <p>🎯: $${data.market_data.current_price.usd} </p>
            <p>☝️: $${data.market_data.high_24h.usd} </p>
            <p>👇: $${data.market_data.low_24h.usd} </p>
        `
    })   
    .catch(err => console.log(err));

// To get the current Time
function getCurrentTime() {
    const date = new Date()
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", {timeStyle: "short"});
}

setInterval(getCurrentTime, 1000);

// Obtain the GeolocationPosition (callback)
navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
        .then(response => {
            // when the response is not ok, the code status is 
            // 400 o 500 something, throw an error
            if(!response.ok) {
                throw Error("Weather data not available");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            document.getElementById("weather").innerHTML = `
                <img src=${iconUrl} />
                <p class="weather-temp">${Math.round(data.main.temp)}°</p>
                <p class="weather-city">${data.name}</p>
            `
        })
        .catch(err => console.log(err));
});


/*
MANEJO DE ERRORES DE UNA PROMISE O CUANDO UNA PROMISE TIENE ESTADO REJECTED
fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=natureafdasfdsadf")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        throw Error("es un error");
        //document.body.style.backgroundImage = `url(${data.urls.full})`
        //document.getElementById("author").textContent = `By: ${data.user.name}`
})
.catch (err => {
    console.log("algo anda mal")
    document.body.style.backgroundImage = "url('img/pass.jpg')";
})
*/

/*
*** Geolocation position code using callback

navigator.geolocation.getCurrentPosition(position => {
    console.log(position)
});

*** Geolocation position code using a Promise
navigator.geolocation.getCurrentPosition()
    .then(position => {
        console.log(position)
    })

***  Geolocation position code using the async way syntax, also as a Promise
    
async function getLocation() {
    const position = await navigator.geolocation.getCurrentPosition()
    console.log(position)
}
*/