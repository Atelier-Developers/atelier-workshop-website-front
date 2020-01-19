<template>
    <div>
        <v-card
                dark
                tile
        >
            <v-container style="position: relative">
                <v-row no-gutters justify="space-between">
                    <v-col cols="12" sm="7">
                        <v-card-title
                                class="headline text-capitalize"
                                v-text="offeredWorkshop.name"
                        />
                        <div class="font-weight-light title mb-2 text-capitalize">
                            {{wManager ? "By You": manager.name}}
                        </div>
                        <v-card-text class="text-capitalize">{{offeredWorkshop.workshop.name}}</v-card-text>
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
                            <v-col cols="6" v-if="!passed">
                                <v-card outlined style="border: none">
                                    <div class="text-center">
                                        <v-icon class="mb-4" large>fas fa-user</v-icon>
                                        <p class="display-1">{{remainingTime}}</p>
                                        <p class="body-1">Remaining</p>
                                    </div>
                                </v-card>
                            </v-col>
                            <v-col cols="6" sm="6" md="6">
                                <v-card outlined style="border: none">
                                    <div class="text-center">
                                        <v-icon large class="mb-4">fas fa-user</v-icon>
                                        <p class="display-1">{{this.count}}</p>
                                        <p class="body-1">Students enrolled</p>
                                    </div>
                                </v-card>
                            </v-col>

                        </v-row>
                    </v-col>
                    <v-btn
                            class="hidden-sm-and-down"
                            absolute
                            bottom
                            text
                            depressed
                            disabled
                            right
                            style="z-index: 2"
                    >
                        <v-avatar
                                class=" elevation-10"
                                size="170"
                        >
                            <v-img src="https://i.udemycdn.com/course/240x135/625204_436a_2.jpg"/>
                        </v-avatar>
                    </v-btn>

                </v-row>
            </v-container>
        </v-card>

        <v-card tile outlined style="border: none;">
            <v-container v-if="prerequsite.length > 0">
                <p class="display-2 my-2">Prerequisites</p>
                <v-row>
                    <v-col v-for="p in prerequsite" cols="3" :key="p.id" class="title">
                        <v-icon>fas fa-check</v-icon>
                        {{p}}
                    </v-col>
                </v-row>
            </v-container>
            <v-container v-else>
                <p class="display-3 my-2 text-capitalize">No prerequisites needed!</p>
            </v-container>
        </v-card>
    </div>
</template>

<script>
    import moment from "moment";
    import PriceChip from "../components/PriceChip";


    export default {
        name: "WorkshopDetailInfo",
        props: ["offeredWorkshop", "count", "wManager", "manager", "prerequsite"],
        components: {PriceChip},
        computed: {
            startTime: function () {
                return moment(this.offeredWorkshop.startTime).format("lll");
            },
            endTime: function () {
                return moment(this.offeredWorkshop.endTime).format("lll");
            },
            passed: function () {
                let end = new Date(this.offeredWorkshop.endTime);
                let dnow = new Date();
                return end.valueOf() < dnow.valueOf();

            },
            remainingTime: function () {
                return moment(this.offeredWorkshop.startTime).fromNow();
            },
            offeredWorkshopEndingStatus: function () {
                let start = new Date(this.offeredWorkshop.startTime);
                let end = new Date(this.offeredWorkshop.endTime);

                let d = new Date();

                if (d.valueOf() < start.valueOf()) {
                    return "soon"
                } else if (d.valueOf() > end.valueOf()) {
                    return "done"
                } else if (d.valueOf() > start.valueOf() && d.valueOf() < end.valueOf()) {
                    return "doing"
                } else {
                    return "wrong"
                }
            }
        }
    }
</script>

<style scoped>

</style>