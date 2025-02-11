import { useState, useEffect } from 'react'
import countriesServices from './services/countries'

import './index.css'

const Country = ({ country }) =>
(
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

const CountryDisplay = ({ countries }) => {
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
      <div>
        {countries.map(c =>
          <div key={c.name.common}>{c.name.common}</div>
        )}
      </div>
    )
  }
  else {
    return (
      <Country country={countries[0]} />
    )
  }
}

const App = () => {
  const [matches, setMatches] = useState([])
  const [search, setSearch] = useState('')
  const [country, setCountry] = useState(null)

  console.log(matches)

  useEffect(() => {
    console.log('effect, getting all countries')
    countriesServices
      .getAll()
      .then(allCountries => {
        setMatches(allCountries.filter(c => search === '' ? true : c.name.common.toLowerCase().includes(search) || c.name.official.toLowerCase().includes(search)))
      })
  }, [search])



  const handleSearchChange = (event) => {
    console.log(event.target)
    setSearch(event.target.value)
  }

  return (
    <div>
      <div>
        find countries:
        <input value={search} onChange={handleSearchChange} />
        <CountryDisplay countries={matches} />
      </div>
    </div>
  )
}

export default App