<template>
<!--    TODO fix offering workshop add -->
    <div>
<!--        <v-dialog v-model="dialogs" max-width="500px">-->
<!--            <v-card class="py-3 px-3">-->
<!--                <v-card-text>-->
<!--                    <v-form>-->
<!--                        <v-row>-->
<!--                            <v-col cols="12">-->
<!--                                <v-text-field-->
<!--                                        label="Offering Workshop Name"-->
<!--                                        v-model="offeredWorkshop.name"-->
<!--                                />-->
<!--                            </v-col>-->
<!--                        </v-row>-->
<!--                        <v-row>-->
<!--                            <v-col cols="12" md="6">-->
<!--                                <v-dialog-->
<!--                                        ref="dialog"-->
<!--                                        v-model="modal"-->
<!--                                        :return-value.sync="startDate"-->
<!--                                        persistent-->
<!--                                        width="290px"-->
<!--                                >-->
<!--                                    <template v-slot:activator="{ on }">-->
<!--                                        <v-text-field-->
<!--                                                v-model="startDate"-->
<!--                                                label="Start Date"-->
<!--                                                readonly-->
<!--                                                v-on="on"-->
<!--                                        />-->
<!--                                    </template>-->
<!--                                    <v-date-picker v-model="startDate" scrollable>-->
<!--                                        <v-spacer/>-->
<!--                                        <v-btn color="primary" @click="modal = false">Cancel</v-btn>-->
<!--                                        <v-btn color="primary" @click="$refs.dialog.save(startDate)">OK</v-btn>-->
<!--                                    </v-date-picker>-->
<!--                                </v-dialog>-->
<!--                            </v-col>-->
<!--                            <v-col cols="12" md="6">-->
<!--                                <v-dialog-->
<!--                                        ref="dialog3"-->
<!--                                        v-model="modal3"-->
<!--                                        :return-value.sync="startTime"-->
<!--                                        persistent-->
<!--                                        width="290px"-->
<!--                                >-->
<!--                                    <template v-slot:activator="{ on }">-->
<!--                                        <v-text-field-->
<!--                                                v-model="startTime"-->
<!--                                                label="Start Time"-->
<!--                                                readonly-->
<!--                                                v-on="on"-->
<!--                                        />-->
<!--                                    </template>-->
<!--                                    <v-time-picker-->
<!--                                            v-if="modal3"-->
<!--                                            v-model="startTime"-->
<!--                                            format="24h"-->
<!--                                            full-width-->
<!--                                    >-->
<!--                                        <v-spacer/>-->
<!--                                        <v-btn  color="primary" @click="modal3=false">Cancel</v-btn>-->
<!--                                        <v-btn  color="primary" @click="$refs.dialog3.save(startTime)">OK-->
<!--                                        </v-btn>-->
<!--                                    </v-time-picker>-->
<!--                                </v-dialog>-->
<!--                            </v-col>-->
<!--                        </v-row>-->
<!--                        <v-row>-->
<!--                            <v-col cols="12" md="6">-->
<!--                                <v-dialog-->
<!--                                        ref="dialog2"-->
<!--                                        v-model="modal2"-->
<!--                                        :return-value.sync="endDate"-->
<!--                                        persistent-->
<!--                                        width="290px"-->
<!--                                >-->
<!--                                    <template v-slot:activator="{ on }">-->
<!--                                        <v-text-field-->
<!--                                                v-model="endDate"-->
<!--                                                label="End Date"-->
<!--                                                readonly-->
<!--                                                v-on="on"-->
<!--                                        />-->
<!--                                    </template>-->
<!--                                    <v-date-picker v-model="endDate" scrollable>-->
<!--                                        <v-spacer/>-->
<!--                                        <v-btn  color="primary" @click="modal2 = false">Cancel</v-btn>-->
<!--                                        <v-btn  color="primary" @click="$refs.dialog2.save(endDate)">OK</v-btn>-->
<!--                                    </v-date-picker>-->
<!--                                </v-dialog>-->
<!--                            </v-col>-->
<!--                            <v-col cols="12" md="6">-->
<!--                                <v-dialog-->
<!--                                        ref="dialog4"-->
<!--                                        v-model="modal4"-->
<!--                                        :return-value.sync="endTime"-->
<!--                                        persistent-->
<!--                                        width="290px"-->
<!--                                >-->
<!--                                    <template v-slot:activator="{ on }">-->
<!--                                        <v-text-field-->
<!--                                                v-model="endTime"-->
<!--                                                label="End Time"-->
<!--                                                readonly-->
<!--                                                v-on="on"-->
<!--                                        />-->
<!--                                    </template>-->
<!--                                    <v-time-picker-->
<!--                                            v-if="modal4"-->
<!--                                            v-model="endTime"-->
<!--                                            format="24h"-->
<!--                                            full-width-->
<!--                                    >-->
<!--                                        <v-spacer/>-->
<!--                                        <v-btn  color="primary" @click="modal4 = false">Cancel</v-btn>-->
<!--                                        <v-btn  color="primary" @click="$refs.dialog4.save(endTime)">OK</v-btn>-->
<!--                                    </v-time-picker>-->
<!--                                </v-dialog>-->
<!--                            </v-col>-->
<!--                        </v-row>-->
<!--                        <v-row>-->
<!--                            <v-col cols="12">-->
<!--                                <v-text-field-->
<!--                                        label="Price"-->
<!--                                        v-model="offeredWorkshop.price"-->
<!--                                        :rules="[checkPrice]"-->
<!--                                        required-->
<!--                                />-->
<!--                            </v-col>-->
<!--                        </v-row>-->
<!--                        <v-row>-->
<!--                            <v-col cols="12">-->
<!--                                <v-text-field-->
<!--                                        label="Description"-->
<!--                                        v-model="offeredWorkshop.description"-->
<!--                                />-->
<!--                            </v-col>-->
<!--                        </v-row>-->
<!--                        <v-row>-->
<!--                            <v-col cols="12">-->
<!--                                <v-file-input-->
<!--                                        label="Image"-->
<!--                                        v-model="file"-->
<!--                                        prepend-icon="mdi-camera"-->
<!--                                        accept="image/*"-->
<!--                                />-->
<!--                            </v-col>-->
<!--                        </v-row>-->
<!--                    </v-form>-->
<!--                </v-card-text>-->
<!--                <v-card-actions>-->
<!--                    <v-spacer/>-->
<!--                    <v-btn color="primary" @click="addOfferingWorkshop">Submit</v-btn>-->
<!--                </v-card-actions>-->
<!--            </v-card>-->
<!--        </v-dialog>-->
        <v-card
                class="mx-auto"
                color="grey lighten-4"
                max-width="500"
                ripple
                hover
                @click="navigateToWorkshop"
                style="position: relative"
        >
            <v-img
                    :aspect-ratio="16/9"
                    :src="workshopImage"
                    v-on:error="hasError"
            />
            <v-card-text
                    class="pt-6"
            >
                <div class="font-weight-light grey--text body-1 mb-2 text-capitalize">{{workshop.workshop.name}}</div>
                <h3 class="headline font-weight-regular blue--text mb-2 text-capitalize">{{workshop.name}}</h3>
                <div class="font-weight-light title mb-2 text-capitalize">
                    {{manager}}
                </div>
                <div class="font-weight-regular body-1 mb-2">
                    {{workshop.description}}
                </div>
                <div class="font-weight-light subtitle-2 mb-2">
                    <v-icon>mdi-clock-in</v-icon>
                    {{startTime}}
                </div>
                <div class="font-weight-light subtitle-2 mb-7">
                    <v-icon>mdi-clock-out</v-icon>
                    {{endTime}}
                </div>

                <div class="font-weight-bold title mb-2" style="position: absolute; bottom: 5px; right: 10px">
                    ${{workshop.price}}
                </div>
            </v-card-text>
            <v-card-actions v-if="isAdmin">
                <v-row justify="end" align="center" class="mr-1">
                    <v-btn icon color="warning" @click.stop="() => goForEdit()">
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn icon color="error" @click.stop="() => deleteOfferedWorkshop(workshop.id)">
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </v-row>
            </v-card-actions>
        </v-card>
    </div>

