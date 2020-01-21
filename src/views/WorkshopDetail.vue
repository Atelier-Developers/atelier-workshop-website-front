<template>

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
                <v-row>
                    <v-btn color="primary"
                           @click="this.$router.push({name: 'Workshop Requests',params: {id:this.wId}})"></v-btn>
                </v-row>
                <GroupGraderAtendee
                        v-if="groups.length > 0"
                        :groups="groups"
                        :isManager="true"
                        :action-function-grader="(id) => routeToForm(this.offeredWorkshop.graderEvaluationForm.id, true, 'manager', id, false)"
                        :action-function-grader2="(id) => routeToForm(this.offeredWorkshop.graderEvaluationForm.id, false, 'manager', id, true)"
                        :action-function-attendee="(id) => routeToWorkshopForm(false, null, id)"
                />
                <div class="my-5">
                    <p class="display-3 grey--text text--darken-2 text-center my-10">Make Form</p>
                    <div v-if="passed" class="text-center">
                        <v-btn color="primary" class="ma-2" small
                               @click="() => routeToWorkshopCreateForm(true, false, false,false)"
                               :disabled="offeredWorkshop.graderEvaluationForm !== null">grader evaluation form
                        </v-btn>
                    </div>
                    <div v-else-if="isHolding" class="text-center">
                        <v-btn color="primary" class="ma-2" small
                               @click="() => routeToWorkshopCreateForm(false, false, false,true)">workshop forms
                        </v-btn>
                        <v-btn color="primary" class="ma-2" small
                               @click="() => routeToWorkshopCreateForm(true, false, false,false)"
                               :disabled="offeredWorkshop.graderEvaluationForm !== null">grader evaluation form
                        </v-btn>
                        <!--TODO chat for participants and graders of this -->
                    </div>

                    <div v-else-if="notStarted" class="text-center">
                        <v-btn color="primary" class="ma-2" small
                               @click="() => routeToWorkshopCreateForm(false, false, true,false)"
                               :disabled="graderReqForm !== null">grader request forms
                        </v-btn>
                        <v-btn color="primary" class="ma-2" small
                               @click="() => routeToWorkshopCreateForm(false, true, false,false)"
                               :disabled="attReqForm !== null">attendee register form
                        </v-btn>
                        <v-btn color="primary" class="ma-2" small
                               @click="() => routeToWorkshopCreateForm(true, false, false,false)"
                               :disabled="offeredWorkshop.graderEvaluationForm !== null">grader evaluation form
                        </v-btn>
                        <v-btn color="primary" class="ma-2" small
                               @click="() => routeToWorkshopCreateForm(false, false, false,true)">workshop forms
                        </v-btn>
                        <!-- TODO pending requests-->
                    </div>
                </div>
                <div class="my-5">
                    <p class="display-3 grey--text text--darken-2 text-center my-10">Show Forms</p>
                    <div class="text-center mt-5">

                        <v-btn color="primary" :disabled="this.offeredWorkshop.graderEvaluationForm === null"
                               class="ma-2" small
                               @click="() => routeToForm(this.offeredWorkshop.graderEvaluationForm.id,false, 'manager', false)">
                            grader
                            evaluation
                            forms
                        </v-btn>
                        <v-btn color="primary" :disabled="this.attReqForm === null"
                               class="ma-2"
                               small
                               @click="() => routeToForm(this.attReqForm.id,false, 'manager' , false)">attendee register forms
                        </v-btn>
                        <v-btn color="primary" :disabled="this.graderReqForm === null"
                               class="ma-2" small
                               @click="() => routeToForm(this.graderReqForm.id,false, 'manager', false)">grader register forms
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
                <GroupTable
                        v-if="graderGroup != null"
                        :group="graderGroup"
                        :action-function-grader="null"
                        :action-function-attendee="(id) => routeToWorkshopForm(true, 'graderWorkshopForm', id)"
                        :action-function-attendee2="(id) => routeToWorkshopForm(false, 'graderWorkshopForm', id)"
                />
                <div class="my-5">
                    <p class="display-3 grey--text text--darken-2 text-center my-10" v-if="isHolding || passed">Show
                        Forms</p>
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
                <GroupTable
                        v-if="attendeeGroup != null"
                        :group="attendeeGroup"
                        :action-function-grader="null"
                        :action-function-attendee="null"
                />
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
               <template v-if="notStarted">
                   <p class="display-3 grey--text text--darken-2 text-center my-10">Not joined yet?!</p>
                   <div v-if="this.$store.getters.isLoggedIn" class="text-center">
                       <v-btn color="primary" :disabled="this.attReqForm === null"
                              class="ma-2"
                              @click="() => routeToForm(this.attReqForm.id,true, 'att')">register now!
                       </v-btn>
                       <v-btn color="primary" :disabled="this.graderReqForm === null"
                              class="ma-2"
                              @click="() => routeToForm(this.graderReqForm.id,true, 'grader')">Request as a grader
                       </v-btn>
                   </div>
                   <div v-else>
                       <p class="display-3 grey--text text--darken-2 text-center my-10">Not joined yet?!</p>
                       <div v-if="this.notStarted" class="text-center">
                           <v-btn color="primary" to="/login" class="ma-2">register now!
                           </v-btn>
                           <v-btn color="primary" to="/login" class="ma-2">Request as a grader
                           </v-btn>
                       </div>
                   </div>
               </template>

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
                loading: true,
                offImg: "",
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
                console.log(this.offeredWorkshop)
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
                                axios.all([this.getAttReqForm(), this.getGraderReqForm()]).then((res) => {
                                    if (res[0].status !== 204) {
                                        this.attReqForm = res[0].data;
                                    }
                                    if (res[1].status !== 204) {
                                        this.graderReqForm = res[1].data;
                                    }
                                })

                            });

                        } else if (this.isAttendee) {
                            this.getAttendeeGroup().then((res) => {
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
                        } else {
                            this.loading = false;
                            axios.all([this.getAttReqForm(), this.getGraderReqForm()]).then((res) => {
                                if (res[0].status !== 204) {
                                    this.attReqForm = res[0].data;
                                }
                                if (res[1].status !== 204) {
                                    this.graderReqForm = res[1].data;
                                }
                            })
                        }
                    })
                } else {
                    this.loading = false;
                }
            });
        },
        methods: {
            routeToWorkshopCreateForm(graderEval, attReg, graderReq, workshopForm) {
                this.$router.push({
                    name: 'Create Form', params: {
                        graderEval: graderEval,
                        attReg: attReg,
                        graderReq: graderReq,
                        workshopForm: workshopForm,
                        offId: this.wId
                    }
                })
            },
            routeToWorkshopForm(isAnswer1, type, appId) {
                this.$router.push({
                    name: 'workshopForms', params: {
                        forms: this.offeredWorkshop.workshopForms,
                        isAnswer: isAnswer1,
                        type: type,
                        appId: appId,
                        fillerId: this.user.id
                    }
                })
            },
            routeToForm(id, isAnswer1, type1, appid, showAnswers) {
                this.$router.push({
                    name: 'workshopForm', params: {
                        formId: id,
                        isAnswer: isAnswer1,
                        type: type1,
                        appId: appid,
                        showAnswers: showAnswers,
                        offId: this.wId,
                    }
                })
            },
            getOfferedWorkshop() {
                // eslint-disable-next-line no-console
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
