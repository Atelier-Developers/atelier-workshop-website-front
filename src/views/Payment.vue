<template>
    <v-card class="mx-10 my-10">
        <v-card-title>
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <div>
                            Payment Type: {{this.cost}}
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="4">
                        <v-select
                                v-model="payType"
                                :items="['Cash', 'Qessi']"
                        ></v-select>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-title>
        <v-card-text v-if="this.payType === 'Cash'">
            <!--            PAY ALL-->
        </v-card-text>
        <v-card-text v-if="this.payType === 'Qessi'">
            <v-row>
                <v-col cols="12" sm="2">
                    <v-text-field
                            class="input-price"
                            v-model="payN"
                            label="Number"
                            append-icon="mdi-plus"
                            @click:append="increment"
                            prepend-inner-icon="mdi-minus"
                            @click:prepend-inner="decrement"></v-text-field>
                </v-col>
            </v-row>
            <v-form>
                <v-container>
                    <v-row justify="center" align="center">
                        <v-col
                                v-for="i in this.payN"
                                :key="i"
                                cols="12"
                                md="4"
                                class="d-flex flex-column px-12"
                        >
                            <v-text-field
                                    v-model="installment.values[i]"
                                    :label="i + ') Value'"
                            ></v-text-field>
                            <v-date-picker
                                    v-model="installment.dates[i]" scrollable
                            ></v-date-picker>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
        </v-card-text>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="6" sm="4" md="3">
                        Sum of Pays: {{this.paySum}}
                    </v-col>
                    <v-col cols="6" sm="4" md="3">
                        <v-btn
                                color="primary"
                                @click="sendForm"
                        >Pay
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: "Payment",
        props: ["cost"],
        data() {
            return {
                payN: 2,
                payType: null,
                maxN: 10,
                installment: {
                    dates: new Array(this.payN),
                    values: new Array(this.payN)
                }
            }
        },
        computed: {
            paySum() {
                let sum = 0;
                for (let i = 0; i <= this.payN; i++)
                    if (typeof (this.installment.values[i]) === "number")
                        sum += +this.installment.values[i];
                return sum;
            }
        },
        methods: {
            increment() {
                this.payN = parseInt(this.payN, 10) + 1;
                if (this.payN > this.maxN)
                    this.payN = this.maxN;
                // eslint-disable-next-line no-console
                console.log(this.installment);
                this.installment = {
                    dates: new Array(this.payN),
                    values: new Array(this.payN)
                };
            },
            decrement() {
                this.payN = parseInt(this.payN, 10) - 1;
                if (this.payN < 2)
                    this.payN = 2;
                this.dates = new Array(this.payN);
            }
        }
    }
</script>

<style scoped>
    .input-price {
        max-width: 100px;
    }

    .input-price input {
        -moz-appearance: textfield;
        text-align: center !important;
    }

    /*.input-price input::-webkit-outer-spin-button,*/
    /*.input-price input::-webkit-inner-spin-button {*/
    /*    -webkit-appearance: none;*/
    /*}*/
</style>
