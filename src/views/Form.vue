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
                        </template>
                            <v-select v-if="question.answerables.length > 0"
                                      :items="question.answerables"
                                      :rules="[v => !!v || 'Item is required']"
                                      label="Options"
                                      required
                                      class="form-input ma-4"
                            />
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
        props: ['formId', 'isAnswer', 'type', 'appId'],
        data() {
            return {
                form: null,
            }
        },
        mounted() {
            axios.get(this.$store.state.api + "/forms/form/" + this.formId).then((res) => {
                this.form = res.data;
            })
        },
        methods: {
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
                    data.push({
                        "questionId": this.form.questions[i].id,
                        "type": this.form.questions[i].choicable ? "ChoiceAnswer" : "TextAnswer",
                        "answerQuestion": inputs[i].internalValue
                    });

                    if (this.type !== null) {
                        if (this.type === 'grader') {
                            axios.post(this.$store.state.api + "/graders/grader/request/offeringWorkshop/" + this.form.offeredWorkshop.id + "/answer", data)

                        } else if (this.type === 'att') {
                            axios.post(this.$store.state.api + "/attendees/attendee/request/offeringWorkshop/" + this.form.offeredWorkshop.id + "/answer", data)
                        } else if (this.type === 'manager' && this.isAnswer) {
                            axios.post(this.$store.state.api + "/offeringWorkshop/offeringWorkshop/" + this.form.offeredWorkshop.id + "/graderEvaluationForm/answer", {
                                formId: this.form.id,
                                applicantId: this.appId,
                                answerQuestion: data
                            })
                        }
                    }
                    // }
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
