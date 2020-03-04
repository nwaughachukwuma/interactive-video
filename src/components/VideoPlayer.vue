<template>
  <div class="player">
    <!-- Reactivity Table element -->
    <div class="reactivity-table-container animated rubberBand" v-if="userClicks.length">
        <table id="reactivity-table">
            <tr>
                <th>Current Time</th>
                 <th>Hot Spot</th>
            </tr>
            <tr v-for="(click, ix) in userClicks" :key="ix">
                <td>{{click.currentTime}}</td>
                <td>{{click.offsetX}} X {{click.offsetY}}</td>
            </tr>
        </table>
    </div>
    <!-- Video container -->
    <div class="video-container">
        <video class="animated fadeInDownBig duration-3s " id="video" :controls="options.controls" :autoplay="options.autoplay">
            <source :src="options.sources[0].src" :type="options.sources[0].type" />
        </video>
    </div>
    <!-- Video Controls -->
    <div class="video-controls">
      <button class="play" data-icon="P" aria-label="play pause toggle">
        <i :class="'fa ' + playIcon"></i>
      </button>
      <div class="timer">
        <div></div>
        <span aria-label="timer">00:00</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VideoPlayer",
  props: {
    options: {
      type: Object,
      default() {
        return {
          controls: true,
          autoplay: true
        };
      }
    }
  },
  data() {
    return {
      player: null,
      media: null,
      controls: null,
      play: null,
      timerWrapper: null,
      timer: null,
      timerBar: null,
      videoContainer: null,
      playIcon: "fa-pause",
      userClicks: []
    };
  },
  methods: {
    playPauseMedia() {
      if (this.media.paused) {
        this.playIcon = "fa-pause";
        this.media.play();
      } else {
        this.playIcon = "fa-play";
        this.media.pause();
      }
    },
    stopMedia() {
      this.media.pause();
      this.media.currentTime = 0;
      this.playIcon = "fa-play";
    },
    setTime() {
      const minutes = Math.floor(this.media.currentTime / 60);
      const seconds = Math.floor(this.media.currentTime - minutes * 60);
      let minuteValue;
      let secondValue;

      if (minutes < 10) {
        minuteValue = "0" + minutes;
      } else {
        minuteValue = minutes;
      }

      if (seconds < 10) {
        secondValue = "0" + seconds;
      } else {
        secondValue = seconds;
      }

      const mediaTime = minuteValue + ":" + secondValue;
      this.timer.textContent = mediaTime;

      const barLength =
        this.timerWrapper.clientWidth *
        (this.media.currentTime / this.media.duration);

      this.timerBar.style.width = barLength + 'px';
      this.timerBar.style.height = 35 + 'px';
      this.timerBar.style.backgroundColor = 'gray';
    },
    videoClicked(event) {
        const rect = this.videoContainer.getBoundingClientRect();
        const {layerX, layerY, offsetX, offsetY} = event
        // console.log('current time', this.media.currentTime, rect, layerX, layerY, offsetX, offsetY);
        
        if (Math.abs(layerX - offsetX) < 5) {
            this.userClicks.push({currentTime: this.media.currentTime, offsetX, offsetY});
        }
    }
  },
  mounted() {
    this.media = document.querySelector("video");
    this.controls = document.querySelector(".video-controls");

    this.play = document.querySelector(".play");

    this.timerWrapper = document.querySelector(".timer");
    this.timer = document.querySelector(".timer span");
    this.timerBar = document.querySelector(".timer div");

    this.videoContainer = document.querySelector(".video-container")

    this.media.removeAttribute("controls");
    // attempt to autoplay and handle cases where the browser does not support it
    if (this.media.paused) {
        this.$nextTick(() => {
            this.media.play()
                .catch(() => this.playIcon = 'fa-play');
        });
    }
    this.controls.style.visibility = "visible";

    // add event listeners to the media element
    this.play.addEventListener("click", this.playPauseMedia);
    this.media.addEventListener("ended", this.stopMedia);
    this.media.addEventListener("timeupdate", this.setTime);
    this.videoContainer.addEventListener("click", this.videoClicked)
  }
};
</script>

<style lang="scss" scoped>
.reactivity-table-container {
    max-height: 355px;
    overflow-y: scroll;
    width: 23%;
    position: fixed;
    top: 60px;
    left: 5px;
}

@media screen and (max-width: 1024px){
    .reactivity-table-container {
        width: 17.5%;
    }
}

@media screen and (max-width: 990px){
    .reactivity-table-container {
        width: 90%;
        margin-left: 7.5%;
        margin-bottom: 10px;
        position: relative;
        top: 0;
        margin-top: 50px;
    }
}

#reactivity-table {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 94%;
}

#reactivity-table td, #reactivity-table th {
  border: 1px solid #ddd;
  padding: 5px;
}

#reactivity-table tr:nth-child(even){background-color: #f2f2f2;}

#reactivity-table tr:hover {background-color: #ddd;}

#reactivity-table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: #333;
  color: white;
}
</style>