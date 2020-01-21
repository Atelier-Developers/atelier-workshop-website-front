<template>
    <v-container v-if="!this.loading">
        <v-card outlined style="border: none;">
            <v-container>
                <v-row>
                    <v-col cols="12" md="2">
                        <v-row justify-md="start" justify="center">
                            <v-col cols="12">
                                <v-avatar size="150" class="elevation-9">
                                    <v-img :src="this.userImg"/>
                                </v-avatar>
                                <v-icon>mdi-pencil</v-icon>
                            </v-col>
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
                userImg: ""
            }
        },
        mounted() {
            // eslint-disable-next-line no-console
            console.log(this.id);
            this.userImg = this.$store.state.api + "/userDetails/pic/user/" + this.id;
            axios.get(this.$store.state.api + "/userDetails/" + this.id).then((res) => {
                this.user = res.data;
                // eslint-disable-next-line no-console
                console.log(this.user)
                axios.get(this.$store.state.api + "/userDetails/history/" + this.user.id).then((res) => {
                    // eslint-disable-next-line no-console
                    console.log(res.data);
                    this.attendedList = res.data.attendedWorkshops;
                    this.gradedList = res.data.gradedWorkshops;
                    this.managedList = res.data.managedWorkshops;
                    this.loading = false;
                })
            });
        }
    }
</script>

<style scoped>

</style>