<template>
  <div class="loginWrap">
    <div class="loginHeader">
      <a href="http://www.sampleguide.cn">
        <img src="@/assets/img/logo.png">
      </a>
      <span>智能样本管理系统</span>
      <span>
        <em>轻松管理您的样本</em>
        <em>Get your sample easily</em>
      </span>
    </div>
    <div class="loginCenter">
      <div class="bannerWrap">
        <!-- 轮播图 -->
        <el-carousel :height="bannerHeight+'px'" arrow="never">
          <el-carousel-item v-for="item in list" :key="item">
            <img :src="item" ref="image">
          </el-carousel-item>
        </el-carousel>
        <div class="loginContent">
          <!-- 登录框 -->
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
                <img src="@/assets/img/codeImg.png" v-show="LoginTab">
                <img src="@/assets/img/computer.png" v-show="!LoginTab">
              </span>
            </div>
          </div>
          <div class="loginCenter">
            <label v-show="LoginTab">
              <img src="@/assets/img/user.png">
              <input type="text" placeholder="请输入用户名" v-model="userName">
            </label>
            <label v-show="LoginTab">
              <img src="@/assets/img/password.png">
              <input type="password" placeholder="请输入密码" v-model="userPassword">
            </label>
            <div v-show="!LoginTab" class="loginScan">
              <img src="@/assets/img/saomiao.gif">
            </div>
          </div>
          <button class="loginBtn" @click="loginIng">登录</button>
        </div>
      </div>
    </div>
    <div class="footer">
      <!-- 页脚 -->
      <span>技术支持: 惠通启恒医疗科技(北京)有限公司</span>
      <span>联系电话 010-68683182</span>
      <span>E-mail：service@huitonghealthcare.com</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userName: "",
      userPassword: "",
      LoginTab: true,
      bannerHeight: "",
      list: [
        require("@/assets/img/banner-1.png"),
        require("@/assets/img/banner-2.png"),
        require("@/assets/img/banner-3.png")
      ]
    };
  },
  mounted() {
    // element banner 高度自适应
     this.imgLoad();
		 window.addEventListener('resize', () => {
				this.bannerHeight = this.$refs.image[0].height;
		  })
    // this.imgLoad();
    // // this.$nextTick(function() {
    // //   this.bannerHeight = this.$refs.image[0].height;
    // //   console.log(this.$refs.image[0].height);
    // // });
    // window.addEventListener("resize", () => {
    //   this.$nextTick(function() {
    //     this.bannerHeight = this.$refs.image[0].height;
    //     console.log(this.$refs.image[0].height);
    //   });
    // });
  },
  methods: {
    loginTab() {
      this.LoginTab = !this.LoginTab;
    },
    imgLoad () {
      this.$nextTick(function () {
        this.bannerHeight = this.$refs.image[0].height
        // console.log(this.$refs.image[0].height)
      })
    },
    loginIng () {
      this.$router.push('/Home')
      this.$axios({
        method: "post",
        url: "sampleGuide/doLogin/selectByName",
        data: this.qs.stringify({
          username: this.userName,

          password: this.userPassword
        })
      })
      .then(({ data }) => {
        console.log(data);
        if (data.code == 400) {
          alert("用户名或密码错误");
        } else {
          this.$router.push("/Home");
        }
      })
      .catch(error => {
        console.log(error);
      });
    }
  }
};
</script>
