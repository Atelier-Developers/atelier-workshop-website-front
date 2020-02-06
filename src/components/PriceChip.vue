<template>
    <v-chip
            class="mb-2 title"
            color="green accent-4"
            text-color="white"
    >
        <v-avatar>
            <v-icon left small>fas fa-dollar-sign</v-icon>
        </v-avatar>{{offeredWorkshop.cashPrice}} - {{offeredWorkshop.installmentPrice}}
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