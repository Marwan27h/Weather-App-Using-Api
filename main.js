const cities = [
    "Amsterdam",
    "London",
    "New York",
    "Paris",
    "Tokyo",
    "Aleppo",
    "Brussels",
    "South Africa",
    "Brasilia",
    "Dubai",
    "Dortmund",
]

const imageSources = {
    Amsterdam:
        "url('https://images.unsplash.com/photo-1605101100278-5d1deb2b6498?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80')",
    London: "url('https://images.pexels.com/photos/220887/pexels-photo-220887.jpeg?cs=srgb&dl=pexels-nicole-rathmayr-220887.jpg&fm=jpg')",
    "New York":
        "url('https://images.pexels.com/photos/313782/pexels-photo-313782.jpeg?cs=srgb&dl=pexels-quintin-gellar-313782.jpg&fm=jpg')",
    Paris: "url('https://media.cntraveler.com/photos/5cf96a9dd9fb41f17ed08435/16:9/w_2560,c_limit/Eiffel%20Tower_GettyImages-1005348968.jpg')",
    Tokyo: "url('https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2021/07/23102649/agathe-marty-2cdvYh6ULCs-unsplash-2.jpg')",
    Aleppo: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85.jpg/1356px-%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85.jpg')",
    Brussels:
        "url('https://rare-gallery.com/uploads/posts/1045535-sunlight-sunset-cityscape-night-architecture-reflection-sky-clouds-skyline-blue-evening-morning-horizon-bokeh-Europe-dusk-Belgium-Brussels-light-cloud-dawn-atmosphere-o.jpg')",
    Brasilia:
        "url('https://images.lacotedesmontres.com/mesIMG/imgStd/80660.jpg')",
    Dubai: "url('https://images.unsplash.com/photo-1519817650390-64a93db51149?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aXNsYW18ZW58MHx8MHx8&w=1000&q=80')",
    Dortmund:
        "url('https://cutewallpaper.org/21/4k-high-resolution-hd-wallpapers/4K-Ultra-HD-Wallpapers-4K-HD-Wallpapers-in-2019-4k-.jpg')",
}

function setBackgroundImage(city) {
    return new Promise((resolve, reject) => {
        const body = document.querySelector("body")
        const imageUrl = imageSources[city]

        if (imageUrl) {
            body.style.backgroundImage = imageUrl
            resolve()
        } else {
            reject(new Error("Image source not found"))
        }
    })
}

const selectElement = document.querySelector(".form-select")

selectElement.addEventListener("change", (event) => {
    const selectedCity = event.target.value
    getData(selectedCity)
        .then(() => setBackgroundImage(selectedCity))
        .catch((error) => console.error(error))
})

let selectedLanguage = "ar" // default language is Arabic

const languageDropdownItems = document.querySelectorAll(".dropdown-item")
languageDropdownItems.forEach((item) => {
    item.addEventListener("click", (event) => {
        selectedLanguage = event.target.id === "en-language" ? "en" : "ar"
        const selectedCity = selectElement.value
        getData(selectedCity, selectedLanguage)
    })
})
async function getData(city, language) {
    language = language || selectedLanguage

    const API_KEY = "f6ca1369f1d54215bb23faf68c4f3e30"
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&lang=${language}`

    try {
        const response = await fetch(apiUrl)
        const data = await response.json()
        console.log(data)

        const { main, name, timezone, wind, sys } = data
        const cityName = document.getElementById("city-name")
        cityName.innerHTML = name || "Amsterdam"

        const outPutLift = `
            <li class="list-group-item">${
                language === "ar" ? "درجة الحرارة" : "Temperature"
            }<br>${main.temp}</li>
            <li class="list-group-item">${
                language === "ar" ? "درجة الحرارة المحسوسة" : "Feels like"
            }<br>${main.feels_like}</li>
            <li class="list-group-item">${
                language === "ar"
                    ? "درجة الحرارة الدنيا"
                    : "Minimum temperature"
            }<br>${main.temp_min}</li>
            <li class="list-group-item">${
                language === "ar"
                    ? "درجة الحرارة العليا"
                    : "Maximum temperature"
            }<br>${main.temp_max}</li>
        `

        const outPutRight = `
            <li class="list-group-item">${
                language === "ar" ? "الضغط الجوي" : "Pressure"
            }<br>${main.pressure}</li>
            <li class="list-group-item">${
                language === "ar" ? "الرطوبة" : "Humidity"
            }<br>${main.humidity}</li>
            <li class="list-group-item">${
                language === "ar" ? "سرعة الرياح" : "Wind speed"
            }<br>${wind.speed}</li>
            <li class="list-group-item">${
                language === "ar" ? "زاوية الرياح" : "Wind deg"
            }<br>${wind.deg}</li>
        `

        document.getElementById("ul-list-left").innerHTML = outPutLift
        document.getElementById("ul-list-right").innerHTML = outPutRight

        const targetTime = Date.now() + timezone * 1000 - 2 * 60 * 60 * 1000 // subtract 2 hours in milliseconds
        const formattedTime = new Date(targetTime).toLocaleTimeString([], {
            timeZone: "Europe/Amsterdam",
        })
        const timeZone = document.getElementById("time-zone")
        timeZone.innerHTML = formattedTime

        const sunrise = document.getElementById("sunrise")
        sunRiceTime = new Date(sys.sunrise * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        })
        sunrise.innerHTML = `${
            language === "ar" ? "شروق الشمس" : "Sunrise"
        } : ${sunRiceTime}`
        const sunSet = document.getElementById("sunset")
        sunSetTime = new Date(sys.sunset * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        })
        sunSet.innerHTML = `${
            language === "ar" ? "غروب الشمس" : "Sunset"
        } : ${sunSetTime}`
    } catch (error) {
        console.log(error)
        const errorMessage = document.getElementById("error-message")
        errorMessage.innerHTML =
            "Sorry, there was an error. Please try again later."
    }
}

// Initialize with the first city in the array
getData(cities[0])
const dropdownMenu = document.querySelector(".dropdown-menu")
const dropdownToggle = document.querySelector(".dropdown-toggle")

dropdownToggle.addEventListener("click", function () {
    dropdownMenu.classList.toggle("show")
})

dropdownMenu.addEventListener("mouseleave", function () {
    dropdownMenu.classList.remove("show")
})

const initialCity = cities[0]
