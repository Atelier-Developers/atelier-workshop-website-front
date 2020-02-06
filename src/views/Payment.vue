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
                                <div>
                                    Payment Type: {{this.cost}}
                                </div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="4">
                                <v-select
                                        v-model="payType"
                                        @input="checkSum"
                                        :items="['Cash', 'Installment']"
                                ></v-select>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-title>
                <v-card-text v-if="this.payType === 'Cash'">

                </v-card-text>
                <v-card-text v-if="this.payType === 'Installment'">
                    <v-row>
                        <v-col cols="12" sm="2">
                            <v-text-field
                                    class="input-price"
                                    v-model="payN"
                                    label="Number"
                                    append-icon="mdi-plus"
                                    @click:append="increment"
                                    prepend-inner-icon="mdi-minus"
                                    @click:prepend-inner="decrement"/>
                        </v-col>
                    </v-row>
                    <v-form>
                        <v-container>
                            <v-row justify="center" align="center">
                                <div
                                        v-for="i in this.payN"
                                        :key="i"
                                        cols="12"
                                        md="4"
                                        class="d-flex flex-column mx-7"
                                >
                                    <v-text-field
                                            type="number"
                                            v-model="installment.values[i]"
                                            :label="i + ') Value'"
                                            @input="checkSum"
                                    />
                                    <v-date-picker
                                            v-model="installment.dates[i]" scrollable
                                    />
                                </div>
                            </v-row>
                        </v-container>
                    </v-form>
                </v-card-text>
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
                    payN: this.payN,
                    payType: this.payType,
                    maxN: this.maxN,
                    installment: this.installment
                });
                if(this.payType === 'Cash'){
                    this.setValid(true);
                    return;
                }
                let sum = 0;
                for (let i = 1; i <= this.payN; i++) {
                    sum += parseFloat(this.installment.values[i]);
                }
                if (isNaN(sum))
                    sum = 0;
                if (sum === this.cost)
                    this.setValid(true);
                else
                    this.setValid(false);
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

    .input-price >> input {
        text-align: right !important;
    }

    /*.input-price input::-webkit-outer-spin-button,*/
    /*.input-price input::-webkit-inner-spin-button {*/
    /*    -webkit-appearance: none;*/
    /*}*/
</style>
