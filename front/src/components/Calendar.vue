<template>
  <div class="page">
    <div class="w-100 text-center">
      <h1>Calendrier</h1>
    </div>
    <div class="container">
      <div class="row d-flex justify-content-around">
        
        <div v-for="(p, index) in changed_planning" :key="index" class="col-4 d-flex justify-content-center">
         <div>
            <div>
            
          </div>
          <Day
            :id="recipes[p].id"
            :name="recipes[p].nom"
            :image="recipes[p].image"
            :day="days[index]"
          />
          <select
            name="recipes"
            v-model="changed_planning[index]"
          >
            <option
              v-for="(recipe, i) in recipes"
              :key="i"
              :value="recipe.id"
              >{{ recipe.nom }}</option
            >
          </select>
        </div>
         </div>
      </div>
    </div>
    <router-link :to="{ name: 'list', params: { ref: changed_planning.join('') } }">
        <button >Generate list</button>
    </router-link>
    <carousel class="carousel" :perPage="5">
      <slide v-for="(recipe, j) in carousel" :key="j">
        <router-link :to="{ name: 'recipe', params: { id: recipe.id } }"
          ><img :src="recipes[recipe].image" alt="" class="img"
        /></router-link>
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
      changed_planning: [0,1,2,3,4],
      planning: [0, 1, 2, 3],
      recipes: null,
      carousel: [0, 1, 2,3,7,8,11],
      loaded: false,
      days: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"],
    };
  },
  mounted(){
     this.$http
      .get("http://localhost:3000/logged/1")
      .then((response) => (this.planning = response.data.user.planned));
      this.$http
      .get("http://localhost:3000/recettes")
      .then((response) => (this.recipes = response.data));
  }
};
</script>

<style>
.img {
  height: 200px;
  width: 200px;
}
.recipte-card{
  width:150px;
}
button{
  margin: 20px 0px 15px 0px;
}
</style>
