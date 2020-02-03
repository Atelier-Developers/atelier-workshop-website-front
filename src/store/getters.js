// https://vuex.vuejs.org/en/getters.html

export default {
    isLoggedIn: state => !!state.token && state.userId !== -1,
    authStatus: state => state.status,
}
