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
                        {{this.form[0].name}}
                    </div>
                    <label class="question" v-for="question in this.form[0].questions" :key="question.id">
                        {{question.text}}
                        <v-text-field
                                v-if="!question.choicable"
                                outlined
                                class="form-input"
                        >
                        </v-text-field>
                        <v-select v-else
                                  v-model="select"
                                  :items="question.answerables"
                                  :rules="[v => !!v || 'Item is required']"
                                  label="Item"
                                  required
                                  class="form-input"
                        ></v-select>
                    </label>
                    <v-btn color="primary" @click="sendForm">Submit</v-btn>
                </v-form>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>

    export default {
        name: "Form",
        data() {
            return {
                form: [
                    {
                        "id": 35,
                        "name": "workshop form #1 for python basic",
                        "questions": [
                            {
                                "id": 37,
                                "text": "Describe the attendee's performance?",
                                "answerables": [],
                                "answers": [],
                                "choicable": false
                            }, {
                                "id": 39,
                                "text": "BLahh Blaah Blaah",
                                "answerables": [],
                                "answers": [],
                                "choicable": false
                            }, {
                                "id": 38,
                                "text": "Ye SOal KoSOSOSheerrr",
                                "answerables": [
                                    {
                                        "id": 32,
                                        "text": "great"
                                    },
                                    {
                                        "id": 33,
                                        "text": "poor"
                                    }
                                ],
                                "answers": [],
                                "choicable": true
                            }
                        ],
                        "offeredWorkshop": {
                            "id": 27,
                            "name": "python basic",
                            "startTime": "2019-01-09T04:38:31.000+0000",
                            "endTime": "2019-02-09T04:38:31.000+0000",
                            "price": 12.50,
                            "description": "",
                            "workshop": {
                                "id": 25,
                                "name": "python"
                            },
                            "workshopManager": {
                                "id": 18
                            },
                            "workshopForms": [
                                35
                            ],
                            "workshopRelationDetails": [],
                            "graderEvaluationForm": {
                                "id": 30,
                                "name": "grader eval form for python basic",
                                "questions": [
                                    {
                                        "id": 31,
                                        "text": "How did the grader do?",
                                        "answerables": [
                                            {
                                                "id": 32,
                                                "text": "great"
                                            },
                                            {
                                                "id": 33,
                                                "text": "poor"
                                            }
                                        ],
                                        "answers": [],
                                        "choicable": true
                                    }
                                ],
                                "offeredWorkshop": 27
                            }
                        }
                    }
                ]
            }
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
                        "questionId": this.form[0].questions[i].id,
                        "type": this.form[0].questions[i].choicable ? "ChoiceAnswer" : "TextAnswer",
                        "answerQuestion": inputs[i].internalValue
                    })
                    // }
                }
                // eslint-disable-next-line no-console
                console.log(data);
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
