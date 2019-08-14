const express = require('express')
const app = express()
app.set('secret', 'abcd')
app.use(require('cors')())
app.use(express.json())

// Require Database
require('./plugins/db')(app)
// Router
require('./routes/router')(app)
require('./routes/user-router')(app)

app.listen(3000, (req,res) => {
    console.log('app is running on 3000')
})
