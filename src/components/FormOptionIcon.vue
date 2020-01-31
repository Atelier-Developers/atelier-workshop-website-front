<template>
    <v-menu :close-on-content-click="false" open-on-hover bottom offset-x>
        <template v-slot:activator="{ on }">
            <v-btn
                    icon
                    v-on="on"
            >
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
        </template>

        <v-list dense rounded>
            <v-list-group
                    v-for="(item, i) in items"
                    :key="item.title"
                    no-action
            >
                <template v-slot:activator>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>

                <v-list-item
                        v-for="(subItem, j) in item.items"
                        :key="subItem.title"
                        @click="actions[i][j]"
                >
                    <v-list-item-content>
                        <v-list-item-title>{{ subItem.title }}</v-list-item-title>
                    </v-list-item-content>

                </v-list-item>
            </v-list-group>
        </v-list>
    </v-menu>
</template>

<script>
    export default {
        name: "FormOptionIcon",
        props: ['items', 'actions'],
        data() {
            return {}
        }
    }
</script>

<style scoped>

</style>