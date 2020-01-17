<template>
    <div>
        <h2 class="display-3 mb-5">{{title}}</h2>
        <v-row>
            <v-col v-for="i in 20" cols="12" sm="6" md="4" lg="3" xl="2" :key="i">
                <WorkshopCard :workshop="workshops[0]"/>
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