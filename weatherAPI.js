
const rootUrl = 'https://api.openweathermap.org/data/2.5/weather?appid=cc5eea03a8f78cd1c32ebf11bcb76781'

export const fetchWeather = (lat, lon) => {
    const url = rootUrl + '&lat=' + lat + '&lon=' + lon  + "&units=metric"
    console.log(url)

	return fetch(url)
		.then(res => res.json())
		.then(json => ({
			temp: json.main.temp,
			weather: json.weather[0].main
		}))
}