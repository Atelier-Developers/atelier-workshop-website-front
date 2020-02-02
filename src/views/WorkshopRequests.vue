<template>
    <v-container>
        <v-dialog v-model="formDialog" max-width="500px">
            <v-card class="py-3 px-3">
                <v-card-text>
                    <v-row v-for="(question, i) in this.form.questions" :key="question.question.id">
                        <div class="question title">{{i + 1}}) {{question.question.text}}</div>
                        <v-col cols="12">
                            <div class="answer title font-weight-light ml-3" v-if="question.question.choicable">
                                {{ question.question.answerables[question.answer.answerData[0].choice].text}}
                            </div>

                            <div class="answer title font-weight-light ml-3" v-else>
                                {{question.answer.answerData[0].text}}
                            </div>
                        </v-col>

                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-row justify="center" align="center" class="mt-12">
            <p style="width: 100%" class="text-center mb-8 grey--text darken-4">Tap on the row to show requester form</p>
            <v-card max-width="900">
                <v-tabs vertical>
                    <v-tab>
                        <v-icon left>mdi-account</v-icon>
                        Assistant
                    </v-tab>
                    <v-tab>
                        <v-icon left>mdi-school</v-icon>
                        Attendees
                    </v-tab>
                    <v-tab-item>
                        <v-data-table
                                :headers="headers"
                                :items="this.graders"
                                :items-per-page="10"
                                @click:row="(val) => showForm(val.roles[1].id, 'grader')"
                                class="elevation-1">

                            <template v-slot:item.action="{ item }" v-if="showForm != null">
                                <v-icon
                                        small
                                        class="mr-2"
                                        color="success"
                                        @click.stop="() => showDetail(item, 'grader', 'ACCEPTED')"
                                >
                                    fas fa-check
                                </v-icon>
                                <v-icon
                                        small
                                        class="mr-2"
                                        color="error"
                                        @click.stop="() => showDetail(item, 'grader', 'REJECTED')"
                                >
                                    fas fa-times
                                </v-icon>
                            </template>
                        </v-data-table>
                    </v-tab-item>
                    <v-tab-item>
                        <v-data-table
                                :headers="headers"
                                :items="this.attendees"
                                :items-per-page="10"
                                @click:row="(val) => showForm(val.roles[0].id, 'attendee')"
                                class="elevation-1">

                            <template v-slot:item.action="{ item }" v-if="showForm != null">
                                <v-icon
                                        small
                                        class="mr-2"
                                        color="success"
                                        @click.stop="() => showDetail(item, 'attendee', 'ACCEPTED')"
                                >
                                    fas fa-check
                                </v-icon>
                                <v-icon
                                        small
                                        class="mr-2"
                                        color="error"
                                        @click.stop="() => showDetail(item, 'attendee', 'REJECTED')"
                                >
                                    fas fa-times
                                </v-icon>
                            </template>
                        </v-data-table>
                    </v-tab-item>
                </v-tabs>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "WorkshopRequests",
        props: ["id"],
        data() {
            return {
                groups: [],
                graders: [],
                attendees: [],
                graderRequestForm: null,
                attendeeRequestForm: null,
                form: {
                    id: null,
                    type: null,
                    questions: [],
                    groupId: null
                },
                formDialog: false,
                groupDialog: false,
                newGroup: {
                    name: "",
                    id: ""
                },
                headers: [
                    {
                        text: "NAME",
                        value: "name",
                        sortable: false,
                        align: 'left',
                    },
                    {
                        text: "USERNAME",
                        value: "username",
                        sortable: false,
                        align: 'left',
                    },
                    {
                        text: 'Actions',
                        value: 'action',
                        sortable: false
                    },
                ],
            }
        },
        mounted() {
            axios.get(this.$store.state.api
                + "/workshopManagers/offeringWorkshop/"
                + this.id
                + "/requests/pending/graders").then((res) => {
                this.graders = res.data;
            });
            axios.get(this.$store.state.api
                + "/workshopManagers/offeringWorkshop/"
                + this.id
                + "/requests/pending/attendees").then((res) => {
                this.attendees = res.data;
            });
            axios.get(this.$store.state.api
                + "/workshopManagers/offeringWorkshop/"
                + this.id
                + "/groups").then((res) => {
                this.groups = res.data;
            })
        },
        methods: {
            reloadPage() {
                let location = {
                    name: "Workshop Requests", params: {
                        id: this.id
                    }
                };
                this.$router.replace("/");
                this.$nextTick(() => this.$router.replace(location))
            },
            showDetail(item, type, status) {
                if (type === "grader") {
                    axios.get(this.$store.state.api + "/workshopManagers/offeringWorkshop/" + this.id + "/requester/" + item.roles[1].id)
                        // eslint-disable-next-line no-console
                        .then((res) => {
                            // eslint-disable-next-line no-console
                            let req = {};
                            req.requestId = res.data.id;
                            req.requestState = status;
                            req.userId = item.id;
                            axios.post(this.$store.state.api + "/workshopManagers/offeringWorkshop/" + this.id + "/request", req)
                                .then(() => {
                                    this.reloadPage()
                                })
                        })
                } else if (type === "attendee") {
                    axios.get(this.$store.state.api + "/workshopManagers/offeringWorkshop/" + this.id + "/requester/" + item.roles[0].id)
                        // eslint-disable-next-line no-console
                        .then((res) => {
                            let req = {};
                            req.requestId = res.data.id;
                            req.requestState = status;
                            req.userId = item.id;
                            // eslint-disable-next-line no-console
                            console.log(req)
                            axios.post(this.$store.state.api + "/workshopManagers/offeringWorkshop/" + this.id + "/request", req)
                                .then(() => {
                                    this.reloadPage()
                                })
                        })
                }

            },
            showForm(id, type) {
                this.form.id = id;
                this.form.type = type;
                if (type === "grader") {
                    axios.get(this.$store.state.api + "/workshopManagers/offeringWorkshop/" + this.id + "/graderRequestForm")
                        .then((res) => {
                            this.graderRequestForm = res.data;
                            axios.post(this.$store.state.api
                                + "/workshopManagers/offeringWorkshop/form/"
                                + this.graderRequestForm.id
                                + "/result", {id: this.form.id})
                                .then((res) => {
                                    this.form.questions = res.data;
                                    this.formDialog = true;
                                })
                        });
                } else {
                    axios.get(this.$store.state.api + "/workshopManagers/offeringWorkshop/" + this.id + "/attenderRegisterForm")
                        .then((res) => {
                            this.attendeeRequestForm = res.data;

                            axios.post(this.$store.state.api
                                + "/workshopManagers/offeringWorkshop/form/"
                                + this.attendeeRequestForm.id
                                + "/result", {id: this.form.id})
                                .then((res) => {
                                    this.form.questions = res.data;
                                    this.formDialog = true;
                                })
                        })
                }
            },
            addGroup() {
                axios.post(this.$store.state.api + "/workshopManagers/offeringWorkshop/group",
                    {text: this.newGroup.name})
                    .then((res) => {
                        this.newGroup.id = res.data.id;
                        this.groups.push(res.data);
                        this.newGroup = {
                            name: "",
                            id: ""
                        };
                        this.groupDialog = false;
                    })

            },
            acceptMember() {
                if (this.form.type === 'grader') {
                    let requestId;
                    axios.get(this.$store.state.api
                        + "/workshopManagers/offeringWorkshop/"
                        + this.id
                        + "/graderRequest/"
                        + this.form.id).then((res) => {
                        requestId = res.data.id;

                        axios.post(this.$store.state.api
                            + "/workshopManagers/offeringWorkshop/"
                            + this.id
                            + "/request",
                            [{
                                requestId: requestId,
                                requestState: "ACCEPTED"
                            }]).then((res) => {
                            let id = res.data;

                            axios.post(this.$store.state.api
                                + "/workshopManagers/offeringWorkshop/group/"
                                + this.form.groupId
                                + "/grader",
                                {id: id}).then(() => {
                                this.formDialog = false;

                                axios.get(this.$store.state.api
                                    + "/workshopManagers/offeringWorkshop/"
                                    + this.id
                                    + "/requests/pending/graders").then((res) => {
                                    this.graders = res.data;
                                });

                            })
                        });
                    });
                } else {
                    let requestId;
                    axios.get(this.$store.state.api
                        + "/workshopManagers/offeringWorkshop/"
                        + this.id
                        + "/attendeeRegister/"
                        + this.form.id).then((res) => {
                        requestId = res.data.id;

                        axios.post(this.$store.state.api
                            + "/workshopManagers/offeringWorkshop/"
                            + this.id
                            + "/request",
                            [{
                                requestId: requestId,
                                requestState: "ACCEPTED"
                            }]).then((res) => {
                            let id = res.data;

                            axios.post(this.$store.state.api
                                + "/workshopManagers/offeringWorkshop/group/"
                                + this.form.groupId
                                + "/att",
                                {id: id}).then(() => {
                                this.formDialog = false;

                                axios.get(this.$store.state.api
                                    + "/workshopManagers/offeringWorkshop/"
                                    + this.id
                                    + "/requests/pending/attendees").then((res) => {
                                    this.attendees = res.data;
                                })
                            })
                        });
                    });
                }
            },
            declineMember() {
                if (this.form.type === 'grader') {
                    let requestId;
                    axios.get(this.$store.state.api
                        + "/workshopManagers/offeringWorkshop/"
                        + this.id
                        + "/graderRequest/"
                        + this.form.id,).then((res) => {
                        requestId = res.data.id;

                        axios.post(this.$store.state.api
                            + "/workshopManagers/offeringWorkshop/"
                            + this.id
                            + "/request",
                            [{
                                requestId: requestId,
                                requestState: "REJECTED"
                            }]).then(() => {
                            this.formDialog = false;

                            axios.get(this.$store.state.api
                                + "/workshopManagers/offeringWorkshop/"
                                + this.id
                                + "/requests/pending/graders").then((res) => {
                                this.graders = res.data;
                            });

                        });
                    });
                } else {
                    let requestId;
                    axios.get(this.$store.state.api
                        + "/workshopManagers/offeringWorkshop/"
                        + this.id
                        + "/attendeeRegister/"
                        + this.form.id,).then((res) => {
                        requestId = res.data.id;

                        axios.post(this.$store.state.api
                            + "/workshopManagers/offeringWorkshop/"
                            + this.id
                            + "/request",
                            [{
                                requestId: requestId,
                                requestState: "REJECTED"
                            }]).then(() => {
                            this.formDialog = false;

                            axios.get(this.$store.state.api
                                + "/workshopManagers/offeringWorkshop/"
                                + this.id
                                + "/requests/pending/attendees").then((res) => {
                                this.attendees = res.data;
                            });
                        });
                    });
                }
            },
            showGroupDialog() {
                this.groupDialog = true;
            }
        }
    }

</script>

<style scoped>

</style>
