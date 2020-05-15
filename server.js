require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const MOVIEDEX = require('./moviedex.json')
console.log(process.env.API_TOKEN)

const app = express()
app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use(function validateBearerToken(req, res, next) {
    const authToken = req.get('Authorization')
    const apiToken = process.env.API_TOKEN
    

    console.log('validate bearer token middleware')
    if (!authToken || authToken.split(' ')[1] !== apiToken) {
    return res.status(401).json({ error: 'Unauthorized request' })
    }

    // move to the next middleware
    next()
    })

function handleGetTypes(req, res) {
    res.json(validTypes)
  }
  
app.get('/types', handleGetTypes)

function handleGetMovies(req, res) {
   res.send('Welcome to the MovieDex')
}
    

app.get('/movie', function handleGetMovies(req, res) {
    let response = MOVIEDEX.movies;
  
    // filter movie by genre if genre query param is present
    if (req.query.genre) {
      response = response.filter(movie =>
        // case insensitive searching
        movie.genre.toLowerCase().includes(req.query.genre.toLowerCase())
      )
    }
  
    // filter movie by country if country query param is present
    if (req.query.country) {
      response = response.filter(movie =>
        movie.country.toLowerCase().includes(req.query.country.toLowerCase())
      )
    }
  
      
    // filter movie by avg_vote if avg_vote query param is present
    if (req.query.avg_vote) {
      response = response.filter(movie =>
        Number(movie.avg_vote) >= Number(req.query.avg_vote)
      )
    }

  
    res.json(response)
  })

const PORT = 8000

const validTypes = [`Bug`, `Dark`, `Dragon`, `Electric`, `Fairy`, `Fighting`, `Fire`, `Flying`, `Ghost`, `Grass`, `Ground`, `Ice`, `Normal`, `Poison`, `Psychic`, `Rock`, `Steel`, `Water`]


app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})