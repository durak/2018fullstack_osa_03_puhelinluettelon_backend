const express = require('express')
const bodyParser = require('body-parser')


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

app.get('/info', (request, response) => {
    response.send(`<p>puhelinluettelossa ${persons.length} henkilön tiedot</p>
    <p>${new Date()}</p>`)
})

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)