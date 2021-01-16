<template>
  <div class="page">
    <div v-if="empty">
      <p>Il n'y a pas de recettes qui correspondent à vos critères...</p>
      <p>
        Trouvez votre bonheur parmis
        <router-link class="link" to="/recipes">
          nos autres recettes </router-link
        >!
      </p>
    </div>
    <div class="container" v-for="recipe in recipes" :key="recipe.id">
      <div v-if="recipe.id % 2 == 0">
        <p class="recipe-title text-left">
          {{ recipe.nom }}
        </p>
        <div class="row">
          <div class="col-12 col-md-4 text-left recipe">
            <img :src="recipe.image" alt="" />
          </div>
          <div class="col-12 col-md-8 text-left">
            <div class="info d-flex">
              <img src="../assets/dollar.png" alt="" />
              <p>{{ Math.round((2 * getprice(recipe)) / recipe.nombre) }} €</p>
            </div>
            <div class="info d-flex">
              <img src="../assets/clock.png" alt="" />
              <p>{{ time_convert(recipe.temps) }}</p>
            </div>
            <div class="description">
              <h3>Ingrédients</h3>
              <p>{{ recipe.description }}</p>
              <p>...</p>
              <router-link :to="{ name: 'recipe', params: { id: recipe.id } }"
                >Lire plus ></router-link
              >
            </div>
          </div>
        </div>
      </div>

      <div v-else>
        <p class="recipe-title text-right">
          {{ recipe.nom }}
        </p>
        <div class="row">
          <div class="col-12 col-md-8 text-right">
            <div class="info d-flex justify-content-end">
              <p>{{ Math.round((2 * getprice(recipe)) / recipe.nombre) }} €</p>

              <img src="../assets/dollar.png" alt="" />
            </div>
            <div class="info d-flex justify-content-end">
              <p>{{ time_convert(recipe.temps) }}</p>

              <img src="../assets/clock.png" alt="" />
            </div>
            <div class="d-flex w-100 justify-content-end">
              <div class="description">
                <h3>Ingrédients</h3>
                <p>{{ recipe.description }}</p>
                <p>...</p>
                <router-link :to="{ name: 'recipe', params: { id: recipe.id } }"
                  >Lire plus ></router-link
                >
              </div>
            </div>
          </div>
          <div class="col-12 col-md-4 text-right recipe">
            <img :src="recipe.image" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Recipes",
  data() {
    return {
      recipes: null,
      ingredients: null,
      loaded: false,
      empty: false,
    };
  },
  watch: {
    $route() {
      this.empty = false;
      this.loadRecipes();
    },
  },
  mounted() {
    this.loadRecipes();
    this.$http
      .get("http://localhost:3000/ingredients")
      .then(
        (response) => ((this.ingredients = response.data), (this.loaded = true))
      );
  },
  methods: {
    loadRecipes() {
      var recipes = [];
      this.$http.get("http://localhost:3000/recettes").then((response) => {
        recipes = response.data;
        if (this.$route.params.criteria) {
          var criteria = this.$route.params.criteria.split("+");
          this.recipes = recipes.filter((recipe) => {
            return criteria.every((c) => recipe.tags.includes(c));
          });
          console.log(this.recipes);
          if (this.recipes.length == 0) {
            this.empty = true;
          } else {
            this.empty = false;
          }
        } else {
          this.recipes = recipes;
        }
      });
    },
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
  },
};
</script>

<style>
ul {
  margin: 0;
}
p {
  margin: 0;
}
.recipe-title {
  font-family: "Merienda", cursive;
  font-weight: bold;
  color: #e98d4e;
  font-size: 40px;
  margin-bottom: 20px;
}
.info img {
  height: 20px;
  width: auto;
  margin: 0px 7px 0px 7px;
}
.recipe img {
  object-fit: cover;
  width: 230px;
  height: 230px;
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
  margin: 0 !important;
}
.description {
  width: 100%;
  max-width: 300px;
}
</style>
