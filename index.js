const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))

// Pyyntöjen mukana tuleva data
morgan.token('req-body', (req, res) => { return JSON.stringify(req.body) })
app.use(morgan(':method :url :req-body :status :res[content-length] - :response-time ms'))

app.get('/api/persons', (request, response) => {
    Person
        .find({})
        .then(persons => {
            persons = persons.map(Person.format)
            response.json(persons)
        })
        .catch(error => {
            console.log(error)
            // ...
        })
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
    Person
        .findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => {
            response.status(400).send({ error: 'malformatted id' })
        })

//    persons = persons.filter(person => person.id !== Number(request.params.id))
//    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (body.name === undefined || body.number === undefined) {
        return response.status(400).json({ error: 'name or number missing' })
    }

    const person = new Person({
        name: body.name,
        number: body.number         
      })

    person
        .save()
        .then(savedPerson => {
            response.json(Person.format(savedPerson))
        })
        .catch(error => {
            console.log(error)
            // ...
        })
/*     if (persons.map((p) => p.name).includes(body.name)) {
        return response.status(400).json({ error: 'name must be unique' })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * Math.floor(99999999))
    }
    persons = persons.concat(person)
    response.json(person)
 */
})

app.put('/api/persons/:id', (request, response) => {
    const body = request.body
    const person = {
        name: body.name,
        number: body.number
    }

    Person
        .findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
            response.json(Person.format(updatedPerson))
        })
        .catch(error => {
            console.log(error)
            response.status(400).send({ error: 'malformatted id' })
        })
})

app.get('/info', (request, response) => {
    response.send(`<p>puhelinluettelossa ${persons.length} henkilön tiedot</p>
    <p>${new Date()}</p>`)
})

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)