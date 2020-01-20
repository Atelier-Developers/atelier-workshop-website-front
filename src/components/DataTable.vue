<template>
    <!--   TODO add avatar to the table-->

    <v-data-table
            :headers="headers"
            :items="items"
            :items-per-page="10"
            class="elevation-1">

        <template v-slot:item.action="{ item }" v-if="isManager">
            <v-icon
                    small
                    class="mr-2"
                    @click="() => sendAppId(item.id)"
            >
                fas fa-edit
            </v-icon>
        </template>
        <!--                    <v-btn class="mx-2" fab dark small color="pink"  @click="x(row.item)">-->
        <!--                        <v-icon dark>mdi-heart</v-icon>-->
        <!--                    </v-btn>-->

    </v-data-table>
</template>

<script>
    export default {
        name: "DataTable",
        props: [
            "items",
            "headers",
            'graderReqId',

            "isManager"
        ],
        methods: {
            sendAppId(id) {
                this.$store.commit('setAppId', id);
                this.$store.commit('setShowFormValue', true);
                this.$store.commit('setGraderEval', true);
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
