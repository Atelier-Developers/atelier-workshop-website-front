<template>
    <v-container>
        <v-card outlined>
            <Chat
                    :participants="participants"
                    :myself="myself"
                    :messages="messages"
                    :onMessageSubmit="onMessageSubmit"
                    :chatTitle="chatTitle"
                    :placeholder="placeholder"
                    :colors="colors"
                    :borderStyle="borderStyle"
                    :hideCloseButton="hideCloseButton"
                    :closeButtonIconSize="closeButtonIconSize"
                    :submitIconSize="submitIconSize"
                    :load-more-messages="toLoad.length > 0 ? loadMoreMessages : null"
                    :asyncMode="asyncMode"
                    :scroll-bottom="scrollBottom">
            </Chat>
        </v-card>
    </v-container>
</template>

<script>
    import {Chat} from 'vue-quick-chat';
    import 'vue-quick-chat/dist/vue-quick-chat.css';

    export default {
        name: "WorkshopChat",
        components: {
            Chat
        },
        data() {
            return {
                chatColor: "#2196F3",
                visible: true,
                participants: [
                    {
                        name: 'Arnaldo',
                        id: 1
                    },
                    {
                        name: 'José',
                        id: 2
                    }
                ],
                myself: {
                    name: 'Matheus S.',
                    id: 3
                },
                messages: [
                    {
                        content: 'received messages',
                        myself: false,
                        participantId: 1,
                        timestamp: {year: 2019, month: 3, day: 5, hour: 20, minute: 10, second: 3, millisecond: 123}
                    },
                    {
                        content: 'sent messages',
                        myself: true,
                        participantId: 3,
                        timestamp: {year: 2019, month: 4, day: 5, hour: 19, minute: 10, second: 3, millisecond: 123}
                    },
                    {
                        content: 'other received messages',
                        myself: false,
                        participantId: 2,
                        timestamp: {year: 2019, month: 5, day: 5, hour: 10, minute: 10, second: 3, millisecond: 123}
                    }
                ],
                chatTitle: 'Chat Room',
                placeholder: 'send your message',
                borderStyle: {
                    topLeft: "10px",
                    topRight: "10px",
                    bottomLeft: "10px",
                    bottomRight: "10px",
                },
                hideCloseButton: false,
                submitIconSize: "30px",
                closeButtonIconSize: "20px",
                asyncMode: false,
                toLoad: [
                    {
                        content: 'Hey, John Doe! How are you today?',
                        myself: false,
                        participantId: 2,
                        timestamp: {year: 2011, month: 3, day: 5, hour: 10, minute: 10, second: 3, millisecond: 123},
                        uploaded: true,
                        viewed: true
                    },
                    {
                        content: "Hey, Adam! I'm feeling really fine this evening.",
                        myself: true,
                        participantId: 3,
                        timestamp: {year: 2010, month: 0, day: 5, hour: 19, minute: 10, second: 3, millisecond: 123},
                        uploaded: true,
                        viewed: true
                    },
                ],
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
                        bg: '#fff',
                        text: this.chatColor
                    },
                    message: {
                        myself: {
                            bg: '#fff',
                            text: '#bdb8b8'
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
        },
        methods: {
            onType: function () {
                //here you can set any behavior
            },
            loadMoreMessages(resolve) {
                setTimeout(() => {
                    resolve(this.toLoad); //We end the loading state and add the messages
                    //Make sure the loaded messages are also added to our local messages copy or they will be lost
                    this.messages.unshift(...this.toLoad);
                    this.toLoad = [];
                }, 1000);
            },
            onMessageSubmit: function (message) {
                /*
                * example simulating an upload callback.
                * It's important to notice that even when your message wasn't send
                * yet to the server you have to add the message into the array
                */
                this.messages.push(message);

                /*
                * you can update message state after the server response
                */
                // timeout simulating the request
                setTimeout(() => {
                    message.uploaded = true
                }, 2000)
            },
            onClose() {
                this.visible = false;
            }
        }
    }
</script>

<style scoped>

</style>