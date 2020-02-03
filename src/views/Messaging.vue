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
                            <v-row>
                                <v-col cols="12" md="6" v-if="this.type === 'Manager'">
                                    <v-select
                                            v-model="selectedUsers"
                                            :items="this.users.graderUsers"
                                            item-value="userId"
                                            item-text="name"
                                            multiple
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-select v-if="this.type === 'Manager'"
                                              v-model="selectedUsers"
                                              :items="this.users.attUsers"
                                              item-value="userId"
                                              item-text="name"
                                              multiple
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-select
                                            v-if="this.type !== 'Manager'"
                                            v-model="selectedUsers"
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
                        <v-btn text color="primary" @click="uploadImage" :loading="isUploading">Submit</v-btn>
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
                selectedUsers: null,
                users: null,
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
        }
    }
</script>

<style scoped>

</style>
