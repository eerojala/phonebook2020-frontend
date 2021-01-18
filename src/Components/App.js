import React, { useState, useEffect } from 'react'

import entryService from '../Services/entries'

import Form from './Form'
import Input from './Input'
import Notification from './Notification'
import Phonebook from './Phonebook'

const App = () => {
  const baseStyle = {
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const successStyle = {...baseStyle, color: "green"}
  const errorStyle = {...baseStyle, color: "red"}

  const [ entries, setEntries] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ notification, setNotification ] = useState(null)
  const [ notificationStyle, setNotificationStyle ] = useState(baseStyle)

  // const hook = () => {
  //   axios
  //     .get('http://localhost:3001/entries') 
  //     .then(response => { // after the data has been fetched from the above adress
  //       // run this function
  //       setEntries(response.data) 
  //     })
  // }

  // useEffect(hook, []) // second parameter's empty array means that this hooks only after the first render is done (not on subsequent renders)
  // // so first the component is rendered without the entries
  // // but after the entries are successfully fetched and the state is updated, the component is rerendered 

  const hook = () => {
    entryService
      .getAll()
        .then(initialEntries => {
          setEntries(initialEntries)
        })
  }

  useEffect(hook, [])

  const addEntry = (event) => {
    event.preventDefault()
    const entryObject = {
      name: newName,
      number: newNumber
    }

    const existingEntry = entries.find(e => e.name === newName)

    if (existingEntry === undefined) {
      entryService
        .create(entryObject)
        .then(returnedEntry => {
          setEntries(entries.concat(returnedEntry))
          setNotification(`Added ${newName}`)
          setNotificationStyle(successStyle)
          setNewName('')
          setNewNumber('')
          setNotificationTimeout(5000)
        })
        .catch(error => {
          console.log(error.response.data)
          setNotification(error.response.data.error)
          setNotificationStyle(errorStyle)
          setNotificationTimeout(8000)
        })
    } else {
      if (window.confirm(`There already exists an entry with that name. Do you want to update it's number?`)) {
        updateEntry(existingEntry)
      }
    }
  }

  const setNotificationTimeout = (ms) => {
    setTimeout(() => { setNotification(null) }, ms) // After 5 seconds, the notification is nullified (so it does not render anymore)
  }

  const updateEntry = (entry) => {
    const changedEntry = {...entry, number: newNumber}
    console.log(changedEntry)
    entryService
      .update(changedEntry.id, changedEntry)
      .then(updatedEntry => {
        setEntries(entries.map(e => e.id !== updatedEntry.id ? e : updatedEntry))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        deleteLocalOnlyEntry(changedEntry)
      })
  }

  const deleteLocalOnlyEntry = (entry) => {
    setNotification(`Entry ${entry.name} has already been deleted from the database`)
    setNotificationStyle(errorStyle)
    deleteEntryFromLocal(entry.id)
    setNotificationTimeout(5000)
  }

  const deleteEntryFromLocal = (id) => {
    setEntries(entries.filter(entry => entry.id !== id))
  }

  const deleteEntry = (id) => {
    const entry = entries.find(entry => entry.id === id)

    if (entry !== undefined) {
      if (window.confirm(`Are you sure yo want to delete ${entry.name}?`)) {
        entryService
          .remove(id)
          .then(response => {
            deleteEntryFromLocal(id)
          })
          .catch(error => {
            deleteLocalOnlyEntry(entry)
          })
      }
    } 
  }  

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }


  const filteredEntries = entries.filter((entry) => entry.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} inlineStyle={notificationStyle} />
      <Input label="Filter shown with" value={filter} onChange={handleFilterChange} />
      <h2>Add a new entry</h2>
      <Form 
        handleNameChange={handleNameChange} 
        name={newName} 
        handleNumberChange={handleNumberChange}
        number={newNumber}
        handleSubmit={addEntry} 
      />
      <h2>Numbers</h2>
      <Phonebook entries={filteredEntries} handleDelete={deleteEntry} />
    </div>
  )

}

export default App