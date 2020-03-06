<template>
    <b-container fluid class="video-comments-wrapper">
        <b-card
            sub-title="Video Comment"
            style="max-width: 80%; left: 10%;"
            class="mb-1 animated fadeInUp duration-3s"
            v-if="!isEmpty(commentPlaceHolder)"
        >
            <b-card-text>
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