<template>
    <v-container v-if="!this.loading">
        <v-dialog v-model="dialog" max-width="500px">
            <v-card class="py-3 px-3">
                <v-form>
                    <v-card-text>
                        <v-file-input
                                label="Image"
                                v-model="uploadImg"
                                prepend-icon="mdi-camera"
                                accept="image/*"
                        />
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="uploadImage" :loading="isUploading">Submit</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>
        <v-card outlined style="border: none;">
            <v-container>
                <v-row>
                    <v-col cols="12" md="2">
                        <v-row justify-md="start" justify="center">
                            <v-avatar size="150" class="elevation-9">
                                <v-img :src="userImage" v-on:error="hasError"/>
                            </v-avatar>
                        </v-row>
                        <v-row justify="center" justify-md="start" class="my-6">
                            <v-btn @click="dialog = !dialog" color="warning">
                                Upload Image
                                <v-icon right>mdi-cloud-upload</v-icon>
                            </v-btn>
                        </v-row>
                    </v-col>
                    <v-col cols="12" md="9" class="ml-4">
                        <p class="display-3 text-capitalize my-6">{{user.name}}</p>
                        <p class="body-1">{{user.address}}</p>
                    </v-col>

                </v-row>
            </v-container>
        </v-card>
        <v-container>
            <WorkshopList :workshops="attendedList" title="Attended Workshops"/>
            <WorkshopList :workshops="gradedList" title="Assisted Workshops"/>
            <WorkshopList :workshops="managedList" title="Presented Workshops"/>
        </v-container>
    </v-container>
    <div class="fill-height" v-else>
        <v-row class="fill-height" justify="center" align="center">
            <v-progress-circular indeterminate color="blue" size="60"/>
        </v-row>
    </div>
</template>

<script>
    import axios from "axios"
    import WorkshopList from "../components/WorkshopList";

    export default {
        name: "User",
        components: {WorkshopList},
        props: ['id'],
        computed: {
            userImage: function () {
                return this.faildImage ? "https://winaero.com/blog/wp-content/uploads/2015/05/user-200.png"
                    : this.$store.state.api + '/userDetails/profilePic/user/' + this.id
            }
        },
        data() {
            return {
                loading: true,
                attendedList: [],
                gradedList: [],
                managedList: [],
                dialog: false,
                isUploading: false,
                uploadImg: null,
                faildImage: false,
            }
        },
        mounted() {
            axios.all([axios.get(this.$store.state.api + "/userDetails/" + this.id),
                axios.get(this.$store.state.api + "/userDetails/history/" + this.id)
            ]).then((res) => {
                this.user = res[0].data;
                this.attendedList = res[1].data.attendedWorkshops;
                this.gradedList = res[1].data.gradedWorkshops;
                this.managedList = res[1].data.managedWorkshops;
                this.loading = false;
            })
        },
        methods: {
            hasError() {
                this.faildImage = true
            },

            uploadImage() {
                let formData = new FormData();
                formData.append('file', this.uploadImg);
                this.isUploading = true;
                axios.post(this.$store.state.api + "/userDetails/profilePic/user/" + this.id,
                    formData
                    , {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                ).then((res) => {
                    // eslint-disable-next-line no-console
                    console.log(res.data);
                    this.dialog = false;
                    this.isUploading = false;
                    this.$router.go(0);

                });

            }
        }
    }
</script>

<style scoped>

</style>
