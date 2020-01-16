<template>
    <v-content>
        <v-text-field v-model="name" placeholder="workshop name"/>
        <v-btn
                class="ma-2"
                color="secondary"
                @click="addWorkshop"
        >
            Add Workshop
        </v-btn>
    </v-content>
</template>

<script>
    import axios from "axios"
    export default {
        name: "AddWorkshop",
        data() {
            return {
                "name": "",
            }
        }, methods: {
            addWorkshop() {
                let apiUrl = this.$store.state.api;
                axios.post(apiUrl + "/workshop//workshops")
            }
        }
    }
</script>

<style scoped>

</style>