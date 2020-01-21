<template>
    <v-container>
        <p class="display-3 grey--text text--darken-2 my-10 text-center">Groups</p>
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


        <GroupTable
                :group="groups[activeGroup]"
                :isManager="isManager"
                :action-function-attendee="actionFunctionAttendee"
                :action-function-attendee2="actionFunctionAttendee2"
                :action-function-grader="actionFunctionGrader"
                :action-function-grader2="actionFunctionGrader2"
        />
    </v-container>
</template>

<script>
    import GroupTable from "./GroupTable";

    export default {
        name: "GroupGraderAtendee",
        components: {GroupTable},
        props: ["groups", "isManager", "actionFunctionAttendee", "actionFunctionAttendee2", "actionFunctionGrader", "actionFunctionGrader2"],
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
