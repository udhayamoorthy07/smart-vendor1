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

app.post('/setShelf', (req, res) => {
  currentShelf = req.body.shelf
  res.send("shelf set")
})

app.post('/detect', (req, res) => {

  const fruit = shelfMap[currentShelf]

  if(fruit){
    counts[fruit]++
  }

  res.send("count updated")
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
