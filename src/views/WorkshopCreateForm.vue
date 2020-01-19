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
                <div class="questions">
                    <div class="question" v-for="question in this.questions" :key="question.text">
                        {{question.text}},,,,{{question.type}}
                    </div>
                </div>
                <div class="question-adder">
                    <v-container>
                        <v-form
                                v-model="valid"
                                ref="form"
                        >
                            <v-row>
                                <v-text-field v-model="question.text"></v-text-field>
                                <v-select v-model="question.type"
                                          :items="['Text', 'Option']"
                                          :rules="[v => !!v || 'Item is required']"
                                          label="Item"
                                          required
                                          class="form-input"
                                ></v-select>
                            </v-row>
                            <v-row>
                                <v-btn @click="addQuestion">Add</v-btn>
                            </v-row>
                        </v-form>
                    </v-container>
                </div>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "WorkshopCreateForm",
        data() {
            return {
                questions: [],
                question: {
                    "text": "",
                    "type": "",
                    "options": ""
                },
                valid: false
            };
        },

        methods: {
            addQuestion() {
                if (!this.valid)
                    return;
                this.questions.push(this.question);
                this.question = {
                    "text": "",
                    "type": "",
                    "options": ""
                };
                this.$refs.form.reset();
                this.$refs.form.resetValidation();
            }
        }
    }
</script>

<style scoped>

</style>
