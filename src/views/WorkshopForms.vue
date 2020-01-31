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
                <v-row>
                    <v-col cols="12" v-for="(form, i) in forms" :key="form.id">
                        <p class="form-header text-capitalize">
                            {{i + 1}}) {{form.name}}
                        </p>
                        <v-btn outlined @click="() => routeToForm(form.id)" class="mb-3">show form</v-btn>
                        <v-divider/>
                    </v-col>
                </v-row>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "WorkshopForms",
        props: ['forms', 'isAnswer', 'type', 'appId', 'appType', 'showAnswers', 'offId'],
        methods: {
            routeToForm(id) {
                this.$router.replace({
                    name: 'workshopForm', params: {
                        formId: id,
                        isAnswer: this.isAnswer,
                        type: this.type,
                        appId: this.appId,
                        appType: this.appType,
                        offId: this.offId,
                        showAnswers: this.showAnswers
                    }
                })
            },
        }
    }
</script>

<style scoped>

</style>
