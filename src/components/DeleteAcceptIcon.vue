<template>
    <div>
        <v-btn
                color="error"
                fab
                dark
                @click.stop="dialog = true"
        >
            <v-icon dark>mdi-delete</v-icon>
        </v-btn>

        <v-dialog
                v-model="dialog"
                max-width="290"
        >
            <v-card>
                <v-card-title class="headline">Want to delete</v-card-title>
                <v-card-text>Are you sure you want to delete?</v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                            color="green darken-1"
                            text
                            @click="dialog = false"
                    >
                        Disagree
                    </v-btn>

                    <v-btn
                            color="green darken-1"
                            text
                            @click="accept"
                    >
                        Agree
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
    export default {
        name: "DeleteAcceptIcon",
        props: ['onAccept'],
        data(){
            return {
                dialog: false,
                loading: false
            }
        },
        methods: {
            accept(){
                this.loading = true;
                this.onAccept();
            }
        }
    }
</script>

<style scoped>

</style>