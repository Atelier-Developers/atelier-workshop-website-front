import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../views/Home";
import Signup from "../views/Signup";
import Login from "../views/Login";
import User from "../views/User";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/user',
    name: 'User',
    component: User
  },

  {
    path: '/signup',
    name: 'Sign up',
    component: Signup
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
]

const router = new VueRouter({
  routes
})

export default router
