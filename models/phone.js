require('dotenv').config()
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)


const url = process.env.MONGODB_URI


console.log('connecting to', url)

mongoose.connect(url)

  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const phoneSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    validate: function numberValidator(n) {
  
      if(n[2] != '-' && n[3] != '-')
        return false
    
      const newString = n.replace('-', '')
      return /^\d+$/.test(newString);
         
    },
    message: 'Number must be of the form xx-x... or xxx-x....'
  }
})



phoneSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Phone', phoneSchema)