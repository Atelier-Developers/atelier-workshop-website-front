<template>
<!--   TODO add avatar to the table-->

    <v-data-table
            :headers="this.headers"
            :items="this.items"
            :items-per-page="10"
            class="elevation-1">

        <slot></slot>
        <!--                    <v-btn class="mx-2" fab dark small color="pink"  @click="x(row.item)">-->
        <!--                        <v-icon dark>mdi-heart</v-icon>-->
        <!--                    </v-btn>-->

    </v-data-table>
</template>

<script>
    export default {
        name: "DataTable",
        props: [
            "items",
            "headers"
        ]
    }
</script>

<style scoped>

</style>
