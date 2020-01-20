<template>
    <v-container fluid class="fill-height image_background">
        <v-card max-width="550" class="my-auto mx-auto py-3 ima" raised shaped>
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
                                          :rules="[this.requiredRule('password')]" prepend-icon="mdi-lock"/>
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
                    <div class="text-center error--text font-weight-regular text-uppercase mt-4" v-if="error">
                            <v-icon class="mr-3" color="error">mdi-alert</v-icon>
                            username or password is wrong
                    </div>
                </v-container>

            </v-form>
        </v-card>
    </v-container>
</template>

<script>
    import axios from "axios";

    export default {
        name: "Login",
        data() {
            return {
                error: false,
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
                        axios.get(this.$store.state.api + '/users/user').then((res) => {
                            // eslint-disable-next-line no-console
                            console.log(res.data.id);
                            localStorage.setItem('userId', res.data.id);
                            this.$store.commit('auth_user_id', res.data.id);
                            // eslint-disable-next-line no-console
                            console.log(this.$store.state.userId);
                            this.$router.push("/");
                        })

                    }
                ).catch(() => {
                    localStorage.removeItem('token');
                    this.$store.commit('auth_error');
                    this.loading = false;
                    this.error = true
                });
            }
        }
    }
</script>

<style scoped>
    .image_background {
        background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)), url("../assets/pexels-photo-747964.jpeg");
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .fill-height2 {
        height: 100%;
    }
</style>