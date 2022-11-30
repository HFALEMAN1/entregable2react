import React, { useState } from 'react'

const WeatherCard = ({ weather, temperature, isCelsius, changeTemperature, newCallApiSearch }) => {

    const [place, setPlace] = useState("")


    const handleChangePlace = (e) => {
        setPlace(e.target.value)
    }


    return (
        <article>

            <h1 className='title' >Weather App</h1>




            <div >
                <h3 className='subtitle' >{`${weather.name}, ${weather.sys.country}`} </h3>
            </div>

            <section className='container--search'  >
                <input
                    type="text"
                    value={place}
                    onChange={handleChangePlace} />
                <button className='button' onClick={() => newCallApiSearch(place)} >🔍Search</button>
            </section>


            <div className='container--img--list' >
                <div className='img' >
                    <img className='png' src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} />
                </div>

                <div className='list' >
                    <ul>
                        <li>{weather.weather[0].description} </li>
                        <li>Wind Speed: <span className='green' > {weather.wind.speed}   </span>    m/s </li>
                        <li>Clouds: <span className='green'    >   {weather.clouds.all}  </span> % </li>
                        <li>Pressure:   <span className='green'  > {weather.main.pressure}   </span> Hpa   </li>
                    </ul>
                </div>
            </div>

            <section className='degrees' >
                <p>{isCelsius ? `${temperature.celsius} °C` : `${temperature.fahrenheit} °F`} </p>
                <button className='button' onClick={changeTemperature} >Degrees °F/C° </button>

            </section>

            <footer className='footer'>
                <p  >    Hecho con Amor <i class='bx bxs-heart'></i> con Academlo por
                    <a className='green' target="_blank" href=" https://portfolio-hfaleman.netlify.app/ "> Hector Falcón</a> </p>
            </footer>

        </article>
    )
}




export default WeatherCard