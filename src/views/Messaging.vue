<template>
    <v-container>
        <ChatromComponent v-for="chatroom in chatrooms"  :user="user" :key="chatroom.id" :chatroom="chatroom"/>
    </v-container>
</template>

<script>
    import axios from 'axios'
    import ChatromComponent from "../components/ChatromComponent";
    export default {
        name: "Messaging",
        components: {ChatromComponent},
        props: ["offId", "user"],
        data(){
            return {
                chatrooms: []
            }
        },
        mounted() {
            axios.get(this.$store.state.api + "/chats/offeringWorkshop/" + this.offId + "/chatter/" + this.user.userChatterConnection.id ).then((res)=>{
                this.chatrooms = res.data;
                // eslint-disable-next-line no-console
                console.log(this.chatrooms)
            })
        }
    }
</script>

<style scoped>

</style>