<template>
  <div id="app">
    
    <nav-bar />
    <b-container fluid>
      <!-- <router-view/> -->
      <video-interface />
      <!-- <footer-bar /> -->
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import NavBar from '@/components/NavBar.vue';
import videoInterface from '@/components/VideoInterface.vue'

export default Vue.extend({
  name: 'App',
  components: {
    NavBar,
    videoInterface
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

@import './assets/css/style.css';
</style>
