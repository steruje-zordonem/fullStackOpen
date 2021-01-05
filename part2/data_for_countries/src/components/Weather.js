import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({country}) => {

    const [weather, setWeather] = useState([])

    // When the 'country' variable changes, fetch the data for new country 
    // then save it as 'weather' state 
    useEffect(() => {
        console.log(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.name}`)
        axios
          .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.name}`)
          .then(response => {
            setWeather(response.data)
          })
      }, [country])

    // RENDER INFORMATION ABOUT WEATHER IN GIVEN 'COUNTRY':

    // on 1st render return null - (on 1st render, 'weather' array is empty, and calling methods like '.current.temperature' on it will cause App to crash)
    if(weather.length === 0) {
        return null
    }
    // Further renders - return information about a weather in given 'country' 
    return (
        <div>
            <h2>Weather in {country.capital}</h2>
            <p><strong>temperature:</strong> {weather.current.temperature} Celcius</p>
            <img alt={weather.current.weather_descriptions[0]} src={weather.current.weather_icons[0]}/>
            <p><strong>wind:</strong> {weather.current.wind_speed} direction {weather.current.wind_dir}</p>
        </div>
    )
}

export default Weather