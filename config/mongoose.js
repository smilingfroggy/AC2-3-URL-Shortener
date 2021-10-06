const mongoose = require('mongoose')

// connect to MongoDB
mongoose.connect('mongodb://localhost/URL_shortener')
const db = mongoose.connection
db.on('error', () => {
  console.log('mongoDB error!')
})
db.once('open', () => {
  console.log('mongoDB connected!')
})

module.exports= db