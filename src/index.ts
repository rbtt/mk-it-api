import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import './controllers/FavoritesController'
import './controllers/NotesController'
import './controllers/RatingsController'
import { AppRouter } from './AppRouter'

mongoose
  .connect(process.env.DB_URL!)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.warn(`There\'s been an error: ${err}`)
  })

const app = express()

app.use(cors())
app.use(express.json())
app.use(AppRouter.getInstance())

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
