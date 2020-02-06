<template>
    <div class="mt-8">
            <strong class="mr-2 title">Cash</strong>
            <v-chip
                    class="mb-2 title mr-5"
                    color="green accent-4"
                    text-color="white"
            >
                <span>${{offeredWorkshop.cashPrice}}</span>
            </v-chip>
            <strong class="mr-2 title">Installment</strong>

            <v-chip
                    class="mb-2 title"
                    color="green accent-4"
                    text-color="white"
            >
                <span>${{offeredWorkshop.installmentPrice}}</span>
            </v-chip>
    </div>

</template>

<script>
    export default {
        name: "PriceChip",
        props: ['offeredWorkshop']
    }
</script>

<style scoped>

</style>