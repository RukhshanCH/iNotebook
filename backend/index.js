const connectToMongo = require('./db');
const express = require('express')
const cors = require('cors')


connectToMongo();
const app = express()
require('dotenv').config();
const port = process.env.PORT;


app.use(cors())
app.use(express.json())
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})