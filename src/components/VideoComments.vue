<template>
    <!-- another approach is to use WebVTT to create subtitles for the video track -->
    <!-- https://w3c.github.io/webvtt/ -->
    <b-container fluid class="video-comments-wrapper">
        <!-- sub-title="Video Comment" -->
        <b-card
            style="max-width: 60%; left: 20%;"
            class="mb-1 text-center animated fadeInUp duration-3s"
            v-if="!isEmpty(commentPlaceHolder)"
            bg-variant="dark" 
            header="💬" 
            header-tag="small"
            text-variant="white"
        >
            <b-card-text class="text-primary">
                {{commentPlaceHolder.text}}
            </b-card-text>
            <!-- <b-button href="#" variant="primary">Go somewhere</b-button> -->
        </b-card>
    </b-container>
</template>

<script>
export default {
    props: {
        comment: {
            type: Object,
            default() {
                return {

                }
            }
        },
        media: {
            type: Number
        }
    },
    data() {
        return {
            commentPlaceHolder: {}
        }
    },
    methods: {
        isEmpty(obj) {
            if (obj == null) return true
            return Object.keys(obj).length < 1
        }
    },
    watch: {
        comment: {
            handler(val) {
                if (!this.isEmpty(val)) {
                    this.commentPlaceHolder = val;
                }
            },
            immediate: false
        },
        media: {
            handler(val) {
                const cph = this.commentPlaceHolder
                if (val && !this.isEmpty(cph) && val - cph.time >= 3) {
                    this.commentPlaceHolder = {}
                }
                if (val === 0) {
                    this.commentPlaceHolder = {}
                }
            },
            immediate: true
        },
    }
}
</script>

<style lang="scss" scoped>
    .video-comments-wrapper {
        position: absolute;
        // color: white;
        left: 0;
        top: 40%;
        text-align: center;
        font-size: 18px;
        z-index: 1;
    }
</style>