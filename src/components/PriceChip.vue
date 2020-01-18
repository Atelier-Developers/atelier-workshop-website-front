<template>
    <v-chip
            class="mb-2"
            color="teal"
            text-color="white"

    >
        $ {{this.price}}
    </v-chip>
</template>

<script>
    export default {
        name: "PriceChip",
        props: ['price']
    }
</script>

<style scoped>

</style>