<template>
    <v-container>
        <v-dialog v-model="groupDialog" max-width="500px">
            <v-card class="py-3 px-3">
                <v-card-text>
                    <v-form>
                        <v-text-field
                                label="Group Name"
                                v-model="newGroup.name"
                        ></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="addGroup">Add Group</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-row>
            <v-col cols="12" md="4">
                <!--                ATTENDEES-->
                <v-select
                        v-model="roles.selectedAtt"
                        :items="this.roles.att"
                        multiple
                ></v-select>
            </v-col>
            <v-col cols="12" md="4">
                <!--                GRADERS-->
                <v-select
                        v-model="roles.selectedGrader"
                        :item-text="this.roles.grader"
                        multiple
                ></v-select>
            </v-col>
            <v-col cols="12" md="4">
                <v-btn @click="addMembers">Add to Group</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="4">
                <v-select
                        v-model="selectedGroup"
                        items="groups"
                ></v-select>
            </v-col>
            <v-col cols="12" md="4">
            </v-col>
            <v-col cols="12" md="4">
                <v-btn @click="showGroupDialog">Make Group</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "MakeGroups",
        data() {
            return {
                groups: [],
                newGroup: {
                    name: "",
                    id: ""
                },
                roles: {
                    att: [],
                    selectedAtt: [],

                    grader: [],
                    selectedGrader: [],
                },

                groupDialog: false,
            }
        },
        mounted() {
            axios.get(this.$store.state.api
                + "/workshopManagers/offeringWorkshop/"
                + this.id
                + "/groupless/graderInfos").then((res) => {
                // eslint-disable-next-line no-console
                console.log(res.data);
                this.roles.graders = res.data; // TODO these are just ids..., we need names. its bad to request for everybody's name
            });
            axios.get(this.$store.state.api
                + "/workshopManagers/offeringWorkshop/"
                + this.id
                + "/groupless/attendeeInfos").then((res) => {
                this.roles.att = res.data; // TODO these are just ids..., we need names. its bad to request for everybody's name
            });
            axios.get(this.$store.state.api
                + "/workshopManagers/offeringWorkshop/"
                + this.id
                + "/groups").then((res) => {
                this.groups = res.data;
            })
        },
        methods: {
            addGroup() {
                axios.post(this.$store.state.api + "/workshopManagers/offeringWorkshop/group",
                    {text: this.newGroup.name})
                    .then((res) => {
                        // eslint-disable-next-line no-console
                        console.log(res.data);
                        this.newGroup.id = res.data.id;
                        this.groups.push(res.data);
                        this.newGroup = {
                            name: "",
                            id: ""
                        };
                        this.groupDialog = false;
                    })

            },
            addMembers() {
                axios.post("SOME URL", this.roles.selectedGrader + this.roles.selectedAtt); // TODO waiting for API
            },
            showGroupDialog() {
                this.groupDialog = true;
            }

        }
    }
</script>

<style scoped>

</style>
