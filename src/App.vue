<template>
  <div id="app">
    <nav-bar></nav-bar>
    <div class="main">
      <router-view/>
    </div>
  </div>
</template>

<script>
import NavBar from './components/Nav';
export default {
    name: 'App',
    components: {
        NavBar
    }
};
</script>

<style>
* {
    margin: 0;
    padding: 0;
}
a {
    text-decoration: none;
}
.main {
    margin-top: 50px;
}
html {
    margin: 0;
    padding: 0;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    color: #2c3e50;
    background-color: #eee;
}
</style>