</template>

<script>
    import moment from "moment"
    import axios from "axios";

    export default {
        name: "WorkshopCard",
        props: ["workshop", "manager"],
        data() {
            return {
                faildImage: false,
                dialogs: false,
                edit_mode: false,
                offeredWorkshop: {},
                workshops: []
            }
        },
        methods: {
            checkPrice() {
                let found_dot = false;
                let error = "It's not a number";
                let price = this.workshop.price;
                for (let i = 0; i < price.length; i++) {
                    if (price[i] !== '.')
                        if (price[i] < '0' || price[i] > '9')
                            return error;
                    if (found_dot && price[i] === '.')
                        return error;
                    if (price[i] === '.')
                        found_dot = true;
                }
                found_dot = false;
                return true;
            },
            navigateToWorkshop() {
                return this.$router.push({path: `/workshop/${this.workshop.id}`});
            },
            hasError(){
                this.faildImage = true
            },
            goForEdit() {
                this.dialogs = !this.dialogs;
                this.edit_mode = true;
                this.offeredWorkshop = {...this.workshop}
            },
            deleteOfferedWorkshop(id){
                axios.delete(this.$store.state.api + "/admin/offeringWorkshop/" + id).then(() => {
                    this.$router.go(0);
                })
            }
        },
        computed: {
            isAdmin() {
                return this.$store.state.isAdmin;
            },
            workshopImage: function () {
                return this.faildImage ? "http://transat-h2020.eu/wp-content/uploads/2019/08/5d6395a3b682771d3d22445a.png" : this.$store.state.api + '/userDetails/pic/offeringWorkshop/' + this.workshop.id
            },
            startTime: function () {
                return moment(this.workshop.startTime).format("lll");
            },
            endTime: function () {
                return moment(this.workshop.endTime).format("lll")
            },

        }
    }
</script>

<style scoped>
</style>
