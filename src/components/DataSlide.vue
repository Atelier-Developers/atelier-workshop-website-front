<template>
    <v-sheet
            class="mx-auto"
            max-width="700"
    >
        <v-slide-group multiple show-arrows>
            <v-slide-item
                    v-for="user in this.users"
                    :key="user.id"
                    v-slot:default="{ active, toggle }"
            > <!--TODO check toggle -->
                <UserCard
                    :user="user"
                ></UserCard>
            </v-slide-item>
        </v-slide-group>
    </v-sheet>
</template>

<script>
    import UserCard from "./UserCard";
    export default {
        name: "DataSlide",
        components: {UserCard},
        props:[
            "users",
        ]
    }
</script>

<style scoped>

</style>
