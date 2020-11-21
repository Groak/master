const express = require('express')
const app = express()
const index_port = 3000
const ingredients = require('../server/routes/ingredients')
var cors = require('cors')

const recettes = require('../server/routes/recettes')
const user = require('../server/routes/user')
const admin = require('../server/routes/admin')
app.use(cors())

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.use('/ingredients/', ingredients)



app.listen(index_port, () => console.log(`Example app listening on port ${index_port}!`))

