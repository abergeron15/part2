import { useState } from 'react'

const Input = ({ value, text, onChange }) => (
  <>
    {text}:{' '}
    <input
      value={value}
      onChange={onChange}
    />
  </>
)

const AddPersonForm = ({ onSubmit, inputs }) => (
  <form onSubmit={onSubmit}>
    <div>
      <h2>add a new</h2>
      {inputs.map(input => <><Input value={input.value} text={input.text} onChange={input.onChange} /><br /></>)}
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Person = ({ person }) => (
  <tr><th align='left'>{person.name}:</th><td>{person.number}</td></tr>
)

const Numbers = ({ persons }) => (
  <div>
    <h2>Numbers</h2>
    <div>
      <table>
        <tbody>
          {persons.map(person => <Person key={person.name} person={person} />)}
        </tbody>
      </table>
    </div>
  </div>
)

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
      <Input value={newSearch} text='search' onChange={handleSearchChange} />
      <AddPersonForm
        onSubmit={addToPhonebook}
        inputs={[
          {
            value: newName,
            text: 'name',
            onChange: handleNameChange,
          },
          {
            value: newNumber,
            text: 'number',
            onChange: handleNumberChange,
          }
        ]}
      />
      <Numbers persons={personsToShow} />
    </div>
  )
}

export default App