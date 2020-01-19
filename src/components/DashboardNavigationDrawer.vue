<template>
    <v-navigation-drawer
            v-model="drawer"
            :src="image"
            absolute
            dark
            app
            width="260"
            class="navbar"
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

            <v-divider dark/>

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


            <template v-if="this.$store.getters.isLoggedIn">
                <v-list-group
                        prepend-icon="fa-chalkboard"
                        no-action
                >
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title>Workshops</v-list-item-title>
                        </v-list-item-content>
                    </template>
                    <v-list-item
                            v-for="(role, i) in userRole"
                            :key="i"
                            :to="role.to"
                            link
                    >
                        <v-list-item-content>
                            <v-list-item-title v-text="role.title"/>
                        </v-list-item-content>

                    </v-list-item>
                </v-list-group>

            </template>

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
                    {title: 'Home', icon: 'mdi-home', to: "/"},
                    {title: 'User', icon: 'mdi-account-box', to: "/user-profile/" + this.$store.state.userId},
                ],
                userRole: [
                    {title: "Attendee", icon: "fas fa-user-graduate", to: "/workshopAttendee"},
                    {title: "Manager", icon: "mdi-teach", to: "/workshopManager"},
                    {title: "Grader", icon: "mdi-teach", to: "/workshopGrader"}
                ]
            }
        }
    }
</script>

<style scoped>
    .image_overlay {
        background: rgba(27, 27, 27, .74) !important;
    }

    .navbar {
        top: 0;
        position: fixed;
    }
</style>
