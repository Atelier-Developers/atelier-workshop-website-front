<template>
    <!--   TODO add avatar to the table-->

    <v-data-table
            :headers="headers"
            :items="items"
            :items-per-page="10"
            class="elevation-1">


        <template v-slot:item.action="{ item }">
            <FormOptionIcon :items="menuOptions"
                            :actions="[[() => actionFunction(item.id), () => actionFunction2(item.id)]]"/>
        </template>

        <template v-slot:item.status="{ item }">
            <v-btn @click.stop="() =>  actionFunction3(item)" icon>
                <v-icon :color="item.starred ? 'orange' : ''">
                    mdi-star
                </v-icon>
            </v-btn>
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
            "menuOptions",
            "actionFunction3",
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
