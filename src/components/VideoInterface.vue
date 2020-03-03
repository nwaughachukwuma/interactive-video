<template>
  <div>
    <video-player :options="videoOptions" />
    <play-list />
  </div>
</template>

<script>
import VideoPlayer from './VideoPlayer'
import PlayList from './PlayList'


export default {
  name: "VideoInterface",
  components: {
    VideoPlayer,
    PlayList
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