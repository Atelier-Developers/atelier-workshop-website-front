// https://vuex.vuejs.org/en/state.html

export default {
    api: 'http://localhost:5000',
    status: '',
    drawer: true,
    token: localStorage.getItem('token') || '',


}
