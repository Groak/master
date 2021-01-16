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
import List from './components/List.vue'
import Recipes from './components/Recipes.vue'
import Recipe from './components/Recipe.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Favorites from './components/Favorites.vue'
import Calendar from './components/Calendar.vue'
import Admin from './components/Admin.vue'


const routes = [
  {path:'/', component: Home},
  {path:'/admin', component: Admin},

  {path:'/recipes', component: Recipes},
  {path:'/recipes/search/', component: Recipes},

  {path:'/recipes/search/:criteria', component: Recipes, name: 'recipesearch'},
  {path:'/recipe/:id', component: Recipe, name: 'recipe'},
  {path:'/list/:ref', component: List, name: 'list'},
  {path:'/login', component: Login},
  {path:'/register', component: Register},
  {path: '/favorites', component: Favorites, name : 'favorites'},
  {path: '/calendar', component: Calendar, name : 'calendar'}


]
const router = new VueRouter({
  routes
})
Vue.mixin({
    data(){
      return{
        user:null,
        test:"test"
      }
    },
    methods: {
      async loginNewUser(email,password) {
        try {
        const res = await this.$http.get("http://localhost:3000/users");
        console.log(res.data)
        console.log(email)
        console.log(password)

        var user = res.data.find(e => {
          return e.email == email && e.password == password
        });
        console.log(user)
        if (!user) {
          console.log('wrong info!')
          return(false)
        } else {
          this.user = user
          return(true)
        }
      } catch (error) {
        console.log(error);
      }
      }
    }
});
new Vue({
  router,
  render: h => h(App),

}).$mount('#app')
