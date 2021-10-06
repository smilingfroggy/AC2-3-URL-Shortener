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
app.set(express.static('public'))
// body-parser
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  //   res.send(`<h3>URL Shortener</h3>
  // <img src="https://assets-lighthouse.alphacamp.co/uploads/image/file/16716/ExportedContentImage_00.png" alt="">`)
  res.render('index')
})

app.post('/getURL', (req, res) => {
  const origin_url = req.body.originalURL
  console.log(origin_url) // OK 'http...'

  let short_url = URL_host + `/${getRandom5()}`
  // Shortened before
  // UrlRecords.find({ origin_url: origin_url })
  //   .lean()
  //   .then(urlRecord => {
  //     console.log(urlRecord)
  //     res.render('index', { short_url: urlRecord.short_url })
  //   })
  //   .catch(error => { console.log(error) })

  // New URL
  UrlRecords.create({ origin_url, short_url })
    .then(() => {
      res.render('index', { short_url })
    })
    .catch(error => { console.log(error) })

})

function getRandom5() {
  const characters = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let random5 = ""
  for (let i = 1; i <= 5; i++) {
    let index = Math.floor(Math.random() * characters.length)
    console.log(index)
    random5 += characters[index]
  }
  return random5
}

app.listen(PORT, () => {
  console.log(`Express project is running on http://localhost:${PORT}`)
})