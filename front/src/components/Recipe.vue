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
            <p>{{ Math.round((2 * getprice(recipe)) / recipe.nombre) }} €</p>
          </div>
          <div class="info d-flex">
            <div class="icon d-flex justify-content-center">
              <img src="../assets/clock.png" alt="" />
            </div>
            <p>{{ time_convert(recipe.temps) }}</p>
          </div>
         
          <div class="info d-flex">
            <div v-for="tag in recipe.tags" :key="tag" class="tags">
              <p>{{ tag }}</p>
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
            <span>{{ ingredient.quantity }} </span
            ><span>{{ ingredient.name }}</span>
          </li>
        </ul>
      </div>

      <div class="d-flex justify-content-center w-100">
        <button v-if="clicked==false" @click="addfav(recipe)">+ add to your shopping list</button>
        <div v-else>
          <p>La gourmande recette de {{recipe.nom}} est bien ajoutée à vos favoris !</p>
          <img src="../assets/check.png" alt="">
        </div>
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
            <p class="step-title">- step {{ i + 1 }}:</p>
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
  title: (context) => `Client: ${context.recipe.nom}`,
  data() {
    return {
      recipe: {},
      ingredients: [],
      loaded: false,
      clicked:false
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
    console.log(this.time_convert(70));
  },
  methods: {
    getprice(recipe) {
      if (this.loaded) {
        var price = 0;
        for (let i = 0; i < recipe.ingredients.length; i++) {
          var ing = this.ingredients.find(
            (x) => x.name == recipe.ingredients[i].name
          );
          price +=
            ing.prix * Math.ceil(recipe.ingredients[i].quantity / ing.quantité);
        }
        return price;
      }
    },
    time_convert(num) {
      var hours = Math.floor(num / 60);
      var minutes = num % 60;
      if (hours == 0) {
        var time = String(minutes + "min");
      } else if (minutes == 0) {
        time = String(hours + "h");
      } else {
        time = String(hours + "h" + minutes + "min");
      }
      return time;
    },
    async addfav(recipe) {
      this.clicked = true
      this.$http
        .put("http://localhost:3000/logged/1", {
          user: {
            planned: [0, 1, 0, 3, 4],
            favorites:  [0, 1, 0, 3, 4, recipe.id],
          },
          id: 1,
        })
        .then((response) => console.log(response));
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
.tags {
  background-color: #f6e9e6;
  padding: 2px 10px 2px 10px;
  border-radius: 15px;
  margin: 10px 10px 0px 0px;
  color: #cc513f;
}
.description p {
  font-weight: bold;
  margin-left: 40px;
}
.icon {
  width: 20px;
  margin-right: 10px;
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
.step-title {
  font-size: 20px;
  color: #cc513f;
  font-weight: bold;
}
.step {
  margin-left: 40px;
}
.steps {
  margin-bottom: 20px;
  max-width: 500px;
}
button {
  background-color: #e6746a;
  padding: 5px 10px 5px 10px;
  border-radius: 15px;
  color: white;
  border: none;
}
</style>
