<template>

    <!--    TODO add paralex image-->
    <!--    TODO add upload file-->
    <!--    TODO add payment-->
    <!--    TODO add register-->
    <!--    TODO certificate-->

    <div v-if="!this.loading">
        <template>
            <v-img src="../assets/maranda-vandergriff-7aakZdIl4vg-unsplash.jpg" height="350"/>
            <WorkshopDetailInfo :offered-workshop="offeredWorkshop" :count="count" :manager="manager"
                                :w-manager="isManager"
                                :prerequsite="prereq"/>

            <!--        <v-btn color="primary">-->
            <!--            go to chatroom-->
            <!--        </v-btn>-->
            <!--        <WorkshopChat/>-->

            <v-container v-if="isManager">
                <GroupGraderAtendee v-if="groups.length > 0" :groups="groups" :isManager="true"/>
                <div class="my-5">
                    <p class="display-3 grey--text text--darken-2">Make Form</p>
                    <div v-if="passed" class="text-center">
                        <v-btn color="primary" class="ma-2" small>grader evaluation form</v-btn>
                    </div>
                    <div v-else-if="isHolding" class="text-center">
                        <v-btn color="primary" class="ma-2" small>workshop forms</v-btn>
                        <v-btn color="primary" class="ma-2" small>grader evaluation form</v-btn>
                        <!--TODO chat for participants and graders of this -->
                    </div>

                    <div v-else-if="notStarted" class="text-center">
                        <v-btn color="primary" class="ma-2" small>grader request forms</v-btn>
                        <v-btn color="primary" class="ma-2" small>attendee register form</v-btn>
                        <v-btn color="primary" class="ma-2" small>grader evaluation form</v-btn>
                        <v-btn color="primary" class="ma-2" small>workshop forms</v-btn>
                        <!-- TODO pending requests-->
                    </div>
                </div>
                <div class="my-5">
                    <p class="display-3 grey--text text--darken-2">Show Forms</p>
                    <div class="text-center mt-5">

                        <v-btn color="primary" :disabled="this.offeredWorkshop.graderEvaluationForm === null"
                               class="ma-2" small
                               @click="() => routeToForm(this.offeredWorkshop.graderEvaluationForm.id,false, 'manager')">
                            grader
                            evaluation
                            forms
                        </v-btn>
                        <v-btn color="primary" :disabled="this.attReqForm === null"
                               class="ma-2"
                               small
                               @click="() => routeToForm(this.attReqForm.id,false, 'manager')">attendee register forms
                        </v-btn>
                        <v-btn color="primary" :disabled="this.graderReqForm === null"
                               class="ma-2" small
                               @click="() => routeToForm(this.graderReqForm.id,false, 'manager')">grader register forms
                        </v-btn>
                        <v-btn color="primary"
                               :disabled="this.offeredWorkshop.workshopForms.length === 0"
                               class="ma-2" small
                               @click="() => routeToWorkshopForm(false, 'manager')"
                        >workshop forms
                        </v-btn>
                    </div>
                </div>

            </v-container>

            <v-container v-else-if="isGrader">
                <GroupTable v-if="graderGroup != null" :group="graderGroup"/>
                <div class="my-5">
                    <p class="display-3 grey--text text--darken-2" v-if="isHolding || passed">Show Forms</p>
                    <div class="text-center">
                        <div v-if="passed">
                            <v-btn color="primary"
                                   class="ma-2" small
                                   :disabled="this.offeredWorkshop.workshopForms.length === 0"
                                   @click="() => routeToWorkshopForm(true, 'grader')"
                            >workshop forms
                            </v-btn>

                        </div>
                        <div v-else-if="isHolding">
                            <!--chat for participants and graders of this -->
                            <v-btn color="primary"
                                   class="ma-2" small
                                   :disabled="this.offeredWorkshop.workshopForms.length === 0"
                                   @click="() => routeToWorkshopForm(true, 'grader')"
                            >workshop forms
                            </v-btn>

                        </div>

                        <div v-else-if="notStarted">
                            <!--request status-->
                        </div>
                    </div>
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
                <div v-if="this.$store.getters.isLoggedIn" class="text-center">
                    <v-btn color="primary" :disabled="this.attReqForm !== null"
                           class="ma-2"
                           @click="() => routeToForm(this.attReqForm.id,true, 'att')">register now!
                    </v-btn>
                    <v-btn color="primary" :disabled="this.graderReqForm !== null"
                           class="ma-2"
                           @click="() => routeToForm(this.graderReqForm.id,true, 'grader')">Request as a grader
                    </v-btn>
                </div>
                <div v-else>
                    <div v-if="this.notStarted" class="text-center">
                        <v-btn color="primary" to="/login" class="ma-2">register now!
                        </v-btn>
                        <v-btn color="primary" to="/login" class="ma-2">Request as a grader
                        </v-btn>
                    </div>
                </div>

            </v-container>
        </template>
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
        props: ["wId"],
        data() {
            return {
                form: {},
                offeredWorkshop: {},
                answerType: "",
                attList: [],
                gradList: [],
                manager: {},
                groups: [],
                count: 0,
                graderReqForm: null,
                attReqForm: null,
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
                return this.groups;
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
                if (!this.$store.getters.isLoggedIn) {
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
                if (!this.$store.getters.isLoggedIn) {
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
                if (!this.$store.getters.isLoggedIn) {
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
                        this.user = res.data;
                        if (this.isManager) {
                            this.getManagerGroups().then((res) => {
                                this.groups = res.data;
                                this.loading = false;
                                axios.all([this.getAttReqForm(), this.getGraderReqForm()]).then((res) => {
                                    if (res[0].status !== 204) {
                                        this.attReqForm = res[0].data;
                                    }
                                    if (res[1].status !== 204) {
                                        this.graderReqForm = res[1].data;
                                    }
                                })
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
                        } else {
                            this.loading = false;
                        }
                    })
                } else {
                    this.loading = false;
                }
            })

        },
        methods: {
            routeToWorkshopForm(isAnswer1, type) {
                this.$router.push({
                    name: 'workshopForms', params: {
                        forms: this.offeredWorkshop.workshopForms,
                        isAnswer: isAnswer1,
                        type: type,
                    }
                })
            },
            routeToForm(id, isAnswer1, type1, appid) {
                this.$router.push({
                    name: 'workshopForm', params: {
                        formId: id,
                        isAnswer: isAnswer1,
                        type: type1,
                        appId: appid
                    }
                })
            },
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
                return axios.get(this.$store.state.api + "/attendees/offeringWorkshop/" + this.wId + "/groupDetails");
            },
            getAttReqForm() {
                return axios.get(this.$store.state.api + "/workshopManagers/offeringWorkshop/" + this.wId + "/attenderRegisterForm");
            },
            getGraderReqForm() {
                return axios.get(this.$store.state.api + "/workshopManagers/offeringWorkshop/" + this.wId + "/graderRequestForm");

            }

        }

    }
</script>

<style scoped>

</style>