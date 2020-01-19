<template>
    <div>
        <h2 class="display-2 mb-5 font-italic font-weight-bold">{{title}}</h2>
        <template v-if="workshops.length > 0">
            <v-row>
                <v-col v-for="workshop in workshops" cols="12" sm="6" md="4" lg="3" :key="workshop.offeredWorkshop.id">
                    <WorkshopCard :workshop="workshop.offeredWorkshop" :manager="workshop.workshopManagerName"/>
                </v-col>
            </v-row>
        </template>
        <template v-else>
            <p>Nothing to show!</p>
        </template>
    </div>
</template>

<script>
    import WorkshopCard from "./WorkshopCard";

    export default {
        name: "WorkshopList",
        components: {WorkshopCard},
        props: ["workshops", "title"]
    }
</script>

<style scoped>

</style>