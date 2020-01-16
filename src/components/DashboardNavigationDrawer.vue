<template>
    <v-navigation-drawer
            v-model="drawer"
            :src="image"
            absolute
            dark
            fixed
            app
            width="260"
    >
        <v-list
                dense
                nav
                height="100%"
                class="py-0 image_overlay"
        >
            <v-list-item two-line>
                <v-list-item-avatar color="white">
                    <v-img src="http://www.atelierdelaforge.com/wp-content/uploads/AtelierdelaForge_Logo_Nero.png"
                           sizes="45"
                           contain/>
                </v-list-item-avatar>

                <v-list-item-content>
                    Atelier
                </v-list-item-content>
            </v-list-item>

            <v-divider/>

            <v-list-item
                    v-for="item in items"
                    :key="item.title"
                    :to="item.to"
                    link
                    active-class="success"
            >
                <v-list-item-action>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-action>

                <v-list-item-content>
                    {{ item.title }}
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    export default {
        name: "DashboardNavigationDrawer",
        data() {
            return {
                image: 'https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-2.32103624.jpg',
                drawer: this.$store.state.drawer,
                bg: 'https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg',
                items: [
                    {title: 'Dashboard', icon: 'mdi-view-dashboard', to: "/"},
                    {title: 'Photos', icon: 'mdi-image', to: "/photo"},
                ]
            }
        }
    }
</script>

<style scoped>
    .image_overlay {
        background: rgba(27, 27, 27, .74) !important;
    }
</style>