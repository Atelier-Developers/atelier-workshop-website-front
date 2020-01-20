<template>
   <v-container class="fill-height image_background" fluid>
       <v-card max-width="550" class="my-auto mx-auto py-2 " raised shaped>

           <v-form v-model="isValid" class="ma-3">
               <v-container>
                   <v-row justify="center" dense no-gutters>
                       <v-col cols="11">
                           <v-text-field v-model="user.name" label="Name" outlined
                                         :rules="[this.requiredRule('name')]" prepend-icon="mdi-account-card-details"/>
                       </v-col>
                       <v-col cols="11">
                           <v-text-field v-model="user.username" label="Username" outlined
                                         :rules="[this.requiredRule('username')]" prepend-icon="mdi-account"/>
                       </v-col>
                       <v-col cols="11">
                           <v-text-field v-model="user.password" label="Password" outlined
                                         :rules="[this.requiredRule('password')]" type="password" prepend-icon="mdi-lock"/>
                       </v-col>
                       <v-col cols="11">
                           <v-text-field v-model="user.address" label="Address" outlined
                                         :rules="[this.requiredRule('address')]" prepend-icon="mdi-office-building"/>
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
                           Sign in instead
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
                    name: "",
                    address: ""
                }
            }
        }
        , methods: {
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
        background-image: linear-gradient(to right, rgba(0, 0,0, 0), rgba(0, 0, 0, 0.7)), url("../assets/pexels-photo-747964.jpeg");
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }
</style>