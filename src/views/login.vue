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
    <div class="loginCenter">
      <div class="bannerWrap">
        <!-- 轮播图 -->
        <el-carousel :height="bannerHeight+'px'" arrow="never">
          <el-carousel-item v-for="item in list" :key="item">
            <img :src="item" ref="image" />
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
                <img src="@/assets/img/codeImg.png" v-show="LoginTab" />
                <img src="@/assets/img/computer.png" v-show="!LoginTab" />
              </span>
            </div>
          </div>
          <div class="loginCenter">
            <label v-show="LoginTab">
              <img src="@/assets/img/user.png" />
              <input type="text" placeholder="请输入用户名" v-model="userName" />
            </label>
            <label v-show="LoginTab">
              <img src="@/assets/img/password.png" />
              <input type="password" placeholder="请输入密码" v-model="userPassword" />
            </label>
            <div v-show="!LoginTab" class="loginScan">
              <img src="@/assets/img/saomiao.gif" />
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
    // this.imgLoad();
    this.$nextTick(function() {
      this.bannerHeight = this.$refs.image[0].height;
      console.log(this.$refs.image[0].height);
    });
    window.addEventListener("resize", () => {
      this.$nextTick(function() {
        this.bannerHeight = this.$refs.image[0].height;
        console.log(this.$refs.image[0].height);
      });
    });
  },
  methods: {
    loginTab() {
      this.LoginTab = !this.LoginTab;
    },
    imgLoad () {
      this.$nextTick(function () {
        this.bannerHeight = this.$refs.image.height
        console.log(this.$refs.image[0].height)
      })
    },
    loginIng() {
      this.$router.push("/Home");
      // this.$axios({
      //   method: "post",
      //   url: "sampleGuide/doLogin/selectByName",
      //   data: this.qs.stringify({
      //     username: this.userName,
      //     password: this.userPassword
      //   })
      // })
      //   .then(({ data }) => {
      //     console.log(data);
      //     if (data.code == 400) {
      //       alert("用户名或密码错误");
      //     } else {
      //       this.$router.push("/Home");
      //     }
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
    }
  }
};
</script>
<style lang="less" scoped>
.loginWrap{
  background: url("~@/assets/img/background.jpg") no-repeat;
  background-size: cover;
}
.loginHeader {
  // height: 20vh;
  line-height: 12vh;
  margin-left: 30px;
  img {
    vertical-align: middle;
    width: 147px;
    height: 50px;
  }
  span {
    display: inline-block;
    border-left: 1px solid #aaa;
    margin-left: 30px;
    font-size: 20px;
    padding-left: 20px;
    vertical-align: middle;
    line-height: 40px;
    em {
      display: block;
      font-style: normal;
      font-size: 16px;
      line-height: 20px;
    }
  }
}
.bannerWrap {
  position: relative;
  // text-align: center;
  img {
    width: 1920px;
    height: 500px;
  }
}
.loginContent {
  width: 350px;
  background: white;
  position: absolute;
  top: 22%;
  right: 3%;
  z-index: 2;
  padding: 0 20px 15px 20px;
  .loginTitle {
    height: 62px;
    .titleLeft {
      margin-top: 20px;
      float: left;
      font-size: 18px;
    }
    .titleRight {
      float: right;
      margin-top: 7px;
      span {
        display: inline-block;
        position: relative;
        img {
          vertical-align: middle;
        }
        em {
          position: absolute;
          top: 5px;
          left: 21px;
          font-size: 12px;
          color: #00a0e9;
          font-style: normal;
        }
      }
      .togglePic {
        background: url("~@/assets/img/tishi.png");
        background-size: 121px 28px;
        width: 121px;
        height: 28px;
        top: 8px;
      }
      .toggleText {
        cursor: pointer;
        img {
          width: 47px;
          height: 47px;
        }
      }
    }
    .lineBottom {
      display: block;
      width: 40px;
      height: 3px;
      margin-top: 3px;
      background: linear-gradient(to right, #004de9, #21d4fd);
    }
  }
  .loginCenter {
    label {
      display: block;
      margin-top: 20px;
      border-bottom: 1px solid #1ab6f9;
      padding-bottom: 5px;
      width: 80%;
      img {
        vertical-align: middle;
        width: 30px;
        height: 30px;
      }
      input {
        vertical-align: middle;
        border: none;
        width: 70%;
        height: 25px;
        font-size: 14px;
        padding-left: 15px;
        outline: none;
      }
    }
    .loginScan {
      text-align: center;
      img {
        width: 128px;
        height: 128px;
      }
    }
  }
  .loginBtn {
    width: 100%;
    height: 35px;
    border: none;
    background: linear-gradient(to right, #004de9, #21d4fd);
    border-radius: 2px;
    text-align: center;
    color: white;
    margin-top: 20px;
    font-size: 14px;
    cursor: pointer;
  }
}
.footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 40px;
  font-size: 16px;
}
</style>
