<template>
    <v-app-bar
            flat
            style="background: #eee;"
    >
        <v-toolbar-title>
            <v-app-bar-nav-icon v-if="responsive" @click.stop="$emit('toggle-drawer')"/>
            {{title}}
        </v-toolbar-title>

        <v-spacer/>

        <v-btn icon to="/login">
            <v-icon>mdi-account</v-icon>
        </v-btn>
    </v-app-bar>
</template>

<script>
    export default {

        name: "DashboardAppbar",
        data() {
            return {
                responsive: false,
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
    @media all and (max-width: 550px) {

        .v-toolbar-title {
            width: 100%;
        }

    }
</style>