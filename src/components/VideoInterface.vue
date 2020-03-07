<template>
  <div>
    <!-- Reactivity Table element -->
    <div class="reactivity-table">
      <reactivity-table :userClicks="userClicks" />
    </div>
    <!-- Video player component -->
    <video-player 
      ref="videoPlayer"
      :options="videoOptions" 
      @videoClicked="videoClicked" 
    />
    <!-- Play list with thumbnails -->
    <play-list />
  </div>
</template>

<script>
import VideoPlayer from "./VideoPlayer";
import PlayList from "./PlayList";
import ReactivityTable from "./ReactivityTable";

export default {
  name: "VideoInterface",
  components: {
    VideoPlayer,
    PlayList,
    ReactivityTable,
  },
  data() {
    return {
      videoOptions: {
        autoplay: true,
        controls: false,
        sources: [
          {
            src: "media/video/big_buck_bunny.mp4", 
            // require("../assets/big_buck_bunny.mp4"),
            type: "video/mp4"
          },
          {
            src: "media/video/upc-tobymanley.theora.ogg",
            type: "video/ogg"
          }
        ]
      },
      userClicks: [],
      videoPlayerMedia: null
    };
  },
  methods: {
    videoClicked({ data }) {
      this.userClicks = data;
    }
  },
  mounted() {
    this.videoPlayerMedia = this.$refs.videoPlayer.$refs.videoEl;
  }
};
</script>