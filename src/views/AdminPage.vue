<template>
    <v-container>
        <v-btn
                class="mb-5 mr-5"
                fab
                color="primary"
                bottom
                small
                right
                fixed
                elevation="5"
                v-if="true"
                @click="dialog = !dialog"
        >
            <v-icon size="30">mdi-plus</v-icon>
        </v-btn>
        <v-dialog v-model="dialog" max-width="500px">
            <v-card class="py-3 px-3">
                <v-card-text>
                    <v-text-field
                            label="Workshop Name"
                            v-model="new_WorkshopName"
                    ></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="addWorkshop">Submit</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-container>
            <v-row>
                <v-col v-for="workshop in workshops" cols="6" sm="4" md="3" lg="2" :key="workshop.text">
                    <v-card
                            class="mx-auto"
                            color="grey lighten-4"
                            max-width="500"
                            ripple
                            hover
                            @click="() => navigateToWorkshop(workshop.id)"
                            style="position: relative"
                    >
                        <!--                        <v-img-->
                        <!--                                :aspect-ratio="16/9"-->
                        <!--                                src="https://i.udemycdn.com/course/240x135/625204_436a_2.jpg"-->
                        <!--                        />-->
                        <v-card-text
                                class="pt-6"
                        >
                            <div class="font-weight-light grey--text body-1 mb-2 text-capitalize">
                                {{workshop.name}}
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-container>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "AdminPage",
        data() {
            return {
                workshops: [],
                dialog: false,
                new_WorkshopName: ""
            }
        },
        mounted() {
            axios.get(this.$store.state.api + "/workshop/workshops").then((res) => {
                this.workshops = res.data;
            })
        },
        methods: {
            navigateToWorkshop(id) {
                return this.$router.push({name: `Offering Workshops`, params: {id: id}});
            },
            addWorkshop() {
                let name = this.new_WorkshopName;
                axios.post(this.$store.state.api + "/admin/workshops/", {name: name}).then(() => {
                    axios.get(this.$store.state.api + "/workshop/workshops").then((res) => {
                        this.workshops = res.data;
                    });
                });
                this.dialog = false;
            }
        }
    }
</script>

<style scoped>

</style>
