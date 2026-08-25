
const mongoose = require('mongoose')
const app = require('./app')

mongoose.connect(process.env.mongodb_uri)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(err => console.error(err))

  app.listen(3000, () => console.log('Server running on port 3000'))

const port = process.env.port

app.listen(port,()=>{
    console.log(`Server has started on port ${port}`)
})