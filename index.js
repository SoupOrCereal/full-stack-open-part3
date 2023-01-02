const express = require('express')
const app = express()

const persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
  //console.log('get>>/', request)
  response.send('<marquee scrollamount="32"><h1>Server Says :: "bee bop boop"</h1></marquee>')
})

app.get('/info', (request, response) => {
  //console.log('get>>/info', request)
  response.send(`<p>Phonebook has info for ${persons.length} people<p><br />
                      ${new Date().toDateString()} ${new Date().toLocaleTimeString()}`);
})

app.get('/api/persons', (request, response) => {
  //console.log('get>>/api/persons', request)
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  //console.log('get>>/api/persons/:id', request)
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  //console.log('delete>>/api/persons/:id', request)
  const id = Number(request.params.id)
  delPerson = persons.filter(person => person.id !== id)

  delPerson?response.status(204).end():response.status(404).end()

  // Functionality of delete added.
  // ToDo :: apply deletion of person
})

// Start Server
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Started Server :: running on port ${PORT}`)
})