var user = require('../../db/models/user')
var exec = {
  login(req, res, next) {
    var account = req.body.account
    var password = req.body.password
    return user.findOne({
      where:{
        account:account,
        password:password
      }
    }).then((result)=>{
      if(result){
        return "success"
      }else{
        return Promise.reject('uncorrect account or password')
      }
    })

  }

}




module.exports = (req, res, next) => {
  var action = req.params.action
  Promise.resolve(action).then(function(result) {
    return exec[result](req, res, next)
  }).then(function(result) {
    res.send(result)
  }).catch(function(error) {
    res.status(500).send(error.toString())
  })
}
