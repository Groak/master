const express = require('express')
const app = express()
const index_port = 3000
<<<<<<< HEAD
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
=======

app.get('/', (req, res) => res.send('Hello World!'))
app.post('/', (req, res) => res.send('Hello POST World!'))

//Jusque là, tout va bien

app.listen(index_port, () => console.log(`Example app listening on port ${index_port}!`))
const mysql = require('mysql');

const host = process.env.DB_HOST || '138.68.98.48';
const port = process.env.DB_PORT || '3306';
const user = process.env.DB_USER || 'root';
const password = process.env.DB_PASS || 'root';
const database = process.env.DB_DATABASE || 'groak';

const con = mysql.createConnection({
  host, port, user, password, database,
});
const query = "SELECT * FROM ingredients";
 
con.connect(function(err) {
  if (err) throw err;
  con.query(query, (err, result, fields) => {
    if (err) throw err;
    console.log(result);
 });
});
>>>>>>> a40b8b1356ec9ba938ff375f87d4f150898af683

