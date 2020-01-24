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
import OfferingWorkshops from "../views/OfferingWorkshops";
import WorkshopCreateForm from "../views/WorkshopCreateForm";
import WorkshopRequests from "../views/WorkshopRequests";
import Certificate from "../views/Certificate";
import workshopAddPage from "../views/workshopAddPage";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/createForm',
        name: 'Create Form',
        component: WorkshopCreateForm,
        props: true
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
        path: '/workshopAssistant',
        name: 'Assistant',
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
        path: '/certificate',
        name: 'certificate',
        component: Certificate,
        props: true
    },
    {
        path: '/workshopRequests',
        name: 'Workshop Requests',
        component: WorkshopRequests,
        props: true
    },
    {
        path: '/workshop/forms',
        name: 'workshopForms',
        component: WorkshopForms,
        props: true
    },
    {
        path: '/workshop/offringworkshop/:id',
        name: 'Offering Workshops',
        component: OfferingWorkshops,
        props: true,
    },
    {
        path: '/workshop/:wId',
        name: 'Workshop',
        component: WorkshopDetail,
        props: true,
    },
    {
        path: '/workshops',
        name: 'Workshops',
        component: workshopAddPage,
    },
    {
        path: '*',
        name: "Not Found Page",
        component: NotFoundPage
    }
]

const router = new VueRouter({
    routes,
    scrollBehavior(){
        return {x: 0, y: 0}
    }
})

export default router
