const express = require('express')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes')
const protectedRoutes = require('./routes/protectedRoutes')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use('/auth', authRoutes)
app.use('/api', protectedRoutes)

app.listen(3000,()=>console.log('Server running on http://localhost:3000'))