<template>
  <v-app>
    <DashboardNavigationDrawer ref="drawer"/>
    <v-content>
      <DashboardAppbar @toggle-drawer="$refs.drawer.drawer = !$refs.drawer.drawer"/>
      <vue-page-transition name="fade">
        <router-view />
      </vue-page-transition>
    </v-content>
  </v-app>
</template>

<style lang="scss">

</style>
<script>
  import DashboardNavigationDrawer from "./components/DashboardNavigationDrawer";
  import DashboardAppbar from "./components/DashboardAppbar";
  export default {
    components: {DashboardAppbar, DashboardNavigationDrawer}
  }
</script>