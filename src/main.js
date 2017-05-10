// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import VueResource from 'vue-resource'
import authAPI from './api/auth'
import 'element-ui/lib/theme-default/index.css'

window.UserInfo = {
  isLogIn: false,
  name: null
};

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueResource)

//router 2.0改变beforeEach
router.beforeEach(function(to, from, next) {
  authAPI.getUser().then((result) => {
    var userInfo = window.UserInfo;
    if (result) {
      userInfo.isLogIn = true
      userInfo.name = result
      next()
    }else{
      if(to.path == '/'){
        next()
      }else{
        router.push('/')
      }
      console.log(to.path)
    }
  })

})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
