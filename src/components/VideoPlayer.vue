<template>
  <div class="player">

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

        <!-- Video Comments  -->
        <video-comments :comment="commentInTime" :media="media && media.currentTime" />
    </div>

    <!-- Video Controls -->
    <video-controls 
      ref="videoControlsEl" 
      :media="media" 
      :playIconState="playIcon" 
    />

  </div>
</template>

<script>
import VideoControls from './VideoControls'
import VideoComments from './VideoComments'
import Comments from '@/assets/json/comments.json'

export default {
  name: "VideoPlayer",
  components: {
    VideoControls,
    VideoComments
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
      videoContainer: null,
      userClicks: [],
      playIcon: 'fa-pause',
      playbackLoop: null,
      commentInTime: {}
    };
  },
  methods: {
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
      this.controls.$refs.timerEl.textContent = mediaTime;
      this.playbackLoop = this.media.currentTime.toFixed(0);

      const barLength =
        this.controls.$refs.timerWrapperEl.clientWidth *
        (this.media.currentTime / this.media.duration);

      this.controls.$refs.timerBarEl.style.width = barLength + 'px';
      this.controls.$refs.timerBarEl.style.height = 35 + 'px';
      this.controls.$refs.timerBarEl.style.backgroundColor = 'gray';
    },
    videoClicked(event) {
      const rect = this.videoContainer.getBoundingClientRect();
      const {layerX, layerY, offsetX, offsetY} = event
      // console.log('current time', this.media.currentTime, rect, layerX, layerY, offsetX, offsetY);
      
      if (Math.abs(layerX - offsetX) < 5) {
        this.userClicks.push({currentTime: this.media.currentTime, offsetX, offsetY});
      }
      this.$emit('videoClicked', {data: this.userClicks});
    }
  },
  mounted() {
    this.controls = this.$refs.videoControlsEl;
    this.controls.$refs.videoControlsEl.style.visibility = "visible";

    this.videoContainer = this.$refs.videoContainer;

    this.media = this.$refs.videoEl;
    this.media.removeAttribute("controls");
    // add event listeners to the media element
    this.media.addEventListener("ended", this.stopMedia);
    this.media.addEventListener("timeupdate", this.setTime);
  },
  watch: {
    playbackLoop: {
      handler(val) {
        const comments = Comments.comments || [];
        if (comments.length) {
          this.commentInTime = comments.find(el =>  el.time === +val) || {}
        }
      },
      immediate: false
    }
  }
};
</script>