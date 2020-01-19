<template>

    <!--    TODO add paralex image-->
    <div v-if="!this.loading">
        <WorkshopDetailInfo :offered-workshop="offeredWorkshop" :count="count" :manager="manager" :w-manager="isManager"
                            :prerequsite="prereq"/>


        <!--        <v-btn color="primary">-->
        <!--            go to chatroom-->
        <!--        </v-btn>-->
        <!--        <WorkshopChat/>-->

        <v-container v-if="isManager">
            <GroupGraderAtendee v-if="groups.length > 0" :groups="groups"/>
            <div v-if="passed">

            </div>
            <div v-else-if="isHolding">
                <!--chat for participants and graders of this -->
            </div>

            <div v-else-if="notStarted">
                <!--pending requests-->
            </div>
        </v-container>

        <v-container v-else-if="isGrader">
            <GroupTable v-if="graderGroup != null" :group="graderGroup"/>
            <div v-if="passed">

            </div>
            <div v-else-if="isHolding">
                <!--chat for participants and graders of this -->
            </div>

            <div v-else-if="notStarted">
                <!--request status-->
            </div>
        </v-container>

        <v-container v-else-if="isAttendee">
            <GroupTable v-if="attendeeGroup != null" :group="attendeeGroup"/>
            <div v-if="passed">

            </div>
            <div v-else-if="isHolding">
                <!--                chat for participants and graders of this -->
            </div>

            <div v-else-if="notStarted">
                <!--request status-->
            </div>
        </v-container>

        <v-container v-else>
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
    import GroupGraderAtendee from "../components/GroupGraderAtendee";
    import GroupTable from "../components/GroupTable";
    // import WorkshopChat from "../components/WorkshopChat";

    export default {
        name: "WorkshopDetail",
        components: {GroupTable, GroupGraderAtendee, WorkshopDetailInfo},
        props: ["wId", "wManager"],
        data() {
            return {
                offeredWorkshop: {},
                attList: [],
                gradList: [],
                manager: {},
                groups: [],
                count: 0,
                user: null,
                prereq: [],
                loading: true
            }
        },
        computed: {
            graderGroup: function () {
                return this.groups;
            },
            attendeeGroup: function () {
                this.groups.forEach((group) => {
                    group.attenders.forEach((attender) => {
                        if (attender.id === this.user.id) {
                            return group;
                        }
                    })
                });
                return null;
            },
            passed: function () {
                let end = new Date(this.offeredWorkshop.endTime);
                let dnow = new Date();
                return end.valueOf() < dnow.valueOf();

            },
            isHolding: function () {
                let start = new Date(this.offeredWorkshop.startTime);
                let end = new Date(this.offeredWorkshop.endTime);
                let dnow = new Date();
                return dnow.valueOf() < end.valueOf() && dnow.valueOf() > start.valueOf();

            },
            notStarted: function () {
                let start = new Date(this.offeredWorkshop.startTime);
                let dnow = new Date();
                return start.valueOf() > dnow.valueOf();
            },
            isGrader: function () {
                if(!this.$store.getters.isLoggedIn){
                    return false;
                }
                let state = false;
                this.gradList.forEach((grader) => {
                    if (grader.id === this.user.id) {
                        state = true;
                    }
                });
                return state;
            },
            isAttendee: function () {
                if(!this.$store.getters.isLoggedIn){
                    return false;
                }
                let state = false;
                this.attList.forEach((att) => {
                    if (att.id === this.user.id) {
                        state = true;
                    }
                });
                return state;
            },
            isManager: function () {
                if(!this.$store.getters.isLoggedIn){
                    return false;
                }
                return this.manager.id === this.user.id;
            }
        },
        mounted() {

            axios.all([this.getOfferedWorkshop(), this.getCount()]).then((r) => {
                this.offeredWorkshop = r[0].data.offeredWorkshop;
                this.manager = r[0].data.workshopManagerUser;
                this.attList = r[0].data.attendeeUsers;
                this.gradList = r[0].data.graderUsers;
                this.prereq = r[0].data.preRequisites;

                this.count = r[1].data.count;

                if (this.$store.getters.isLoggedIn) {
                    this.getUser().then((res) => {
                        this.user = res.data
                        if (this.isManager) {
                            this.getManagerGroups().then((res) => {
                                this.groups = res.data;
                                this.loading = false;

                            });
                        } else if (this.isGrader) {

                            this.getGraderGroup().then((res) => {
                                this.groups = res.data;
                                this.loading = false;

                            });

                        } else if (this.isAttendee) {
                            this.getAttendeeGroup().then((res) => {
                                this.groups = res.data;
                                this.loading = false;
                            });
                        }
                    })
                } else {
                    this.loading = false;
                }
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
            },
            getManagerGroups() {
                return axios.get(this.$store.state.api + "/workshopManagers/offeringWorkshop/" + this.wId + "/groupDetails");
            },
            getGraderGroup() {
                return axios.get(this.$store.state.api + "/workshopGrader/offeringWorkshop/" + this.wId + "/groupDetails");
            },
            getAttendeeGroup() {
                return null;
            }

        }

    }
</script>

<style scoped>

</style>