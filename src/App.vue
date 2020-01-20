<template>
    <v-app>
        <DashboardNavigationDrawer ref="drawer"/>
        <v-content d-flex align-space-around justify-center column class="items">
            <DashboardAppbar @toggle-drawer="$refs.drawer.drawer = !$refs.drawer.drawer"/>
                <vue-page-transition name="fade" class="fill-height">
                    <router-view/>
                </vue-page-transition>
        </v-content>
    </v-app>
</template>

<style lang="scss">
    .card{
        border-radius: 10px !important;
    }
</style>
<script>
    import DashboardNavigationDrawer from "./components/DashboardNavigationDrawer";
    import DashboardAppbar from "./components/DashboardAppbar";

    export default {
        components: {DashboardAppbar, DashboardNavigationDrawer}
    }
</script>
