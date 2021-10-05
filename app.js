const express = require('express')
const app = express()
const PORT = 3000


app.get('/', (req, res) => {
  res.send(`<h3>URL Shortener</h3>
<img src="https://assets-lighthouse.alphacamp.co/uploads/image/file/16716/ExportedContentImage_00.png" alt="">`)
})

app.listen(PORT, () => {
  console.log(`Express project is running on http://localhost:${PORT}`)
})