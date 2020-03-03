<template>
  <div>
    <!-- <video id="video-container">
        <source src="../assets/big_buck_bunny.mp4"  type="video/mp4">
    </video> -->
    <video-player :options="videoOptions" />
  </div>
</template>

<script>
import VideoPlayer from './VideoPlayer'
export default {
  name: "VideoInterface",
  components: {
    VideoPlayer
  },
  data() {
    return {
      videoOptions: {
        autoplay: true,
        controls: false,
        sources: [
          {
            src: require("../assets/big_buck_bunny.mp4"),
            type: "video/mp4"
          }
        ]
      }
    };
  }
};
</script>