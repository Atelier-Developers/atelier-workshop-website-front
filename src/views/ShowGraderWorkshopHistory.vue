<template>
    <v-container v-if="!loading">
        <WorkshopList :workshops="attendingList" title="Ongoing Workshops"/>
        <WorkshopList :workshops="soonList" title="Upcoming Workshops"/>
        <WorkshopList :workshops="attendedList" title="Recent Workshops"/>
    </v-container>
</template>

<script>
    import WorkshopList from "../components/WorkshopList";
    import axios from "axios"

    export default {
        name: "ShowWorkshopHistory",
        components: {WorkshopList}
        ,
        data() {
            return {
                attendedList: [],
                attendingList: [],
                soonList: [],
                loading: true
            }
        },
        methods: {
            isHolding: function (offeredWorkshop) {
                let start = new Date(offeredWorkshop.startTime);
                let end = new Date(offeredWorkshop.endTime);
                let dnow = new Date();
                return dnow.valueOf() < end.valueOf() && dnow.valueOf() > start.valueOf();

            },
            notStarted: function (offeredWorkshop) {
                let start = new Date(offeredWorkshop.startTime);
                let dnow = new Date();
                return start.valueOf() > dnow.valueOf();
            },
            passed: function (offeredWorkshop) {
                let end = new Date(offeredWorkshop.endTime);
                let dnow = new Date();
                return end.valueOf() < dnow.valueOf();

            },
        },
        mounted() {
            axios.get(this.$store.state.api + "/graders/grader/workshops").then((res) => {
                if (res.status === 204) {
                    this.loading = false
                    return;
                }
                let workshops = res.data;
                workshops.forEach((workshop) => {
                    if (this.isHolding(workshop.offeredWorkshop)) {
                        this.attendingList.push(workshop);
                    } else if (this.notStarted(workshop.offeredWorkshop)) {
                        this.soonList.push(workshop);
                    } else if (this.passed(workshop.offeredWorkshop)) {
                        this.attendedList.push(workshop);
                    }
                });
                this.loading = false
            });
        }
    }
</script>

<style scoped>

</style>