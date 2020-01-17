<template>
    <v-container>
       <v-row>
           <v-col v-for="i in 20" cols="12" md="6" lg="4" v-bind:key="i">
               <WorkshopCard/>
           </v-col>
       </v-row>
    </v-container>
</template>

<script>
    import WorkshopCard from "../components/WorkshopCard";
    export default {
        name: "Dashboard",
        components: {WorkshopCard}
    }
</script>

<style scoped>

</style>
