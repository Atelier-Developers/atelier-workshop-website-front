<template>
    <v-container>
        <template v-if="isAdmin">
            <v-btn
                    class="mb-5 mr-5"
                    fab
                    color="primary"
                    bottom
                    small
                    right
                    fixed
                    elevation="5"
                    @click="goForAdd"
            >
                <v-icon size="30">mdi-plus</v-icon>
            </v-btn>
            <v-dialog v-model="dialog" max-width="500px">
                <v-form v-model="isValid">
                    <v-card>
                        <v-card-text class="py-5">
                            <v-text-field
                                    outlined
                                    :rules="[v => !!v || 'This field is required']"
                                    label="Workshop Name"
                                    v-model="new_WorkshopName"
                            />
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer/>
                            <v-btn color="primary" @click="submitFunction"
                                   :loading="isLoading" :disabled="!isValid">Submit
                            </v-btn>
                        </v-card-actions>
                    </v-card>

                </v-form>
            </v-dialog>
        </template>
        <template>
            <v-row justify="center" align="center" class="fill-height" v-if="workshops.length === 0">
                <empty-state title="No Workshop" icon="fa-box-open"/>
            </v-row>
            <v-row v-else>
                <v-col v-for="workshop in workshops" cols="6" sm="4" md="3" lg="2" :key="workshop.id">
                    <v-card
                            class="mx-auto"
                            color="grey lighten-4"
                            max-width="500"
                            ripple
                            hover
                            @click="() => navigateToWorkshop(workshop.id)"
                            style="position: relative"
                    >
                        <v-card-text
                                class="pt-6"
                        >
                            <div class="font-weight-light body-1 mb-2 text-capitalize ">
                                {{workshop.name}}
                            </div>
                        </v-card-text>
                        <v-card-actions v-if="isAdmin">
                            <v-row justify="end" align="center" class="mr-1">
                                <v-btn icon color="warning" @click.stop="() => goForEdit(workshop.id, workshop.name)">
                                    <v-icon>mdi-pencil</v-icon>
                                </v-btn>
                                <v-btn icon color="error" @click.stop="() => deleteWorkshop(workshop.id)">
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                            </v-row>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </template>
    </v-container>
</template>

<script>
    import axios from 'axios';
    import EmptyState from "../components/EmptyState";

    export default {
        name: "workshopAddPage",
        components: {EmptyState},
        data() {
            return {
                workshops: [],
                dialog: false,
                edit_mode: false,
                new_WorkshopName: "",
                workshop_id: null,
                isLoading: false,
                isValid: false,
            }
        },
        mounted() {
            axios.get(this.$store.state.api + "/workshop/workshops").then((res) => {
                this.workshops = res.data;
            })
        },
        computed: {
            isAdmin() {
                return this.$store.state.isAdmin;
            }
        },
        methods: {
            submitFunction(){
                return this.edit_mode ? this.editWorkshop() : this.addWorkshop();
            },
            goForAdd() {
                this.dialog = !this.dialog;
                this.edit_mode = false;
            },
            goForEdit(id, name) {
                this.dialog = !this.dialog;
                this.new_WorkshopName = name;
                this.workshop_id = id;
                this.edit_mode = true;
            },
            editWorkshop() {
                this.isLoading = true;
                axios.put(this.$store.state.api + "/admin/workshops", {
                    name: this.new_WorkshopName,
                    id: this.workshop_id,
                }).then(() => {
                    this.$router.go(0);
                })
            },
            deleteWorkshop(id) {
                // TODO check for deleting offering workshop
                this.isLoading = true;
                axios.delete(this.$store.state.api + "/admin/workshops/" + id).then(() => {
                    this.$router.go(0);
                })
            },
            navigateToWorkshop(id) {
                return this.$router.push({name: `Offering Workshops`, params: {id: id}});
            },
            addWorkshop() {
                this.isLoading = true;
                let name = this.new_WorkshopName;
                axios.post(this.$store.state.api + "/admin/workshops/", {name: name}).then(() => {
                    this.$router.go(0);
                });

            }
        }
    }
</script>

<style scoped>

</style>
