<template>
    <v-container>
        <workshop-list :workshops="workshops" title="Offered Workshops"/>
    </v-container>
</template>

<script>
    import axios from "axios"
    import WorkshopList from "../components/WorkshopList";

    export default {
        name: "Home",
        components: {WorkshopList},
        data() {
            return {
                workshops: []
            }
        },
        mounted() {
            axios.get(this.$store.state.api + "/workshop/offeringWorkshop").then((res) => {
                // eslint-disable-next-line no-console
                console.log(res.data);
                this.workshops = res.data;
            })
        }
    }
</script>

<style scoped>

</style>
