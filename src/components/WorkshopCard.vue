<template>
    <v-card
            class="mx-auto"
            color="grey lighten-4"
            max-width="500"
            ripple
            hover
            @click="navigateToWorkshop"
            style="position: relative"
    >
        <v-img
                :aspect-ratio="16/9"
                src="https://library.kissclipart.com/20181005/xwq/kissclipart-java-core-clipart-java-platform-enterprise-editio-79b63cdfe5ed19c5.jpg"
        />
        <v-card-text
                class="pt-6"
        >
            <div class="font-weight-light grey--text body-1 mb-2 text-capitalize">{{workshop.workshop.name}}</div>
            <h3 class="headline font-weight-regular blue--text mb-2 text-capitalize">{{workshop.name}}</h3>
            <div class="font-weight-light title mb-2 text-capitalize">
                {{manager}}
            </div>
            <div class="font-weight-regular body-1 mb-2">
                {{workshop.description}}
            </div>
            <div class="font-weight-light subtitle-2 mb-2">
                <v-icon>mdi-clock-in</v-icon>
                {{startTime}}
            </div>
            <div class="font-weight-light subtitle-2 mb-7">
                <v-icon>mdi-clock-out</v-icon>
                {{endTime}}
            </div>

            <div class="font-weight-bold title mb-2" style="position: absolute; bottom: 5px; right: 10px">
                ${{workshop.price}}
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
    import moment from "moment"

    export default {
        name: "WorkshopCard",
        props: ["workshop", "manager"],
        methods: {
            navigateToWorkshop() {
                return this.$router.push({path: `/workshop/${this.workshop.id}`});
            }
        },
        computed: {
            startTime: function () {
                return moment(this.workshop.startTime).format("lll");
            },
            endTime: function () {
                return moment(this.workshop.endTime).format("lll")
            },

        }
    }
</script>

<style scoped>
</style>
