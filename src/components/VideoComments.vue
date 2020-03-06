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
                    setTimeout(() => {
                        this.commentPlaceHolder = {}
                    }, 3000)
                }
            },
            immediate: false
        }
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