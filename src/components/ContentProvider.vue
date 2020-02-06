<template>
    <div>
        <p class="display-3 grey--text text--darken-2 text-center my-10">Contents</p>
        <contents v-if="type === 'attendee'" :files="attFiles"/>
        <template v-else-if="type === 'grader'">
            <p class="body-1 grey--text text--darken-1 text-center my-5">Assistants Files</p>
            <contents :files="graderFiles"/>
            <p class="body-1 grey--text text--darken-1 text-center my-5">Attendee Files</p>
            <contents :files="attFiles"/>
        </template>
        <div v-else-if="type === 'manager'">
            <v-dialog v-model="dialog" max-width="500px">
                <v-card class="py-3 px-3">
                    <v-form v-model="isValid">
                        <v-card-text>
                            <v-text-field label="Title *" v-model="item.title" outlined
                                          :rules="[v => !!v || 'Title required']"
                                          validate-on-blur
                            />
                            <v-textarea label="Description *" v-model="item.description" outlined/>
                            <v-select outlined :items="['Assistants', 'Attendees']" :item-value="['Grader','Attendee']"
                                      v-model="selectedType"
                                      label="Receivers *"
                                      :rules="[v => !!v || 'Receivers required']"/>
                            <v-select outlined :items="['Link', 'File']"
                                      v-model="fileType"
                                      label="File Type"
                                      :rules="[v => !!v || 'Type required']"/>
                            <v-file-input outlined
                                          v-if="fileType === 'File'"
                                          label="File (Max size: 100Mb) *"
                                          v-model="item.file"
                                          :rules="[v => !!v || 'File required']"
                                          validate-on-blur
                            />
                            <v-text-field outlined
                                          v-else-if="fileType === 'Link'"
                                          label="Link"
                                          v-model="item.link"
                                          :rules="[v => !!v || 'Link required']"
                                          validate-on-blur
                            />
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" @click="uploadFile" :disabled="!isValid" :loading="isUploading">
                                upload
                            </v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </v-dialog>
            <p class="body-1 grey--text text--darken-1 text-center my-5">Assistants Files</p>
            <contents :manager="true" :files="graderFiles"/>
            <p class="body-1 grey--text text--darken-1 text-center my-5">Attendee Files</p>
            <contents :manager="true" :files="attFiles"/>
            <v-row justify="center" class="mt-4">
                <v-btn @click="uploadDialog" color="primary" rounded>
                    <v-icon left>fa-cloud-upload-alt</v-icon>
                    Upload file
                </v-btn>
            </v-row>

        </div>
    </div>
</template>

<script>
    import Contents from "./Contents";
    import axios from 'axios'

    export default {
        name: "ContentProvider",
        components: {Contents},
        props: ["type", "wId"],
        data() {
            return {
                isValid: false,
                isUploading: false,
                graderFiles: [],
                attFiles: [],
                dialog: false,
                selectedType: null,
                fileType: null,
                item: {
                    title: "",
                    description: "",
                    file: null,
                    link: null,
                }
            }
        },
        methods: {
            uploadDialog() {
                this.dialog = true;
            },
            uploadFile() {
                this.isUploading = true;
                // eslint-disable-next-line no-console
                if (this.selectedType === "Assistants") {
                    this.selectedType = "grader"
                } else if (this.selectedType === "Attendees") {
                    this.selectedType = "attendee"
                }
                axios.post(this.$store.state.api + "/workshopManagers/offeringWorkshop/" + this.wId +
                    "/workshopFile/create", {
                    title: this.item.title,
                    description: this.item.description,
                    receiverList: [this.selectedType],
                    type: this.fileType,
                    link: this.item.link,
                }).then((res) => {
                    if (this.fileType === "Link")
                        return;
                    let fileId = res.data;
                    let formData = new FormData();
                    // eslint-disable-next-line no-console
                    console.log("fileId");
                    // eslint-disable-next-line no-console
                    console.log(fileId);
                    formData.append('file', this.item.file);
                    axios.post(this.$store.state.api + "/workshopManagers/offeringWorkshop/workshopFile/"
                        + fileId + "/upload", formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then(() => {
                        this.isUploading = false;
                        this.dialog = false;
                        this.$router.go(0);
                    })
                })
            },
            getGraderFiles() {
                return axios.get(this.$store.state.api + "/workshop/offeringWorkshops/" + this.wId + "/workshopFiles/graders")
            },
            getAttFiles() {
                return axios.get(this.$store.state.api + "/workshop/offeringWorkshops/" + this.wId + "/workshopFiles/attendees")
            }
        },
        mounted() {
            if (this.type === "manager") {
                axios.all([this.getGraderFiles(), this.getAttFiles()]).then((res) => {
                    this.graderFiles = res[0].data;
                    this.attFiles = res[1].data
                })
            } else if (this.type === "attendee") {
                this.getAttFiles().then((res) => {
                    this.attFiles = res.data;
                })
            } else if (this.type === "grader") {
                axios.all([this.getGraderFiles(), this.getAttFiles()]).then((res) => {
                    this.graderFiles = res[0].data;
                    this.attFiles = res[1].data;
                })
            }
        }
    }
</script>

<style scoped>

</style>
