<template>
    <v-row justify="center" class="ma-5">
        <v-card max-width="900">
            <v-toolbar flat color="primary" dark>
                <v-toolbar-title class="text-capitalize">{{group.groupName}}</v-toolbar-title>
            </v-toolbar>
            <v-tabs vertical>
                <v-tab>
                    <v-icon left>mdi-account</v-icon>
                    Graders
                </v-tab>
                <v-tab>
                    <v-icon left>mdi-school</v-icon>
                    Attendees
                </v-tab>
                <v-tab-item>
                    <DataTable :items="group.graders" :headers="headers" :is-manager="isManager">
                    </DataTable>
                </v-tab-item>
                <v-tab-item>
                    <DataTable :items="group.attendees" :headers="headers"/>
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
        props: ["group", "isManager"],

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
    }
</script>

<style scoped>

</style>