<template>
    <v-data-table
            :headers="this.headers"
            :items="this.items"
            :items-per-page="10"
            class="elevation-1">
        <template v-slot:item="row">
            <tr>
                <td v-for="value in row.item" v-bind:key="value">
                    {{value}}
                </td>
                <td>
                    <slot></slot>
<!--                    <v-btn class="mx-2" fab dark small color="pink"  @click="x(row.item)">-->
<!--                        <v-icon dark>mdi-heart</v-icon>-->
<!--                    </v-btn>-->
                </td>
            </tr>
        </template>

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
