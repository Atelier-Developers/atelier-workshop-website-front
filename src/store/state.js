// https://vuex.vuejs.org/en/state.html

export default {
    api: 'http://localhost:5000',
    status: '',
    token: localStorage.getItem('token') || '',
    userId: localStorage.getItem('userId') || -1
}
