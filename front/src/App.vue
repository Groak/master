<template>
  <div id="app">
    <Navbar class="nav"/>
    <router-view class="view"/>
  </div>
</template>

<script>
import Navbar from './components/templates/Navbar'
export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.nav{
  z-index:2;
  position:fixed;
}
*{
  box-sizing: border-box;
  margin: 0;

}
*:focus {
    outline: none;
}
</style>
