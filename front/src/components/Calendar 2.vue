<template>
  <div class="page">
    <div class="w-100 text-center">
      <h1>Calendrier</h1>
    </div>
    <div class="container">
      <div class="row d-flex justify-content-around">
        <div v-for="(recipe, index) in recipes" :key="index">
          <Day
            :id="recipe.id"
            :name="recipe.nom"
            :image="recipe.image"
            :day="days[index]"
          />
          <select
            name="recipes"
            v-model="changed_planning[index]"
            @click="updateplanning()"
          >
            <option
              v-for="(recipe, i) in recipes"
              :key="i"
              :value="recipe.id"
              >{{ recipe.nom }}</option
            >
          </select>
          <p>{{ changed_planning[index] }}</p>
        </div>
      </div>
    </div>
    <carousel class="carousel" :perPage="5">
      <slide v-for="(recipe, j) in carousel" :key="j">
        <router-link :to="{ name: 'recipe', params: { id: recipe.id } }"
                ><img :src="recipe.image" alt="" class="img"/></router-link
              >
        
      </slide>
    </carousel>
  </div>
</template>

<script>
import Day from "./templates/Day.vue";
export default {
  name: "Calendar",
  components: {
    Day,
  },
  data() {
    return {
    ingredients: null,

      changed_planning: null,
      planning: null,
      recipes: null,
      carousel: null,
      loaded: false,
      days: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"],
    };
  },
  async mounted() {
    var array = [];
    this.$http
      .get("http://localhost:3000/ingredients")
      .then((response) => (this.ingredients = response.data));
    this.$http
      .get("http://localhost:3000/recettes/")
      .then((response) => (this.carousel = response.data));

    const res = await this.$http.get("http://localhost:3000/logged");
    this.planning = res.data[0].user.planning;
    this.changed_planning = res.data[0].user.planning;

    console.log(this.favorites);
    this.planning.forEach((element) => {
      this.$http
        .get("http://localhost:3000/recettes/" + element)
        .then((response) => array.push(response.data), (this.loaded = true));
    });
    console.log(array);
    this.recipes = array;
  },
  method: {
    async updateplanning() {
      const res = await this.$http.patch("http://localhost:3000/logged/1", {
        user: {
          planned: this.changed_planning,
        },
      });
      console.log(res.data);
    },
     getprice(recipe) {
      if (this.loaded) {
          console.log("hi")
        var price = 0;
        for (let i = 0; i < recipe.ingredients.length; i++) {
          var ing = this.ingredients.find(
            (x) => x.name == recipe.ingredients[i].name
          );
          price += (ing.prix * Math.ceil(recipe.ingredients[i].quantity/ing.quantité));
        }
        return price;
      }else{
          console.log("hello")
          return 0;
      }
    },
  },
};
</script>

<style>
.img{
    height:200px;
    width: 200px;
}
</style>
