<template>
    <v-menu :close-on-content-click="false" open-on-hover bottom offset-y>
        <template v-slot:activator="{ on }">
            <v-btn
                    dark
                    icon
                    v-on="on"
            >
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
        </template>

        <v-list>
            <v-list-group
                    v-for="item in items"
                    :key="item.title"
                    v-model="item.active"
                    :prepend-icon="item.action"
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
                        v-for="subItem in item.items"
                        :key="subItem.title"
                        @click=""
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
        data(){
            return {
                items: [
                    {
                        title: 'Attractions',
                        items: [
                            { title: 'List Item' }
                        ]
                    },
                    {
                        title: 'Dining',
                        active: true,
                        items: [
                            { title: 'Breakfast & brunch' },
                            { title: 'New American' },
                            { title: 'Sushi' }
                        ]
                    }
                ]
            }
        }
    }
</script>

<style scoped>

</style>