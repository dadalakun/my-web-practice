import express from 'express'
import cors from 'cors'
import routes from './routes'
import mongoose from 'mongoose'

require('dotenv').config()
const app = express()

// init middleware
app.use(cors())
app.use(express.json())

const port = process.env.PORT || 5000
const dboptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
mongoose.connect(process.env.MONGO_URL, dboptions)
  .then(res => {
    console.log('mongo db connection created')
  })

routes(app)

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`)
})
