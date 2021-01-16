<template>
  <div class="page">
    <div class="w-100 text-center">
      <h1>Admin</h1>
    </div>
    <div>
      <p>Ajoutez les infos de la recette</p>
      <div>
 <input type="text" placeholder="Nom" v-model="recipe.nom" />
      <input
        type="text"
        placeholder="URL de l'image..."
        v-model="recipe.image"
      />
      </div>
     <div>
<input
        type="number"
        placeholder="Temps de préparation (en min)"
        v-model="recipe.temps"
      />
      <input
        type="textarea"
        placeholder="Description courte"
        v-model="recipe.description"
      />
     </div>
      
      <p>Ajoutez les ingrédients nécessaires</p>
      <div class="container-fluid">
        <div
          v-for="(ing, i) in recipe.ingredients"
          :key="i"
          class="container d-flex justify-content-center"
        >
          <input
            class="w-80 nom-ing"
            type="text"
            placeholder="Nom de l'ingrédient"
            v-model="recipe.ingredients[i].name"
          />
          <input
            class="w-20 quan"
            type="number"
            placeholder="Quantité (en kg/L)"
            v-model="recipe.ingredients[i].quantity"
          />
        </div>
      </div>

      <p>Ajoutez les étapes de réalisation</p>
      <div v-for="(e, i) in recipe.etapes" :key="i">
        <input type="text" placeholder="Étape..." v-model="recipe.etapes[i]" />
      </div>
      <p>Ajoutez les tags</p>
      <div v-for="(t, i) in recipe.tags" :key="i">
        <input type="text" placeholder="Tag" v-model="recipe.tags[i]" />
      </div>
      <button @click="send(recipes)">Ajouter</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Admin",
  data() {
    return {
      ingredients: null,
      recipes: null,
      recipe: {
        id: 30,
        nom: "",
        image: "",
        temps: null,
        nombre: null,
        ingredients: [
          {
            name: null,
            quantity: null,
          },
          {
            name: null,
            quantity: null,
          },
        ],
        description: "",
        etapes: ["", "", ""],
        tags: ["", ""],
      },
    };
  },
  mounted() {
    this.$http
      .get("http://localhost:3000/ingredients")
      .then((response) => (this.ingredients = response.data));
    this.$http
      .get("http://localhost:3000/recettes")
      .then((response) => (this.recipes = response.data));
  },
  methods: {
    send() {
      this.$http
        .put("http://localhost:3000/recettes/12", {
          nom: this.recipe.nom,
          image: this.recipe.image,
          temps: this.recipe.temps,
          nombre: null,
          ingredients: this.recipe.ingredients,
          description: this.recipe.description,
          etapes: this.recipe.etapes,
          tags: this.recipe.tags,
        })
        .then((response) => console.log(response));
    },
  },
};
</script>

<style>
p {
  margin: 20px 0px 10px 0px;
}
button {
  margin-top: 30px;
}
</style>
