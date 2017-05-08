var user = require('./models/user')
var role = require('./models/role')
var permission = require('./models/permission')
var user_role = require('./models/user_role')
var role_permission = require('./models/role_permission')

module.exports = function() {
  return Promise.all([
    user.create({
      account: 'administrator',
      password: "admin"
    }),
    role.create({
      code: "admin",
      name: "admin"
    }),
    role.create({
      code: "user",
      name: "user"
    }),
    user_role.create({
      user_account: "administrator",
      role_code: "admin"
    }),
    role_permission.create({
      role_code: "admin",
      permission_code: "admin"
    }),
    permission.create({
      code: "admin",
      name: "admin"
    })
  ])
}
