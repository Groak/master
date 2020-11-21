<template>
  <div class="page">
      <div class="container" v-for="recipe in recipes" :key="recipe.id">
          <p class="recipe-title text-left">
                      {{recipe.nom}}
                </p>
          <div class="row">
              
              <div class="col-12 col-md-4 text-left recipe">
                  
                  <img :src="recipe.image" alt="">
              </div>
              <div class="col-12 col-md-8 text-left">
                  <div class="info d-flex">
                      <img src="../assets/dollar.png" alt="">
                      <p>{{getprice(recipe)}} €</p>

                  </div>
                    <div class="info d-flex">
                         <img src="../assets/clock.png" alt="">
                    </div>
                    <div class="description">
                        <h3>Ingrédients</h3>
                        <ul>
                            <li v-for="ingredient in recipe.ingredients.slice(0, 4)" :key="ingredient.id">
                                {{ingredient.name}}

                            </li>
                        </ul>
                        <p>...</p>
                        <a href="">Lire plus ></a>
                    </div>

              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Recipes',
  data(){
      return{
          recipes: null,
          ingredients: null,
          loaded: false
      }
  },
   mounted () {
    this.$http
      .get('http://localhost:3000/recettes')
      .then(response => (
        this.recipes = response.data))
    this.$http
      .get('http://localhost:3000/ingredients')
      .then(response => (
        this.ingredients = response.data,
        this.loaded = true))
  },
  methods:{
    getprice(recipe){
        if(this.loaded){
 var price = 0;
        for(let i = 0; i<recipe.ingredients.length; i++){
            var ing = this.ingredients.find(x => x.name == recipe.ingredients[i].name)
            price =+ ing.prix * recipe.ingredients[i].quantity
            console.log(ing)
        }
        return price
        }
       
    }
  }
}
</script>

<style>
ul{
    margin:0;
}
p{
    margin:0;
}
.recipe-title{
      font-family: "Merienda", cursive;
      font-weight: bold;
      color: #E98D4E;
      font-size:40px;
      margin:0;

}
.info img{
    height: 20px;
    width:auto;
    margin-right:7px;
}
.recipe img{
    object-fit: cover;
    width:230px;
  height:230px;
}
.description h3{
    margin-top:15px;
    font-size: 17px;
    color:#E98D4E;
}
.description a{
    color:rgb(231, 124, 53);
    text-decoration: none;
    font-weight: bold;
    font-style: italic;
}
.description p{
    font-weight:bold;
    margin-left: 40px;

}
</style>
