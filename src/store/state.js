// https://vuex.vuejs.org/en/state.html

export default {
    api: 'http://37.152.180.226:5000',
    status: '',
    drawer: true,
    token: localStorage.getItem('token') || '',
    isAdmin: false,
}
