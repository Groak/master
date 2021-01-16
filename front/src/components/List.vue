<template>
  <div class="page">
    <div class="w-100 text-center">
      <h1>Liste de courses</h1>
    </div>
    <p>{{ getlist(recipes) }}</p>
    <div class="container w-100 d-flex justify-content-center">
      <div class="d-flex">
        <div class="text-right quant">
          <div v-for="(ingredient, i) in liste" :key="i">
            <div>
              {{ ingredient.quantity }}
            </div>
          </div>
        </div>
        <div class="text-left">
          <div v-for="(ingredient, i) in liste" :key="i">
            <div>
              {{ ingredient.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="final">
      Prix final des courses : {{ getprice(liste, ingredients) }} €
    </p>

    <div class="add">
      <h2>Ajoutez vos produits à la liste</h2>
      <div>
        <input type="text" placeholder="Nom de l'article" v-model="newn" />
      </div>
      <div>
        <input type="number" placeholder="Quantité" v-model="newq" />
      </div>
      <button @click="addtolist()">Ajouter à ma liste</button>
    </div>
    <div class="drive">
      <h2>
        Commandez vos courses avec nos partenaires
      </h2>
      <div @click="send(liste, ingredients)" v-if="clicked == false">
        <img src="../assets/carrefour.png" alt="" />
        <img src="../assets/U.png" alt="" />
      </div>
      <div v-else>
        <p>
          Votre commande a été envoyée avec succès !
        </p>
        <img src="../assets/check.png" alt="" />
        <p>
          Vous serez redirigé vers la page de notre partenaire dans quelques
          secondes...
        </p>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: "List",
  data() {
    return {
      recipes: null,
      ingredients: null,
      loaded: false,
      liste: null,
      clicked: false,
      newq: null,
      newn: "",
      newlist: [],
    };
  },
  mounted() {
    this.$http
      .get("http://localhost:3000/recettes/")
      .then((response) => (this.recipes = response.data));
    this.$http
      .get("http://localhost:3000/ingredients/")
      .then((response) => (this.ingredients = response.data));
  },
  methods: {
    getlist(recipes) {
      var list = this.$route.params.ref.split("");
      var ingredient_list = [];
      list.forEach((e) => {
        recipes[e].ingredients.forEach((e) => {
          ingredient_list.push(e);
        });
      });
      var holder = {};

      ingredient_list.forEach(function(d) {
        if (Object.prototype.hasOwnProperty.call(holder, d.name)) {
          holder[d.name] = holder[d.name] + d.quantity;
        } else {
          holder[d.name] = d.quantity;
        }
      });

      var result = [];

      for (var prop in holder) {
        result.push({ name: prop, quantity: holder[prop] });
      }
      this.liste = result;

      return;
    },
    getprice(liste, ingredients) {
      var price = 0;
      for (let i = 0; i < 7; i++) {
        var ing = ingredients.find((x) => x.name == liste[i].name);
        if (ing.prix) {
          price += ing.prix * Math.ceil(liste[i].quantity / ing.quantité);
        } else {
          console.log("fail");
        }
      }
      return price;
    },
    send(liste) {
      this.clicked = true;
      setTimeout(function() {
        var win = window.open(
          "https://www.carrefour.fr/services/drive?gclid=CjwKCAiAouD_BRBIEiwALhJH6PZD3wY59FxYFhMWEKJH5_AuU80QD7g315Z4vOGiM3B4UZ9XYMqoUhoCo1wQAvD_BwE&gclsrc=aw.ds",
          "_blank"
        );
        win.focus();
      }, 3000);

      var order = [];
      liste.forEach((e) => {
        let r = Math.random()
          .toString(36)
          .substring(7);
        order.push({ reference: r, product: e.name, quantity: parseInt(e.quantity)});
      });
      this.$http
        .post("http://localhost:3000/order/", order)
        .then((response) => console.log(response));
    },
    addtolist() {
      this.liste.push({ name: this.newn, quantity: this.newq });
      console.log(this.liste);
    },
  },
};
</script>

<style>
button{
    margin-top: 10px;
}
.quant {
  margin-right: 20px;
}
.final {
  margin-top: 40px;
  font-size: 20px;
}
h2 {
  font-family: "Merienda", cursive;
  font-size: 25px;
  margin-top: 20px;
}
.drive img {
  height: 70px;
}
input {
  margin-top: 10px;
  padding: 5px;
  border-radius: 10px;
}
</style>
