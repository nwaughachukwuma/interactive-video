<template>
  <div class="scrolling-wrapper">
    <div 
      class="card" 
      v-for="(movie, ix) in playlists" 
      :key="ix" 
      :id="'card'+ix"
      ref="cards"
    >
      <img :src="movie.src" alt />
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: "PlayList",
  data() {
    return {
      playlists: [
        {
          src: require("../assets/img/movie-posters/img1.jpeg")
        },
        {
          src: require("../assets/img/movie-posters/img2.jpeg")
        },
        {
          src: require("../assets/img/movie-posters/img3.jpeg")
        },
        {
          src: require("../assets/img/movie-posters/img4.jpeg")
        },
        {
          src: require("../assets/img/movie-posters/img5.jpeg")
        },
        {
          src: require("../assets/img/movie-posters/img6.jpeg")
        },
        {
          src: require("../assets/img/movie-posters/img7.jpeg")
        },
        {
          src: require("../assets/img/movie-posters/img8.jpeg")
        },
        {
          src: require("../assets/img/movie-posters/img9.jpeg")
        },
        {
          src: require("../assets/img/movie-posters/img10.jpeg")
        },
        {
          src: require("../assets/img/movie-posters/img11.jpeg")
        },
        {
          src: require("../assets/img/movie-posters/img12.jpeg")
        }
      ]
    };
  },
  methods: {
    createObserver(cardElement) {
      // let observer;
      const options = {
        root: null,
        rootMargin: "0px",
        threshold: this.buildThresholdList()
      };

      const observer = new IntersectionObserver(this.handleIntersect, options);
      observer.observe(cardElement);
    },
    buildThresholdList() {
      const thresholds = [];
      const numSteps = 20;

      for (let i = 1.0; i <= numSteps; i++) {
        const ratio = i / numSteps;
        thresholds.push(ratio);
      }

      thresholds.push(0);
      return thresholds;
    },
    handleIntersect(entries) {
      // observer
      entries.forEach(entry => {
        // if (entry.intersectionRatio > prevRatio) {
        //     entry.target.style.backgroundColor = increasingColor.replace("ratio", entry.intersectionRatio);
        // } 
        entry.target.style.opacity = entry.intersectionRatio;
      });
    }
  },
  mounted() {
    window.addEventListener(
      "load",
      () => {
        // event
        this.playlists.forEach((el, ix) => {
          const cardElement = this.$refs.cards[ix];
          this.createObserver(cardElement);
        });
      },
      false
    );
  }
};
</script>

<style lang="scss" scoped>
.scrolling-wrapper {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;

  transition: 1s all;

  .card {
    flex: 0 0 auto;
  }
}

.scrolling-wrapper {
  width: 70%;
  height: 145px;
  margin-bottom: 20px;
  padding: 5px;
  border: 2px solid black;
  border-radius: 10px;

  padding-left: 5px;
  padding-right: 5px;
  margin-top: 50px;
  margin-left: 15%;
  align-items: center;

  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
}

.card {
  transition: opacity 1s; //, border 1s;
  border: 1px solid gray;
  width: 150px;
  height: auto;
  background: transparent;

  margin-left: 5px;
  margin-right: 5px;
  border-radius: 10px;
  box-shadow: 0 1px 2px 0 rgba(32, 32, 32, 0.6);
}

.card img {
  width: 100%;
  height: 130px;
  border-radius: 5px;
}

.scrolling-wrapper div:last-child {
  visibility: hidden;
  width: 5px;
  height: 70px;
  margin-left: 5px;
}
.scrolling-wrapper div:last-child::after {
  content: "0";
  width: 5px;
}
</style>