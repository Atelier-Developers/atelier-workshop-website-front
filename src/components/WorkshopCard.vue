<template>
    <!--    TODO fix offering workshop add -->
    <div>
        <v-dialog v-model="dialogs" max-width="500px">
            <v-card class="py-3 px-3">
                <v-card-text>
                    <v-form>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                        label="Offering Workshop Name"
                                        v-model="editContext.name"
                                />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-dialog
                                        ref="dialog"
                                        v-model="modal"
                                        :return-value.sync="editContext.startDate"
                                        persistent
                                        width="290px"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                                v-model="editContext.startDate"
                                                label="Start Date"
                                                readonly
                                                v-on="on"
                                        />
                                    </template>
                                    <v-date-picker v-model="editContext.startDate" scrollable>
                                        <v-spacer/>
                                        <v-btn color="primary" @click="modal = false">Cancel</v-btn>
                                        <v-btn color="primary" @click="$refs.dialog.save(editContext.startDate)">OK
                                        </v-btn>
                                    </v-date-picker>
                                </v-dialog>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-dialog
                                        ref="dialog3"
                                        v-model="modal3"
                                        :return-value.sync="editContext.startTime"
                                        persistent
                                        width="290px"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                                v-model="editContext.startTime"
                                                label="Start Time"
                                                readonly
                                                v-on="on"
                                        />
                                    </template>
                                    <v-time-picker
                                            v-if="modal3"
                                            v-model="editContext.startTime"
                                            format="24h"
                                            full-width
                                    >
                                        <v-spacer/>
                                        <v-btn color="primary" @click="modal3=false">Cancel</v-btn>
                                        <v-btn color="primary" @click="$refs.dialog3.save(editContext.startTime)">OK
                                        </v-btn>
                                    </v-time-picker>
                                </v-dialog>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-dialog
                                        ref="dialog2"
                                        v-model="modal2"
                                        :return-value.sync="editContext.endDate"
                                        persistent
                                        width="290px"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                                v-model="editContext.endDate"
                                                label="End Date"
                                                readonly
                                                v-on="on"
                                        />
                                    </template>
                                    <v-date-picker v-model="editContext.endDate" scrollable>
                                        <v-spacer/>
                                        <v-btn color="primary" @click="modal2 = false">Cancel</v-btn>
                                        <v-btn color="primary" @click="$refs.dialog2.save(editContext.endDate)">OK
                                        </v-btn>
                                    </v-date-picker>
                                </v-dialog>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-dialog
                                        ref="dialog4"
                                        v-model="modal4"
                                        :return-value.sync="editContext.endTime"
                                        persistent
                                        width="290px"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                                v-model="editContext.endTime"
                                                label="End Time"
                                                readonly
                                                v-on="on"
                                        />
                                    </template>
                                    <v-time-picker
                                            v-if="modal4"
                                            v-model="editContext.endTime"
                                            format="24h"
                                            full-width
                                    >
                                        <v-spacer/>
                                        <v-btn color="primary" @click="modal4 = false">Cancel</v-btn>
                                        <v-btn color="primary" @click="$refs.dialog4.save(editContext.endTime)">OK
                                        </v-btn>
                                    </v-time-picker>
                                </v-dialog>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                        label="Price"
                                        v-model="editContext.price"
                                        :rules="[checkPrice]"
                                        required
                                        prefix="$"
                                />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                        label="Description"
                                        v-model="editContext.description"
                                />
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer/>
                    <div class="text-center error--text font-weight-regular text-uppercase mt-4" v-if="error">
                        <v-icon class="mr-3" color="error">mdi-alert</v-icon>
                        {{errorMsg}}
                    </div>
                    <v-btn color="primary" @click="editWorkshop" :loading="isLoading">Submit</v-btn>
                    <!--TODO click send edit -->
                </v-card-actions>
            </v-card>
        </v-dialog>
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
                    class="pt-2"
            >
                <div class="font-weight-light grey--text body-1 mb-1 text-capitalize">{{workshop.workshop.name}}</div>
                <h3 class="headline font-weight-regular blue--text mb-1 text-capitalize">{{workshop.name}}</h3>
                <div class="font-weight-light title mb-1 text-capitalize">
                    {{manager}}
                </div>
                <div class="font-weight-regular body-1 mb-2">
                    {{workshop.description}}
                </div>
                <div class="font-weight-light subtitle-2 mb-1">
                    <v-icon>mdi-clock-in</v-icon>
                    {{startTime}}
                </div>
                <div class="font-weight-light subtitle-2 mb-1">
                    <v-icon>mdi-clock-out</v-icon>
                    {{endTime}}
                </div>

                <v-row dense>
                    <v-col cols="6">
                        <v-row justify="start" align="center" class="mr-1" v-if="isAdmin">
                            <v-btn icon color="warning" @click.stop="() => goForEdit()">
                                <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                            <v-btn icon color="error" @click.stop="() => deleteOfferedWorkshop(workshop.id)">
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                        </v-row>
                    </v-col>
                    <v-col cols="6">
                        <v-row class="font-weight-bold title mr-2" justify="end">
                            <div> ${{workshop.cashPrice}} - ${{workshop.installmentPrice}}
                            </div>
                        </v-row>
                    </v-col>
                </v-row>

            </v-card-text>

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
                errorMsg: "",
                error: false,
                faildImage: false,
                dialogs: false,
                modal: false,
                modal2: false,
                modal3: false,
                modal4: false,
                edit_mode: false,
                offeredWorkshop: {},
                workshops: [],
                startDate: null,
                endDate: null,
                startTime: null,
                isLoading: false,
                endTime: null,
                editContext: {
                    name: "",
                    startTime: "",
                    endTime: "",
                    description: "",
                    price: "",
                    endDate: "",
                    startDate: ""
                },
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
            hasError() {
                this.faildImage = true
            },
            goForEdit() {
                this.dialogs = !this.dialogs;
                this.edit_mode = true;
                this.editContext = {...this.workshop};
                let t = new Date(this.workshop.startTime);
                this.editContext.startDate = t.getFullYear() + "-" + t.getMonth() + "-" + t.getDate();
                this.editContext.startTime = t.getHours() + ":" + t.getMinutes();
                let t2 = new Date(this.workshop.endTime);
                this.editContext.endDate = t2.getFullYear() + "-" + t2.getMonth() + "-" + t2.getDate();
                this.editContext.endTime = t2.getHours() + ":" + t2.getMinutes();

            },
            editWorkshop() {
                let sdate = new Date(this.editContext.startDate + "," + this.editContext.startTime);
                let edate = new Date(this.editContext.endDate + "," + this.editContext.endTime);
                if (sdate > edate) {
                    this.error = true;
                    this.errorMsg = "start date should be before end date";
                    return;
                } else if (sdate < Date.now() && !this.editMode) {
                    this.error = true;
                    this.errorMsg = "You should choose a time in future";
                    return
                }
                let esDate = sdate.toISOString();
                esDate = esDate.slice(0, esDate.length - 5);
                esDate = esDate.concat("+0000");
                let eeDate = edate.toISOString();
                eeDate = eeDate.slice(0, eeDate.length - 5);
                eeDate = eeDate.concat("+0000");
                this.isLoading = true;
                axios.put(this.$store.state.api + "/workshopManagers/offeringWorkshop/" + this.workshop.id, {
                    name: this.editContext.name,
                    startTime: esDate,
                    endTime: eeDate,
                    description: this.editContext.description,
                    price: this.editContext.price
                }).then(() => {
                    this.isLoading = false;
                    this.$router.go(0)
                })
            },
            deleteOfferedWorkshop(id) {
                axios.delete(this.$store.state.api + "/admin/offeringWorkshop/" + id).then(() => {
                    this.$router.go(0);
                })
            }
        },
        mounted() {
            this.startTime = moment(this.workshop.startTime).format("lll");
            this.endTime = moment(this.workshop.endTime).format("lll");
        },
        computed: {
            isAdmin() {
                return this.$store.state.isAdmin;
            },
            workshopImage: function () {
                return this.faildImage ? "http://transat-h2020.eu/wp-content/uploads/2019/08/5d6395a3b682771d3d22445a.png" : this.$store.state.api + '/userDetails/pic/offeringWorkshop/' + this.workshop.id
            },

        }
    }
</script>

<style scoped>
</style>
