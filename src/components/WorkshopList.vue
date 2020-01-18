<template>
    <div>
        <h2 class="display-3 mb-5">{{title}}</h2>
        <v-row>
            <v-col v-for="workshop in workshops" cols="12" sm="6" md="4" lg="3" :key="workshop.offeredWorkshop.id">
                <WorkshopCard :workshop="workshop.offeredWorkshop" :manager="workshop.workshopManagerName"/>
            </v-col>
        </v-row>
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