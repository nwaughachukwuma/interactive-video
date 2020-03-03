<template>
  <div id="app">
    
    <nav-bar />
    <b-container fluid>
      <!-- <router-view/> -->
      <img alt="Vue logo" src="./assets/logo.png">
      <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
      <!-- <footer-bar /> -->
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import NavBar from '@/components/NavBar.vue';

export default Vue.extend({
  name: 'App',
  components: {
    HelloWorld,
    NavBar
  }
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
