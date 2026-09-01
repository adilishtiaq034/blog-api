const mongoose = require('mongoose')
const app = require('./app')

mongoose.connect(process.env.mongodb_uri)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(err => console.error(err))

const port = process.env.PORT || 3000

app.listen(port, '0.0.0.0', () => { 
    console.log(`Server has started on port ${port}`)
})