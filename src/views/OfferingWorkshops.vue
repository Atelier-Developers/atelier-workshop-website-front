<template>
    <v-container v-if="!initialLoading">
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
                                            outlined
                                            :rules="[v => !!v || 'This field is required']"
                                            label="Offering Workshop Name *"
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
                                                    outlined

                                                    :rules="[v => !!v || 'This field is required']"
                                                    v-model="startDate"
                                                    label="Start Date *"
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
                                            :rules="[v => !!v || 'This field is required']"
                                            persistent
                                            width="290px"
                                    >
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                                    v-model="startTime"
                                                    label="Start Time *"
                                                    outlined
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
                                                    outlined
                                                    v-model="endDate"
                                                    :rules="[v => !!v || 'This field is required']"
                                                    label="End Date *"
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
                                                    outlined

                                                    v-model="endTime"
                                                    :rules="[v => !!v || 'This field is required']"
                                                    label="End Time *"
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
                                            outlined

                                            label="Cash Price *"
                                            v-model="workshop.offeredWorkshop.cashPrice"
                                            :rules="[v => checkPrice(v), v => !!v || 'This field is required']"
                                            required
                                            prefix="$"
                                    />
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                            outlined
                                            @input="checkSum"
                                            label="Instalment price *"
                                            v-model="workshop.offeredWorkshop.installmentPrice"
                                            :rules="[v => checkPrice(v), v => !!v || 'This field is required']"
                                            required
                                            prefix="$"
                                    />
                                </v-col>
                                <v-row justify="center">
                                    <v-col cols="4">
                                        <v-text-field
                                                id="ali"
                                                outlined
                                                v-model="payN"
                                                label="Number"
                                                append-icon="mdi-plus"
                                                @click:append="increment"
                                                prepend-inner-icon="mdi-minus"
                                                @click:prepend-inner="decrement"/>
                                    </v-col>
                                </v-row>
                                <v-row justify="center" align="center">
                                    <div
                                            v-for="i in this.payN"
                                            :key="i"
                                            class="d-flex flex-column mx-7"
                                    >
                                        <v-text-field
                                                type="number"
                                                class="mt-5"
                                                outlined
                                                :value="installment.values[i]"
                                                v-model="installment.values[i]"
                                                :label="i + ') Value'"
                                                @input="checkSum"
                                        />
                                        <v-date-picker
                                                class="mb-5"
                                                v-model="installment.dates[i]" scrollable
                                        />
                                    </div>
                                </v-row>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                            outlined
                                            label="Description"
                                            v-model="workshop.offeredWorkshop.description"
                                    />
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-select
                                            outlined
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
                                            outlined
                                            :rules="[v => !!v || 'This field is required']"
                                            label="Workshop Managers *"
                                            v-model="workshop.userManagerId"
                                            :items="users"
                                            :item-text="(val) => val.name"
                                            multiple
                                            chips
                                    />
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-file-input
                                            outlined
                                            label="Image *"
                                            v-model="file"
                                            :rules="[v => !!v || 'This field is required']"
                                            prepend-icon="mdi-camera"
                                            accept="image/*"
                                    />
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer/>
                        <v-btn color="primary" @click="addOfferingWorkshop" :loading="loading" :disabled="!isValid || !paymentValid">
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
    <LoadingCircular v-else/>
</template>

<script>
    import axios from 'axios';
    import WorkshopList from "../components/WorkshopList";
    import LoadingCircular from "../components/LoadingCircular";

    export default {
        name: "OfferingWorkshops",
        components: {LoadingCircular, WorkshopList},
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
                        cashPrice: null,
                        installmentPrice: null,
                    },
                    preRequisiteId: [],
                    startTime: null,
                    endTime: null,
                    workshopId: null,
                    userManagerId: null
                },
                installment: {
                    dates: new Array(this.payN),
                    values: new Array(this.payN)
                },
                paymentValid: false,
                payN: 2,
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
                initialLoading: false,
                editMode: false,
                error: false,
            }
        },
        mounted() {
            this.initialLoading = true;
            axios.all([axios.get(this.$store.state.api + `/workshop/workshops/${this.id}/offeringWorkshop`),
            ]).then((res) => {
                this.offeringWorkshops = res[0].data;
                if (this.isAdmin) {
                    axios.all([axios.get(this.$store.state.api + `/workshop/workshops`),
                        axios.get(this.$store.state.api + '/users/allUsers')]).then((r) => {
                        this.workshops = r[0].data;
                        this.users = r[1].data;
                        this.initialLoading = false
                    })
                }
                else {
                    this.initialLoading = false
                }
            });
        },
        methods: {
            getCurrentDate(i){
                let now = new Date();
                this.installment.dates[i] = now.toISOString();

            },
            checkSum() {
                let sum = 0;
                for (let i = 1; i <= this.payN; i++) {
                    sum += parseFloat(this.installment.values[i]);
                }
                if (isNaN(sum))
                    sum = 0;
                this.paymentValid = sum === parseFloat(this.workshop.offeredWorkshop.installmentPrice);
            },
            increment() {
                this.payN = parseFloat(this.payN) + 1;
                if (this.payN > this.maxN)
                    this.payN = this.maxN;
                // eslint-disable-next-line no-console
                this.installment = {
                    dates: new Array(this.payN),
                    values: new Array(this.payN)
                };
            },
            decrement() {
                this.payN = parseFloat(this.payN) - 1;
                if (this.payN < 2)
                    this.payN = 2;
                this.installment = {
                    dates: new Array(this.payN),
                    values: new Array(this.payN)
                };
            },
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
                else if(sdate < Date.now() && !this.editMode){
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
                this.loading = false;
                let insPay = [];
                for(let i = 1; i < this.installment.dates.length; ++i ){
                    insPay.push({
                        dueDate: new Date(this.installment.dates[i]).toISOString().slice(0, esDate.length - 5).concat("+0000"),
                        amount: this.installment.values[i],
                    })
                }
                axios.post(this.$store.state.api + "/workshopManagers/offeringWorkshop/", this.workshop).then((res) => {
                    let id = res.data;
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
                        axios.post(this.$store.state.api + "/workshopManagers/offeringWorkshop/" + id + "/installments", {
                            type: "installment",
                            payments: insPay
                        })
                            .then(() => {
                                this.dialogs = false;
                                this.loading = false;
                                this.$router.go(this.$router.currentRoute);
                            })

                    });

                })
            },
            checkPrice(value) {
                if(value == null){
                    return false;
                }
                let found_dot = false;
                let error = "It's not a number";
                let price = value;
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
