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
                        ></v-file-input>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="uploadImage">Submit</v-btn>
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
                                <v-img :src="this.userImg"/>
                            </v-avatar>
                        </v-row>
                       <v-row justify="center" justify-md="start" class="my-6" >
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
            <WorkshopList :workshops="gradedList" title="Supervised Workshops"/>
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
        data() {
            return {
                loading: true,
                attendedList: [],
                gradedList: [],
                managedList: [],
                userImg: "",
                dialog: false,
                uploadImg: null
            }
        },
        mounted() {
            // eslint-disable-next-line no-console
            console.log(this.id);
            this.userImg = this.$store.state.api + "/userDetails/pic/user/" + this.id;
            axios.get(this.$store.state.api + "/userDetails/" + this.id).then((res) => {
                this.user = res.data;
                // eslint-disable-next-line no-console
                console.log(this.user);
                axios.get(this.$store.state.api + "/userDetails/history/" + this.user.id).then((res) => {
                    // eslint-disable-next-line no-console
                    console.log(res.data);
                    this.attendedList = res.data.attendedWorkshops;
                    this.gradedList = res.data.gradedWorkshops;
                    this.managedList = res.data.managedWorkshops;
                    this.loading = false;
                })
            });
        },
        methods: {
            uploadImage() {
                let formData = new FormData();
                formData.append('file', this.uploadImg);
                axios.post(this.$store.state.api + "/userDetails/setPic/user/" + this.id,
                    formData
                    , {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                );
                this.dialog = false;
            }
        }
    }
</script>

<style scoped>

</style>
