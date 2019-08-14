const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(express.static(__dirname + "/dist/"))

app.set('secret', 'abcd')
app.use(require('cors')())
app.use(express.json())

// Require Database
require('./plugins/db')(app)
// Router
require('./routes/router')(app)
require('./routes/user-router')(app)


app.listen(port, (req,res) => {
    console.log('app is running on 3000')
})
