<template>
    <div>
        <v-card
                dark
                tile
        >
            <v-container style="position: relative" fluid>
                <v-row no-gutters justify="space-between" class="mt-4">
                    <v-col cols="12" sm="7">
                        <div class="text-capitalize mb-3 display-3 font-weight-light">
                            {{offeredWorkshop.name}}
                        </div>
                        <div class="font-weight-light mb-2 text-capitalize title">
                            {{wManager ? "Offered By You": "Offered by " + managerNames}}
                        </div>
                        <div class="text-capitalize body-1 font-italic my-5">belonging to the collection of
                            {{offeredWorkshop.workshop.name}} workshops
                        </div>
                        <div class="mb-4 caption">
                            {{offeredWorkshop.description}}
                        </div>
                        <div class="font-weight-light subtitle-2 mb-1 mt-10">
                            <span class="mr-10"><v-icon>mdi-clock-in</v-icon>
                            {{startTime}}</span>
                            <span>
                                <v-icon>mdi-clock-out</v-icon>
                            {{endTime}}
                            </span>
                        </div>
                        <PriceChip :price="offeredWorkshop.price" class="mt-2"/>
                    </v-col>

                    <v-col cols="12" sm="5" class="mt-4">
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
                            top
                            text
                            depressed
                            right
                            disabled
                            style="z-index: 2; margin-top: -110px; margin-right: 20px"
                    >
                        <v-avatar
                                class=" elevation-10"
                                size="170"
                        >
                            <v-img :src="workshopImage" @error="hasError"/>
                        </v-avatar>
                    </v-btn>
                </v-row>
            </v-container>
        </v-card>

        <v-row justify="center" class="my-9">
            <v-card max-width="600" width="100%" outlined style="border: none;">
                <v-container v-if="prerequsite.length > 0">
                    <p class="display-3 grey--text text--darken-2 text-center">Prerequisites</p>
                    <v-row justify="center">
                        <v-col v-for="p in prerequsite" cols="6" md="3" :key="p" class="title">
                            <v-chip
                                    class="ma-2 text-capitalize"
                                    color="primary"
                                    label
                            >
                                <v-icon left>mdi-book-open-variant</v-icon>
                                {{p}}
                            </v-chip>

                        </v-col>
                    </v-row>
                </v-container>
                <v-container v-else>
                    <EmptyState icon="mdi-book-open-variant" title="no prerequisite needed!"/>
                </v-container>
            </v-card>
        </v-row>
    </div>
</template>

<script>
    import moment from "moment";
    import PriceChip from "../components/PriceChip";
    import EmptyState from "./EmptyState";


    export default {
        name: "WorkshopDetailInfo",
        props: ["offeredWorkshop", "count", "wManager", "manager", "prerequsite"],
        data() {
            return {
                faildImage: false,
            }
        },
        methods: {
            hasError() {
                this.faildImage = true
            }
        },
        components: {EmptyState, PriceChip},
        computed: {
            managerNames: function() {
                let names = "";
                if (this.manager.length === 1) {
                    return this.manager[0].name;
                }
                for (let i = 0; i < this.manager.length; ++i) {
                    if (i !== this.manager.length - 2) {
                        names.concat(this.manager[i].name);
                        names.concat(", ")
                    } else if (i !== this.manager.length - 1) {
                        names.concat(this.manager[i].name);
                        names.concat(" and ")
                    } else {
                        names.concat(this.manager[i].name);
                    }
                }
                return names;
            },
            workshopImage: function(){
                return this.faildImage ? "http://transat-h2020.eu/wp-content/uploads/2019/08/5d6395a3b682771d3d22445a.png" : this.$store.state.api + "/userDetails/pic/offeringWorkshop/" + this.offeredWorkshop.id
            },
            startTime: function(){
                return moment(this.offeredWorkshop.startTime).format("lll");
            },
            endTime:function (){
                return moment(this.offeredWorkshop.endTime).format("lll");
            },
            passed: function(){
                let end = new Date(this.offeredWorkshop.endTime);
                let dnow = new Date();
                return end.valueOf() < dnow.valueOf();

            },
            remainingTime: function(){
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