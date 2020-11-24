<template>
  <div class="page">
    <div class="w-100 text-center">
      <h1>Favorites</h1>
    </div>
    <div class="container" v-for="recipe in recipes" :key="recipe.id">
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
            <p>{{ getprice(recipe) }} €</p>
          </div>
          <div class="info d-flex">
            <img src="../assets/clock.png" alt="" />
          </div>
          <div class="description">
            <h3>Ingrédients</h3>
            <ul>
              <li
                v-for="ingredient in recipe.ingredients.slice(0, 4)"
                :key="ingredient.id"
              >
                {{ ingredient.name }}
              </li>
            </ul>
            <p>...</p>
            <router-link :to="{ name: 'recipe', params: { id: recipe.id } }"
              >Lire plus ></router-link
            >
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "Favorites",
  data() {
      return{
  favorites: null,
    recipes: null
      }

  },
  async mounted() {
    var array = []
    this.$http
      .get("http://localhost:3000/users")
      .then((response) => (this.favorites = response.data[this.$route.params.id].favorites),
      console.log(this.favorites)
      );
      console.log(this.favorites)
    this.favorites.forEach(element => {
          this.$http
      .get("http://localhost:3000/recettes/" + element)
      .then((response) => (array.push(response.data))); 
    });
    console.log(array)
    this.recipes = array;

  },

  };
 

</script>

<style></style>
