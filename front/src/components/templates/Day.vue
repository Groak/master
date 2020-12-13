<template>
  <div class="card">
      <p class="day-title">{{day}}</p>
      <p>{{name}}</p>
      <div class="recipe-img">
          
          <img :src="image" alt="" />
      </div>
      <router-link :to="{ name: 'recipe', params: { id: id } }"
                >Voir la recette ></router-link
              >
  </div>
</template>

<script>
export default {
  name: "Day",
  props: {
      day: String,
      id: Number,
      name: String,
      image: String

  }
};
</script>

<style>
.recipe-img img {
  object-fit: cover;
  width: 150px;
  height: 150px;
}
.day-title{
    font-size: 20px;
    font-family: "Merienda", cursive;
    color:#e98d4e;
}
</style>
