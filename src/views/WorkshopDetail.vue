<template>

    <!--    TODO add paralex image-->
    <div>
        <WorkshopDetailInfo :offered-workshop="offeredWorkshop" :count="count" :manager="manager"/>
    </div>
</template>

<script>
    import axios from "axios";
    import WorkshopDetailInfo from "../components/WorkshopDetailInfo";

    export default {
        name: "WorkshopDetail",
        components: {WorkshopDetailInfo},
        props: ["wId", "wManager"],
        data() {
            return {
                offeredWorkshop: {},
                manager: "",
                count: 0,
            }
        },
        mounted() {
            axios.get(this.$store.state.api + "/workshop/offeringWorkshops/" + this.wId).then((res) => {
                // eslint-disable-next-line no-console
                console.log(res.data);
                this.offeredWorkshop = res.data.offeredWorkshop;
                this.manager = res.data.workshopManagerName;
            })

            axios.get(this.$store.state.api + "/workshop/workshops/offeredWorkshop/" + this.wId + "/count").then((res) => {
                // eslint-disable-next-line no-console
                console.log(res);
                this.count = res.data.count;
            })
        },

    }
</script>

<style scoped>

</style>