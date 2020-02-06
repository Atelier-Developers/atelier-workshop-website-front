<template>
    <v-card class="mx-auto my-12 " max-width="800">
        <v-container>
            <v-row justify="center">
                <v-col cols="12" md="6">
                    <v-select
                            v-model="selectedOfferingWorkshop"
                            :items="this.offeringWorkshops"
                            label="Offering workshop"
                            item-text="name"
                            item-value="id"
                            @input="getPayments"
                    ></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-list two-line>
                        <template v-for="req in userPayments">
                            <v-menu
                                    :close-on-content-click="false"
                                    :key="req.name"
                                    offset-x
                                    offset-y
                            >
                                <template v-slot:activator="{ on }">
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            <v-btn
                                                    v-on="on"
                                                    block
                                                    color="primary"
                                            >
                                                {{req.name}}
                                            </v-btn>
                                        </v-list-item-title>
                                        <v-list-item-subtitle class="mt-3 ml-3">
                                            {{req.paidN}}/{{req.pays.length}} <!-- TODO DO IT IS PAID-->
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </template>
                                <v-card>
                                    <v-card-title>
                                        Payment Status
                                    </v-card-title>
                                    <v-card-text>
                                        <v-list>
                                            <v-list-item-content>
                                                <v-row>
                                                    <v-col class="d-flex align-center font-weight-bold" cols="12"
                                                           md="2">
                                                        Value
                                                    </v-col>
                                                    <v-col class="d-flex align-center font-weight-bold" cols="12"
                                                           md="5">
                                                        <div class="mr-auto">
                                                            Date
                                                        </div>
                                                    </v-col>
                                                    <v-col class="d-flex align-center font-weight-bold" cols="12"
                                                           md="5">
                                                        <div class="ml-auto mr-5 px-0 py-0 btn">
                                                            Status
                                                        </div>
                                                    </v-col>
                                                </v-row>
                                            </v-list-item-content>
                                            <v-divider></v-divider>
                                            <v-list-item-content v-for="pay in req.pays" :key="pay.id">
                                                <v-container>
                                                    <v-row>
                                                        <v-col class="d-flex align-center" cols="12" md="2">
                                                            ${{pay.value}}
                                                        </v-col>
                                                        <v-col class="d-flex align-center" cols="12" md="5">
                                                            <div class="mr-auto">
                                                                {{pay.paymentDate.getFullYear()}}/{{pay.paymentDate.getMonth()}}/{{pay.paymentDate.getDate()}}
                                                            </div>
                                                        </v-col>
                                                        <v-col class="d-flex align-center" cols="12" md="5">
                                                            <v-btn
                                                                    v-if="!pay.paid"
                                                                    color="success"
                                                                    small
                                                                    @click="() => submitPay(pay, req)"
                                                                    class="ml-auto px-0 py-0 btn">
                                                                Pay
                                                            </v-btn>
                                                            <div v-else class="ml-auto mr-5 px-0 py-0 btn">
                                                                Paid
                                                            </div>
                                                        </v-col>
                                                    </v-row>
                                                </v-container>
                                                <v-divider></v-divider>
                                            </v-list-item-content>
                                        </v-list>
                                    </v-card-text>
                                </v-card>
                            </v-menu>
                        </template>
                    </v-list>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "PaymentRequests",
        data() {
            return {
                userPayments: null,
                offeringWorkshops: null,
                selectedOfferingWorkshop: null,
            }
        },
        mounted() {
            axios.get(`${this.$store.state.api}/workshop/offeringWorkshop/upcoming`)
                .then((res) => {
                    this.offeringWorkshops = res.data;
                })
        },
        methods: {
            getPayments() {
                axios.get(`${this.$store.state.api}/workshopManagers/offeringWorkshop/${this.selectedOfferingWorkshop}/requests/pending/attPayments`)
                    .then((res) => {
                        this.userPayments = res.data;
                        for (let i = 0; i < this.userPayments.length; i++) {
                            let sum = 0;
                            for (let j = 0; j < this.userPayments[i].pays.length; j++) {
                                this.userPayments[i].pays[j].paymentDate = new Date(this.userPayments[i].pays[j].paymentDate);
                                if (this.userPayments[i].pays[j].paid)
                                    sum += 1;
                            }
                            this.userPayments[i].paidN = sum;
                        }
                    })
            },
            submitPay(pay,req) {
                axios.put(`${this.$store.state.api}/admin/attendeePaymentTab/${pay.id}`)
                    .then(() => {
                        pay.paid = true;
                        req.paidN += 1;
                    });
            }
        }
    }
</script>

<style scoped>
</style>
