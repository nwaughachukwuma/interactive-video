<template>
  <b-container fluid>
    <div class="video-controls" ref="videoControlsEl">
      <button class="play" data-icon="P" aria-label="play pause toggle" @click="playPauseMedia">
        <i :class="'fa ' + playIcon"></i>
      </button>
      <div class="timer" ref="timerWrapperEl">
        <div ref="timerBarEl"></div>
        <span aria-label="timer" ref="timerEl">00:00</span>
      </div>
      <button 
        class="rating" 
        data-icon="R" 
        aria-label="rating"
        @click="rateMoment"
      >
        <i class="fa fa-star"></i>
      </button>
    </div>

    <b-modal 
      id="modal-footer-sm" 
      v-model="ratingModal" 
      title="Rate 🌟 the moment" 
      button-size="sm"
      hide-footer
    >
      <div class="my-1 mx-5 rating-area">
        <b-row class="my-1">
          <b-col sm="6">
            <!-- <input v-model="rateValue" type="number" step="1" min="1" max="10" name="" id="rate-value"> -->
            <b-form-input size="lg" v-model="rateValue" type="number" step="1" min="1" max="10" name="rate-value" id="rate-value" placeholder="Enter your name"></b-form-input>
          </b-col>
          <b-col sm="3">
            <b-button 
              size="sm" 
              variant="primary"  
              class="submit-rating"
              @click="submitRating"
            >
              Submit
            </b-button>
          </b-col>
        </b-row>
      </div>
    </b-modal>
  </b-container>
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
      playIcon: "fa-pause",
      ratingModal: false,
      rateValue: 1,
      videoRatings: []
    };
  },
  methods: {
    playPauseMedia() {
      if (this.media.paused) {
        // if (this.media.currentTime < this.media.duration - 1) {
        //   this.playIcon = "fa-pause";
        // }
        this.playIcon = "fa-pause";
        this.media.play();
      } else {
        this.playIcon = "fa-play";
        this.media.pause();
      }
    },
    rateMoment() {
      this.playIcon = "fa-play";
      this.media.pause();
      this.ratingModal = true
    },
    submitRating() {
      this.videoRatings.push({value: +this.rateValue, time: this.media.currentTime});
      this.rateValue = 1;
      // emit event at the root component
      this.$root.$emit('videoRated', {data: this.videoRatings})
      this.ratingModal = false;
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
          val.play()
            .then(() => {this.playIcon = "fa-pause"})
            .catch(() => {this.playIcon = "fa-play"});
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
    },
    ratingModal: {
      handler(val) {
        if (!val) {
          this.playIcon = "fa-pause";
          this.media.play();
        }
      },
      immediate: false
    }
  }
};
</script>

<style lang="scss" scoped>
.rating-area {
  padding: 10px;
}
#rate-value {
  height: 30px;
  margin-right: 10px
}
.submit-rating {
  height: 30px; 
  text-align: center;
  align-self: center;

  padding-top: 0px;
  padding-bottom: 0px;
  font-weight: bold;
}

.submit-rating:before {
  font-size: 15px;
  position: relative;
  content: " ";
  color: white;
  text-shadow: 1px 1px 0px black;
}
</style>