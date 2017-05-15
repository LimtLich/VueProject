<template>
<div @keyup.enter="commitLogin">
  <el-breadcrumb separator="|" class="Tab" v-show="UserInfo.isLogIn">
    <el-breadcrumb-item>Welcome, {{UserInfo.name}}</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/Album-management' }">Album-management</el-breadcrumb-item>
    <el-breadcrumb-item>
      <div @click="Logout" style="display:inline-block">Logout</div>
    </el-breadcrumb-item>
    <el-breadcrumb-item></el-breadcrumb-item>
  </el-breadcrumb>
  <el-carousel height="100%" class="carousel" :autoplay="false">
    <el-carousel-item v-for="item in backgroundImages" :key="item">
      <img class='home-bac-img' :src="item.url" />
      <div class="home-shadow"></div>
      <div class="home-message">
        <div>{{item.pic_name}}</div>
        <div>{{item.date}}</div>
      </div>
      <div class="home-massage-desc">{{item.describe}}</div>
      <div class="Login" v-show="!UserInfo.isLogIn" @click="showLogin = true">Login</div>
    </el-carousel-item>
  </el-carousel>
  <div class="Login-dialog">
    <el-dialog v-model="showLogin" size="tiny" @close="clearInput()" :show-close="false" :close-on-click-modal="false">
      <span>Login</span>
      <el-input v-model="LoginObj.account" placeholder="please enter your account"></el-input>
      <el-input type="password" v-model="LoginObj.password" placeholder="please enter your password"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showLogin = false">cancel</el-button>
        <el-button type="primary" @click="commitLogin">commit</el-button>
      </span>
    </el-dialog>
  </div>
</div>
</template>

<script>
import authAPI from '../api/auth'
import uploadAPI from '../api/upload'
export default {
  name: 'hello',
  data() {
    return {
      DateObj: {
        Year: 2017,
        Month: 'June',
      },
      LoginObj: {
        account: null,
        password: null
      },
      UserInfo: {

      },
      showLogin: false,
      backgroundImages: [],
    }
  },
  methods: {
    clearInput() {
      this.LoginObj.account = null
      this.LoginObj.password = null
    },
    commitLogin() {
      authAPI.login(this.LoginObj).then((result) => {
        this.UserInfo.isLogIn = true
        this.UserInfo.name = result
        this.showLogin = false
      }).catch((err) => {
        this.$alert(err, 'Erro', {
          type: 'warning'
        })
      })
    },
    Logout() {
      this.$confirm('Sure to logout?', 'Confirmation', {
        confirmButtonText: 'Sure',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        authAPI.logout().then(() => {
          this.UserInfo.isLogIn = false
        })
      }).catch(() => {
        this.$alert(err, 'Erro', {
          type: 'warning'
        })
      })
    }
  },
  created() {
    this.UserInfo = UserInfo
    uploadAPI.getAllAttachment().then((result) => {
      result.map((e) => {
        e.url = '/service/public/upload/getAttachment?hash=' + e.hash
      })
      result.map((e) => {
        e.date = new Date(e.date).Format("yyyy-MM-dd")
      })
      this.backgroundImages = result
    }).catch((err) => {
      this.backgroundImages.push({
        name: 'default',
        url: '/static/Images/IceCode.jpg'
      })
      console.log(err)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
* {
  margin: 0;
  padding: 0;
}

.home-message {
  position: absolute;
  top: 15%;
  left: 5%;
  z-index: 9999;
  color:#fff;
}

.home-massage-desc{
  position:absolute;
  left:45%;
  bottom:20%;
  color:#fff;
  font-weight: bold;
}

.el-carousel__indicators {
  display: none!important;
}

.carousel {
  position: absolute!important;
  width: 100%;
  height: 100%;
}

.Tab {
  position: absolute;
  top: 1%;
  right: 1%;
  z-index: 9999;
}

.Tab span {
  color: #fff;
  font-size: 14px;
  font-style: italic;
  font-weight: bold;
}

.Tab>.el-breadcrumb__item:nth-child(1)>span:nth-child(1) {
  cursor: inherit;
}

.Tab>.el-breadcrumb__item:nth-child(1)>span:nth-child(1):hover {
  color: #fff;
}

.Login {
  position: absolute;
  top: 1%;
  right: 1%;
  font-weight: bold;
  color: #dfdfdf;
  font-style: italic;
  text-decoration: underline;
  cursor: pointer;
}

.Login-dialog span {
  font-size: 14px;
  font-weight: bold;
}

.Login-dialog>div>div {
  margin-top: 10%;
  background: #dfdfdf;
}

.Login-dialog>div>div>.el-dialog__body {
  padding-top: 10px;
}

.Login-dialog input {
  margin-top: 20px;
}

.home-bac-img {
  position: fixed;
  left: 0;
}

.home-shadow {
  width: 100%;
  height: 100%;
  background: #000;
  position: absolute;
  opacity: 0.4;
  /*background:-webkit-gradient(linear, 0 0, 0 bottom, from(#fff), to(#000))*/
}
</style>
