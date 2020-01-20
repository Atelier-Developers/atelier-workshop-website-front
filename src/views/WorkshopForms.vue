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
                        <v-btn outlined @click="() => routeToForm(form.id)">show form</v-btn>
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
        props: ['forms', 'isAnswer', 'type'],
        methods: {
            routeToForm(id) {
                this.$router.push({
                    name: 'workshopForm', params: {
                        formId: id,
                        isAnswer: this.isAnswer,
                        type: this.type
                    }
                })
            },
        }
    }
</script>

<style scoped>

</style>