<template>
    <div>
        <p class="display-3 grey--text text--darken-2 text-center my-10">Contents</p>
        <template v-if="type === 'attendee'">
            <contents :files="attFiles"/>
            <p class="display-3 grey--text text--darken-2 text-center my-10">Personal Files</p>
            <contents :files="personalFiles" :is-personal="true"/>
        </template>
        <template v-else-if="type === 'grader'">
            <p class="body-1 grey--text text--darken-1 text-center my-5">Assistants Files</p>
            <contents :files="graderFiles"/>
            <p class="body-1 grey--text text--darken-1 text-center my-5">Attendee Files</p>
            <contents :files="attFiles"/>
            <p class="display-3 grey--text text--darken-2 text-center my-10" v-if="isStarred">Personal Files</p>
            <contents :files="personalFiles" v-if="isStarred"/>
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
                            <v-select outlined :items="['Supervisor', 'Assistants', 'Attendees']"
                                      :item-value="['Supervisor', 'Grader','Attendee']"
                                      v-model="selectedType"
                                      label="Receivers *"
                                      :rules="[v => !!v || 'Receivers required']"/>
                            <v-select outlined :items="['Link', 'File']"
                                      v-model="fileType"
                                      label="File Type *"
                                      :rules="[v => !!v || 'Type required']"/>
                            <v-file-input outlined
                                          v-if="fileType === 'File'"
                                          label="File (Max size: 100Mb) *"
                                          v-model="item.file"
                                          :rules="[v => !!v || 'File required']"
                            />
                            <v-text-field outlined
                                          v-else-if="fileType === 'Link'"
                                          label="Link *"
                                          v-model="item.link"
                                          :rules="[v => !!v || 'Link required', v => this.isURL(v) || 'Invalid link']"
                            />
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer/>
                            <v-btn color="primary" @click="uploadFile" :disabled="!isValid" :loading="isUploading">
                                upload
                            </v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </v-dialog>
            <p class="body-1 grey--text text--darken-1 text-center my-5">Supervisors Files</p>
            <contents :manager="true" :files="managerFiles"/>
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
            <p class="display-3 grey--text text--darken-2 text-center my-10">Personal Files</p>
            <contents :files="personalFiles" :is-personal="true"/>
        </div>
        <v-row justify="center" class="mt-4">
            <div v-if="isStarred===false"></div>
            <v-btn v-else @click="uploadPersonalDialog" color="primary" rounded>
                <v-icon left>fa-cloud-upload-alt</v-icon>
                Upload Personal File
            </v-btn>
        </v-row>
        <v-dialog v-model="personalDialog" max-width="500px">
            <v-card class="py-3 px-3">
                <v-form v-model="isValid">
                    <v-card-text>
                        <v-text-field label="Title *" v-model="item.title" outlined
                                      :rules="[v => !!v || 'Title required']"
                                      validate-on-blur
                        />
                        <v-textarea label="Description *" v-model="item.description"
                                    :rules="[v => !!v || 'This Field is required']" outlined/>
                        <v-select outlined
                                  :items="recieverType"
                                  :item-value="recieverValue"
                                  v-model="selectedType"
                                  label="Receivers *"
                                  :rules="[v => !!v || 'Receivers required']"/>
                        <v-select outlined :items="attendees"
                                  item-text="name"
                                  item-value="id"
                                  v-if="this.type !== 'attendee' && this.selectedType === 'Attendee'"
                                  v-model="selectedAtt"
                                  label="Attendees *"
                                  :rules="[v => !!v || 'Receivers required']"/>
                        <v-select outlined :items="['Link', 'File']"
                                  v-model="fileType"
                                  label="File Type *"
                                  :rules="[v => !!v || 'Type required']"/>
                        <v-file-input outlined
                                      v-if="fileType === 'File'"
                                      label="File (Max size: 100Mb) *"
                                      v-model="item.file"
                                      :rules="[v => !!v || 'File required']"
                        />
                        <v-text-field outlined
                                      v-else-if="fileType === 'Link'"
                                      label="Link *"
                                      v-model="item.link"
                                      :rules="[v => !!v || 'Link required', v => this.isURL(v) || 'Invalid link']"
                        />
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer/>
                        <v-btn color="primary" @click="uploadPersonalFile" :disabled="!isValid" :loading="isUploading">
                            upload
                        </v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import Contents from "./Contents";
    import axios from 'axios'

    export default {
        name: "ContentProvider",
        components: {Contents},
        props: ["type", "wId", "userId", "isStarred"],
        computed: {
            recieverType() {
                if (this.type === "manager") {
                    return ['Attendee']
                } else if (this.type === "grader") {
                    return ['Attendee']
                } else if (this.type === "attendee") {
                    return ['Supervisor', 'Starred Grader']
                }
                return null;
            },
            recieverValue() {
                if (this.type === "manager") {
                    return ['Attender']
                } else if (this.type === "grader") {
                    return ['Attender']
                } else if (this.type === "attendee") {
                    return ['Supervisor', 'StarredGrader']
                }
                return null;
            }
        },
        data() {
            return {
                selectedAtt: null,
                isValid: false,
                isUploading: false,
                graderFiles: [],
                attendees: [],
                attFiles: [],
                managerFiles: [],
                personalFiles: [],
                dialog: false,
                selectedType: null,
                fileType: null,
                personalDialog: false,
                item: {
                    title: "",
                    description: "",
                    file: null,
                    link: null,
                }
            }
        },
        methods: {
            isURL(str) {
                let pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
                    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
                    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
                    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
                    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
                    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
                return !!pattern.test(str);
            },
            uploadDialog() {
                this.dialog = true;
            },
            uploadPersonalDialog() {
                this.personalDialog = true;
            },
            uploadPersonalFile() {
                this.isUploading = true;
                let userId = null;
                let senderType = "";
                if (this.type === 'attendee') {
                    senderType = 'Attender'
                    userId = this.userId;
                } else if (this.type === 'manager') {
                    senderType = 'Supervisor'
                    userId = this.selectedAtt;
                } else if (this.type === 'grader') {
                    senderType = 'StarredGrader'
                    userId = this.selectedAtt;
                }
                if (this.selectedType === 'attendee') {
                    this.selectedType = 'Attender';
                } else if (this.selectedType === 'Starred Grader') {
                    this.selectedType = 'StarredGrader'
                }
                // let test = {
                //     title: this.item.title,
                //     description: this.item.description,
                //     receiverTypes: [this.selectedType],
                //     type: this.fileType,
                //     link: this.item.link,
                //     senderType: senderType,
                // };

                axios.post(this.$store.state.api + "/workshop/offeringWorkshop/" + this.wId +
                    "/personalFiles/" + userId, {
                    title: this.item.title,
                    description: this.item.description,
                    receiverTypes: [this.selectedType],
                    type: this.fileType,
                    link: this.item.link,
                    senderType: senderType,
                }).then((res) => {
                    if (this.item.file !== null) {
                        let formData = new FormData();
                        formData.append('file', this.item.file);
                        axios.post(this.$store.state.api + "/workshop/offeringWorkshop/" + this.wId +
                            "/personalFiles/" + res.data + "/upload", formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }).then(() => {
                            this.$router.go(0);
                        })
                    } else {
                        this.$router.go(0);
                    }

                })
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
                    if (this.fileType === "Link") {
                        this.isUploading = false;
                        this.dialog = false;
                        this.$router.go(0);
                    }
                    let fileId = res.data;
                    let formData = new FormData();
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
            },
            getManagerFiles() {
                return axios.get(this.$store.state.api + "/workshop/offeringWorkshops/" + this.wId + "/workshopFiles/managers")
            },
            getPersonalFiles() {
                if (this.type === 'manager') {
                    return axios.get(this.$store.state.api + "/workshop/offeringWorkshop/" + this.wId + "/personalFiles/manager")

                }
                if (this.type === 'attendee') {
                    return axios.get(this.$store.state.api + "/workshop/offeringWorkshop/" + this.wId + "/personalFiles/attendee/" + this.userId)

                }
                if (this.type === 'grader') {
                    return axios.get(this.$store.state.api + "/workshop/offeringWorkshop/" + this.wId + "/personalFiles/starredGrader")
                }
                return null;
            },
            getAttendees() {
                if (this.type === 'manager') {
                    return axios.get(this.$store.state.api + "/workshop/offeringWorkshop/" + this.wId + "/manager/allAttendees")
                }
                if (this.type === 'grader') {
                    return axios.get(this.$store.state.api + "/workshop/offeringWorkshop/" + this.wId + "/starredGrader/allAttendees")
                }
                return null;
            }
        },
        mounted() {
            if (this.type === "manager") {
                axios.all([this.getGraderFiles(), this.getAttFiles(), this.getManagerFiles(), this.getPersonalFiles(), this.getAttendees()]).then((res) => {
                    this.graderFiles = res[0].data;
                    this.attFiles = res[1].data;
                    this.managerFiles = res[2].data;
                    this.personalFiles = res[3].data;

                    this.attendees = res[4].data
                })
            } else if (this.type === "attendee") {
                axios.all([this.getAttFiles(), this.getPersonalFiles()]).then((res) => {
                    this.attFiles = res[0].data;
                    this.personalFiles = res[1].data;
                })

            } else if (this.type === "grader") {
                axios.all([this.getGraderFiles(), this.getAttFiles(), this.getPersonalFiles(), this.getAttendees()]).then((res) => {
                    this.graderFiles = res[0].data;
                    this.attFiles = res[1].data;
                    this.personalFiles = res[2].data;
                    this.attendees = res[3].data;


                })
            }
        }
    }
</script>

<style scoped>

</style>
