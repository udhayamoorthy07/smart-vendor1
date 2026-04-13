const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(bodyParser.json())

let dataStore = []
let totalAmount = 0

app.post('/data', (req, res) => {
  const data = req.body
  dataStore.push({ ...data, date: new Date() })
  res.send("ok")
})

app.post('/amount', (req, res) => {
  totalAmount = req.body.amount
  res.send("saved")
})

app.get('/dashboard', (req, res) => {
  if (dataStore.length == 0) return res.json({})

  const latest = dataStore[dataStore.length-1]

  const items = [
    {name:"Apple", val:latest.apple},
    {name:"Banana", val:latest.banana},
    {name:"Orange", val:latest.orange}
  ]

  const best = items.reduce((a,b)=> a.val>b.val?a:b)
  const worst = items.reduce((a,b)=> a.val<b.val?a:b)

  res.json({
    apple: latest.apple,
    banana: latest.banana,
    orange: latest.orange,
    best: best.name,
    restock: worst.name,
    amount: totalAmount
  })
})
app.get('/', (req, res) => {
  res.send("Smart Vendor Server Running")
})

const PORT = process.env.PORT || 3000
app.listen(PORT)
