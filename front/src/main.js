import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VuePageTitle from 'vue-page-title'
import VueCarousel from 'vue-carousel';
const axios = require('axios');

Vue.prototype.$http = axios

Vue.use(VueCarousel);
Vue.use(VueRouter)
Vue.use(VuePageTitle, {
  prefix: 'Groak - '
})
Vue.config.productionTip = false
import Home from './components/Home.vue'
import Recipes from './components/Recipes.vue'
import Recipe from './components/Recipe.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Favorites from './components/Favorites.vue'
const routes = [
  {path:'/', component: Home},
  {path:'/recipes', component: Recipes},
  {path:'/recipes/search/:criteria', component: Recipes, name: 'recipesearch'},
  {path:'/recipe/:id', component: Recipe, name: 'recipe'},

  {path:'/login', component: Login},
  {path:'/register', component: Register},
  {path: '/favorites/:id', component: Favorites, name : 'favorites'}
]
const router = new VueRouter({
  routes
})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
