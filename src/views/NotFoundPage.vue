<template>
    <v-content class="fill-height">
        <v-row justify="center" align="center" class="fill-height">
            <div class="text-center mx-3">
                <p class="text-center display-3 blue--text">Whoops, 404</p>
                <p class="headline text-center">The page you were looking for does not exist</p>
                <v-btn outlined color="primary" @click="f">
                    get me out of here!
                </v-btn>
            </div>
        </v-row>
    </v-content>
</template>

<script>
    export default {
        name: "NotFoundPage",
        mounted() {
            this.$store.commit('toggleNavBar', false);
        },
        methods:{
            f(){
                this.$store.commit('toggleNavBar', true);
                this.$router.push({path: '/'})
            }
        }
    }
</script>

<style scoped>

</style>