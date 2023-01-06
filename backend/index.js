const express = require('express')
var morgan = require('morgan')
const cors = require('cors')


const app = express()

app.use(cors())
app.use(express.json())

morgan.token('body', (reqq, ress) => JSON.stringify(reqq.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
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

app.post('/api/persons', (request, response) => {
  //console.log('post>>/api/persons', request)
  const body = request?.body

  if (!body) { 
    return response.status(400).json({ 
      error: 'no content provided' 
    })
  }else if (!body.name) { 
    return response.status(400).json({ 
      error: 'Name missing' 
    })
  }else if (!body.number) { 
    return response.status(400).json({ 
      error: 'Number missing' 
    })
  }else if (persons.find(person=>person.name===body.name)) { 
    return response.status(400).json({ 
      error: 'That name already exists in the phonebook' 
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: Math.ceil(Math.random() * 1000000) // "Generate a new id for the phonebook entry with the Math.random"
  }

  persons = persons.concat(person)

  response.json(person)
})

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
  delPerson = persons.find(person => person.id === id)
  persons = persons.filter(person => person.id !== id);
  delPerson?response.status(204).end():response.status(404).end()
})
 


// Start Server
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Started Server :: running on port ${PORT}`)
})