<template>
  <div class="page">
    <div class="w-100 text-center">
      <h1>Calendrier</h1>
    </div>
    <div class="container" >
        <div class="row d-flex">
<div v-for="(recipe,index) in recipes" :key="index">
        <Day :id="recipe.id" :name="recipe.nom" :image="recipe.image" :day="days[index]"/>
        </div>
        </div>
        
    </div>
  </div>
</template>

<script>
import Day from './templates/Day.vue'
export default {
  name: "Calendar",
  components:{
      Day
  },
  data() {
    return {
      planning: null,
      recipes: null,
      days: ["Lundi","Mardi","Mercredi","Jeudi","Vendredi"]
    };
  },
  async mounted() {
    var array = [];
    const res = await this.$http.get("http://localhost:3000/logged");
    this.planning = res.data[0].user.planning;
    console.log(this.favorites);
    this.planning.forEach((element) => {
      this.$http
        .get("http://localhost:3000/recettes/" + element)
        .then((response) => array.push(response.data));
    });
    console.log(array);
    this.recipes = array;
  },
};
</script>

<style></style>
