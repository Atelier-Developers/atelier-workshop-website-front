<template>
    <div>
        <v-sheet
                class="mx-auto"
                max-width="700"
        >
            <v-slide-group multiple show-arrows>
                <v-slide-item
                        v-for="(i,group) in groups"
                        :key="group.id"
                >
                    <v-btn
                            class="mx-2"
                            active-class="blue white--text"
                            depressed
                            rounded
                            @click="() => toggle(i)"
                    >
                        {{group.name}}
                    </v-btn>
                </v-slide-item>
            </v-slide-group>
        </v-sheet>

        <GroupTable :group="groups[activeGroup]"/>
    </div>
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
            toggle(i) {
                this.activeGroup = i;
            }
        }
    }
</script>

<style scoped>

</style>