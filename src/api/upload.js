var httpRequest = require('../extend/Axios')
var path = '/service/public/upload/'
export default {
  getAllAttachment(params) {
    return httpRequest.get(path + 'getAllAttachment')
  },
  getAttachmentById(params) {
    return httpRequest.get(path + 'getAttachmentById', params)
  },
  setPictureAttribute(params) {
    return httpRequest.post(path + 'setPictureAttribute', params)
  },
  deletePic(params) {
    return httpRequest.post(path + 'deletePic', params)
  },
}
