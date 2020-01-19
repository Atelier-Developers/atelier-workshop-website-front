<template>

    <!--    TODO add paralex image-->
    <div v-if="!this.loading">
        <template v-if="!showForms">
            <WorkshopDetailInfo :offered-workshop="offeredWorkshop" :count="count" :manager="manager"
                                :w-manager="isManager"
                                :prerequsite="prereq"/>


            <!--        <v-btn color="primary">-->
            <!--            go to chatroom-->
            <!--        </v-btn>-->
            <!--        <WorkshopChat/>-->

            <v-container v-if="isManager">
                <GroupGraderAtendee v-if="groups.length > 0" :groups="groups"/>
                <div v-if="passed">
                    <v-btn color="primary">Make grader evaluation form</v-btn>
                </div>
                <div v-else-if="isHolding">
                    <v-btn color="primary">Make workshop forms</v-btn>
                    <v-btn color="primary">Make grader evaluation form</v-btn>
                    <!--chat for participants and graders of this -->
                </div>

                <div v-else-if="notStarted">
                    <v-btn color="primary">Make grader request forms</v-btn>
                    <v-btn color="primary">Make attendee register form</v-btn>
                    <v-btn color="primary">Make grader evaluation form</v-btn>
                    <v-btn color="primary">Make workshop forms</v-btn>
                    <!--pending requests-->
                </div>
                <!--            TODO  check {}-->
                <v-btn color="primary" :disabled="this.offeredWorkshop.graderEvaluationForm === null"
                       @click="() => setFromClick(offeredWorkshop.graderEvaluationForm, false, 'manager')">show grader
                    evaluation
                    forms
                </v-btn>
                <v-btn color="primary" :disabled="this.attReqForm === null"
                       @click="() => setFromClick(attReqForm, false)">show attendee register forms
                </v-btn>
                <v-btn color="primary" :disabled="this.graderReqForm === null"
                       @click="() => setFromClick(graderReqForm, false)">show grader register forms
                </v-btn>
                <v-btn color="primary" :disabled="this.offeredWorkshop.workshopForms.length === 0">show workshop forms
                </v-btn>

            </v-container>

            <v-container v-else-if="isGrader">
                <GroupTable v-if="graderGroup != null" :group="graderGroup"/>
                <div v-if="passed">
                    <v-btn color="primary" :disabled="this.offeredWorkshop.workshopForms.length === 0">show workshop
                        forms
                    </v-btn>

                </div>
                <div v-else-if="isHolding">
                    <!--chat for participants and graders of this -->
                    <v-btn color="primary" :disabled="this.offeredWorkshop.workshopForms.length === 0">show workshop
                        forms
                    </v-btn>

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
                <v-btn color="primary" :disabled="this.attReqForm !== null"
                       @click="() => setFromClick(attReqForm, true, 'att')">register now!
                </v-btn>
                <v-btn color="primary" :disabled="this.graderReqForm !== null"
                       @click="() => setFromClick(graderReqForm, true, 'grader')">Request as a grader
                </v-btn>
            </v-container>
        </template>
        <template v-else>
            <Form :form="form" :is-answer="isAnswer"/>
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
    import Form from "./Form";
    // import WorkshopChat from "../components/WorkshopChat";

    export default {
        name: "WorkshopDetail",
        components: {Form, GroupTable, GroupGraderAtendee, WorkshopDetailInfo},
        props: ["wId"],
        data() {
            return {
                form: {},
                showForms: false,
                appId: null,
                showWorkshopForms: false,
                isAnswer: false,
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
                // eslint-disable-next-line no-console
                console.log(this.offeredWorkshop);
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
                    axios.all([this.getAttReqForm(), this.getGraderReqForm()]).then((res) => {
                        if (res[0].status !== 204) {
                            this.attReqForm = res[0].data;
                        }
                        if (res[1].status !== 204) {
                            this.graderReqForm = res[1].data;
                        }
                        this.loading = false;
                    })

                }
            })

        },
        methods: {
            setF(id) {
                this.appId = id;
                this.showForms = true;
                this.isAnswer = true;
                this.type = 'manager'
            },
            setFromClick(formW, answer, type) {
                this.form = formW;
                this.showForms = true;
                this.isAnswer = answer;
                this.answerType = type;
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