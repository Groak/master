<template>
  <div class="page">
    <h1>{{ recipe.nom }}</h1>
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-6 recipe-img">
          <img :src="recipe.image" alt="" />
        </div>
        <div class="col-12 col-md-6 text-left">
          <div class="info d-flex">
            <div class="icon d-flex justify-content-center">
              <img src="../assets/dollar.png" alt="" />
            </div>
            <p>{{ getprice(recipe) }} €</p>
          </div>
          <div class="info d-flex">
            <div class="icon d-flex justify-content-center">
              <img src="../assets/clock.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid ingredients-section">
      <div class="d-flex justify-content-center w-100">
        <div class="title">
          <div class="title-name text-left">
            <p>The ingredients</p>
          </div>
          <div class="number text-left">01</div>
        </div>
      </div>
      <div class="w-100 d-flex justify-content-center">
        <ul class="text-left">
          <li v-for="ingredient in recipe.ingredients" :key="ingredient.id">
            {{ ingredient.name }}
          </li>
        </ul>
      </div>

      <div class="d-flex justify-content-center w-100">
        <button>+ add to your shopping list</button>
      </div>
    </div>
    <div class="container-fluid recipe-section">
      <div class="d-flex justify-content-center w-100">
        <div class="title">
          <div class="title-name text-left">
            <p>The recipe</p>
          </div>
          <div class="number text-left">02</div>
        </div>
      </div>
      <div class="w-100 d-flex justify-content-center">
          <div>
 <div
          class="steps text-left"
          v-for="(etape, i) in recipe.etapes"
          :key="i"
        >
          <p class="step-title">- step {{ i }}:</p>
          <p class="step">{{ etape }}</p>
        </div>
          </div>
       
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Recipe",
  data() {
    return {
      recipe: null,
      ingredients: null,
      loaded: false,
    };
  },
  mounted() {
    console.log("http://localhost:3000/recettes/" + this.$route.params.id);
    this.$http
      .get("http://localhost:3000/recettes/" + this.$route.params.id)
      .then((response) => (this.recipe = response.data));
    this.$http
      .get("http://localhost:3000/ingredients")
      .then(
        (response) => ((this.ingredients = response.data), (this.loaded = true))
      );
  },
  methods: {
    getprice(recipe) {
      if (this.loaded) {
        var price = 0;
        for (let i = 0; i < recipe.ingredients.length; i++) {
          var ing = this.ingredients.find(
            (x) => x.name == recipe.ingredients[i].name
          );
          price = +ing.prix * recipe.ingredients[i].quantity;
          console.log(ing);
        }
        return price;
      }
    },
  },
};
</script>

<style>
h1 {
  font-family: "Merienda", cursive;
  font-weight: bold;
  color: #e98d4e;
  font-size: 60px;
  margin-bottom: 30px;
}
.recipe-img img {
  object-fit: cover;
  width: 300px;
  height: 300px;
}
.description h3 {
  margin-top: 15px;
  font-size: 17px;
  color: #e98d4e;
}
.description a {
  color: rgb(231, 124, 53);
  text-decoration: none;
  font-weight: bold;
  font-style: italic;
}
.description p {
  font-weight: bold;
  margin-left: 40px;
}
.icon {
  width: 20px;
}
.ingredients-section {
  margin-top: 30px;
  background-color: #ecdac8;
  padding-bottom: 40px;
}
.title {
  width: 300px;
}
.title-name {
  margin-top: 60px;
  margin-left: 30px;

  font-size: 30px;
  font-weight: bold;
}
.number {
  font-size: 100px;
  color: #e6746aaf;
}
ul {
  margin-bottom: 30px;
}
.step-title{
    font-size:20px;
    color: #CC513F;
    font-weight: bold;
}
.step {
  margin-left: 40px;
}
.steps {
  margin-bottom: 20px;
  max-width: 500px;
}
button{
    background-color: #E6746A;
    padding: 5px 10px 5px 10px;
    border-radius: 15px;
    color:white;
    border:none;
}
</style>
