<template>
  <div class="player">

    <!-- Video container -->
    <div 
      class="video-container" 
      ref="videoContainer" 
      @click="videoClicked" 
      v-stream:click="saveToFirestore$"
    >
        <video 
          ref="videoEl" 
          class="animated fadeInDownBig duration-3s"
          id="video" 
          :controls="options.controls"
          :autoplay="options.autoplay"
          preload="metadata"
          @timeupdate="setTime"
          @ended="stopMedia"
        >
          <source :src="options.sources[0].src" :type="options.sources[0].type" />
          <source :src="options.sources[1].src" :type="options.sources[1].type" />
          <!-- another approach is to use WebVTT to create subtitles for the video track -->
          <!-- https://w3c.github.io/webvtt/ --> 
          <!-- https://developer.mozilla.org/en-US/docs/Web/Guide/Audio_and_video_delivery/Adding_captions_and_subtitles_to_HTML5_video -->
          <!-- https://iandevlin.com/blog/2016/05/html5/html5-video-and-multiple-track-display/ -->
          <!-- https://www.iandevlin.com/blog/2016/05/html5/help-with-webvtt/ -->
          <!-- https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Video_and_audio_APIs -->
          <track 
            kind="subtitles" 
            label="English subtitle" 
            src="media/json/sample-en.vtt" 
            srclang="en" 
            default
          >

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

import {interval} from 'rxjs'
import {
  map,
  startWith,
  scan,
  throttleTime
} from 'rxjs/operators'

import {
  getDocuments, 
  getDocument, 
  setDocument,
  updateDocument,
  insertDocument,
  deleteDocument,
  getCollectionRef
} from '@/config/firebase/handlers'

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
      commentInTime: {},
      videoSession: null,
      userIp: null
    };
  },
  methods: {
    stopMedia() {
      this.media.pause();
      this.media.currentTime = 0;
      this.playIcon = "fa-play";
    },
    setTime() {
      const mediaTime = this.extractMediaTime(this.media.currentTime);
      this.controls.$refs.timerEl.textContent = mediaTime;

      this.playbackLoop = this.media.currentTime.toFixed(0);

      const barLength =
        this.controls.$refs.timerWrapperEl.clientWidth *
        (this.media.currentTime / this.media.duration);

      this.controls.$refs.timerBarEl.style.width = barLength + 'px';
      this.controls.$refs.timerBarEl.style.height = 35 + 'px';
      this.controls.$refs.timerBarEl.style.backgroundColor = 'gray';
    },
    extractMediaTime(currentTime) {
      const minutes = Math.floor(currentTime / 60);
      const seconds = Math.floor(currentTime - minutes * 60);
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

      return minuteValue + ":" + secondValue
    },
    videoClicked(event) {
      const rect = this.videoContainer.getBoundingClientRect();
      const {layerX, layerY, offsetX, offsetY} = event
      // console.log('current time', rect, layerX, layerY, offsetX, offsetY, event);
      
      if (Math.abs(layerX - offsetX) < 5) {
        this.userClicks.push({currentTime: this.media.currentTime, offsetX, offsetY});
        
        this.saveClickToFirestore({currentTime: this.media.currentTime, offsetX, offsetY})
        this.$emit('videoClicked', {data: this.userClicks});
      }
    },
    async saveClickToFirestore(data) {
      const clickRef = await getCollectionRef('video-interactions')
          .where('sessionStartAt', '==', this.videoSession)
          .where('userIp', '==', this.userIp)
          .get();

      if (!clickRef.empty) {
        const curSnap = clickRef.docs[0];
        curSnap.ref.collection('clicks')
          .add({...data, createdAt: Date.now()})

        this.$socket.client.emit('stream_data', {
          ...data, 
          sessionStartAt: this.videoSession,
          userIp: this.userIp,
          createdAt: Date.now()
        });
      } 
    }
  },
  domStreams: ["saveToFirestore$"],
  subscriptions() {
    return {
      streamCount: interval(1000).pipe(
        // map(() => 1),
        // startWith(0)
      ),
      clickCount: this.saveToFirestore$.pipe(
        throttleTime(500),
        map(() => 1),
        startWith(0),
        scan((total, change) => total + change)
      )
    }
  },
  beforeMount() {
    fetch('https://api.ipify.org?format=jsonp&callback=?')
    .then(res => res.text()) 
    .then(result => {
      const regex = /[^?();]+/ig
      let cleanedRes = result.match(regex)[0]
      cleanedRes = JSON.parse(cleanedRes);
      this.userIp = cleanedRes.ip;
    })
    .catch(err => console.log(err));
  },
  async mounted() {
    this.controls = this.$refs.videoControlsEl;
    this.controls.$refs.videoControlsEl.style.visibility = "visible";

    this.videoContainer = this.$refs.videoContainer;

    this.media = this.$refs.videoEl;
    this.media.removeAttribute("controls");
    // add event listeners to the media element
    // this.media.addEventListener("ended", this.stopMedia);

    this.videoSession = Date.now();
    // hook to firestore
    console.log('get video-interactions collection');
    const userDocs = await getDocuments('video-interactions')
      .then(res => console.log(res));
  },
  created() {
    // using vm.$watch to watch rxjs subscriptions: streamCount
    this.$watch('streamCount', function (val) {
      console.log('stream count is count')
      this.$socket.client.emit('stream_data', {
        count: val, 
        sessionStartAt: this.videoSession,
        userIp: this.userIp
      });
    })
    // using vm.$watch to watch rxjs subscriptions: clickCount
    this.$watch('clickCount', async (val) => {
      console.log('watching rxjs subject to save clicks to firebase', val);

      try {
        const clickRef = await getCollectionRef('video-interactions')
          .where('sessionStartAt', '==', this.videoSession)
          .where('userIp', '==', this.userIp)
          .get();

        if (!clickRef.empty) {
          const curSnap = clickRef.docs[0];
          curSnap.ref.update({clickCount: val, updatedAt: Date.now()})
        }
      } catch (error) {
        console.log('error updating video click count')
      }
    })
  },
  watch: {
    userIp: {
      handler(ip) {
        if (ip) {
          insertDocument('video-interactions', {
            sessionStartAt: this.videoSession,
            userIp: ip
          })
        }
      },
      immediate: false
    },
    playbackLoop: {
      handler(val) {
        // deprecated for web.vtt file
        const comments = Comments.comments || [];
        if (comments.length) {
          this.commentInTime = comments.find(el =>  el.time === +val) || {}
        }
        // get the video comments from webvtt file
        // const textTracks = this.media.textTracks[0];
        // if (textTracks && textTracks.cues) {
        //   const activeCue = Object.values(textTracks.cues)
        //     .find(el => el.startTime === +val);

        //   if (activeCue) {
        //     this.commentInTime = {
        //       text: activeCue.text.replace(/(<([^>]+)>)/ig, ''),
        //       time: activeCue.startTime,
        //       id: activeCue.id,
        //       mediaTime: this.extractMediaTime(+val)
        //     }
        //   }
        // }
      },
      immediate: false
    }
  }
};
</script>