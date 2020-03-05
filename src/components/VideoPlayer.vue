<template>
  <div class="player">

    <!-- Reactivity Table element -->
    <reactivity-table :userClicks="userClicks" />

    <!-- Video container -->
    <div class="video-container" ref="videoContainer" @click="videoClicked">
        <video 
          ref="videoEl" 
          class="animated fadeInDownBig duration-3s" 
          id="video" 
          :controls="options.controls" 
          :autoplay="options.autoplay"
        >
            <source :src="options.sources[0].src" :type="options.sources[0].type" />
        </video>
    </div>
    <!-- Video Controls -->
    <div class="video-controls" ref="videoControlsEl">
      <button 
        class="play" 
        data-icon="P" 
        aria-label="play pause toggle" 
        @click="playPauseMedia"
      >
        <i :class="'fa ' + playIcon"></i>
      </button>
      <div class="timer" ref="timerWrapperEl">
        <div ref="timerBarEl"></div>
        <span aria-label="timer" ref="timerEl">00:00</span>
      </div>
    </div>
  </div>
</template>

<script>
import ReactivityTable from './ReactivityTable';

export default {
  name: "VideoPlayer",
  components: {
    ReactivityTable
  },
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
    this.controls = this.$refs.videoControlsEl;
    this.controls.style.visibility = "visible";

    this.timerWrapper = this.$refs.timerWrapperEl; 
    this.timer = this.$refs.timerEl; 
    this.timerBar = this.$refs.timerBarEl;
    this.videoContainer = this.$refs.videoContainer;

    this.media = this.$refs.videoEl;
    this.media.removeAttribute("controls");
    // attempt to autoplay and handle cases where the browser does not support it
    if (this.media.paused) {
        this.$nextTick(() => {
            this.media.play()
                .catch(() => this.playIcon = 'fa-play');
        });
    }
    // add event listeners to the media element
    this.media.addEventListener("ended", this.stopMedia);
    this.media.addEventListener("timeupdate", this.setTime);
  }
};
</script>