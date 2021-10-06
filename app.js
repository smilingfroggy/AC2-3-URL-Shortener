const express = require('express')
const exphbs = require('express-handlebars')
require('./config/mongoose')
const app = express()
const PORT = 3000

// template engine
app.engine('handlebars', exphbs({ defaultLayout: "main" }))
app.set('view engine', 'handlebars')
// static files: style.css
app.set(express.static('public'))

app.get('/', (req, res) => {
  //   res.send(`<h3>URL Shortener</h3>
  // <img src="https://assets-lighthouse.alphacamp.co/uploads/image/file/16716/ExportedContentImage_00.png" alt="">`)
  res.render('index')
})

app.listen(PORT, () => {
  console.log(`Express project is running on http://localhost:${PORT}`)
})