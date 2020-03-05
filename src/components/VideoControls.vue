<template>
  <div class="video-controls" ref="videoControlsEl">
    <button class="play" data-icon="P" aria-label="play pause toggle" @click="playPauseMedia">
      <i :class="'fa ' + playIcon"></i>
    </button>
    <div class="timer" ref="timerWrapperEl">
      <div ref="timerBarEl"></div>
      <span aria-label="timer" ref="timerEl">00:00</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "VideoControls",
  props: {
    media: {
      type: HTMLVideoElement
    },
    playIconState: {
      type: String,
      default: 'fa-pause'
    }
  },
  data() {
    return {
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
    }
  },
  mounted() {
    this.controls = this.$refs.videoControlsEl;
    this.controls.style.visibility = "visible";

    this.timerWrapper = this.$refs.timerWrapperEl;
    this.timer = this.$refs.timerEl;
    this.timerBar = this.$refs.timerBarEl;
  },
  watch: {
    media: {
      handler(val) {
        // attempt to autoplay and handle cases where the browser does not support it
        if (val && val.paused) {
          val.play().catch(() => (this.playIcon = "fa-play"));
        }
      },
      immediate: true
    },
    playIconState: {
      handler(val, oldVal) {
        if (val && val !== oldVal) {
          this.playIcon = val;
        }
      },
      immediate: true
    }
  }
};
</script>