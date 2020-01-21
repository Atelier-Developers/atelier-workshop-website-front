<template>
    <!--   TODO add avatar to the table-->

    <v-data-table
            :headers="headers"
            :items="items"
            :items-per-page="10"
            class="elevation-1">

        <template v-slot:item.action="{ item }" v-if="actionFunction != null">
            <v-icon
                    small
                    class="mr-2"
                    @click="() => actionFunction(item.id)"
            >
                fas fa-eye
            </v-icon>
            <v-icon
                    small
                    class="mr-2"
                    @click="() => actionFunction2(item.id)"
            >
                fas fa-eye
            </v-icon>
        </template>
    </v-data-table>
</template>

<script>
    export default {
        name: "DataTable",
        props: [
            "items",
            "headers",
            'graderReqId',
            'actionFunction',
            "isManager",
            "actionFunction2"
        ],
        methods: {
            sendAppId(id) {
                this.$router.push({
                    name: 'workshopForm', params: {
                        formId: id,
                        isAnswer: false,
                    }
                })
            },
            routeToForm(id) {
                this.$router.push({
                    name: 'workshopForm', params: {
                        formId: id,
                        isAnswer: this.isAnswer,
                        type: this.type
                    }
                })
            },
        },
    }
</script>

<style scoped>

</style>
