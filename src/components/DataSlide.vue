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
                <slot></slot>
            </v-slide-item>
        </v-slide-group>
    </v-sheet>
</template>

<script>
    export default {
        name: "DataSlide",
    }
</script>

<style scoped>

</style>
