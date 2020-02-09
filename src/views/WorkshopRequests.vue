<template>
    <v-container>
        <v-dialog v-model="formDialog" max-width="500px">
            <v-card class="py-3 px-3" v-if="this.form!==null">
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
                <v-card-text>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-select
                                    v-model="historyType"
                                    :items="['Attendee', 'Assistant']"
                                    label="History Of"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <div v-if='historyType==="Attendee"'>
                            <v-col
                                    cols="12" sm="6" md="4"
                                    v-for="workshop in historyWorkshops.attendedWorkshops"
                                    :key="workshop.workshop.offeredWorkshop.id">
                                <div @click="() => showHistoryForm('attended',workshop)">
                                    {{workshop.workshop.offeredWorkshop.name}}
                                </div>
                            </v-col>
                        </div>
                        <div v-if='historyType==="Assistant"'>
                            <v-col
                                    cols="12" md="6"
                                    v-for="workshop in historyWorkshops.assistedWorkshops"
                                    :key="workshop.workshop.offeredWorkshop.id">
                                <v-btn @click="() => showHistoryForm('Assisted',workshop)" color="primary">
                                    {{workshop.workshop.offeredWorkshop.name}}
                                </v-btn>
                            </v-col>
                        </div>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-dialog v-model="payDetailDialog" max-width="500px">
            <v-card v-if="payDetail !== null" class="py-3 px-3">
                <v-card-text>
                    <v-row>
                        <v-col cols="12">
                            <div>
                                {{this.payDetail.comment}}
                            </div>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <div>
                                <v-btn color="primary"
                                       :href="`${this.$store.state.api}/admin/attendeePaymentTab/${this.payDetail.id}/file`"
                                       outlined rounded target="_blank">
                                    <v-icon left>fa-cloud-download-alt</v-icon>
                                    Download
                                </v-btn>
                            </div>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-dialog v-model="payDialog" max-width="500px">
            <v-card class="py-3 px-3">
                <v-card-text>
                    <v-container>
                        <v-row v-for="pay in this.payStatus" :key="pay.id">
                            <v-col class="d-flex align-center" cols="12" md="2">
                                ${{pay.value}}
                            </v-col>
                            <v-col class="d-flex align-center" cols="12" md="5">
                                <div class="mr-auto">
                                    {{pay.paymentDate.getFullYear()}}/{{pay.paymentDate.getMonth()}}/{{pay.paymentDate.getDate()}}
                                </div>
                            </v-col>
                            <v-col class="d-flex align-center" cols="12" md="5">
                                <v-btn
                                        v-if="!pay.paid"
                                        color="success"
                                        small
                                        @click="() => submitPay(pay)"
                                        class="ml-auto btn">
                                    Received
                                </v-btn>
                                <div v-else class="ml-auto mr-5 px-0 py-0 btn">
                                    <v-btn
                                            color="error"
                                            small
                                            @click="() => unPay(pay)"
                                            :loading="isLoading"
                                            class="ml-auto btn">
                                        decline
                                    </v-btn>
                                </div>
                                <v-icon @click="() => showPayDetail(pay)" v-if="pay.paid" class="ml-5">
                                    fa-info-circle
                                </v-icon>
                            </v-col>
                        </v-row>
                        <v-divider/>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-dialog v-model="commentDialog" max-width="500px">
            <v-form v-model="isValid">
                <v-card class="py-3 px-3">
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-text-field v-model="comment" :rules="[v => !!v || 'This field is required']"
                                              label="Comment *"
                                              outlined/>
                            </v-row>
                            <v-row>
                                <v-file-input v-model="paymentFile" outlined label="File"/>
                            </v-row>
                            <v-row>
                                <v-btn @click="submitPayment" color="primary" :disabled="!isValid">
                                    Submit
                                </v-btn>
                            </v-row>
                            <v-divider/>
                        </v-container>
                    </v-card-text>
                </v-card>

            </v-form>
        </v-dialog>
        <v-dialog v-model="historyFormDialog" max-width="500px">
            <v-card class="py-3 px-3">
                <v-card-text v-if="selectedHistoryWorkshop !== null">
                    <v-container v-for="(form,index) in this.selectedHistoryWorkshop.form" :key="index">
                        <div class="display-1 font-weight-bold my-5">Form Name: {{form.name}}</div>
                        <v-row
                                v-for="(qa,jndex) in form.questionsAndAnswers" :key="jndex"
                        >
                            <v-col cols="12" class="qa">
                                Question {{index+1}}: {{qa.question}}
                            </v-col>
                            <v-col cols="12" class="qa">
                                Answer: {{qa.answer}}
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-row justify="center" align="center" class="mt-12">
            <p style="width: 100%" class="text-center mb-8 grey--text darken-4">Tap on the row to show requester
                form</p>
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
                                :items="this.assistantsReq"
                                :items-per-page="10"
                                @click:row="(val) => showForm(val.roles[1].id, 'grader', val)"
                                class="elevation-1">

                            <template v-slot:item.action="{ item }" v-if="showForm != null">
                                <div v-if="item.status ==='Pending'">
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
                                </div>
                            </template>
                            <template v-slot:item.status="{ item }" v-if="showForm != null">
                                <div v-if="item.status ==='Pending'">
                                    <v-icon
                                            small
                                            class="mr-2"
                                    >
                                        fas fa-question-circle
                                    </v-icon>
                                </div>
                                <div v-else-if="item.status === 'Rejected'">
                                    <v-icon
                                            small
                                            class="mr-2"
                                            color="error"
                                    >
                                        fas fa-times-circle
                                    </v-icon>
                                </div>
                                <div v-else-if="item.status === 'Accepted'">
                                    <v-icon
                                            small
                                            class="mr-2"
                                            color="success"
                                    >
                                        fas fa-check-circle
                                    </v-icon>
                                </div>
                            </template>
                        </v-data-table>
                    </v-tab-item>
                    <v-tab-item>
                        <v-data-table
                                :headers="headers"
                                :items="this.attendeesReq"
                                :items-per-page="10"
                                @click:row="(val) => showForm(val.roles[0].id, 'attendee', val)"
                                class="elevation-1">

                            <template v-slot:item.action="{ item }" v-if="showForm != null">
                                <div v-if="item.status ==='Pending'">
                                    <v-icon
                                            small
                                            class="mr-2"
                                            color="success"
                                            v-if="item.paymentState"
                                            @click.stop="() => showDetail(item, 'attendee', 'ACCEPTED')"
                                    >
                                        fas fa-check
                                    </v-icon>
                                    <v-icon
                                            small
                                            class="mr-2"
                                            color="success"
                                            v-else
                                            disabled
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
                                    <v-icon
                                            small
                                            class="mr-2"
                                            color="success"
                                            @click.stop="() => showPayments(item)"
                                    >
                                        fas fa-coins
                                    </v-icon>
                                </div>
                            </template>
                            <template v-slot:item.status="{ item }" v-if="showForm != null">
                                <div v-if="item.status ==='Pending'">
                                    <v-icon
                                            small
                                            class="mr-2"
                                    >
                                        fas fa-question-circle
                                    </v-icon>
                                </div>
                                <div v-else-if="item.status === 'Rejected'">
                                    <v-icon
                                            small
                                            class="mr-2"
                                            color="error"
                                    >
                                        fas fa-times-circle
                                    </v-icon>
                                </div>
                                <div v-else-if="item.status === 'Accepted'">
                                    <v-icon
                                            small
                                            class="mr-2"
                                            color="success"
                                    >
                                        fas fa-check-circle
                                    </v-icon>
                                </div>
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
                payTmp: null,
                form: {
                    id: null,
                    type: null,
                    questions: [],
                    groupId: null
                },
                isLoading: false,
                payStatus: null,
                paymentFile: null,
                comment: "",
                isValid: false,
                formDialog: false,
                payDialog: false,
                groupDialog: false,
                commentDialog: false,
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
                    {
                        text: 'Status',
                        value: 'status',
                        sortable: false
                    },
                ],
                selectedAtt: null,
                payDetailDialog: false,
                payDetail: null,
                payFile: null,
                historyFormDialog: false,
                historyWorkshops: null,
                selectedHistoryWorkshop: null,
                historyType: null,
            }
        },
        computed: {
            assistantsReq() {
                let data = [];
                for (let grd in this.graders)
                    data.push({
                        name: this.graders[grd].name,
                        username: this.graders[grd].username,
                        id: this.graders[grd].requestId,
                        userId: this.graders[grd].id,
                        roles: this.graders[grd].roles,
                        status: this.graders[grd].requestStatus,
                    });
                return data;
            },
            attendeesReq() {
                let data = [];
                for (let att in this.attendees)
                    data.push({
                        name: this.attendees[att].user.name,
                        username: this.attendees[att].user.username,
                        paymentState: this.attendees[att].paymentState,
                        id: this.attendees[att].id,
                        userId: this.attendees[att].user.id,
                        roles: this.attendees[att].user.roles,
                        status: this.attendees[att].requestStatus,
                    });
                return data;
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
                            req.userId = item.userId;
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
                            req.userId = item.userId;
                            axios.post(this.$store.state.api + "/workshopManagers/offeringWorkshop/" + this.id + "/request", req)
                                .then(() => {
                                    this.reloadPage()
                                })
                        })
                }

            },
            showPayDetail(pay) {
                this.payDetailDialog = true;
                this.payDetail = pay;
                // axios.get(`${this.$store.state.api}/admin/attendeePaymentTab/${pay.id}/file`)
                //     .then((res) => {
                //         this.payFile = res.data;
                //     })
            },
            showHistoryForm(type, workshop) {
                this.historyFormDialog = true;
                this.selectedHistoryWorkshop = workshop;
            },
            showForm(id, type, item) {
                this.form.id = id;
                this.form.type = type;
                if (type === "grader") {
                    axios.get(this.$store.state.api + "/workshopManagers/offeringWorkshop/" + this.id + "/graderRequestForm")
                        .then((res) => {
                            this.graderRequestForm = res.data;
                            axios.post(this.$store.state.api
                                + "/workshopManagers/offeringWorkshop/form/"
                                + this.graderRequestForm.id
                                + "/result/" + item.id, {id: this.form.id})
                                .then((res) => {
                                    this.form.questions = res.data;
                                    this.formDialog = true;
                                    axios.get(`${this.$store.state.api}/workshopManagers/userHistory/${item.userId}`)
                                        .then((res) => {
                                            this.historyWorkshops = res.data;
                                        })
                                })
                        });
                } else {
                    axios.get(this.$store.state.api + "/workshopManagers/offeringWorkshop/" + this.id + "/attenderRegisterForm")
                        .then((res) => {
                            this.attendeeRequestForm = res.data;

                            axios.post(this.$store.state.api
                                + "/workshopManagers/offeringWorkshop/form/"
                                + this.attendeeRequestForm.id
                                + "/result/" + item.id, {id: this.form.id})
                                .then((res) => {
                                    this.form.questions = res.data;
                                    this.formDialog = true;
                                })
                        });
                }
            },
            showPayments: function (att) {
                this.selectedAtt = att;
                axios.get(`${this.$store.state.api}/attendees/attendee/${att.userId}/offeringWorkshop/${this.id}/payment`)
                    .then((res) => {
                        this.payStatus = res.data.attenderPaymentTabList;
                        this.payDialog = true;
                        for (let j = 0; j < this.payStatus.length; j++) {
                            this.payStatus[j].paymentDate = new Date(this.payStatus[j].paymentDate);
                        }
                    })
            },
            unPay(pay) {
                this.isLoading = true;
                // eslint-disable-next-line no-console
                console.log(pay)
                axios.put(`${this.$store.state.api}/admin/attendeePaymentTab/${pay.id}/unpay`).then(() => {
                    this.isLoading = false;
                    pay.paid = false;
                })
            },
            submitPay(pay) {
                this.commentDialog = true;
                this.payTmp = pay;
                // eslint-disable-next-line no-console
                console.log(pay);
            },
            submitPayment() {
                axios.put(`${this.$store.state.api}/admin/attendeePaymentTab/${this.payTmp.id}`, {
                    comment: this.comment
                }).then((res) => {
                    this.payTmp.comment = this.comment;
                    this.comment = null;
                    if (this.paymentFile != null) {
                        let formData = new FormData();
                        formData.append('file', this.paymentFile);
                        axios.post(`${this.$store.state.api}/admin/attendeePaymentTab/${this.payTmp.id}/file`,
                            formData, {
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                }
                            }).then(() => {
                            this.payTmp.paid = true;
                            this.selectedAtt.paymentState = true;
                            this.commentDialog = false;
                            this.paymentFile = null;
                        })
                    } else {
                        this.payTmp.paid = true;
                        this.selectedAtt.paymentState = true;
                        this.commentDialog = false;
                    }
                    // eslint-disable-next-line no-console
                    console.log("FUCK");
                    // eslint-disable-next-line no-console
                    console.log(res.data);
                    this.payTmp.id = res.data;
                });
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
    .qa {
        font-size: 18px;
    }
</style>
