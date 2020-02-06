<template>
    <v-chip
            class="mb-2 title"
            color="green accent-4"
            text-color="white"
    >
     ${{offeredWorkshop.cashPrice}} - ${{offeredWorkshop.installmentPrice}}
    </v-chip>
</template>

<script>
    export default {
        name: "PriceChip",
        props: ['offeredWorkshop']
    }
</script>

<style scoped>

</style>