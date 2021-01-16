<template>
  <div class="day-card">
    <p class="day-title">{{ day }}</p>
    <div class="recipe-card">
      <p>{{ name }}</p>
      <div class="day-recipe-img">
        <img :src="image" alt="" />
      </div>
      <router-link :to="{ name: 'recipe', params: { id: id } }" class="link"
        >Voir la recette ></router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Day",
  props: {
    day: String,
    id: Number,
    name: String,
    image: String,
  },
};
</script>

<style>
.recipe-card {
  background-color: rgba(230, 116, 105, 0.479);
  padding: 10px 10px 20px 10px;
  border-radius: 15px;
}
.day-recipe-img img {
  object-fit: cover;
  width: 150px;
  height: 150px;
  border-radius: 15px;
  padding-bottom: 10px;
}
.day-title {
  font-size: 20px;
  font-family: "Merienda", cursive;
  color: #e98d4e;
}
</style>
