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
            <workshop-list :workshops="popularWorkshops" title="Popular Workshops"/>
            <workshop-list :workshops="workshopOfDay" title="Workshop of Day"/>
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
                workshops: [],
                popularWorkshops: [],
                workshopOfDay: [],
                isLoading: true,
            }
        },
        methods: {
            getOfferingWorkshops() {
                return axios.get(this.$store.state.api + "/workshop/offeringWorkshops");
            },
            getPopularWorkshop() {
                return axios.get(this.$store.state.api + "/workshop/offeringWorkshops/popular");
            }
        },
        mounted() {
            axios.all([this.getOfferingWorkshops(), this.getPopularWorkshop()])
                .then((res) => {
                    // eslint-disable-next-line no-console
                    console.log(res);
                    this.workshops = res[0].data;
                    this.popularWorkshops = res[1].data;
                    this.workshopOfDay = [this.popularWorkshops[Math.floor(Math.random() * 5)]];
                    this.isLoading = false;
                })

        }
    }
</script>

<style scoped>

</style>
