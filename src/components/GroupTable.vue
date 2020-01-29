<template>
    <v-row justify="center" class="ma-5">
        <v-card max-width="900">
            <v-toolbar flat color="primary" dark>
                <v-toolbar-title class="text-capitalize">{{group.groupName}}</v-toolbar-title>
                <v-spacer/>

                <v-btn icon @click="routeToGroupEdit" v-if="isManager">
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
            </v-toolbar>
            <v-tabs vertical>
                <v-tab>
                    <v-icon left>mdi-account</v-icon>
                    Assistant
                </v-tab>
                <v-tab>
                    <v-icon left>mdi-school</v-icon>
                    Attendees
                </v-tab>
                <v-tab-item>
                    <DataTable
                            :items="group.graders"
                            :headers="headers"
                            :is-manager="isManager"
                            :action-function="actionFunctionGrader"
                            :action-function2="actionFunctionGrader2"
                    >
                    </DataTable>
                </v-tab-item>
                <v-tab-item>
                    <DataTable :items="group.attendees" :headers="headers" :action-function="actionFunctionAttendee"
                               :action-function2="actionFunctionAttendee2"/>
                </v-tab-item>
            </v-tabs>
        </v-card>
    </v-row>
</template>

<script>
    import DataTable from "./DataTable";

    export default {
        name: "GroupTable",
        components: {DataTable},
        props: ["group", "isManager", "actionFunctionGrader", "actionFunctionGrader2", "actionFunctionAttendee", "actionFunctionAttendee2", "offId"],

        data() {
            return {
                headers: [{
                    text: "NAME",
                    value: "name",
                    sortable: false,
                    align: 'left',
                },
                    {
                        text: "USERNAME",
                        value: "username",
                        sortable: false,
                        align: 'left',
                    },
                    {text: 'Actions', value: 'action', sortable: false},]
            }

        },
        methods: {
            routeToGroupEdit() {
                // eslint-disable-next-line no-console
                console.log("group");
                // eslint-disable-next-line no-console
                console.log(this.group);
                this.$router.push({
                    name: "Make Group", params: {
                        id: this.offId,
                        editMode: true,
                        groupId: this.group.groupId
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
