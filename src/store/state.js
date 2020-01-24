// https://vuex.vuejs.org/en/state.html

export default {
    api: 'http://localhost:5000',
    status: '',
    drawer: true,
    userId:  localStorage.getItem('userId') || -1,
    token: localStorage.getItem('token') || '',
    isAdmin: localStorage.getItem("isAdmin") === "admin" || false,
}
