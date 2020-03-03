<template>
    <div class="player">
        <video id="video-container" :controls="options.controls" :autoplay="options.autoplay">
            <source :src="options.sources[0].src"  :type="options.sources[0].type">
        </video>
        <div class="video-controls">
            <!-- <div class="play-container">
                <button class="play" data-icon="P" aria-label="play pause toggle">
                    <i class="fa fa-play fa-2x"></i>
                </button>
            </div> -->
            <button class="play" data-icon="P" aria-label="play pause toggle">
                <i class="fa fa-play"></i>
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
            player: null
        }
    }
}
</script>