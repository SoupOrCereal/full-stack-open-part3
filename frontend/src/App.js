import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'
import phonebook from './services/phonebook'
import './App.css'
import Notify from './components/Notify'

const App = () => { 
  const [persons, setPersons] = useState([
    { name: 'Loading', number: '...', id: -1 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [newNotify, setNewNotify] = useState({msg:'', isErr:true})
  
  const addName = (event) => {
    event.preventDefault()
    let personFound = persons.find(person => person.name === newName)
    if(personFound){
      // "Do not implement the functionality for making changes to the phone numbers yet, that will be implemented in exercise 3.17"
      window.alert(`${newName} already exsists within the phonebook.  Make a time-machine and change the entry that way.  (if you have, let me know, right... NOW) // guess not`)
      if(false && window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        phonebook.updateNumber({ personOld: personFound, newNumber: newNumber })
          .then(updatedNote => {
            setNewNotify({msg:'Updated Phone Number', isErr:false})
            setPersons(
                persons.map(per=>{
                  let returnPerson = per;
                  if(per.id === personFound.id)
                    returnPerson.number = newNumber
                  return(returnPerson)
                })
              )
            setNewName("")
            setNewNumber("")
          }).catch(err=>setNewNotify({msg:'Error updating phone number!', isErr:true}))
      }
    }else{
      phonebook.create({ name: newName, number: newNumber })
      .then(returnedNote => {
        setNewNotify({msg:'Added Person', isErr:false})
        setPersons(persons.concat(returnedNote))
        setNewName("")
        setNewNumber("")
      }).catch(err=>setNewNotify({msg:"Error adding new person!", isErr:true}))
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  const handleDeleteButton = (event) => {
    event.preventDefault()
    let deleteName = event.target.name
    let deleteID = event.target.id
    if (window.confirm(`Delete ${deleteName} ?`)) {
      phonebook.del({ delID: deleteID })
      .then(returnedNote => {
        setNewNotify({msg:"Deleted Person", isErr:false})
        setPersons(
          persons.filter(person=>person.id != deleteID)
        )
      }).catch(err=>setNewNotify({msg:"Error deleting person!", isErr:true}))
    }
  }

  useEffect(() => {
    phonebook.getAll().then(allNames => {
      setPersons(allNames)
    })
  }, [])
  
  let notifyHTML = (<></>)
  if(newNotify.message != ''){
    notifyHTML = (<Notify message={newNotify.msg} isError={newNotify.isErr} />);
  }

  useEffect(() => {
    if(newNotify.message != ''){
      const timer = setTimeout(() => {
        setNewNotify({msg:'', isErr:true})
      }, 3690);
      return () => clearTimeout(timer);
    }
  }, [newNotify]);

  return (
    <div>
      {notifyHTML}
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange} />
      <h2>add a new</h2>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} newSearch={newSearch} handleDeleteButton={handleDeleteButton} />
    </div>
  )
}

export default App