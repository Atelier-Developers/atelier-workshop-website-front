<template>
    <v-hover v-slot:default="{ hover }">
        <v-card
                class="mx-auto"
                color="grey lighten-4"
                max-width="600"
        >
<!--            <v-img-->
<!--                    :aspect-ratio="16/9"-->
<!--                    src="https://cdn.vuetifyjs.com/images/cards/kitchen.png"-->
<!--            >-->
<!--                <v-expand-transition>-->
<!--                    <div-->
<!--                            v-if="hover"-->
<!--                            class="d-flex transition-fast-in-fast-out orange darken-2 v-card&#45;&#45;reveal display-3 white&#45;&#45;text"-->
<!--                            style="height: 100%;"-->
<!--                    >-->
<!--                        {{workshop.name}}-->
<!--                    </div>-->
<!--                </v-expand-transition>-->
<!--            </v-img>-->
<!--            <v-card-text-->
<!--                    class="pt-6"-->
<!--                    style="position: relative;"-->
<!--            >-->
<!--                <v-btn-->
<!--                        absolute-->
<!--                        color="orange"-->
<!--                        class="white&#45;&#45;text"-->
<!--                        fab-->
<!--                        large-->
<!--                        right-->
<!--                        top-->
<!--                >-->
<!--                    <v-icon>mdi-cart</v-icon>-->
<!--                </v-btn>-->
<!--                <div class="font-weight-light grey&#45;&#45;text title mb-2">{{workshop.workshopManager}}</div>-->
<!--                <h3 class="display-1 font-weight-light orange&#45;&#45;text mb-2">{{workshop.name}}</h3>-->
<!--                <div class="font-weight-light title mb-2">-->
<!--                    Our Vintage kitchen utensils delight any chef.<br>-->
<!--                    Made of bamboo by hand-->
<!--                </div>-->
<!--            </v-card-text>-->
        </v-card>
    </v-hover>
</template>

<script>
    export default {
        name: "WorkshopCard",
        props: ["workshop"]
    }
</script>

<style scoped>
    .v-card--reveal {
        align-items: center;
        bottom: 0;
        justify-content: center;
        opacity: .5;
        position: absolute;
        width: 100%;
    }
</style>