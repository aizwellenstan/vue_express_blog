const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000
const staticFileMiddleware = express.static(path.join(__dirname + '/dist'));

app.use(staticFileMiddleware);

app.get('/.*/', function (req, res) {
  res.render(path.join(__dirname + 'src/index.html'));
});

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
