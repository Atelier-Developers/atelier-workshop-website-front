<template>

    <!--    TODO add paralex image-->
    <div v-if="!this.loading">
        <WorkshopDetailInfo :offered-workshop="offeredWorkshop" :count="count" :manager="manager" :w-manager="isManager"
                            :prerequsite="prereq"/>

        <v-container v-if="!passed ">
            <v-btn color="primary">
                register now!
            </v-btn>
        </v-container>
    </div>
<!--    <v-progress-circular v-else-->
<!--            :size="50"-->
<!--            color="primary"-->
<!--            indeterminate-->
<!--    />-->
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
                attList: [],
                gradList: [],
                manager: {},
                count: 0,
                user: {},
                prereq: [],
                loading: true
            }
        },
        computed: {
            passed: function () {
                let d = new Date(this.offeredWorkshop.startTime);
                let dnow = new Date();
                if (d.valueOf() < dnow.valueOf()) {
                    return true
                }
                return false;
            },
            isGrader: function () {
                this.gradList.forEach((grader) => {
                    if (grader.id === this.user.id) {
                        return true;
                    }
                });
                return false;
            },
            isAttendee: function () {
                this.attList.forEach((att) => {
                    if (att.id === this.user.id) {
                        return true;
                    }
                });
                return false;
            },
            isManager: function () {
                // eslint-disable-next-line no-console
                console.log("manager");
                // eslint-disable-next-line no-console
                console.log(this.manager)
                // eslint-disable-next-line no-console
                console.log("user");
                // eslint-disable-next-line no-console
                console.log(this.user)
                return this.manager.id === this.user.id;
            }
        },
        mounted() {

            axios.all([this.getOfferedWorkshop(), this.getCount(), this.getUser()]).then((r) => {
                this.offeredWorkshop = r[0].data.offeredWorkshop;
                this.manager = r[0].data.workshopManagerUser;
                this.attList = r[0].data.attendeeUsers;
                this.gradList =  r[0].data.graderUsers;
                this.prereq = r[0].data.preRequisites;

                this.count = r[1].data.count;

                this.user = r[2].data;
                this.loading = false;
            })

        },
        methods: {
            getOfferedWorkshop() {
                return axios.get(this.$store.state.api + "/workshop/offeringWorkshops/" + this.wId)
            },
            getCount() {
                return axios.get(this.$store.state.api + "/workshop/workshops/offeredWorkshop/" + this.wId + "/count");
            },
            getUser() {
                return axios.get(this.$store.state.api + "/users/user");
            }

        }

    }
</script>

<style scoped>

</style>