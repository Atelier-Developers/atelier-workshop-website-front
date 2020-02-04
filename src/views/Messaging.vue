<template>
    <v-container>
        <ChatromComponent v-for="chatroom in chatrooms" :user="user" :key="chatroom.id" :chatroom="chatroom"/>
        <v-dialog v-model="dialog" max-width="500px">
            <v-card class="py-3 px-3">
                <v-form>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                            label="Name *"
                                            v-model="chat.name"
                                            outlined
                                    />
                                </v-col>
                            </v-row>
                            <v-row justify="center">
                                <v-col cols="12" md="6" v-if="this.type === 'Manager'">
                                    <v-select
                                            label="Assistant"
                                            v-model="selectedGraders"
                                            :items="this.users.graderUsers"
                                            item-value="userId"
                                            item-text="name"
                                            multiple
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-select v-if="this.type === 'Manager'"
                                              label="Attenders"
                                              v-model="selectedAttendees"
                                              :items="this.users.attUsers"
                                              item-value="userId"
                                              item-text="name"
                                              multiple
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" md="6" class="">
                                    <v-select
                                            label="Managers"
                                            v-if="this.type !== 'Manager'"
                                            v-model="selectedManagers"
                                            :items="this.users.managerUsers"
                                            item-value="userId"
                                            item-text="name"
                                            multiple
                                    ></v-select>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn text color="primary" @click="createChatroom" :loading="isLoading">Submit</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>
        <v-btn
                class="mb-5 mr-5"
                fab
                color="primary"
                bottom
                small
                right
                fixed
                elevation="5"
                @click="dialog = !dialog"
        >
            <v-icon size="30">mdi-plus</v-icon>
        </v-btn>

    </v-container>
</template>

<script>
    import axios from 'axios'
    import ChatromComponent from "../components/ChatromComponent";

    export default {
        name: "Messaging",
        components: {ChatromComponent},
        props: ["offId", "user", "type"],
        data() {
            return {
                chatrooms: [],
                dialog: false,
                chat: {
                    name: "",
                },
                selectedGroup: null,
                selectedManagers: null,
                selectedGraders: null,
                selectedAttendees: null,
                users: null,
                isLoading: false
            }
        },
        computed: {
            accessGroup() {
                if (this.type === "Manager")
                    return ["Attendees", "Assistants"];
                else
                    return ["Managers"];
            },
            showUsers() {
                if (this.selectedGroup === "Managers") {
                    return this.users.managerUser;
                }
                if (this.selectedGroup === "Attendees") {
                    return this.users.GraderUsers;
                }
                if (this.selectedGroup === "Assistants") {
                    return this.users.AttUsers;
                }
                return [];
            },
        },
        mounted() {
            axios.get(this.$store.state.api + "/chats/offeringWorkshop/" + this.offId + "/chatter/" + this.user.userChatterConnection.id).then((res) => {
                this.chatrooms = res.data;
                // eslint-disable-next-line no-console
                console.log(this.chatrooms)
            });
            axios.get(`${this.$store.state.api}/userDetails/offeringWorkshop/${this.offId}/info/users`)
                .then((res) => {
                    this.users = res.data;
                })
        },
        methods: {
            createChatroom() {
                let users2 = {
                    name: this.chat.name,
                    userIds: [],
                };
                // eslint-disable-next-line no-debugger
                debugger;
                // users2.userIds.concat(this.selectedManagers);
                // users2.userIds.concat(this.selectedAttendees);
                // users2.userIds.concat(this.selectedGraders);
                for (let fuckingId in this.selectedManagers)
                    users2.userIds.push(this.selectedManagers[fuckingId]);
                for (let fuckingId2 in this.selectedAttendees)
                    users2.userIds.push(this.selectedAttendees[fuckingId2]);
                for (let fuckingId3 in this.selectedGraders)
                    users2.userIds.push(this.selectedGraders[fuckingId3]);
                users2.userIds.push(this.user.id);

                this.isLoading = true
                // eslint-disable-next-line no-console
                console.log(users2);
                axios.post(`${this.$store.state.api}/chats/offeringWorkshop/${this.offId}/chatrooms`, users2)
                    .then(() => {
                        this.isLoading = false
                        this.dialog = false;
                        let location = {
                            name: "Messaging", params: {
                                offId: this.offId, user: this.user, type: this.type,
                            }
                        }
                        this.$router.replace("/");
                        this.$nextTick(() => this.$router.replace(location))
                    });
            }
        }
    }
</script>

<style scoped>

</style>
