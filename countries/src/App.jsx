import { useState, useEffect } from 'react'
import countriesServices from './services/countries'

import './index.css'

const Weather = ({ country, weather }) => {
  return weather === null
    ? null
    : (
      <div>
        <h2>Weather in {country.capital}</h2>
        <div>temperature {(weather.current.temp - 273.15).toFixed(2)} Celcius</div>
        <div>{weather.current.weather.map(w => <img key={w.description} src={`https://openweathermap.org/img/wn/${w.icon}@2x.png`} />)}</div>
        <div>wind {weather.current.wind_speed} m/s</div>
      </div>
    )
}

const Country = ({ country }) => {
  return country === null
    ? null
    : (
      <div>
        <h1>{country.name.common}</h1>
        <div>
          capital {country.capital}
        </div>
        <div>
          area {country.area}
        </div>
        <h3>languages:</h3>
        <ul>
          {Object.keys(country.languages).map(l => <li key={l}>{country.languages[l]}</li>)}
        </ul>
        <div>
          <img height='150' src={country.flags.svg} alt={country.flags.alt} />
        </div>
      </div>
    )
}

const CountryList = ({ countries, showCountry }) => {
  if (countries.length >= 250) {
    return (
      <div></div>
    )
  }
  else if (countries.length > 10) {
    return (
      <div>Too many matches, please specify</div>
    )
  }
  else if (countries.length !== 1) {
    return (
      <table>
        <tbody>
          {countries.map(c =>
            <tr key={c.name.common}><td>{c.name.common}</td><td><button onClick={(event) => showCountry(event, c.name.common)}>show</button></td></tr>
          )}
        </tbody>
      </table>
    )
  }
}

const App = () => {
  const [matches, setMatches] = useState([])
  const [search, setSearch] = useState('')
  const [country, setCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  console.log('matches', matches)
  console.log('country', country)

  useEffect(() => {
    console.log('effect, getting all countries')
    countriesServices
      .getAll()
      .then(allCountries => {
        const matchedCountries = allCountries.filter(c => search === '' ? true : c.name.common.toLowerCase().includes(search) || c.name.official.toLowerCase().includes(search))
        setMatches(matchedCountries)
        if (matchedCountries.length === 1) {
          setCountry(matchedCountries[0])
        } else {
          setCountry(null)
          setWeather(null)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }, [search])

  useEffect(() => {
    if (country !== null) {
      countriesServices
        .weather(country)
        .then(returnedWeather => {
          console.log(returnedWeather)
          setWeather(returnedWeather)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }, [country])

  const handleSearchChange = (event) => {
    console.log(event.target)
    setSearch(event.target.value.toLowerCase())
  }

  const handleShowCountry = (event, name) => {
    console.log(event)
    console.log('name', name)
    const selectedCountry = matches.find(c => c.name.common.toLowerCase() === name.toLowerCase())
    setCountry(selectedCountry)
  }

  return (
    <div>
      <div>
        find countries:
        <input value={search} onChange={handleSearchChange} />
        <CountryList countries={matches} showCountry={handleShowCountry} />
        <Country country={country} />
        <Weather country={country} weather={weather} />
      </div>
    </div>
  )
}

export default App