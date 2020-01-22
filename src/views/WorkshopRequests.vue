<template>
    <v-container>
        <v-dialog v-model="formDialog" max-width="500px">
            <v-card class="py-3 px-3">
                <v-card-text>
                    <v-row v-for="question in this.form.questions" :key="question.question.id">
                        <div class="question title">{{question.question.text}}</div>
                        <div class="answer title font-weight-light ml-3" v-if="question.question.choicable">
                            {{ question.question.answerables[question.answer.answerData[0].choice].text}}
                        </div>

                        <div class="answer title font-weight-light ml-3" v-else>
                            {{question.answer.answerData[0].text}}
                        </div>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-row>
                        <v-col cols="12">
                            <v-select
                                    label="Group"
                                    v-model="form.groupId"
                                    :items="groups"
                                    item-text="name"
                                    item-value="id"
                            ></v-select>

                        </v-col>
                        <v-col cols="12" md="6">
                            <v-btn flat color="primary" class="mr-4" @click="acceptMember">Accept</v-btn>
                            <v-btn flat color="error" @click="declineMember">Decline</v-btn>
                        </v-col>
                    </v-row>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="groupDialog" max-width="500px">
            <v-card class="py-3 px-3">
                <v-card-text>
                    <v-form>
                        <v-text-field
                                label="Group Name"
                                v-model="newGroup.name"
                        ></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="addGroup">Add Group</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-slide-group mandatory show-arrows center-active dark disable-sort>
            <v-slide-item
                    v-for="group in groups"
                    :key="group.id"
                    v-slot:default="{active, toggle}"
            >
                <v-btn
                        class="mx-2"
                        active-class="blue white--text"
                        depressed
                        rounded
                >
                    {{group.name}}
                </v-btn>
            </v-slide-item>
        </v-slide-group>
        <v-row justify="center" align="center" class="mt-12">
            <v-card max-width="900">
                <v-tabs vertical>
                    <v-tab>
                        <v-icon left>mdi-account</v-icon>
                        Graders
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
                                class="elevation-1">

                            <template v-slot:item.action="{ item }" v-if="showForm != null">
                                <v-icon
                                        small
                                        class="mr-2"
                                        @click="() => showForm(item.roles[1].id, 'grader')"
                                >
                                    fas fa-eye
                                </v-icon>
                            </template>
                        </v-data-table>
                    </v-tab-item>
                    <v-tab-item>
                        <v-data-table
                                :headers="headers"
                                :items="this.attendees"
                                :items-per-page="10"
                                class="elevation-1">

                            <template v-slot:item.action="{ item }" v-if="showForm != null">
                                <v-icon
                                        small
                                        class="mr-2"
                                        @click="() => showForm(item.roles[0].id, 'attendee')"
                                >
                                    fas fa-eye
                                </v-icon>
                            </template>
                        </v-data-table>
                    </v-tab-item>
                </v-tabs>
            </v-card>
        </v-row>
        <v-row class="mt-5">
            <v-col cols="8"></v-col>
            <v-col cols="4">
                <v-btn color="primary" @click="showGroupDialog" class="add-gp">Add Group</v-btn>
            </v-col>
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
                // eslint-disable-next-line no-console
                console.log(res.data);
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
                // eslint-disable-next-line no-console
                console.log("GROUP");
                // eslint-disable-next-line no-console
                console.log(this.groups);
            })
        },
        methods: {
            showForm(id, type) {
                this.form.id = id;
                this.form.type = type;
                if (type === "grader") {
                    // eslint-disable-next-line no-console
                    console.log(id);
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
                        // eslint-disable-next-line no-console
                        console.log(res.data);
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
                                    // eslint-disable-next-line no-console
                                    console.log(res.data);
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
                                // eslint-disable-next-line no-console
                                console.log(res.data);
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
