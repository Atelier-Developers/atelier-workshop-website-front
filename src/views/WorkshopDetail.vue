<template>

    <!--    TODO add paralex image-->
    <div>
        <v-card
                dark
                tile
        >
            <v-container style="position: relative">
                <v-row no-gutters justify="space-between">
                    <v-col cols="12" sm="7">
                        <v-card-title
                                class="headline"
                                v-text="offeredWorkshop.name"
                        />

                        <v-card-text v-text="offeredWorkshop.workshop.name"/>
                        <div class="font-weight-regular body-1 mb-2">
                            {{offeredWorkshop.description}}
                        </div>
                        <div class="font-weight-light subtitle-2 mb-2">
                            <v-icon>mdi-clock-in</v-icon>
                            {{startTime}}
                        </div>
                        <div class="font-weight-light subtitle-2 mb-7">
                            <v-icon>mdi-clock-out</v-icon>
                            {{endTime}}
                        </div>

                        <PriceChip :price="offeredWorkshop.price"/>
                    </v-col>

                    <v-col cols="12" sm="5">
                        <v-row justify="center" align="center" class="fill-height">
                            <v-col cols="6">
                                <v-card outlined style="border: none">
                                    <div class="text-center">
                                        <v-icon class="mb-4" large>fas fa-user</v-icon>
                                        <p class="display-1">5 days</p>
                                        <p class="body-1">Remaining</p>
                                    </div>
                                </v-card>
                            </v-col>
                            <v-col cols="6" sm="6" md="6">
                                <v-card outlined style="border: none">
                                    <div class="text-center">
                                        <v-icon large class="mb-4">fas fa-user</v-icon>
                                        <p class="display-1">2000</p>
                                        <p class="body-1">Students enrolled</p>
                                    </div>
                                </v-card>
                            </v-col>

                        </v-row>
                    </v-col>
                    <v-btn
                            absolute
                            bottom
                            text
                            depressed
                            disabled
                            right
                    >
                        <v-avatar
                                class="ma-3 elevation-10"
                                size="170"
                        >
                            <v-img src="https://i.udemycdn.com/course/240x135/625204_436a_2.jpg"/>
                        </v-avatar>
                    </v-btn>

                </v-row>
            </v-container>
        </v-card>
    </div>
</template>

<script>
    import axios from "axios";
    import moment from "moment";
    import PriceChip from "../components/PriceChip";

    export default {
        name: "WorkshopDetail",
        components: {PriceChip},
        props: ["wId"],
        data() {
            return {
                offeredWorkshop: {}
            }
        },
        mounted() {
            axios.get(this.$store.state.api + "/workshop/offeringWorkshop/" + this.wId).then((res) => {
                // eslint-disable-next-line no-console
                console.log(res.data);
                this.offeredWorkshop = res.data;
            })
        },
        computed: {
            startTime: function () {
                return moment(this.offeredWorkshop.startTime).format("lll");
            },
            endTime: function () {
                return moment(this.offeredWorkshop.endTime).format("lll")
            }
        }
    }
</script>

<style scoped>

</style>