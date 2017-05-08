var httpRequest = require('../extend/http-request')
var path = '/service/public/auth/'
export default {
    login(params) {
        return httpRequest.post(path + 'login', params)
    },
}
