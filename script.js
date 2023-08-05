const input = document.querySelector("input")
const button = document.querySelector("button")
const cityName = document.querySelector(".city-name")
const warning = document.querySelector(".warning")
const photo = document.querySelector(".photo")
const weather = document.querySelector(".weather")
const temperature = document.querySelector(".temperature")
const humidity = document.querySelector(".humidity")
let weatherVal, tempVal, humidityVal, weatherId, filepath
const API_KEY = "&appid=389c9d91adc8abdcbe83c4158b6d645e"
const API_UNITS = "&units=metric"
async function showWeather() {
	let city = input.value || "London"
	const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}${API_UNITS}${API_KEY}`
	fetch(URL, {
		method: "GET",
	})
		.then((res) => res.json())
		.then((data) => {
			console.log(data)
			weatherVal = data.weather[0].main
			tempVal = data.main.temp
			humidityVal = data.main.humidity
			weatherId = data.weather[0].id
			weather.textContent = weatherVal
			temperature.textContent = tempVal
			humidity.textContent = humidityVal
			cityName.textContent = city
			warning.textContent = ""
			input.value = ""
			if (weatherId >= 200 && weatherId <= 232) {
				filepath = "img/thunderstorm.png"
			} else if (weatherId >= 300 && weatherId <= 321) {
				filepath = "img/drizzle.png"
			} else if (weatherId >= 500 && weatherId <= 531) {
				filepath = "img/rain.png"
			} else if (weatherId >= 600 && weatherId <= 622) {
				filepath = "img/ice.png"
			} else if (weatherId >= 701 && weatherId <= 781) {
				filepath = "img/mist.png"
			} else if (weatherId == 800) {
				filepath = "img/clear.png"
			} else {
				filepath = "img/clouds.png"
			}
			photo.setAttribute("src", filepath)
		})
		.catch(() => {
			warning.textContent = "Nie ma takiego miasta"
			weather.textContent = ""
			temperature.textContent = ""
			humidity.textContent = ""
			cityName.textContent = ""
		})
}
const prepareDOMEvents = () => {
	button.addEventListener("click", showWeather)
	input.addEventListener("keyup", (e) => {
		if (e.key === "Enter") {
			showWeather()
		}
	})
}
const main = () => {
	prepareDOMEvents()
}
document.addEventListener("DOMContentLoaded", main)
