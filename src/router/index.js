import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../views/Home";
import Signup from "../views/Signup";
import Login from "../views/Login";
import WorkshopDetail from "../views/WorkshopDetail";
import ShowAttendeeWorkshopHistory from "../views/ShowAttendeeWorkshopHistory";
import ShowGraderWorkshopHistory from "../views/ShowGraderWorkshopHistory";
import ShowManagerWorkshopHistory from "../views/ShowManagerWorkshopHistory";
import UserProfile from "../views/UserProfile";
import NotFoundPage from "../views/NotFoundPage";
import Form from "../views/Form";
import WorkshopForms from "../views/WorkshopForms";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/workshopManager',
    name: 'manager',
    component: ShowManagerWorkshopHistory
  },
  {
    path: '/workshopAttendee',
    name: 'Attendee',
    component: ShowAttendeeWorkshopHistory
  },
  {
    path: '/workshopGrader',
    name: 'Grader',
    component: ShowGraderWorkshopHistory
  },
  {
    path: '/user-profile/:id',
    name: 'Profile',
    component: UserProfile,
    props: true
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
  {
    path: '/workshop/form',
    name: 'workshopForm',
    component: Form,
    props: true
  },
  {
    path: '/workshop/forms',
    name: 'workshopForms',
    component: WorkshopForms,
    props: true
  },
  {
    path: '/workshop/:wId',
    name: 'Workshop',
    component: WorkshopDetail,
    props: true,
  },
  {
    path: '*',
    name: "Not Found Page",
    component: NotFoundPage
  }
]

const router = new VueRouter({
  routes
})

export default router
