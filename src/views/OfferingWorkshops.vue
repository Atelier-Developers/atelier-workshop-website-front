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
                    @click="dialogs = !dialogs"
            >
                <v-icon size="30">mdi-plus</v-icon>
            </v-btn>
            <v-dialog v-model="dialogs" max-width="500px">
                <v-card class="py-3 px-3">
                    <v-card-text>
                        <v-form v-model="isValid">
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                            label="Offering Workshop Name"
                                            v-model="workshop.offeredWorkshop.name"
                                    />
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
                                            />
                                        </template>
                                        <v-date-picker v-model="startDate" scrollable>
                                            <v-spacer/>
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
                                                    label="Start Time"
                                                    readonly
                                                    v-on="on"
                                            />
                                        </template>
                                        <v-time-picker
                                                v-if="modal3"
                                                v-model="startTime"
                                                format="24hr"
                                                full-width
                                        >
                                            <v-spacer/>
                                            <v-btn text color="primary" @click="modal3=false">Cancel</v-btn>
                                            <v-btn text color="primary" @click="$refs.dialog3.save(startTime)">OK
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
                                            />
                                        </template>
                                        <v-date-picker v-model="endDate" scrollable>
                                            <v-spacer/>
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
                                                    label="End Time"
                                                    readonly
                                                    v-on="on"
                                            />
                                        </template>
                                        <v-time-picker
                                                v-if="modal4"
                                                v-model="endTime"
                                                format="24hr"
                                                full-width
                                        >
                                            <v-spacer/>
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
                                    />
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                            label="Description"
                                            v-model="workshop.offeredWorkshop.description"
                                    />
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
                                    />
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-combobox
                                            label="Workshop Managers"
                                            v-model="workshop.userManagerId"
                                            :items="users"
                                            item-text="name"
                                            multiple
                                            chips
                                    />
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-file-input
                                            label="Image"
                                            v-model="file"
                                            prepend-icon="mdi-camera"
                                            accept="image/*"
                                    />
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer/>
                        <v-btn color="primary" @click="addOfferingWorkshop" :loading="loading" :disabled="!isValid">
                            Submit
                        </v-btn>
                    </v-card-actions>

                    <div class="text-center error--text font-weight-regular text-uppercase mt-4" v-if="error">
                        <v-icon class="mr-3" color="error">mdi-alert</v-icon>
                        {{errorMsg}}
                    </div>
                </v-card>
            </v-dialog>
        </template>
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
        computed: {
            isAdmin() {
                return this.$store.state.isAdmin;
            },
        },
        data() {
            return {
                isValid: false,
                offeringWorkshops: [],
                workshops: [],
                workshop: {
                    offeredWorkshop: {
                        name: "",
                        description: "",
                        price: 0,
                    },
                    preRequisiteId: [],
                    startTime: null,
                    endTime: null,
                    workshopId: null,
                    userManagerId: null
                },
                errorMsg: "",
                users: [],
                file: null,
                startDate: null,
                startTime: null,
                endDate: null,
                endTime: null,
                dialogs: false,
                modal: false,
                modal2: false,
                modal3: false,
                modal4: false,
                loading: false,
                error: false,
            }
        },
        mounted() {
            axios.all([axios.get(this.$store.state.api + `/workshop/workshops/${this.id}/offeringWorkshop`),
            ]).then((res) => {
                this.offeringWorkshops = res[0].data;
                if (this.isAdmin) {
                    axios.all([axios.get(this.$store.state.api + `/workshop/workshops`),
                        axios.get(this.$store.state.api + '/users/allUsers')]).then((r) => {
                        this.workshops = r[0].data;
                        // eslint-disable-next-line no-console
                        console.log(r[1].data);
                        this.users = r[1].data;
                    })
                }
            });
        },
        methods: {
            getItemName(item) {
                return item.name;
            },
            addOfferingWorkshop() {
                let sdate = new Date(this.startDate + "," + this.startTime);
                let edate = new Date(this.endDate + "," + this.endTime);
                if (sdate > edate) {
                    this.error = true;
                    this.errorMsg = "start date should be before end date";
                    return;
                }
                else if(sdate < Date.now()){
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
                this.workshop.startTime = esDate;
                this.workshop.endTime = eeDate;
                this.workshop.workshopId = this.id;
                let ids = [];
                this.workshop.userManagerId.forEach((user) => {
                        ids.push(user.id);
                    }
                );
                this.workshop.userManagerId = ids;
                this.loading = true;
                axios.post(this.$store.state.api + "/workshopManagers/offeringWorkshop/", this.workshop).then((res) => {
                    let formData = new FormData();
                    formData.append('file', this.file);
                    axios.post(this.$store.state.api + "/userDetails/pic/offeringWorkshop/" + res.data,
                        formData
                        , {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }
                    ).then(() => {
                        this.dialogs = false;
                        this.loading = false;
                        this.$router.go(this.$router.currentRoute);
                    });

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
