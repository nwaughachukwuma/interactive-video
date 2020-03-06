<template>
    <b-container fluid class="video-comments-wrapper">
        <b-card
            sub-title="Card Title"
            style="max-width: 80%; left: 10%;"
            class="mb-1"
        >
            <b-card-text>
                {{comment.text}}
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
                    text: 'Lorem ipsum dolor simet',
                    time: 0,
                    mediaTime: '00:00'
                }
            }
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