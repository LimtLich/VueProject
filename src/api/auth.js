var httpRequest = require('../extend/Axios')
var path = '/service/public/auth/'
export default {
    login(params) {
        return httpRequest.post(path + 'login', params)
    },
    logout() {
        return httpRequest.post(path + 'logout')
    },
    getUser() {
        return httpRequest.post(path + 'getUser')
    },
}
