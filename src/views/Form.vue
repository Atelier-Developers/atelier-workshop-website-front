<template>
    <div>
        <v-container class="fill-height">
            <v-row
                    class="fill-height"
                    align="center"
                    justify="center"
            >
                <v-card
                        class="form-card px-10 pb-5 pt-3"
                        raised
                        max-width="800"
                        width="90%"
                >
                    <v-form
                            class="form"
                            v-model="isValid"
                            ref="form"
                    >
                        <div class="form-header text-capitalize">
                            {{this.form.name}}
                        </div>
                        <div class="question my-5" v-for="(question, i) in this.form.questions" :key="question.id">
                            {{i + 1}}) {{question.text}}
                            <template v-if="isAnswer">
                                <v-text-field
                                        v-if="!question.choicable"
                                        outlined
                                        :rules="[v => !!v || 'Must be filled']"
                                        :disabled="!isAnswer"
                                        class="mt-4"
                                >
                                </v-text-field>
                                <v-select v-if="question.answerables.length > 0"
                                          :items="question.answerables"
                                          :item-value="question.answerables.id"
                                          :item-text="question.answerables.text"
                                          :rules="!isAnswer ? [v => !!v || 'Item is required'] : []"
                                          label="Options"
                                          required
                                          outlined
                                          class="form-input ma-4"
                                />
                            </template>
                            <template v-else-if="showAnswers">
                                {{getAnswerFromId(question)}}
                            </template>
                            <template v-else>
                                <v-select v-if="question.answerables.length > 0"
                                          :items="question.answerables"
                                          :item-value="question.answerables.id"
                                          :item-text="question.answerables.text"
                                          :rules="isAnswer ? [v => !!v || 'option is required'] : []"
                                          label="Options"
                                          class="form-input ma-4"
                                />
                            </template>
                            <v-divider class="mt-5"/>
                        </div>
                        <div>
                            <DeleteAcceptIcon v-if="!isAnswer" :on-accept="deleteForm"/>
                        </div>
                    </v-form>
                </v-card>
            </v-row>
        </v-container>
        <Payment
                v-if="type === 'att' && isAnswer"
                :cost="this.cost"
                :set-valid="setPayStatus"
                :set-data="setPayData"
        ></Payment>
        <v-container class="fill-height" v-if="isAnswer">
            <v-row justify="center" align="center" class="fill-height">
                <v-card
                        class="form-card px-10 py-5 d-flex"
                        raised
                        max-width="800"
                        width="90%"
                >
                    <div
                            v-if="type === 'att' && isAnswer"
                            class="form-status"
                    >Status: {{formStatus}}
                    </div>
                    <v-btn
                            color="success"
                            @click="submitAll"
                            :disabled="!formValidate"
                            class="ml-auto"
                    >Submit
                    </v-btn>
                </v-card>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import axios from 'axios'
    import DeleteAcceptIcon from "../components/DeleteAcceptIcon";
    import Payment from "./Payment";

    export default {
        name: "Form",
        components: {Payment, DeleteAcceptIcon},
        props: [
            'formId',
            'isAnswer',
            'type',
            'appId', 'fillerId',
            'showAnswers',
            "offId",
            "appType",
            "cost"
        ],
        data() {
            return {
                form: null,
                answers: {},
                isValid: false,
                payStatus: false,
                allValidate: false,
                payData: null,
            }
        },
        mounted() {
            let graderAppId;
            let user = {};

            if (this.appId === false || this.appId === undefined) {
                // eslint-disable-next-line no-console
                console.log("if")
                axios.get(this.$store.state.api + "/forms/form/" + this.formId).then((res) => {
                    this.form = res.data;

                });
            } else {
                if (this.appType === "grader") {
                    axios.get(this.$store.state.api + "/userDetails/" + this.appId).then((res) => {
                        user = res.data;

                        graderAppId = user.roles[1].graderWorkshopConnection;


                        axios.get(this.$store.state.api + "/forms/form/" + this.formId).then((res) => {
                            this.form = res.data;
                            if (this.type != null) {
                                // eslint-disable-next-line no-console
                                console.log(this.form.questions);
                                this.form.questions.forEach((q) => {
                                    q.answers.forEach((a) => {
                                        // if (a.formApplicant === this.appId) {
                                        //     if ('formFiller' in a) {
                                        //         if (a.formFiller === this.fillerId) {
                                        //             this.answers[q.id] = {
                                        //                 answer: a,
                                        //                 type: 'choice' in a ? 'choice' : 'text'
                                        //             };
                                        //         }
                                        //     } else {
                                        //
                                        //     }
                                        // }

                                        if (a.formApplicant.workshopGraderInfo.workshopGrader.id === graderAppId.id) {
                                            this.answers[q.id] = {
                                                answer: a,
                                                type: 'choice' in a ? 'choice' : 'text'
                                            };
                                        }
                                    })
                                })
                            }
                        })
                    })
                } else if (this.appType === "att") {
                    axios.get(this.$store.state.api + "/userDetails/" + this.appId).then((res) => {
                        user = res.data;

                        let attAppId = user.roles[0].attenderWorkshopConnection;
                        // eslint-disable-next-line no-console
                        console.log(attAppId)


                        axios.get(this.$store.state.api + "/forms/form/" + this.formId).then((res) => {
                            this.form = res.data;
                            if (this.type != null) {
                                // eslint-disable-next-line no-console
                                console.log(this.form.questions);
                                this.form.questions.forEach((q) => {
                                    // eslint-disable-next-line no-console
                                    console.log(q)
                                    q.answers.forEach((a) => {
                                        // if (a.formApplicant === this.appId) {
                                        //     if ('formFiller' in a) {
                                        //         if (a.formFiller === this.fillerId) {
                                        //             this.answers[q.id] = {
                                        //                 answer: a,
                                        //                 type: 'choice' in a ? 'choice' : 'text'
                                        //             };
                                        //         }
                                        //     } else {
                                        //
                                        //     }
                                        // }
                                        // eslint-disable-next-line no-console
                                        console.log("answer")
                                        // eslint-disable-next-line no-console
                                        console.log(a.formApplicant.workshopAttenderInfo.workshopAttender)
                                        if (a.formApplicant.workshopAttenderInfo.workshopAttender.id === attAppId.id) {
                                            this.answers[q.id] = {
                                                answer: a,
                                                type: 'choice' in a ? 'choice' : 'text'
                                            };
                                        }
                                    })
                                })
                            }
                        })
                    })
                } else {
                    axios.get(this.$store.state.api + "/forms/form/" + this.formId).then((res) => {
                        this.form = res.data;

                    });
                }

            }


        },
        methods: {
            deleteForm() {
                axios.delete(this.$store.state.api + "/forms/form/" + this.formId).then(() => {
                    this.$router.back();
                })
            },
            getAnswerFromId(question) {

                if (Object.keys(this.answers).length === 0) {
                    return "No Answers Yet";
                }
                let ans = this.answers[question.id];

                // eslint-disable-next-line no-console
                console.log(ans);

                if (ans === null) {
                    return;
                }

                if (ans.type === 'text') {
                    return ans.answer.answerData[0].text;
                } else if (ans.type === 'choice') {
                    let able = question.answerables;
                    return able[ans.answer.answerData[0].choice];
                }

            },
            sendForm() {
                let data = [];
                // this.$refs.form._data.inputs.forEach((input) => data.push(input.internalValue));
                let inputs = this.$refs.form._data.inputs;
                for (let i = 0; i < inputs.length; i++) {
                    // if (this.form[0].questions[i].choicable ) {
                    //     // eslint-disable-next-line no-debugger
                    //     for (let j = 0; j < inputs[i].internalValue.length; j++) {
                    //         data.push({
                    //             "questionId": this.form[0].questions[i].id,
                    //             "type": "ChoiceAnswer",
                    //             "answerQuestion": inputs[i].internalValue[j]
                    //         })
                    //     }
                    // } else {
                    let answerDat = {}
                    if (this.form.questions[i].choicable) {
                        let index;
                        for (let j = 0; j < this.form.questions[i].answerables.length; ++j) {
                            if (inputs[i].internalValue === this.form.questions[i].answerables[j].text) {
                                index = j;
                            }
                        }
                        answerDat = {
                            "choice": index
                        }
                    } else {
                        answerDat = {
                            "text": inputs[i].internalValue
                        }
                    }
                    data.push({
                        "questionId": this.form.questions[i].id,
                        "type": this.form.questions[i].choicable ? "ChoiceAnswer" : "TextAnswer",
                        "answerData": answerDat
                    });
                    // }
                }
                if (this.type !== null) {
                    // eslint-disable-next-line no-debugger
                    if (this.type === 'grader') {
                        let attData = {
                            "answerQuestionContexts": data
                        };
                        axios.post(this.$store.state.api + "/graders/grader/request/offeringWorkshop/" + this.offId + "/answer", attData).then(() => {
                            this.$router.back();
                        });

                    } else if (this.type === 'att') {
                        let attData = {
                            "answerQuestionContexts": data
                        };
                        // eslint-disable-next-line no-console
                        console.log(attData);
                        // eslint-disable-next-line no-debugger
                        // console.log(res);

                        axios.post(this.$store.state.api + "/attendees/attendee/request/offeringWorkshop/" + this.offId + "/answer", attData).then((res) => {
                            // eslint-disable-next-line no-console
                            console.log(res);
                            let elements = [];
                            let installments = this.payData.installment;
                            if (this.payData.payType === "Installment") {
                                for (let fuckingIt = 1; fuckingIt < installments.values.length; fuckingIt++) {
                                    let sdate = new Date(installments.dates[fuckingIt]);
                                    let esDate = sdate.toISOString();
                                    let date = sdate.toISOString();
                                    date = esDate.slice(0, esDate.length - 5);
                                    date = date.concat("+0000");
                                    elements.push({
                                        dueDate: date,
                                        amount: installments.values[fuckingIt],
                                    })
                                }
                            } else {
                                elements.push({
                                    dueDate: null,
                                    amount: this.cost,
                                })
                            }
                            // eslint-disable-next-line no-console
                            console.log({
                                type: this.payData.payType,
                                payments: elements
                            });
                            axios.post(this.$store.state.api + `/attendees/attendee/request/${res.data}/payments`, {
                                type: this.payData.payType,
                                payments: elements
                            }).then(() => {
                                this.$router.back();
                            })

                        }).catch((err) => {

                            if (err.response.status === 409) {
                                window.alert("Another requested workshop of yours is conflicting with this workshop's time.");
                                return ;
                            }
                            else if (err.response.status === 418){
                                window.alert("You haven't passed pre-requisites of this workshop")
                                return ;
                            }
                        })
                    } else if (this.type === 'manager' && this.isAnswer) {
                        axios.get(this.$store.state.api + "/userDetails/offeringWorkshop/" + this.offId + "/info/" + this.appId).then((res) => {
                            axios.post(this.$store.state.api + "/workshopManagers/offeringWorkshop/" + this.offId + "/graderEvaluationForm/answer", {
                                formId: this.form.id,
                                applicantId: res.data.id,
                                answerQuestion: data
                            }).then(() => {
                                this.$router.back();
                            });
                        })
                    } else if (this.type === "graderWorkshopForm" && this.isAnswer) {
                        axios.get(this.$store.state.api + "/userDetails/offeringWorkshop/" + this.offId + "/info/" + this.appId).then((res) => {

                            axios.post(this.$store.state.api + "/workshopGrader/offeringWorkshop/" + this.offId + "/workshopForm/answer", {
                                formId: this.form.id,
                                applicantId: res.data.id,
                                answerQuestion: data
                            }).then(() => {
                                this.$router.back();

                            })
                        })

                    }
                }
            },
            submitAll() {
                this.sendForm();
                // if (this.type === 'att' && this.isAnswer)
                //     this.sendPayment();
            },
            sendPayment() {

            },
            setPayStatus(bool) {
                this.payStatus = bool;
            },
            setPayData(data) {
                this.payData = {
                    payN: data.payN,
                    payType: data.payType,
                    maxN: data.maxN,
                    installment: data.installment
                }
            }
        },
        computed: {
            formValidate() {
                if (!this.isValid) {
                    return false;
                }
                if (!this.payStatus && this.type === 'att' && this.isAnswer)
                    return false;
                return true;
            },
            formStatus() {
                if (!this.isValid) {
                    return "Check Form inputs."
                }
                if (!this.payStatus && this.type === 'att' && this.isAnswer)
                    return "Check Prices: Sum/Price";
                return "All Okay";
            }
        }
    }
</script>

<style scoped>

    .form-card {
        /*margin: 50px 100px;*/
    }

    .form-header {
        font-size: 24px;
        font-weight: bold;
        padding: 15px 0;
    }

</style>
