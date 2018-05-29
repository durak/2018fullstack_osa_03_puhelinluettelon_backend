const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')



let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Martti Tienari",
        "number": "040-123456",
        "id": 2
    },
    {
        "name": "Arto Järvinen",
        "number": "040-123456",
        "id": 3
    },
    {
        "name": "Lea Kutvonen",
        "number": "040-123456",
        "id": 4
    }
]


const app = express()
app.use(bodyParser.json())
app.use(cors())

// Pyyntöjen mukana tuleva data
morgan.token('req-body', (req, res) => { return JSON.stringify(req.body) })
app.use(morgan(':method :url :req-body :status :res[content-length] - :response-time ms'))

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const person = persons.find((person) => { return person.id === Number(request.params.id) })
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()

    }
})

app.delete('/api/persons/:id', (request, response) => {
    persons = persons.filter(person => person.id !== Number(request.params.id))
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (body.name === undefined || body.number === undefined) {
        return response.status(400).json({ error: 'name or number missing' })
    }

    if (persons.map((p) => p.name).includes(body.name)) {
        return response.status(400).json({ error: 'name must be unique' })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * Math.floor(99999999))
    }
    persons = persons.concat(person)
    // console.log(persons)
    response.json(person)
})

app.get('/info', (request, response) => {
    response.send(`<p>puhelinluettelossa ${persons.length} henkilön tiedot</p>
    <p>${new Date()}</p>`)
})

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)