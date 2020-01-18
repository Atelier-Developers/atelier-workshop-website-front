<template>
    <v-card
            class="mx-auto"
            color="grey lighten-4"
            max-width="500"
            hover
            @click="navigateToWorkshop"
            style="position: relative"
    >
        <v-img
                :aspect-ratio="16/9"
                src="https://i.udemycdn.com/course/240x135/625204_436a_2.jpg"
        />
        <v-card-text
                class="pt-6"
        >
            <div class="font-weight-light grey--text body-1 mb-2">{{workshop.workshop.name}}</div>
            <h3 class="headline font-weight-regular blue--text mb-2">{{workshop.name}}</h3>
            <div class="font-weight-light title mb-2">
                <!--                   {{workshop.workshopManger.name}}-->
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
        props: ["workshop"],
        methods: {
            navigateToWorkshop() {
                return this.$router.push({ path: `/workshop/${this.workshop.id}`});
            }
        },
        computed: {
            startTime: function () {
                return moment(this.workshop.startTime).format("lll");
            },
            endTime: function () {
                return moment(this.workshop.endTime).format("lll")
            }
        }
    }
</script>

<style scoped>
    .v-card--reveal {
        align-items: center;
        bottom: 0;
        justify-content: center;
        opacity: .5;
        position: absolute;
        width: 100%;
    }
</style>
