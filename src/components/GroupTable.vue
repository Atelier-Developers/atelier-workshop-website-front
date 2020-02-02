<template>
    <v-row justify="center" class="ma-5">
        <v-card max-width="900">
            <v-toolbar flat color="primary" dark>
                <v-toolbar-title class="text-capitalize">{{group.groupName}}</v-toolbar-title>
                <v-spacer/>
                <template  v-if="isManager">
                    <v-btn icon @click="routeToGroupEdit">
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn icon @click="() => deleteGroup(group.groupId)">
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </template>

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
                <template v-if="viewType === 'manager'">
                    <v-tab-item>
                        <DataTable
                                :items="group.graders"
                                :headers="headerGrader"
                                :menu-options="menuGraderOptions"
                                :is-manager="isManager"
                                :action-function="actionFunctionGrader"
                                :action-function2="actionFunctionGrader2"
                        >
                        </DataTable>
                    </v-tab-item>
                    <v-tab-item>
                        <DataTable :items="group.attendees" :headers="headerAttendee"
                                   :menu-options="menuAttendeeOption"
                                   :action-function="actionFunctionAttendee"/>
                    </v-tab-item>
                </template>
                <template v-if="viewType === 'manager'">
                    <v-tab-item>
                        <DataTable
                                :items="group.graders"
                                :headers="headerGrader"
                                :menu-options="menuGraderOptions"
                                :is-manager="isManager"
                                :action-function="actionFunctionGrader"
                                :action-function2="actionFunctionGrader2"
                        >
                        </DataTable>
                    </v-tab-item>
                    <v-tab-item>
                        <DataTable :items="group.attendees" :headers="headerAttendee"
                                   :menu-options="menuAttendeeOption"
                                   :action-function="actionFunctionAttendee"/>
                    </v-tab-item>
                </template>
                <template v-else-if="viewType === 'grader'">
                    <v-tab-item>
                        <DataTable
                                :items="group.graders"
                                :headers="headerGrader"
                                :menu-options="menuGraderOptions"
                                :is-manager="isManager"
                        >
                        </DataTable>
                    </v-tab-item>
                    <v-tab-item>
                        <DataTable :items="group.attendees" :headers="headerAttendee"
                                   :menu-options="menuAttendeeOption"
                                   :action-function="actionFunctionAttendee"
                                   :action-function2="actionFunctionAttendee2"/>
                    </v-tab-item>
                </template>
                <template v-else-if="viewType === 'attendee'">
                    <v-tab-item>
                        <DataTable
                                :items="group.graders"
                                :headers="headerGrader"
                                :menu-options="menuGraderOptions"
                                :is-manager="isManager"
                        >
                        </DataTable>
                    </v-tab-item>
                    <v-tab-item>
                        <DataTable :items="group.attendees" :headers="headerAttendee"
                                   :menu-options="menuAttendeeOption"
                        />
                    </v-tab-item>
                </template>

            </v-tabs>
        </v-card>
    </v-row>
</template>

<script>
    import DataTable from "./DataTable";
    import axios from 'axios'
    export default {
        name: "GroupTable",
        components: {DataTable},
        props: ["group", "isManager", "actionFunctionGrader", "actionFunctionGrader2", "actionFunctionAttendee", "actionFunctionAttendee2", "offId", "viewType"],

        data() {
            return {}

        },
        computed: {
            headerGrader() {
                let header = [{
                    text: "NAME",
                    value: "name",
                    sortable: true,
                    align: 'left',
                },
                    {
                        text: "USERNAME",
                        value: "username",
                        sortable: false,
                        align: 'center',
                    },
                    {
                        text: "EMAIL",
                        value: "email",
                        sortable: false,
                        align: 'center',
                    },];
                if (this.viewType === "manager") {
                    header.push(...[{text: 'Action', value: 'action', sortable: false, align: 'center'}])
                }
                return header;
            },
            headerAttendee() {
                let header = [{
                    text: "NAME",
                    value: "name",
                    sortable: true,
                    align: 'left',
                },
                    {
                        text: "USERNAME",
                        value: "username",
                        sortable: false,
                        align: 'center',
                    },
                    {
                        text: "EMAIL",
                        value: "email",
                        sortable: false,
                        align: 'center',
                    },];
                if (this.viewType === "manager") {
                    header.push(...[{text: 'Action', value: 'action', sortable: false, align: 'center'}])
                } else if (this.viewType === "grader") {
                    header.push(...[{text: 'Action', value: 'action', sortable: false, align: 'center'}])
                }
                return header;
            },
            menuGraderOptions: function () {
                if (this.viewType === "manager") {
                    return [
                        {
                            title: "Assistant Evaluation Form",
                            items: [
                                {
                                    title: "Show Form",
                                }
                                ,
                                {
                                    title: "Answer Form",
                                }
                            ]
                        }
                    ]
                }
                return null;
            },
            menuAttendeeOption: function () {
                if (this.viewType === "manager") {
                    return [
                        {
                            title: "Workshop Forms",
                            items: [
                                {
                                    title: "Show Forms",
                                }
                            ]
                        }
                    ]
                } else if (this.viewType === "grader") {
                    return [
                        {
                            title: "Workshop Forms",
                            items: [
                                {
                                    title: "Show Forms",
                                }
                                ,
                                {
                                    title: "Answer Forms",
                                }
                            ]
                        }
                    ]
                }
                return null
            }
        },
        methods: {
            deleteGroup(id){
                // eslint-disable-next-line no-console
                console.log(id)
                axios.delete(this.$store.state.api + "/workshopManagers/offeringWorkshop/group/" + id).then(() => {
                        this.$router.go(0)
                })
            },
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
