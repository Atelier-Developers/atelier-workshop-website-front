<template>
    <v-card class="mb-5">
        <v-row>
            <v-col cols="12" sm="7" md="9">
                <v-card-title>{{chatroom.name}}</v-card-title>
                <v-card-subtitle class="text-capitalize">{{chatroom.chatters.length}} participants</v-card-subtitle>
            </v-col>
            <v-col cols="12" sm="5" md="3">
                <v-row justify="center" align="center" class="fill-height">
                    <v-btn outlined color="primary" @click="() => this.$router.replace({name: 'Chatroom', params: {
                        chatroom: chatroom,
                        user: user
                    }})">
                        <v-icon left>fa-comments</v-icon>
                       show</v-btn>
                </v-row>
            </v-col>
        </v-row>

    </v-card>
</template>

<script>
    export default {
        name: "ChatromComponent",
        props: ["chatroom", "user"],
        methods: {
        }
    }
</script>

<style scoped>

</style>