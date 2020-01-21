<template>
    <v-container>
        <v-dialog v-model="formDialog" max-width="500px">
            <v-card class="py-3 px-3">
                <v-card-text>
                    <v-row v-for="question in this.form.questions" :key="question.question.id">
                        <div class="question">question.question.text</div>
                        <div class="answer" v-if="question.question.choicable">
                            {{question.question.answerables[question.answer.answerData.choice].text}}
                        </div>
                        <div class="answer" v-else>
                            {{question.answer.text}}
                        </div>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-row>
                                <v-select
                                        label="Group"
                                        v-model="form.groupId"
                                        :items="groups"
                                        item-text="name"
                                        item-value="id"
                                ></v-select>
                            </v-row>
                            <v-row>
                                <v-btn flat color="primary" @click="addMember">Accept</v-btn>
                            </v-row>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-btn flat color="warning" @click="addMember">Decline</v-btn>
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
        <v-btn color="primary" @click="showGroupDialog">Add Group</v-btn>
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
                    {{group.groupName}}
                </v-btn>
            </v-slide-item>
        </v-slide-group>
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
                + "/workshopMangers/offeringWorkshop/"
                + this.id
                + "/requests/pending/graders").then((res) => {
                this.graders = res.data;
            });
            axios.get(this.$store.state.api
                + "/workshopMangers/offeringWorkshop/"
                + this.id
                + "/requests/pending/attendees").then((res) => {
                this.attendees = res.data;
            });
            axios.get(this.$store.state.api
                + "/workshopMangers/offeringWorkshop/"
                + this.id
                + "/groups").then((res) => {
                this.groups = res.data;
            })
        },
        methods: {
            showForm(id, type) {
                this.form.id = id;
                this.form.type = type;
                if (type === "grader") {
                    axios.get(this.$store.state.api + "/workshopMangers/offeringWorkshop/" + this.id + "/graderRequestForm")
                        .then((res) => {
                            this.graderRequestForm = res.data;

                            axios.post(this.$store.state.api
                                + "/workshopMangers/offeringWorkshop/form/"
                                + this.graderRequestForm.id
                                + "/result", this.form.id)
                                .then((res) => {
                                    this.form.questions = res.data;
                                    this.formDialog = true;
                                })
                        });
                } else {
                    axios.get(this.$store.state.api, +"/workshopMangers/offeringWorkshop/" + this.id + "/attenderRegisterForm")
                        .then((res) => {
                            this.attendeeRequestForm = res.data;

                            axios.post(this.$store.state.api
                                + "/workshopMangers/offeringWorkshop/form/"
                                + this.attendeeRequestForm.id
                                + "/result", this.form.id)
                                .then((res) => {
                                    this.form.questions = res.data;
                                    this.formDialog = true;
                                })
                        })
                }
            },
            addGroup() {
                axios.post(this.$store.state.api + "/workshopMangers/offeringWorkshop/group",
                    this.newGroup.name)
                    .then((res) => {
                        this.newGroup.id = res.data.id;
                        this.groups.push(this.newGroup);
                        this.newGroup = {
                            name: "",
                            id: ""
                        }
                    })

            },
            showGroupDialog() {
                this.groupDialog = true;
            }
        }
    }

</script>

<style scoped>

</style>
