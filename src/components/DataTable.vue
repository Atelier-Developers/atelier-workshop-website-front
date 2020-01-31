<template>
    <!--   TODO add avatar to the table-->

    <v-data-table
            :headers="headers"
            :items="items"
            :items-per-page="10"
            item-key="username"
            class="elevation-1">


        <template v-slot:item.action="{ item }">
            <FormOptionIcon :items="menuOptions"
                            :actions="[[() => actionFunction(item.id), () => actionFunction2(item.id)]]"/>
        </template>
    </v-data-table>
</template>

<script>
    import FormOptionIcon from "./FormOptionIcon";

    export default {
        name: "DataTable",
        components: {FormOptionIcon},
        props: [
            "items",
            "headers",
            'graderReqId',
            'actionFunction',
            "isManager",
            "actionFunction2",
            "menuOptions"
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
