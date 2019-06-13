<template>
 <div class="loginWrap">
    <div class="loginHeader">
      <a href="http://www.sampleguide.cn">
        <img src="@/assets/img/logo.png" />
      </a>
      <span>智能样本管理系统</span>
      <span>
        <em>轻松管理您的样本</em>
        <em>Get your sample easily</em>
      </span>
    </div>
    <div class="bannerWrap">
      <el-carousel trigger="click" height="35vw" arrow="never">
        <el-carousel-item v-for="item in list" :key="item">
          <img :src="item" />
        </el-carousel-item>
      </el-carousel>
      <div class="loginContent">
        <div class="loginTitle">
          <div class="titleLeft">
            <span>{{ LoginTab ? "账号登录" : "扫码登录" }}</span>
            <span class="lineBottom"></span>
          </div>
          <div class="titleRight">
            <span class="togglePic">
              <em>{{ LoginTab ? "扫码登录更便捷" : "账密登录在这里" }}</em>
            </span>
            <span class="toggleText" @click="loginTab()">
              <img src="@/assets/img/codeImg.png" v-show="LoginTab" />
              <img src="@/assets/img/computerlogin.png" v-show="!LoginTab" />
            </span>
          </div>
        </div>
        <div class="loginCenter">
          <label v-show="LoginTab">
            <img src="@/assets/img/user.png" />
            <input type="text" placeholder="请输入用户名" />
          </label>
          <label v-show="LoginTab">
            <img src="@/assets/img/password.png" />
            <input type="password" placeholder="请输入密码" />
          </label>
          <div v-show="!LoginTab" class="loginScan">
            <img src="@/assets/img/saomiao.gif" />
          </div>
        </div>
        <button class="loginBtn" @click="loginIng">登录</button>
      </div>
    </div>
    <footer>
    </footer>
  </div>
</template>
<script>
export default {
  data () {
    return {
      userName: '',
      userPassword: '',
      LoginTab: true,
      list: [
        require('@/assets/img/banner-1.png'),
        require('@/assets/img/banner-2.png'),
        require('@/assets/img/banner-3.png')
      ]
    }
  },
  methods: {
    loginTab () {
      this.LoginTab = !this.LoginTab
    },
    loginIng () {
      this.$router.push('/Home')
    }
  }
}
</script>
