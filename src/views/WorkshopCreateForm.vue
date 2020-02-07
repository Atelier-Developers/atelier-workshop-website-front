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
                <v-container class="questions">
                    <v-text-field label="Form Name" v-model="name" outlined rounded/>
                    <v-row class="question-header" v-if="this.questions.length > 0">
                        <v-col cols="6" class="font-weight-bold">Question</v-col>
                        <v-col cols="6" class="font-weight-bold">Header</v-col>
                        <v-divider></v-divider>
                    </v-row>
                    <v-row class="question" v-for="(question, qindex) in this.questions" :key="qindex">
                        <v-col cols="6" class="d-flex align-center">{{qindex+1}}) {{question.text}}</v-col>
                        <v-col cols="6">
                            <v-row>
                                <v-col cols="6" class="d-flex align-center">
                                    <div class="type">
                                        {{question.type}}
                                    </div>
                                </v-col>
                                <v-col cols="6" v-if="question.type === 'Option'">
                                    <div class="ml-auto text-center">
                                        <v-menu offset-x open-on-hover>
                                            <template v-slot:activator="{ on }">
                                                <v-btn
                                                        class="transparent"
                                                        depressed
                                                        v-on="on"
                                                >
                                                    Show
                                                </v-btn>
                                            </template>
                                            <v-list>
                                                <v-list-item
                                                        v-for="(item, index) in question.options"
                                                        :key="index"
                                                >
                                                    <v-list-item-title>{{index+1}}) {{ item }}</v-list-item-title>
                                                </v-list-item>
                                            </v-list>
                                        </v-menu>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-divider></v-divider>
                    </v-row>
                </v-container>
                <div class="question-adder">
                    <v-container>
                        <v-form
                                v-model="valid"
                                ref="form"
                        >
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                            v-model="question.text"
                                            label="Question"
                                            required
                                            outlined
                                    />
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="6">
                                    <v-select v-model="question.type"
                                              :items="['Text', 'Option']"
                                              :rules="[v => !!v || 'Item is required']"
                                              label="Type"
                                              required
                                              outlined
                                              class="form-input"
                                    />
                                </v-col>
                                <v-col cols="6" v-if="question.type === 'Option'">
                                    <v-form
                                            v-model="valid_option"
                                            ref="form_option"
                                    >
                                        <v-text-field v-model="option" label="Option" required></v-text-field>
                                        <v-btn @click="addOption" class="my-3">Add Option</v-btn>
                                    </v-form>
                                    <div class="options">
                                        <div class="option" v-for="(opt, index) in this.question.options" :key="index">
                                            {{index+1}}) {{opt}}
                                        </div>
                                    </div>
                                </v-col>
                            </v-row>
                            <v-row justify="end">
                                <v-btn @click="addQuestion" color="primary" class="mr-3">Add Question</v-btn>
                                <v-btn @click="sendForm" color="success" class="mr-3" :loading="this.loading"
                                :disabled="questions.length === 0">Submit
                                    Form
                                </v-btn>
                            </v-row>
                            <v-row>

                            </v-row>
                        </v-form>
                    </v-container>
                </div>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "WorkshopCreateForm",
        props: ['graderEval', 'attReg', 'graderReq', 'workshopForm', 'offId'],
        data() {
            return {
                name: "",
                questions: [],
                question: {
                    text: "",
                    type: "",
                    options: []
                },
                option: "",
                valid: false,
                valid_option: false,
                loading: false,
            };
        },
        methods: {
            sendFormData(url, id) {
                this.loading = true;
                let qs = [];
                this.questions.forEach((q) => {
                    if (q.type === 'Text') {
                        qs.push({
                            text: q.text,
                        });
                    } else if (q.type === 'Option') {
                        let answ = [];
                        q.options.forEach((op) => {
                            answ.push({
                                text: op
                            });
                        });
                        qs.push({
                            text: q.text,
                            answerables: answ
                        })
                    }
                });
                axios.post(this.$store.state.api + "/workshopManagers/offeringWorkshop/" + this.offId + '/form/questions', {
                    formId: id,
                    question: qs,

                }).then(() => {
                    this.loading = false;
                    this.$router.replace({
                        name: "Workshop", params: {
                            wId: this.offId
                        }
                    });
                });
            },
            addQuestion() {
                if (!this.valid)
                    return;
                this.questions.push(this.question);
                this.question = {
                    text: "",
                    type: "",
                    options: []
                };
                this.$refs.form.reset();
                this.$refs.form.resetValidation();
            },
            addOption() {
                if (!this.valid_option || this.option === "")
                    return;
                this.question.options.push(this.option);
                this.$refs.form_option.reset();
                this.$refs.form_option.resetValidation();
            },
            submitForm(url) {
                axios.post(this.$store.state.api + "/workshopManagers/offeringWorkshop/" + this.offId + '/' + url, {
                    name: this.name
                }).then((res) => {
                    this.sendFormData(url, res.data.id)
                })
            },
            sendForm() {
                if (this.graderEval) {
                    this.submitForm("graderEvaluationForm")
                } else if (this.attReg) {
                    this.submitForm("attenderRegisterForm")
                } else if (this.graderReq) {
                    this.submitForm("graderRequestForm")
                } else if (this.workshopForm) {
                    this.submitForm("workshopForms")
                }

            }
        }
    }
</script>

<style scoped>
    .menu-btn {
    }
</style>
