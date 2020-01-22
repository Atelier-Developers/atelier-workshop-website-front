<template>
    <AdminPage :is-admin="false"/>
</template>

<script>
    import AdminPage from "../views/AdminPage";

    export default {
        name: "workshops",
        components: {AdminPage}
    }
</script>

<style scoped>

</style>