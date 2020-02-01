<template>
    <v-container class="fill-height image_background" fluid>
        <v-card max-width="550" class="my-auto mx-auto py-2 card" raised>

            <v-form v-model="isValid" class="ma-3">
                <v-container>
                    <v-row justify="center" dense no-gutters>
                        <v-col cols="11">
                            <v-text-field v-model="user.name" label="Name" outlined
                                          :rules="[this.requiredRule('name')]" prepend-icon="mdi-account-card-details"/>
                        </v-col>
                        <v-col cols="11">
                            <v-text-field v-model="user.username" label="Username" outlined
                                          :rules="[this.requiredRule('username'), v => v.length > 6 || 'At least 6 characters']"
                                          prepend-icon="mdi-account"/>
                        </v-col>
                        <v-col cols="11">
                            <v-text-field v-model="user.password" label="Password" outlined
                                          validate-on-blur
                                          :rules="[this.requiredRule('password'),  v => v.length >= 8 || 'At least 8 characters']"
                                          type="password"
                                          prepend-icon="mdi-lock"/>
                        </v-col>
                        <v-col cols="11">
                            <v-text-field v-model="user.rePassword" label="Confirm Password" outlined
                                          validate-on-blur
                                          :rules="[passwordConfirmationRule]" type="password"
                                          prepend-icon="mdi-lock"/>
                        </v-col>
                        <v-col cols="11">
                            <v-text-field v-model="user.email" label="Email" outlined

                                          :rules="[this.requiredRule('Email'),  v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid']"
                                          prepend-icon="mdi-mail"/>
                        </v-col>

                    </v-row>


                    <v-row justify="center" dense no-gutters>
                        <v-btn
                                text
                                class="ma-2"
                                color="primary"
                                @click="signup"
                                to="/login"
                        >
                            Sign in
                        </v-btn>
                        <v-btn
                                class="ma-2"
                                color="primary"
                                @click="signup"
                                :disabled="!isValid"
                                :loading="loading"
                        >
                            Sign Up
                        </v-btn>
                    </v-row>
                    <div class="text-center error--text font-weight-regular text-uppercase mt-4" v-if="error">
                        <v-icon class="mr-3" color="error">mdi-alert</v-icon>
                        username is already taken
                    </div>

                </v-container>

            </v-form>
        </v-card>
    </v-container>
</template>

<script>
    import axios from "axios"

    export default {
        data() {
            return {
                isValid: false,
                loading: false,
                error: false,
                user: {
                    username: "",
                    password: "",
                    rePassword: "",
                    name: "",
                    email: ""
                }
            }
        },
        computed: {
            passwordConfirmationRule() {
                return () => (this.user.password === this.user.rePassword) || 'Password must match'
            },
        }, methods: {
            requiredRule(msg) {
                return v => !!v || msg + " is required!";
            },
            signup() {
                let apiUrl = this.$store.state.api;
                let header = {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
                axios.post(apiUrl + '\\users\\sign-up', this.user, {
                    headers: header
                }).then(() => {
                        this.loading = false;
                        this.$router.push("/");
                    }
                ).catch(() => {
                    this.error = true;
                    this.loading = false;
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
</style>
