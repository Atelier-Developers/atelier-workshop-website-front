<template>

    <v-form v-model="isValid">
        <v-container>
            <v-row justify="center" dense>
                <v-col cols="12" md="7">
                    <v-text-field v-model="user.username" label="username" outlined
                                  :rules="[this.requiredRule('username')]"  prepend-icon="mdi-account"/>
                </v-col>
                <v-col cols="12" md="7">
                    <v-text-field v-model="user.password" label="password" outlined
                                  type="password"
                                  :rules="[this.requiredRule('password')]" prepend-icon="lock"/>
                </v-col>
            </v-row>

            <v-row justify="center" align="center"  align-content="center" dense no-gutters>
                <v-col>
                    <v-btn
                            text
                            class="ma-2"
                            color="primary"
                            to="/signup"
                    >
                        Create Account
                    </v-btn>
                </v-col>

                <v-col>
                    <v-btn
                            class="ma-2"
                            color="primary"
                            @click="login"
                            :disabled="!isValid"
                            :loading="loading"
                    >
                        Login
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>

    </v-form>
</template>

<script>
    import axios from "axios";

    export default {
        name: "Login",
        data() {
            return {
                isValid: false,
                loading: false,
                user: {
                    username: "",
                    password: "",
                }
            }
        },
        methods: {
            requiredRule(msg) {
                return v => !!v || msg + " is required!";
            },
            login() {
                this.loading = true;
                let apiUrl = this.$store.state.api;
                let header = {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
                axios.post(apiUrl + '\\login', this.user, {
                    headers: header
                }).then(() => {
                        this.loading = false;
                        this.$router.push("/");
                    }
                ).catch(() => {
                    this.loading = false;
                });
            }
        }
    }
</script>

<style scoped>

</style>