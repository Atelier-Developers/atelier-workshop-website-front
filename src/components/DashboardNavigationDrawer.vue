<template>
    <v-navigation-drawer v-if="this.$store.state.drawer"
                         v-model="drawer"
                         absolute
                         class="indigo darken-3 navbar elevation-5"
                         expand-on-hover
                         dark
                         app
                         width="260"
    >
        <v-list
                dense
                nav
                height="100%"
        >
            <v-list-item two-line>
                <v-list-item-avatar>
                    <v-img src="../assets/675469ae-39e8-40b3-93a9-94a7ba0ff76b_200x200 (2).png"
                           height="100"
                           contain/>
                </v-list-item-avatar>

                <v-list-item-content class="display-2 font-weight-light">
                    Atelier
                </v-list-item-content>
            </v-list-item>

            <v-divider dark/>

            <v-list-item
                    v-for="item in userButton"
                    :key="item.title"
                    :to="item.to"
                    link
                    color="blue"
                    active-class="white"
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
                        color="blue"
                        active-class="white"
                >
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title>Profile</v-list-item-title>
                        </v-list-item-content>
                    </template>
                    <v-list-item
                            color="white"
                            active-class="primary"
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
                userRole: [
                    {title: "Attendee", icon: "fas fa-user-graduate", to: "/workshopAttendee"},
                    {title: "Manager", icon: "mdi-teach", to: "/workshopManager"},
                    {title: "Grader", icon: "mdi-teach", to: "/workshopGrader"}
                ]
            }
        },
        methods: {
            routeToPage(name) {
                this.$router.push({name: name})
            },
            routeToPath(path) {
                this.$router.push({path: path})
            },
            routeToAdmin() {
                this.$route.push({
                    name: "Workshops", params: {
                        isAdmin: true
                    }
                })
            }
        },
        computed: {
            userButton() {
                let menus = [{title: 'Home', icon: 'mdi-home', to: '/'}];
                if (this.$store.getters.isLoggedIn) {
                    menus.push({
                        title: 'User',
                        icon: 'mdi-account-box',
                        to: "/user-profile/" + this.$store.state.userId
                    })
                    if (this.$store.state.isAdmin) {
                        menus.push({title: 'Workshops', icon: 'mdi-account-circle', to: '/admin'})
                    } else {
                        menus.push({title: 'Workshops', icon: 'fa-chalkboard-teacher', to: '/workshops'})
                    }
                }
                return menus;
            }
        },
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
