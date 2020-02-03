<template>
    <v-container>
        <ChatromComponent v-for="chatroom in chatrooms" :user="user" :key="chatroom.id" :chatroom="chatroom"/>
        <v-dialog v-model="dialog" max-width="500px">
            <v-card class="py-3 px-3">
                <v-form>
                    <v-card-text>
                        <v-text-field
                                label="Name *"
                                v-model="chat.name"
                                outlined
                        />

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
        props: ["offId", "user"],
        data() {
            return {
                chatrooms: [],
                dialog: false,
                chat: {
                    name: "",
                }
            }
        },
        mounted() {
            axios.get(this.$store.state.api + "/chats/offeringWorkshop/" + this.offId + "/chatter/" + this.user.userChatterConnection.id).then((res) => {
                this.chatrooms = res.data;
                // eslint-disable-next-line no-console
                console.log(this.chatrooms)
            })
        }
    }
</script>

<style scoped>

</style>