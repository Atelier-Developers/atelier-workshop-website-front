<template>
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
                <v-icon left>mdi-lock</v-icon>
                Attendees
            </v-tab>
            <v-tab-item>
                <DataTable :items="group.graders" :headers="headers"/>
            </v-tab-item>
            <v-tab-item>
                <DataTable :items="group.attendees" :headers="headers"/>
            </v-tab-item>
        </v-tabs>
    </v-card>
</template>

<script>
    import DataTable from "./DataTable";

    export default {
        name: "GroupTable",
        components: {DataTable},
        props: ["group"],
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
                    },]
            }

        },
    }
</script>

<style scoped>

</style>