<template>
    <v-app-bar
            flat
            app
            elevation="10"
            hide-on-scroll
            color="#eee"
            v-show="this.$store.state.drawer"
    >
        <v-toolbar-title class="display-1 font-weight-light">
            <v-app-bar-nav-icon v-if="responsive" @click.stop="$emit('toggle-drawer')"/>
            {{title}}
        </v-toolbar-title>

        <v-spacer/>


        <v-btn v-if="!this.$store.getters.isLoggedIn" icon to="/login">
            <v-icon>mdi-account</v-icon>
        </v-btn>
        <div class="text-center" v-else>
            <v-menu offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn class="mr-2" v-on="on" icon>
                        <v-avatar>
                            <v-img src="https://www.biography.com/.image/t_share/MTE4MDAzNDEwNzMzODYwMzY2/robert-downey-jr-9542052-1-402.jpg"/>
                        </v-avatar>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item
                            v-for="(item, index) in items"
                            :key="index"
                            @click="item.onClick"
                    >
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </div>
    </v-app-bar>
</template>

<script>
    import axios from "axios"

    export default {

        name: "DashboardAppbar",
        data() {
            return {
                responsive: false,
                items: [
                    {
                        title: "Show Profile",
                        onClick: () => {
                            this.$router.push({path: "/user-profile"})
                        }
                    }
                    ,
                    {
                        title: "Logout",
                        onClick: () => {
                            this.$store.commit('logout');
                            localStorage.removeItem('token');
                            localStorage.removeItem('userId');
                            delete axios.defaults.headers.common['Authorization'];
                            if (this.$route.path !== "/") {
                                this.$router.push({path: "/"});
                            }
                        }
                    }
                ]
            }
        },
        computed: {
            title() {
                return this.$route.name;
            },
        },
        mounted() {
            this.onResponsiveInverted();
            window.addEventListener('resize', this.onResponsiveInverted)
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.onResponsiveInverted)
        },
        methods: {
            onClickBtn() {
                // eslint-disable-next-line no-console
                console.log(this.$store.state.drawer);
                this.$store.commit("toggleDrawer")
            },

            onResponsiveInverted() {
                if (window.innerWidth < 991) {
                    this.responsive = true
                } else {
                    this.responsive = false
                }
            }
        }
    }
</script>

<style scoped>
</style>