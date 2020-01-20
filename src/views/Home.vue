<template>
    <div>
        <v-parallax
                dark
                height="500"
                src="../assets/imageonline-co-darkenimage.png"
        >
            <v-row
                    align="center"
                    justify="center"
            >
                <v-col class="text-center" cols="12">
                    <h1 class="display-4 mb-4">Atelier</h1>
                    <h4 class="font-weight-light font-italic display-1 text-capitalize">craft and expound thy art</h4>
                </v-col>
            </v-row>
        </v-parallax>
        <v-container>
            <workshop-list :workshops="workshops" title="Offered Workshops"/>
        </v-container>
    </div>

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
            axios.get(this.$store.state.api + "/workshop/offeringWorkshops").then((res) => {
                this.workshops = res.data;
            })
        }
    }
</script>

<style scoped>

</style>
