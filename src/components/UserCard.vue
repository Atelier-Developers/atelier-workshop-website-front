<template>
    <v-card
            raised
            max-width="200"
    ><!-- TODO check this -->
        <v-avatar
                class="ma-3 elevation-10"
                size="170"
        >
            <v-img src="https://i.udemycdn.com/course/240x135/625204_436a_2.jpg"/>
        </v-avatar>
        <v-card-title>
            {{user.name}}
        </v-card-title>
    </v-card>
</template>

<script>
    export default {
        name: "UserCard",
        props: [
            "user",
        ]
    }
</script>

<style scoped>

</style>
