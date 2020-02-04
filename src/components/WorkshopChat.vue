<template>
    <v-container>
        <Chat
                style="height: 620px"
                :participants="partNames"
                :myself="myself"
                :messages="messages"
                :onMessageSubmit="onMessageSubmit"
                :chatTitle="chatroom.name"
                :placeholder="placeholder"
                :colors="colors"
                :borderStyle="borderStyle"
                :hideCloseButton="true"
                :submitIconSize="submitIconSize"
                class="elevation-5 mt-5"
                :scroll-bottom="scrollBottom">
        </Chat>
    </v-container>
</template>

<script>
    import {Chat} from 'vue-quick-chat';
    import 'vue-quick-chat/dist/vue-quick-chat.css';
    import axios from "axios";

    export default {
        name: "WorkshopChat",
        props: ["chatroom", "user"],
        components: {
            Chat
        },
        mounted() {
            axios.get(this.$store.state.api + "/chats/chat/" + this.chatroom.id + "/read/" + this.user.id).then((res) => {
                this.messages = res.data;
                axios.get(this.$store.state.api + "/chats/chat/" + this.chatroom.id + "/unread/" + this.user.id).then((res) => {
                    this.messages.push(...res.data);
                })

            })
            axios.all([
                axios.get(this.$store.state.api + "/chats/chat/" + this.chatroom.id + "/participants")])
                .then((res) => {
                    this.participants = res[0].data;
                    this.myself.name = this.user.name;
                    this.myself.id = this.user.userChatterConnection.id;
                })
        },
        data() {
            return {
                chatColor: "#2196F3",
                visible: true,
                participants: [],
                myself: {},
                messages: [],
                placeholder: 'send your message',
                borderStyle: {
                    topLeft: "10px",
                    topRight: "10px",
                    bottomLeft: "10px",
                    bottomRight: "10px",
                },
                submitIconSize: "30px",
                scrollBottom: {
                    messageSent: true,
                    messageReceived: false
                },
                displayHeader: true
            }
        },
        computed: {
            colors: function () {
                return {
                    header: {
                        bg: '#314992',
                        text: '#fff'
                    },
                    message: {
                        myself: {
                            bg: 'rgba(52, 167, 46, 1)',
                            text: '#ffffff'
                        },
                        others: {
                            bg: this.chatColor,
                            text: '#fff'
                        },
                        messagesDisplay: {
                            bg: '#f7f3f3',
                        }
                    },
                    bg: this.chatColor,
                }
            },
            partNames: function () {
                let users = [];
                this.participants.forEach((par) => {
                    if (par.id !== this.myself.id) {
                        users.push(par);
                    }
                })
                return users;
            }
        },
        methods: {
            onMessageSubmit: function (message) {
                axios.post(this.$store.state.api + "/chats/chat/" + this.chatroom.id + "/message", {
                    text: message.content
                })
            },
            loadMoreMessages() {
                // TODO add live message
            },
        }
    }
</script>

<style scoped>

</style>