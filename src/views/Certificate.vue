<template>
    <v-img class="fill-height" src="../assets/certificate background 1610.jpg">
        <v-row class="fill-height" justify="center" align="center">
            <v-col cols="12" class="text-center">
                <div class="display-4 mt-9">
                    {{name}}
                </div>
            </v-col>
            <v-col cols="12" class="text-center">
                <div class="display-1">
                    You've Successfully Passed {{workshopName}} Workshop
                    <br/> we wish you the best!<!--TODO Workshop-->
                </div>
            </v-col>
            <v-col cols="12" class="text-center">
                <div class="display-1">
                    {{managerName}}
                </div>
            </v-col>
        </v-row>
    </v-img>
</template>

<script>
    export default {
        name: "Certificate",
        props: ['name', 'workshopName', 'managerName']
    }
</script>

<style scoped>

</style>
