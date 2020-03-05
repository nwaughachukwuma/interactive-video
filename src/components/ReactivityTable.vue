<template>
    <div 
        class="reactivity-table-container" 
        :class="computeClass"
        style="animation-delay: 0.5s animation-duration: 2s"
        v-if="userClicks.length"
    >
        <table id="reactivity-table">
            <tr>
                <th>Time(s)</th>
                 <th>Hot Spot</th>
            </tr>
            <tr v-for="(click, ix) in userClicks" :key="ix">
                <td>{{click.currentTime}}</td>
                <td>{{click.offsetX}} X {{click.offsetY}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    name: 'ReactivityTable',
    props: {
        userClicks: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            computeClass: {
                "animated": true,
                "rubberBand": true,
                "pulse": false
            }
        }
    },
    watch: {
        userClicks: {
            handler(val, oldVal) {
                if (oldVal.length) {
                    this.computeClass = {
                        "animated": true,
                        "rubberBand": false,
                        "pulse": false
                    }
                    setTimeout(() => {
                        this.computeClass = {
                            "animated": true,
                            "rubberBand": false,
                            "pulse": true
                        }
                        
                        this.$$forceUpdate
                    }, 250)
                }
            },
            immediate: false
        }
    }
}
</script>

<style lang="scss" scoped>
.reactivity-table-container {
    max-height: 355px;
    overflow-y: scroll;
    width: 23%;
    position: fixed;
    top: 60px;
    left: 5px;
}

@media screen and (max-width: 1024px){
    .reactivity-table-container {
        width: 17.5%;
    }
}

@media screen and (max-width: 990px){
    .reactivity-table-container {
        width: 90%;
        margin-left: 7.5%;
        margin-bottom: 10px;
        position: relative;
        top: 0;
        margin-top: 50px;
    }
}

#reactivity-table {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 94%;
}

#reactivity-table td, #reactivity-table th {
  border: 1px solid #ddd;
  padding: 5px;
}

#reactivity-table tr:nth-child(even){background-color: #f2f2f2;}

#reactivity-table tr:hover {background-color: #ddd;}

#reactivity-table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: #333;
  color: white;
}
</style>