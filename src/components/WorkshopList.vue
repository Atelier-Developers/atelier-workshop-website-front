<template>
    <div>
        <h2 class="display-3 grey--text text--darken-2 text-center my-10">{{title}}</h2>
        <template v-if="workshops.length > 0">
            <v-row>
                <v-col v-for="workshop in workshops" cols="12" sm="6" md="4" lg="3" :key="workshop.offeredWorkshop.id">
                    <WorkshopCard :workshop="workshop.offeredWorkshop" :manager="workshop.workshopManagerName"/>
                </v-col>
            </v-row>
        </template>
        <template v-else>
            <EmptyState icon="fa-box-open" title="no offered workshop"/>
        </template>
    </div>
</template>

<script>
    import WorkshopCard from "./WorkshopCard";
    import EmptyState from "./EmptyState";

    export default {
        name: "WorkshopList",
        components: {EmptyState, WorkshopCard},
        props: ["workshops", "title"]
    }
</script>

<style scoped>

</style>