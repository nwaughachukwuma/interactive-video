<template>
  <b-container fluid class="chart-wrapper" v-if="showChart">
    <b-card
      header="Video Chart"
      header-tag="h3"
      header-bg-variant="primary"
      header-text-variant="white"
      text-variant="primary"
      border-variant="primary"
    >
      <b-card-text>
        Paused: {{videoPaused}}
        <br />
        Watched: {{videoWatched}}%
        <br />
        Ended: {{videoEnded || videoWatched == 0}}
      </b-card-text>
      <line-chart :chart-data="datacollection"></line-chart>
      <b-button variant="dark" @click="fillData()">Randomize</b-button>
      <!-- <b-button href="#" variant="primary">Go somewhere</b-button> -->

      <b-card-footer footer-class="chart-footer">
        <b-button
          href="#"
          variant="primary"
          style="font-weight: bold"
          @click="$emit('showChart')"
        >Close</b-button>
      </b-card-footer>
    </b-card>
  </b-container>
</template>

<script>
import LineChart from "./LineChart.js";

export default {
  components: {
    LineChart
  },
  props: {
    showChart: {
      type: Boolean,
      default: false
    },
    videoPlayerMedia: {
      type: HTMLMediaElement
    }
  },
  data() {
    return {
      datacollection: null,
      videoPaused: false,
      videoPlaying: false,
      videoEnded: true,
      videoWatched: 0
    };
  },
  computed: {
    videoMedia() {
      return this.videoPlayerMedia;
    }
  },
  mounted() {
    this.fillData();
  },  
  methods: {
    fillData() {
      this.datacollection = {
        labels: [this.getRandomInt(), this.getRandomInt()],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [this.getRandomInt(), this.getRandomInt()]
          },
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [this.getRandomInt(), this.getRandomInt()]
          }
        ]
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
    timeUpdateFunc(evt) {
        console.log('reading time', evt.srcElement.paused)
        this.videoPaused = evt.srcElement.paused;
        this.videoEnded = evt.srcElement.ended;
        console.log('video paused >>>', evt.srcElement)
        const videoWatched = 
            (evt.srcElement.currentTime / evt.srcElement.duration) * 100
        this.videoWatched = videoWatched.toFixed(2);
        this.$forceUpdate;
    }
  },
  watch: {
    videoPlayerMedia: {
      handler(val) {
        if (val) {
          val.ontimeupdate = this.timeUpdateFunc
        }
        console.log(val.played);
      }
    }
  }
};
</script>

<style>
.chart-wrapper {
  max-width: 25%;
  height: auto;
  margin: 10px auto;

  position: absolute;
  top: 50px;
  right: 0;
  z-index: 2;
}
@media screen and (max-width: 1024px) {
  .chart-wrapper {
    max-width: 60%;
    position: relative;
    top: 0;
    margin-bottom: 20px;
  }
}
.chart-footer {
  background-color: transparent;
  height: 6vh;
  top: 0;
  margin-top: 10px;
}
</style>