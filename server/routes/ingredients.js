const express = require('express')
const con = require('../db/db')
const router = express.Router();


class Ingredient{
	constructor(ingredient){
		this.id = ingredient.id;
		this.name = ingredient.name;
		this.price = ingredient.price;
		this.quantity = ingredient.quantity;
		this.unit = ingredient.unit;
	}
};

router.get('/list', function(req, res, next) {
	con.query('SELECT * from ingredients', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	});
});

router.post('/new-ingredient', async (req, res) =>{
	const ingredient = new Ingredient(req.body)
	console.log(req.body.name)
	if(ingredient.name){
		sql = "INSERT INTO  ingredients (name, price, quantity, unit) VALUES ($1, $2, $3, $4)";
		const result = con.query({
		  text: sql,
		  values: [ ingredient.name, ingredient.price, ingredient.quantity, ingredient.unit],
		});
		res.send("ingredient added!")
	}else{
		res.send('error')
	}

});

router.get('/:id', function(req,res){
	sql = 'SELECT * FROM ingredients WHERE id = $1';
		const result = con.query({
			text:sql,
			values:[req.params.id]
		})
		res.send({"status": 200, "error": null, "response": result});
})

module.exports = router;
