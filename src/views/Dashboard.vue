<template>
    <v-container>
       <v-row>
           <v-col cols="4">
               <WorkshopCard/>
           </v-col>
           <v-col cols="4">
               <WorkshopCard/>
           </v-col>
           <v-col cols="4">
               <WorkshopCard/>
           </v-col>
           <v-col cols="4">
               <WorkshopCard/>
           </v-col>
           <v-col cols="4">
               <WorkshopCard/>
           </v-col>
           <v-col cols="4">
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