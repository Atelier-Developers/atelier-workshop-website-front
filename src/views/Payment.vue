<template>
    <v-container class="fill-height">
        <v-row
                class="fill-height"
                align="center"
                justify="center"
        >
            <v-card
                    class="form-card  pb-5 pt-3"
                    raised
                    max-width="800"
                    width="90%"
            >
                <v-card-title>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <div v-if="this.payType === 'Cash'">
                                    Cost: ${{this.cost[0]}}
                                </div>
                                <div v-else-if="this.payType === 'Installment'">
                                    Cost: ${{this.cost[1]}}
                                </div>
                                <div v-else></div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="4">
                                <v-select
                                        label="Payment Type"
                                        v-model="payType"
                                        @input="checkSum"
                                        :items="['Cash', 'Installment']"
                                ></v-select>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-title>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "Payment",
        props: ["cost", "setValid", "setData"],
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
                if (this.payType === "Cash")
                    return this.cost;
                let sum = 0;
                for (let i = 1; i <= this.payN; i++) {
                    sum += parseFloat(this.installment.values[i]);
                }
                if (isNaN(sum))
                    sum = "input Values";
                return sum;
            }
        },
        methods: {
            checkSum() {
                this.setData({
                    payType: this.payType,
                });
                this.setValid(true);
            },
            increment() {
                this.payN = parseFloat(this.payN, 10) + 1;
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
                this.payN = parseFloat(this.payN, 10) - 1;
                if (this.payN < 2)
                    this.payN = 2;
                this.installment = {
                    dates: new Array(this.payN),
                    values: new Array(this.payN)
                };
            }
        }
    }
</script>

<style scoped>
    .input-price {
        max-width: 100px;
    }

    .input-price > > input {
        text-align: right !important;
    }

    /*.input-price input::-webkit-outer-spin-button,*/
    /*.input-price input::-webkit-inner-spin-button {*/
    /*    -webkit-appearance: none;*/
    /*}*/
</style>
