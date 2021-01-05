import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';
import Countries from './components/Countries'

const App = () => {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  // After 1st render - fetch the data about countries, then add it to 'countries' vaiable
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        const data = response.data
        setCountries(data)
      })
  }, [])

  // Filter the output
  const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
  
  // Render the component
  return (
    <div>
      <div>
        find countries <input onChange={(e) => setFilter(e.target.value)} />
      </div>
      <Countries countriesToShow={countriesToShow} setFilter={setFilter} />
    </div>
  )
}

export default App;
