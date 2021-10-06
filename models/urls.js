const mongoose = require('mongoose')
const Schema = mongoose.Schema
const urlSchema = new Schema({
  origin_url: {
    type: String,
    required: true
  },
  short_url: {
    type: String,
    required: false
  }
})
module.exports = mongoose.model('Url', urlSchema)