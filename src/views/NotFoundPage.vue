<template>
    <v-content class="fill-height">
        <v-row justify="center" align="center" class="fill-height ">
            <v-col class="text-center mx-3">
                <p class="text-center display-3 mb-8 blue--text mr-4">Whoops, 404</p>
                <p class="headline text-center mb-8 mr-4 font-italic font-weight-light">The page you were looking for does not exist</p>
                <v-btn outlined color="primary" class="mb-12 mr-4" @click="f">
                    get me out of here!
                </v-btn>
            </v-col>
        </v-row>
    </v-content>
</template>

<script>
    export default {
        name: "NotFoundPage",
        mounted() {
            this.$store.commit('setNavBar', false);
        },
        methods:{
            f(){
                this.$store.commit('setNavBar', true);
                this.$router.push({path: '/'})
            }
        }
    }
</script>

<style scoped>

</style>