<template>
    <v-card>
        <v-toolbar flat color="primary" dark>
            <v-toolbar-title>{{group.name}}</v-toolbar-title>
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
                <DataTable :items="group.attenders" :headers="headers"/>
            </v-tab-item>
            <v-tab-item>
                <DataTable :items="group.graders" :headers="headers"/>
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
                headers: ["Name", "username"]
            }

        }
    }
</script>

<style scoped>

</style>