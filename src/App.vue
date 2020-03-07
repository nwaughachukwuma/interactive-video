<template>
  <div id="app">
    <nav-bar @toggleChart="toggleChart" />
    <b-container fluid>
      <!-- video chart component -->
      <chart-interface 
        :showChart="showChart"
        :videoPlayerMedia="videoPlayerMedia"
        @showChart="toggleChart" 
      />
      <!-- video-interface -->
      <video-interface ref="videoInterface" />
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import NavBar from '@/components/NavBar.vue';
import VideoInterface from '@/components/VideoInterface.vue'
import ChartInterface from '@/components/charts/ChartInterface.vue'

export default Vue.extend({
  name: 'App',
  components: {
    NavBar,
    VideoInterface,
    ChartInterface
  },
  data() {
    return {
      showChart: false,
      videoPlayerMedia: null
    }
  },
  mounted() {
    this.videoPlayerMedia = this.$refs.videoInterface.$refs.videoPlayer.$refs.videoEl;
  },
  methods: {
    toggleChart() {
      this.showChart = !this.showChart? true: false
    }
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
