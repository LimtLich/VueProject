<template>
<div @keyup.enter="commitLogin">
  <img class='home-bac-img' src='/static/Images/IceCode.jpg' />
  <div class="home-shadow"></div>
  <el-breadcrumb separator="|" class="Tab" v-show="!unLog">
    <el-breadcrumb-item>Welcome, {{name}}</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/Album-management' }">Album-management</el-breadcrumb-item>
    <el-breadcrumb-item>
      <div @click="Logout" style="display:inline-block">Logout</div>
    </el-breadcrumb-item>
    <el-breadcrumb-item></el-breadcrumb-item>
  </el-breadcrumb>
  <div class="Login" v-show="unLog" @click="showLogin = true">Login</div>
  <div class="home-topic">
    <p>Ming's Live View</p>
    <p>{{DateObj.Year}}</p>
    <p>{{DateObj.Month}}</p>
  </div>
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
      showLogin: false,
      unLog: true,
      name: null,
    }
  },
  methods: {
    clearInput() {
      this.LoginObj.account = null
      this.LoginObj.password = null
    },
    commitLogin() {
      authAPI.login(this.LoginObj).then((result) => {
        this.unLog = false
        this.name = result
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
          this.unLog = true
        })
      }).catch(() => {
        this.$alert(err, 'Erro', {
          type: 'warning'
        })
      })
    }
  },
  created() {
    authAPI.getUser().then((result) => {
      if (result) {
        this.unLog = false
        this.name = result
      }
    }).catch((err) => {
      this.$alert(err, 'Erro', {
        type: 'warning'
      })
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

.Tab {
  position: absolute;
  top: 1%;
  right: 1%;
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
  opacity: 0.3;
  /*background:-webkit-gradient(linear, 0 0, 0 bottom, from(#fff), to(#000))*/
}

.home-topic {
  position: absolute;
  top: 5%;
  left: 5%;
  font-weight: bold;
  font-style: italic;
  text-align: left;
}

.home-topic p {
  margin-top: 20px;
  font-size: 35px;
}

.home-topic p:nth-child(1) {
  font-size: 12px;
  color: #EDDFC8;
}

.home-topic p:nth-child(2) {
  color: #000;
}

.home-topic p:nth-child(3) {
  color: #EDDFC8;
  padding-bottom: 20px;
  border-bottom: 1px solid #dfdfdf;
}
</style>
