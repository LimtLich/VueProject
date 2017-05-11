var httpRequest = require('../extend/Axios')
var path = '/service/public/upload/'
export default {
  getAllAttachment(params) {
    return httpRequest.get(path + 'getAllAttachment')
  },
}
