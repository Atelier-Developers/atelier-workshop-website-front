<template>
    <v-app-bar
            flat
            dark
            fixed
            app
            elevation="5"
            class="indigo darken-3"
            v-show="this.$store.state.drawer"
    >
        <v-btn icon class="hidden-xs-only" @click="() => this.$router.go(-1)">
            <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title class="display-1 font-weight-light text-capitalize">
            <v-app-bar-nav-icon v-if="responsive" @click.stop="$emit('toggle-drawer')"/>
            {{title}}
        </v-toolbar-title>

        <v-spacer/>


        <v-btn v-if="!this.$store.getters.isLoggedIn" color="white" class="indigo--text" to="/login">
            Login
            <v-icon right>mdi-account</v-icon>
        </v-btn>
        <div class="text-center" v-else>
            <v-menu offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn class="mr-2" v-on="on" icon>
                        <v-avatar>
                            <v-img :src="userImage" @error="hasError"/>
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
                faildImage: false,
                items: [
                    {
                        title: "Show Profile",
                        onClick: () => {
                            this.$router.push({
                                name: "Profile", params: {
                                    id: localStorage.getItem('userId')
                                }
                            })
                        }

                    },
                    {
                        title: "Logout",
                        onClick: () => {
                            this.$store.commit('logout');
                            localStorage.removeItem('token');
                            this.$store.commit('auth_success', null);
                            localStorage.removeItem('userId');
                            this.$store.commit('auth_user_id', -1);
                            localStorage.removeItem('isAdmin');
                            this.$store.commit('setAdmin', false);
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
            userId: function(){
              return this.$store.state.userId
            },
            userImage: function () {
                return this.faildImage ? "https://winaero.com/blog/wp-content/uploads/2015/05/user-200.png" :
                    this.$store.state.api + '/userDetails/profilePic/user/' + this.userId
            },
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
            hasError() {
                this.faildImage = true
            },
            onClickBtn() {
                // eslint-disable-next-line no-console
                console.log(this.$store.state.drawer);
                this.$store.commit("toggleDrawer")
            },
            onResponsiveInverted() {
                if (window.innerWidth < 1260) {
                    this.responsive = true
                } else {
                    this.responsive = false
                }
            },
        }
    }
</script>

<style scoped>
</style>
