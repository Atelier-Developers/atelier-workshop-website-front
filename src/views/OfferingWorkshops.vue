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
                flat
                elevation="5"
                @click="dialoga = !dialoga"
        >
            <v-icon size="30">mdi-plus</v-icon>
        </v-btn>
        <v-dialog v-model="dialoga" max-width="500px">
            <v-card class="py-3 px-3">
                <v-card-text>
                    <v-form>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                        label="Offering Workshop Name"
                                        v-model="workshop.offeredWorkshop.name"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-dialog
                                        ref="dialog"
                                        v-model="modal"
                                        :return-value.sync="startDate"
                                        persistent
                                        width="290px"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                                v-model="startDate"
                                                label="Start Date"
                                                readonly
                                                v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker v-model="startDate" scrollable>
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                                        <v-btn text color="primary" @click="$refs.dialog.save(startDate)">OK</v-btn>
                                    </v-date-picker>
                                </v-dialog>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-dialog
                                        ref="dialog3"
                                        v-model="modal3"
                                        :return-value.sync="startTime"
                                        persistent
                                        width="290px"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                                v-model="startTime"
                                                label="Picker in dialog"
                                                readonly
                                                v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-time-picker
                                            v-if="modal3"
                                            v-model="startTime"
                                            format="24h"
                                            full-width
                                    >
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="modal3=false">Cancel</v-btn>
                                        <v-btn text color="primary" @click="$refs.dialog3.save(startTime)">OK</v-btn>
                                    </v-time-picker>
                                </v-dialog>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-dialog
                                        ref="dialog2"
                                        v-model="modal2"
                                        :return-value.sync="endDate"
                                        persistent
                                        width="290px"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                                v-model="endDate"
                                                label="End Date"
                                                readonly
                                                v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker v-model="endDate" scrollable>
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="modal2 = false">Cancel</v-btn>
                                        <v-btn text color="primary" @click="$refs.dialog2.save(endDate)">OK</v-btn>
                                    </v-date-picker>
                                </v-dialog>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-dialog
                                        ref="dialog4"
                                        v-model="modal4"
                                        :return-value.sync="endTime"
                                        persistent
                                        width="290px"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                                v-model="endTime"
                                                label="Picker in dialog"
                                                readonly
                                                v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-time-picker
                                            v-if="modal4"
                                            v-model="endTime"
                                            format="24h"
                                            full-width
                                    >
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="modal4 = false">Cancel</v-btn>
                                        <v-btn text color="primary" @click="$refs.dialog4.save(endTime)">OK</v-btn>
                                    </v-time-picker>
                                </v-dialog>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                        label="Price"
                                        v-model="workshop.offeredWorkshop.price"
                                        :rules="[checkPrice]"
                                        required
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                        label="Description"
                                        v-model="workshop.offeredWorkshop.description"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <v-select
                                        label="Prerequisites workshops"
                                        v-model="workshop.preRequisiteId"
                                        :items="workshops"
                                        item-text="name"
                                        item-value="id"
                                        multiple
                                ></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <v-file-input
                                        label="Image"
                                        v-model="workshop.offeredWorkshop.file"
                                        prepend-icon="mdi-camera"
                                        accept="image/*"
                                ></v-file-input>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="addOfferingWorkshop">Submit</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <workshop-list :workshops="offeringWorkshops" title="Offered Workshops"/>
    </v-container>
</template>

<script>
    import axios from 'axios';
    import WorkshopList from "../components/WorkshopList";

    export default {
        name: "OfferingWorkshops",
        components: {WorkshopList},
        props: ["id"],
        data() {
            return {
                offeringWorkshops: [],
                workshops: [],
                workshop: {
                    offeredWorkshop: {
                        name: "",
                        description: "",
                        price: 0,
                        file: null
                    },
                    preRequisiteId: [],
                    startTime: null,
                    endTime: null,
                    workshopId: null,

                },
                startDate: null,
                startTime: null,
                endDate: null,
                endTime: null,
                dialoga: false,
                modal: false,
                modal2: false,
                modal3: false,
                modal4: false
            }
        },
        mounted() {

            axios.get(this.$store.state.api + `/workshop/workshops/${this.id}/offeringWorkshop`).then((res) => {
                this.offeringWorkshops = res.data;
                // eslint-disable-next-line no-console
                console.log(this.offeringWorkshops);

            });
            axios.get(this.$store.state.api + `/workshop/workshops`).then((res) => {
                this.workshops = res.data;
            })
        },
        methods: {
            addOfferingWorkshop() {

                let sdate = new Date(this.startDate + "," + this.startTime);
                let edate = new Date(this.endDate + "," + this.endTime);
                let esDate = sdate.toISOString();
                esDate = esDate.slice(0, esDate.length - 5);
                esDate = esDate.concat("+0000");
                let eeDate = edate.toISOString();
                eeDate = eeDate.slice(0, eeDate.length - 5);
                eeDate = eeDate.concat("+0000");
                this.workshop.startTime = esDate;
                this.workshop.endTime = eeDate;
                this.workshop.workshopId = this.id;

                // eslint-disable-next-line no-console
                console.log(this.workshop)
                axios.post(this.$store.state.api + "/workshopManagers/offeringWorkshop/", this.workshop).then(() => {
                    this.dialoga = false;
                    this.$router.go(this.$router.currentRoute);
                })
            },
            checkPrice() {
                let found_dot = false;
                let error = "It's not a number";
                let price = this.workshop.offeredWorkshop.price;
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
            }
        }
    }
</script>

<style scoped>

</style>
