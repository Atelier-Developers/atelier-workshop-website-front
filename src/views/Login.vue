<template>
    <v-container class="fill-height" fluid>
        <v-row justify="center" align="center">
            <v-col cols="12" sm="8" md="4">
                <v-card max-width="550" class="my-auto mx-auto py-2" raised shaped>
                    <v-form v-model="isValid">
                        <v-container>
                            <v-row justify="center" dense>
                                <v-col cols="11">
                                    <v-text-field v-model="user.username" label="username" outlined
                                                  :rules="[this.requiredRule('username')]" prepend-icon="mdi-account"/>
                                </v-col>
                                <v-col cols="11">
                                    <v-text-field v-model="user.password" label="password" outlined
                                                  type="password"
                                                  :rules="[this.requiredRule('password')]" prepend-icon="lock"/>
                                </v-col>
                            </v-row>

                            <v-row justify="center" align="center" align-content="center" dense no-gutters>
                                <v-btn
                                        text
                                        class="ma-2"
                                        color="primary"
                                        to="/signup"
                                >
                                    Create Account
                                </v-btn>

                                <v-btn
                                        class="ma-2"
                                        color="primary"
                                        @click="login"
                                        :disabled="!isValid"
                                        :loading="loading"
                                >
                                    Login
                                </v-btn>
                            </v-row>
                        </v-container>

                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
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
                    'Access-Control-Allow-Origin': '*',

                }
                axios.post(apiUrl + '\\login', this.user, {
                    headers: header
                }).then((resp) => {
                        this.loading = false;
                        const token = resp.headers.authorization;
                        localStorage.setItem('token', token);
                        axios.defaults.headers.common['Authorization'] = token;
                        this.$store.commit('auth_success', token);
                        this.$router.push("/");
                    }
                ).catch(() => {
                    localStorage.removeItem('token');
                    this.$store.commit('auth_error');
                    this.loading = false;
                });
            }
        }
    }
</script>

<style scoped>
    .image_background {
        background: url("../assets/pexels-photo-747964.jpeg");
    }
</style>