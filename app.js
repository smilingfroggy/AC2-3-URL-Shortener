const express = require('express')
const exphbs = require('express-handlebars')
require('./config/mongoose')
const UrlRecords = require('./models/urls')
const app = express()
const PORT = 3000
const URL_host = `http://localhost:${PORT}`

// template engine
app.engine('handlebars', exphbs({ defaultLayout: "main" }))
app.set('view engine', 'handlebars')
// static files: style.css
app.use(express.static('public'))
// body-parser
app.use(express.urlencoded({ extended: true }))

// routes
app.get('/', (req, res) => {
  res.render('index')
})

app.post('/getURL', (req, res) => {
  const origin_url = req.body.originalURL
  console.log(origin_url) // OK 'http...'

  // Shortened before
  UrlRecords.findOne({ origin_url: origin_url })
    .lean()
    .then(urlRecord => {
      console.log(urlRecord)  // { _id: ..., origin_url: ..., } or null
      if (urlRecord) {
        res.render('index', { short_url: urlRecord.short_url, origin_url: origin_url })
      } else if (urlRecord == null || urlRecord == undefined) {
        let short_url = URL_host + `/${getRandom5()}`
        UrlRecords.create({ origin_url, short_url })
          .then(() => {
            res.render('index', { origin_url, short_url })
          })
          .catch(error => { console.log(error) })
      }
    })
    .catch(error => { console.log(error) })
})

app.get('/:code', (req, res) => {
  const code = req.params.code
  console.log(`${URL_host}/${code}`)
  UrlRecords.findOne({ short_url: `${URL_host}/${code}` })
    .lean()
    .then(urlRecord => {
      res.redirect(`${urlRecord.origin_url}`)
    })
    .catch(error => { console.log(error) })
})

function getRandom5() {
  const characters = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let random5 = ""
  for (let i = 1; i <= 5; i++) {
    let index = Math.floor(Math.random() * characters.length)
    random5 += characters[index]
  }
  return random5
}

app.listen(PORT, () => {
  console.log(`Express project is running on http://localhost:${PORT}`)
})