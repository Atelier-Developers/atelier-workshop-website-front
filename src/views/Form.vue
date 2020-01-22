<template>
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
                    width="80%"
            >
                <v-form
                        class="form"
                        ref="form"
                >
                    <div class="form-header text-capitalize">
                        {{this.form.name}}
                    </div>
                    <label class="question" v-for="(question, i) in this.form.questions" :key="question.id">
                        {{i + 1}}) {{question.text}}
                        <template v-if="isAnswer">
                            <v-text-field
                                    v-if="!question.choicable"
                                    outlined
                                    :disabled="!isAnswer"
                                    class="form-input"
                            >
                            </v-text-field>
                            <v-select v-if="question.answerables.length > 0"
                                      :items="question.answerables"
                                      :item-value="question.answerables.id"
                                      :item-text="question.answerables.text"
                                      :rules="!isAnswer ? [v => !!v || 'Item is required'] : []"
                                      label="Options"
                                      required
                                      class="form-input ma-4"
                            />
                        </template>
                        <div v-else-if="showAnswers">
                            {{getAnswerFromId(question)}}
                        </div>
                        <div v-else>
                            <v-select v-if="question.answerables.length > 0"
                                      :items="question.answerables"
                                      :item-value="question.answerables.id"
                                      :item-text="question.answerables.text"
                                      :rules="!isAnswer ? [v => !!v || 'Item is required'] : []"
                                      label="Options"
                                      class="form-input ma-4"
                            />
                        </div>

                    </label>
                    <div>
                        <v-btn color="primary" @click="sendForm" v-if="isAnswer" class="ma-3">Submit</v-btn>
                    </div>
                </v-form>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "Form",
        props: ['formId', 'isAnswer', 'type', 'appId', 'fillerId', 'showAnswers', "offId", "appType"],
        data() {
            return {
                form: null,
                answers: {}
            }
        },
        mounted() {
            let graderAppId;
            let user = {};

            if ( this.appId === false || this.appId === undefined){
                axios.get(this.$store.state.api + "/forms/form/" + this.formId).then((res) => {
                    this.form = res.data;
                });
            }
            else  {

                if ( this.appType === "grader"){
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

                                        if (a.formApplicant.workshopGraderInfo.workshopGrader.id === graderAppId.id){
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
                }

                else if (this.appType === "att") {
                    axios.get(this.$store.state.api + "/userDetails/" + this.appId).then((res) => {
                        user = res.data;

                        let attAppId = user.roles[0].attenderWorkshopConnection;



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

                                        if (a.formApplicant.workshopAttenderInfo.workshopAttender.id === attAppId.id){
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
                }

            }



        },
        methods: {
            getAnswerFromId(question) {


                if ( Object.keys(this.answers).length === 0 ){
                    return "No Answers Yet";
                }
                let ans = this.answers[question.id];

                // eslint-disable-next-line no-console
                console.log(ans);

                if (ans === null) {
                    return ;
                }

                if (ans.type === 'text'){
                    return ans.answer.answerData[0].text;
                }
                else if (ans.type === 'choice'){
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
                    if ( this.form.questions[i].choicable ){
                        let index;
                        for ( let j = 0 ; j < this.form.questions[i].answerables.length ; ++j ){
                            if (inputs[i].internalValue === this.form.questions[i].answerables[j].text){
                                index = j;
                            }
                        }
                        answerDat = {
                            "choice" : index
                        }
                    }

                    else{
                        answerDat = {
                            "text" : inputs[i].internalValue
                        }
                    }
                    data.push({
                        "questionId": this.form.questions[i].id,
                        "type": this.form.questions[i].choicable ? "ChoiceAnswer" : "TextAnswer",
                        "answerData": answerDat
                    });
                    // }
                }
                // eslint-disable-next-line no-console
                console.log(data)
                if (this.type !== null) {
                    // eslint-disable-next-line no-debugger
                    if (this.type === 'grader') {
                        let attData = {
                            "answerQuestionContexts" : data
                        };
                        axios.post(this.$store.state.api + "/graders/grader/request/offeringWorkshop/" + this.offId + "/answer", attData).then(() => {
                            this.$router.back();
                        });

                    } else if (this.type === 'att') {
                        let attData = {
                            "answerQuestionContexts" : data
                        };
                        // eslint-disable-next-line no-console
                        console.log(attData);
                        axios.post(this.$store.state.api + "/attendees/attendee/request/offeringWorkshop/" + this.offId + "/answer", attData).then((res) => {
                            // eslint-disable-next-line no-console
                            console.log(res);
                            this.$router.back();

                        }).catch()
                    } else if (this.type === 'manager' && this.isAnswer) {
                        axios.get(this.$store.state.api + "/userDetails/offeringWorkshop/" + this.form.offeredWorkshop.id + "/info/" + this.appId).then((res) => {
                            // eslint-disable-next-line no-console
                            console.log("jlfak");
                            // eslint-disable-next-line no-console
                            console.log({
                                formId: this.form.id,
                                applicantId: res.data.id,
                                answerQuestion: data
                            });
                            axios.post(this.$store.state.api + "/workshopManagers/offeringWorkshop/" + this.form.offeredWorkshop.id + "/graderEvaluationForm/answer", {
                                formId: this.form.id,
                                applicantId: res.data.id,
                                answerQuestion: data
                            }).then(() => {
                                this.$router.back();
                            });
                            // eslint-disable-next-line no-console
                            console.log(res);
                        })
                    } else if (this.type === "graderWorkshopForm" && this.isAnswer) {
                        axios.get(this.$store.state.api + "/userDetails/offeringWorkshop/" + this.form.offeredWorkshop.id + "/info/" + this.appId).then((res) => {

                            axios.post(this.$store.state.api + "/workshopGrader/offeringWorkshop/" + this.form.offeredWorkshop.id + "/workshopForm/answer", {
                                formId: this.form.id,
                                applicantId: res.data.id,
                                answerQuestion: data
                            }).then(() => {
                                this.$router.back();

                            })
                        })

                    }
                }
            }
        }
    }
</script>

<style scoped>

    .form {
        /*padding: 0px 50px;*/
    }

    .form-card {
        /*margin: 50px 100px;*/
    }

    .form-header {
        font-size: 24px;
        font-weight: bold;
        padding: 15px 0;
    }

</style>
