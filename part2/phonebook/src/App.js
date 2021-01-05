import { useState, useEffect } from 'react';
import phonebookService from './services/contacts'
import './App.css';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter'
import Persons from './components/Persons'
import Notification from './components/Notification'


const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [notification, setNotification] = useState(null)

  // FETCHING DATA FROM THE JSON SERVER (after 1st render)
  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialContacts => {
        setPersons(initialContacts)
      })
  }, [])

  // SHOW PERSONS BASED ON FILTER PROVIDED BY USER
  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter))

  // ADD NEW NUMBER (form submission)
  const addNewNumber = (event) => {
    // Prevent the page from reloading (default behaviour)
    event.preventDefault()

    // Check if a person is already in the phonebook
    const foundInThePhonebook = persons.find(element =>
      element.name.toLowerCase() === newName.toLowerCase()
    )
    // a) If person is added to the phonebook:
    if (foundInThePhonebook) {
      // ask if number should be updated
      const shouldUpdate = window.confirm(`${newName} is already in the phonebook. Replace old number with the new one?`)
      // if agreed - update number in the phonebook and on the server side
      if (shouldUpdate) {
        const updatedContact = { ...foundInThePhonebook, number: newNumber }
        phonebookService
          .update(foundInThePhonebook.id, updatedContact)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
          })
          // When error occurs display Notification, which will last 3 seconds, then it dissapear
          .catch(error=>{
            setNotification(
              `Information about ${updatedContact.name} has already been removed from server`
            )
            setTimeout(()=>{
              setNotification(null)
              setPersons(persons.filter(person=>person.id !== updatedContact.id))
            },3000)
            
          })
        // after all - clean inputs
        setNewName('')
        setNewNumber('')
      }
    }
    // b) If person is not in the phonebook - create new contact and add it to the database
    else {
      // create new contact
      const newPerson = {
        name: newName,
        number: newNumber
      }
      // add it on the server
      phonebookService
        .create(newPerson)
        .then(returnedPerson => {
          // save it to 'persons' state variable
          setPersons(persons.concat(returnedPerson))
          // display successful notification, which will be displayed for 3 seconds on the screen
          setNotification(
            `Added ${returnedPerson.name}`
          )
          setTimeout(() => {
            setNotification(null)
          }, 3000);
        })
      // after all - clean the inputs
      setNewName('')
      setNewNumber('')
    }
  }

  // DELETE CONTACT
  const deleteContact = (id) => {
    // a) find contact which match provided 'id'
    const contact = persons.find(person => person.id === id)
    // b) ask for confirmation to delete contact
    const shouldDelete = window.confirm(`Delete ${contact.name} ?`)
    // c) if confirmed, remove user from the phonebook
    if (shouldDelete) {
      phonebookService
        .remove(id)
        .then(deletedContact => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const handleFilter = (event) => {
    setShowAll(false)
    setFilter(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification} />
      <Filter filter={filter} handleFilter={handleFilter} />
      <PersonForm addNewNumber={addNewNumber} setNewNumber={setNewNumber} setNewName={setNewName} newNumber={newNumber} newName={newName} />
      <h1>Numbers</h1>
      <Persons personsToShow={personsToShow} deleteContact={deleteContact} />

    </div>
  )
}

export default App;