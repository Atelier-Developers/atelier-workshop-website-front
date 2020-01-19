<template>
    <div v-if="!this.loading">
        <v-card outlined style="border: none;">
            <v-container>
                <v-row>
                    <v-col cols="12" md="2">
                        <v-row justify-md="start" justify="center">
                            <v-avatar size="150" class="elevation-9">
                                <v-img src="https://www.biography.com/.image/t_share/MTE4MDAzNDEwNzMzODYwMzY2/robert-downey-jr-9542052-1-402.jpg"/>
                            </v-avatar>
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
            }
        },
        mounted() {
            axios.get(this.$store.state.api + "/userDetails/" + this.id).then((res) => {
                this.user = res.data;
                // eslint-disable-next-line no-console
                console.log(this.user)
                axios.get(this.$store.state.api + "/userDetails/history/" + this.user.id).then((res) => {
                    // eslint-disable-next-line no-console
                    console.log(res.data);
                    this.attendedList = res.data.managedWorkshops;
                    this.gradedList = res.data.attendedWorkshops;
                    this.managedList = res.data.gradedWorkshops;
                    this.loading = false;
                })
            });
        }
    }
</script>

<style scoped>

</style>