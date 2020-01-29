<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="4">
                <!--                ATTENDEES-->
                <v-select
                        v-model="roles.selectedAtt"
                        :items="this.roles.att"
                        :item-text="getItemName"
                        item-value="infoId"
                        label="Attendees"
                        solo
                        multiple
                />
            </v-col>
            <v-col cols="12" md="4">
                <!--                GRADERS-->
                <v-select
                        v-model="roles.selectedGrader"
                        :items="this.roles.graders"
                        label="Assistants"
                        solo
                        :item-text="getItemName"
                        item-value="infoId"
                        multiple
                />
            </v-col>
        </v-row>
        <v-row justify="center">
            <template v-if="editMode">
                <v-col cols="12" md="4">
                    <v-btn @click="editGroup" :loading="loading">edit Group</v-btn>
                </v-col>
            </template>
            <template v-else>
                <v-col cols="12" md="4">
                    <v-form>
                        <v-text-field
                                label="Group Name"
                                v-model="newGroup.name"
                                validate-on-blur
                                :rules="[v => !!v ||'name is required!']"
                        />
                    </v-form>
                </v-col>
                <v-col cols="12" md="4">
                    <v-btn @click="addGroup" :loading="loading">Make Group</v-btn>
                </v-col>
            </template>
        </v-row>
    </v-container>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "MakeGroups",
        props: ['id', "editMode", "groupId"],
        data() {
            return {
                groups: [],
                newGroup: {
                    name: "",
                    id: ""
                },
                selectedGroup : {},
                roles: {
                    att: [],
                    selectedAtt: [],
                    graders: [],
                    selectedGrader: [],
                },
                loading: false
            }
        },
        mounted() {
            axios.get(this.$store.state.api
                + "/workshopManagers/offeringWorkshop/"
                + this.id
                + "/groupless/graderInfos").then((res) => {
                // eslint-disable-next-line no-console
                console.log("graderss")
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
            getItemName(item){
                return item.user.name;
            },
            addGroup() {
                this.loading = true;
                axios.post(this.$store.state.api + "/workshopManagers/offeringWorkshop/"
                + this.id
                + "/groups",
                    [{name: this.newGroup.name, gradersId: this.roles.selectedGrader, attendersId: this.roles.selectedAtt}])
                    .then((res) => {
                        // eslint-disable-next-line no-console
                        console.log(res)
                        this.$router.replace({name: "Workshop", params: {wId: this.id}})
                    })

            },
            editGroup(){
                this.loading = true;
                axios.put(this.$store.state.api + "/workshopManagers/offeringWorkshop/"
                    + this.id
                    + "/groups",
                    {groupId: this.groupId, gradersId: this.roles.selectedGrader, attendersId: this.roles.selectedAtt})
                    .then(() => {
                        this.$router.replace({name: "Workshop", params: {id: this.id}})
                    })
            }
        }
    }
</script>

<style scoped>

</style>
