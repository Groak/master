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

module.exports = con;
/*
const Ingredient = function(ingredient){
  this.id = ingredient.id;
  this.name = ingredient.name;
  this.price = ingredient.price;
  this.quantity = ingredient.quantity;
  this.unit = ingredient.unit;
}


// get user lists
router.get('/list', function(req, res) {
  let request = `SELECT * FROM ingredients`;
  sql.query(request, function(err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "Ingredients lists retrieved successfully"
    })
  })
});

Ingredient.getAll = result => {
  sql.query("SELECT * FROM ingredients", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("ingredients: ", res);
    result(null, res);
  });
};
module.exports = Ingredients;*/
