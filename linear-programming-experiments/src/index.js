const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const os = require('os')
const {exec} = require('child_process')

const port = process.argv[2] || 9000
const app = express()
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static(`${__dirname}/../public`))

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

app.post('/solve', (req, res) => {
  const {adjList} = req.body
  const file = 'adjMatrix.txt'
  const python = os.platform() == 'win32' ? 'py' : 'python3'
  fs.writeFileSync(file, JSON.stringify(adjList))
  exec(`${python} solve.py ${file}`, (err, stdout) => {
    if(err) {
      console.log(err)
      res.send(null)
      return
    }
    // console.log(stdout)
    res.send(stdout)
  })
})

app.put('/stopServer', (req, res) => {
  res.end('Stopping server :(\n')
  server.close()
})

