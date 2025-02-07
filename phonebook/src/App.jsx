import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '555 5555'
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addToPhonebook = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        search:{' '}
        <input
          value={newSearch}
          onChange={handleSearchChange}
        />
      </div>
      <form onSubmit={addToPhonebook}>
        <div>
          <h1>add a new</h1>
          name:{' '}
          <input
            value={newName}
            onChange={handleNameChange}
          />
          <br />
          number:{' '}
          <input
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <table>
          <tbody>
            {personsToShow.map(person => <tr key={person.name}><th align='left'>{person.name}:</th> <td>{person.number}</td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App