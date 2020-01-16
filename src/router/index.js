import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from "../views/Dashboard";
import Photos from "../views/Photos";
import Signup from "../views/Signup";
import Login from "../views/Login";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/photo',
    name: 'Photo',
    component: Photos
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
