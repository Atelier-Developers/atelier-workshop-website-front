// https://vuex.vuejs.org/en/mutations.html

export default {
    auth_request(state){
        state.status = 'loading'
    },
    auth_success(state, token){
        state.status = 'success'
        state.token = token
    },
    auth_error(state){
        state.status = 'error'
    },
    logout(state){
        state.status = '';
        state.token = ''
    },
}
