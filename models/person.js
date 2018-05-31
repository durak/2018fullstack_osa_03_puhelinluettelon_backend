const mongoose = require('mongoose')

// Yhteys
const url = 'mongodb://fullstackphones:@ds033607.mlab.com:33607/fs-phones'
mongoose.connect(url)

// Skeema
const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

personSchema.statics.format = function (person) {
    return {
        name: person.name,
        number: person.number,
        id: person._id
    }
}

// Modeli
const Person = mongoose.model('Person', personSchema)

module.exports = Person