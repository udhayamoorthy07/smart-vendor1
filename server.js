const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

let currentShelf = 1

let shelfMap = {
  1: "apple",
  2: "banana",
  3: "orange"
}

let counts = {
  apple: 0,
  banana: 0,
  orange: 0
}

let totalAmount = 0

app.get('/', (req, res) => {
  res.send("Smart Vendor Server Running")
})

app.post('/setShelf', (req, res) => {
  currentShelf = req.body.shelf
  res.send("Shelf Selected")
})

app.post('/detect', (req, res) => {
  let fruit = shelfMap[currentShelf]
  if(fruit){
    counts[fruit]++
  }
  res.send("Detected")
})

app.post('/amount', (req, res) => {
  totalAmount = req.body.amount
  res.send("Amount saved")
})

app.get('/dashboard', (req, res) => {

  const items = [
    {name:"Apple", val:counts.apple},
    {name:"Banana", val:counts.banana},
    {name:"Orange", val:counts.orange}
  ]

  const best = items.reduce((a,b)=> a.val>b.val?a:b)
  const worst = items.reduce((a,b)=> a.val<b.val?a:b)

  res.json({
    apple: counts.apple,
    banana: counts.banana,
    orange: counts.orange,
    best: best.name,
    restock: worst.name,
    amount: totalAmount
  })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log("Server running")
})
