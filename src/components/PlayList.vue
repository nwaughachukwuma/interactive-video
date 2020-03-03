<template>
  <div class="scrolling-wrapper">
    <div class="card" v-for="(movie, ix) in playlists" :key="ix">
        <img :src="movie.src" alt="" >
    </div>
    <!-- <div class="card">
      <h2>Card1</h2>
    </div>
    <div class="card">
      <h2>Cardx</h2>
    </div> -->
  </div>
</template>

<script>
export default {
    name: 'PlayList',
    data() {
        return{
            playlists: [
                {
                    src: require('../assets/img/movie-posters/img1.jpeg')
                },
                {
                    src: require('../assets/img/movie-posters/img2.jpeg')
                },
                {
                    src: require('../assets/img/movie-posters/img3.jpeg')
                },
                {
                    src: require('../assets/img/movie-posters/img4.jpeg')
                },
                {
                    src: require('../assets/img/movie-posters/img5.jpeg')
                },
                {
                    src: require('../assets/img/movie-posters/img6.jpeg')
                },
                {
                    src: require('../assets/img/movie-posters/img7.jpeg')
                },
                {
                    src: require('../assets/img/movie-posters/img8.jpeg')
                },
                {
                    src: require('../assets/img/movie-posters/img9.jpeg')
                },
                {
                    src: require('../assets/img/movie-posters/img10.jpeg')
                },
                {
                    src: require('../assets/img/movie-posters/img11.jpeg')
                },
                {
                    src: require('../assets/img/movie-posters/img12.jpeg')
                }
            ]
        }
    },
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
  height: 145px;
  margin-bottom: 20px;
  width: 70%;
  padding: 5px;

  border: 2px solid black;
  border-radius: 10px;

  padding-left: 5px;
  padding-right: 10px;
  margin-top: 50px;
  margin-left: 15%;

  align-items: center;

  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
}

.card {
//   opacity: 0;
  border: 1px solid gray;
  width: 150px;
  height: auto;
  background: transparent;

  margin-left: 5px;
  margin-right: 5px;
  border-radius: 10px;
  box-shadow: 0 1px 2px 0 rgba(32, 32, 32, 0.6);
}

.card:focus {
    opacity: 1
}

.card:last-child {
  margin-right: 15px;
}

.card img {
    width: 100%; 
    height: 130px;
    border-radius: 5px;
}
</style>