import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from "../views/Dashboard";
import Photos from "../views/Photos";

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
]

const router = new VueRouter({
  routes
})

export default router
