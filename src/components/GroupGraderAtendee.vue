<template>
    <v-container>
        <v-sheet
                class="mx-auto mb-4"
                max-width="700"
        >
            <v-slide-group mandatory show-arrows center-active dark disable-sort>
                <v-slide-item
                        v-for="(group, i) in groups"
                        :key="group.id"
                        v-slot:default="{ active, toggle}"
                >
                    <v-btn
                            class="mx-2"
                            active-class="blue white--text"
                            :input-value="active"
                            depressed
                            rounded
                            @click="() => optionClick(i, toggle)"
                    >
                        {{group.groupName}}
                    </v-btn>
                </v-slide-item>
            </v-slide-group>
        </v-sheet>


        <GroupTable :group="groups[activeGroup]"/>
    </v-container>
</template>

<script>
    import GroupTable from "./GroupTable";

    export default {
        name: "GroupGraderAtendee",
        components: {GroupTable},
        props: ["groups"],
        data() {
            return {
                activeGroup: 0,
            }
        },
        methods: {
            optionClick(i, f) {
                f();
                this.activeGroup = i;
            }
        }
    }
</script>

<style scoped>

</style>