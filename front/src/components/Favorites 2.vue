<template>
  <div class="page">
    <div class="w-100 text-center">
      <h1>Favorites</h1>
    </div>
    <div class="container" v-for="recipe in recipes" :key="recipe.id">
      <div v-if="recipes.indexOf(recipe) % 2 == 0">
        <p class="recipe-title text-left">
          {{ recipe.nom }}
        </p>
        <div class="row">
          <div class="col-12 col-md-4 text-left recipe">
            <img :src="recipe.image" alt="" />
          </div>
          <div class="col-12 col-md-8 text-left">
            <div class="description">
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
            <div class="d-flex w-100 justify-content-end">
              <div class="description">
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
  name: "Favorites",
  data() {
      return{
  favorites: null,
    recipes: null,
    loaded: false,
    ingredients: null,
      }

  },
  async mounted() {
    var array = []
    const res = await this.$http.get("http://localhost:3000/logged");
    this.favorites = res.data[0].user.favorites
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
