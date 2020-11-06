const express = require('express')
const app = express()
const index_port = 3000

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

