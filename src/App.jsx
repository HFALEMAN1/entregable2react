
import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import WeatherCard from './components/WeatherCard'

function App() {
  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temperature, setTemperature] = useState()
  const [iscelsius, setIscelsius] = useState(true)

  //obtenemos coordenadas de la api del navegador y montamos el estado



  const success = (pos) => {

    const newCoords = {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude
    }
    setCoords(newCoords)
  }

  const newCallApiSearch = (cityName) => {
    const API_KEY = "04a08e3f5a6639c1127233d59ba3c17f"
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
    axios.get(URL)
      .then(res => setWeather(res.data))
      .catch(err => alert("Not found thid place "))
  }






  const changeTemperature = () => {
    setIscelsius(!iscelsius)
  }



  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success)

  }, [])



  // Peticion de datos a la Api del clima

  useEffect(() => {

    if (coords) {
      const API_KEY = "04a08e3f5a6639c1127233d59ba3c17f"
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`
      axios.get(URL)
        .then(res => {
          const tempKelvin = res.data.main.temp
          const tempCelsius = (tempKelvin - 273.15).toFixed(1)
          const tempFahrenheit = ((tempCelsius * 9 / 5) + 32).toFixed(1)
          const newTemperature = {
            celsius: tempCelsius,
            fahrenheit: tempFahrenheit
          }
          setTemperature(newTemperature)
          setWeather(res.data)

        })
        .catch(err => console.log(err))
    }

  }, [coords])



  console.log(temperature)
  return (
    <div className="App">
      {
        weather ? < WeatherCard
          weather={weather}
          temperature={temperature}
          changeTemperature={changeTemperature}
          isCelsius={iscelsius}
          newCallApiSearch={newCallApiSearch}

        /> : <p>Loading...</p>
      }


    </div>
  )
}

export default App
