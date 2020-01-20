<template>
    <v-row class="my-7">
        <v-col cols="12" class="text-center">
            <v-icon size="150" disabled>{{icon}}</v-icon>
        </v-col>
        <v-col cols="12" class="display-2 font-weight-light text-capitalize text-center grey--text">
            {{title}}
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: "EmptyState",
        props: ['icon', 'title']
    }
</script>

<style scoped>

</style>