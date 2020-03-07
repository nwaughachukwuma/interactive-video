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
      <bar-chart :chart-data="barDataCollection"></bar-chart>
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
import BarChart from "./BarChart.js";

export default {
  components: {
    LineChart,
    BarChart
  },
  props: {
    showChart: {
      type: Boolean,
      default: false
    },
    videoPlayerMedia: {
      type: HTMLMediaElement
    },
    videoRating: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      datacollection: null,
      barDataCollection: null,
      videoPaused: false,
      videoPlaying: false,
      videoEnded: true,
      videoWatched: 0,
      videoLabel: [],
      videoData: [0]
    };
  },
  computed: {
    videoMedia() {
      return this.videoPlayerMedia;
    }
  },
  mounted() {
    this.reloadData();
  },
  methods: {
    reloadData() {
      this.datacollection = {
        labels: this.videoLabel,
        datasets: [
          //   {
          //     label: "Data One",
          //     backgroundColor: "#f87979",
          //     data: [this.getRandomInt(), this.getRandomInt()]
          //   },
          //   {
          //     label: "Data two",
          //     backgroundColor: "#488AFF",
          //     data: [this.getRandomInt(), this.getRandomInt()]
          //   },
          {
            // label: "Video Watched",
            backgroundColor: "#f87979",
            // data: this.videoLabel,
            label: "% Watched",
            data: this.videoData
          }
        ]
      };

      this.barDataCollection = {
        labels: this.videoRating.map(el => el.time),
        datasets: [
          {
            backgroundColor: "#f87979",
            label: "Moment ratings",
            data: this.videoRating.map(el => el.value),
          }
        ]
      };
    },
    timeUpdateFunc(evt) {
      // console.log('reading time', evt.srcElement.paused)
      this.videoPaused = evt.srcElement.paused;
      this.videoEnded = evt.srcElement.ended;
      // console.log('video paused >>>', evt.srcElement)
      const videoWatched =
        (evt.srcElement.currentTime / evt.srcElement.duration) * 100;
      this.videoWatched = videoWatched.toFixed(2);
      this.videoLabel.push(this.videoWatched);
      this.videoData.push(+evt.srcElement.currentTime.toFixed(2));

      this.reloadData();
      this.$forceUpdate;
    }
  },
  watch: {
    videoPlayerMedia: {
      handler(val) {
        if (val) {
          val.ontimeupdate = this.timeUpdateFunc;
        }
        console.log(val.played);
      }
    },
    videoRating: {
      handler(val) {
        console.log(val);
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