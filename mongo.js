const mongoose = require('mongoose')
const Person = require('./models/person')

if (process.argv.length === 2) {
    logPersons()
} else if (process.argv.length === 4) {
    newPerson(process.argv[2], process.argv[3])
} else {
    console.log('arguments not recognized')
}


function logPersons() {
    Person
        .find({})
        .then(result => {
            console.log('Puhelinluettelo:')
            result.forEach(person => {
                console.log(person.name, person.number)
            })
            mongoose.connection.close()
        })
}


function newPerson(name, number) {
    const person = new Person({
        name: name,
        number, number
    })

    person
        .save()
        .then(response => {
            console.log(`lisätään henkilö ${name} numero ${number} luetteloon`)
            mongoose.connection.close()
        })
}


