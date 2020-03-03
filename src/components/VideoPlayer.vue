<template>
  <div class="player">
    <video id="video-container" :controls="options.controls" :autoplay="options.autoplay">
      <source :src="options.sources[0].src" :type="options.sources[0].type" />
    </video>
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
      playIcon: "fa-pause"
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
    }
  },
  mounted() {
    this.media = document.querySelector("video");
    this.controls = document.querySelector(".video-controls");

    this.play = document.querySelector(".play");

    this.timerWrapper = document.querySelector(".timer");
    this.timer = document.querySelector(".timer span");
    this.timerBar = document.querySelector(".timer div");

    this.media.removeAttribute("controls");
    this.controls.style.visibility = "visible";

    // add event listeners to the media element
    this.play.addEventListener("click", this.playPauseMedia);
    this.media.addEventListener("ended", this.stopMedia);
    this.media.addEventListener("timeupdate", this.setTime);
  }
};
</script>