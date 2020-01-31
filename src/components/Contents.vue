<template>
    <v-container>
        <v-row v-if="files.length > 0">
            <v-col cols="12" sm="4" md="3" lg="2" v-for="file in files" :key="file.id">
                <v-card hover class="pb-1">
                    <v-card-title class="text-capitalize">
                        {{file.title}}
                    </v-card-title>
                    <v-card-text class="text-capitalize">
                        {{file.description}}
                    </v-card-text>
                    <v-row justify="center" align="center" class="my-3">
                        <v-btn color="primary" :href="file.downloadURI" outlined rounded target="_blank">
                            <v-icon left>fa-cloud-download-alt</v-icon>
                            Download
                        </v-btn>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
        <EmptyState title="No File" icon="mdi-file" v-else/>
    </v-container>
</template>

<script>
    import EmptyState from "./EmptyState";
    export default {
        name: "Contents",
        components: {EmptyState},
        props: ["files"],
    }
</script>

<style scoped>

</style>