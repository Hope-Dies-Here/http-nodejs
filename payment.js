const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const dotenv = require('dotenv')
dotenv.config()

const app = express()

const PORT = process.env.PORT || 6969

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended : true }))
app.use(express.json())

let coin = 100
let oddInit
app.get('/', (req, res) => {
  oddInit = 1 + Math.floor(Math.random() * 100) / 100
  res.render('index', {
    title : "hehe", 
    coin: coin,
    odd : oddInit
    
  })
})

// Guess Post
app.post('/guess', (req, res) => {
  coin--
  const letters = "BINGO";
  let bingo = letters[Math.floor(Math.random() * 5)]
  setTimeout(() =>{
  if(req.body.myGuess === bingo) {
    coin = coin + 5
  }
    
  }, 50)
  res.json({letter: bingo, coin: coin})
})

app.listen(PORT, console.log(`server servered at ${PORT}`))