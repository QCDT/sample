<template>
  <div class="loginWrap">
    <div class="loginHeader top">
      <a href="http://www.sampleguide.cn">
        <img src="@/assets/img/logo190x71.png">
      </a>
      <span>智能样本管理系统</span>
      <span>
        <em>轻松管理您的样本</em>
        <em>Get your sample easily</em>
      </span>
    </div>
    <div class="bannerWrap center">
      <div class="carousel">
        <img :src="list[0]">
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
                <img src="@/assets/img/codeImg.png" v-show="LoginTab">
                <img src="@/assets/img/computer.png" v-show="!LoginTab">
              </span>
            </div>
          </div>
          <div class="loginCenter">
            <label v-show="LoginTab">
              <img src="@/assets/img/user.png">
              <input type="text" placeholder="请输入用户名">
            </label>
            <label v-show="LoginTab">
              <img src="@/assets/img/password.png">
              <input type="password" placeholder="请输入密码">
            </label>
            <div v-show="!LoginTab" class="loginScan">
              <img src="@/assets/img/saomiao.gif">
            </div>
          </div>
          <button class="loginBtn" @click="loginIng">登录</button>
        </div>
      </div>

      <!-- 轮播图 -->
      <!-- <el-carousel trigger="click" height="35vw" arrow="never">
        <el-carousel-item v-for="item in list" :key="item">
          <img :src="item" />
        </el-carousel-item>
      </el-carousel>-->
    </div>
    <div class="footer bottom">
      <div v-for="(item,index) in footer" :key="index" class="footer-sing">
        <h1>{{item.h1}}</h1>
        <span>{{item.text}}</span>
      </div>
    </div>
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
      ],
      footer: [
        { h1: '技术支持:', text: '惠通启恒医疗科技(北京)有限公司' },
        { h1: '联系电话', text: '010-68683182' },
        { h1: 'E-mail:', text: 'service@huitonghealthcare.com' }
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
<style lang='less'>
.loginWrap {
  background: url("~@/assets/img/background.jpg") no-repeat;
  background-size: cover;

  // 顶部
  .loginHeader {
    padding: 0 30px;

    img {
      width: 190px;
      height: 71px;

      vertical-align: middle;
    }

    span {
      display: inline-block;

      margin-left: 30px;
      padding-left: 20px;

      vertical-align: middle;

      border-left: 1px solid #aaa;

      font-size: 20px;
      line-height: 40px;

      em {
        display: block;

        font-size: 16px;
        font-style: normal;
        line-height: 20px;
      }
    }
  }

  .bannerWrap {
    position: relative;

    h1 {
      font-size: 35px;
    }
    img {
      width: 1920px;
      height: 500px;
    }
  }

  .footer {
    display: flex;
    justify-content: space-around;
    width: 1200px;
    margin: 0 auto;
    align-items: center;
    font-size: 16px;

    .footer-sing {
      display: flex;
      align-items: flex-end;
    }
    h1{
        font-size: 16px;
         color: #505050;
    }
    span{
        text-indent: .5em;
         color: #505050;

    }
  }
}

// 布局
.loginWrap {
  display: flex;
  flex-direction: column;

  width: 100vw;
  height: 100vh;

  .top {
    height: 100px;
    line-height: 100px;
  }

  .center {
      overflow: hidden;
    // flex: 1;
    // background-color: #999;
   
    display: flex;
    align-items: center;
  }

  .bottom {
    height: 70px;
  }
  /**
 * @description: 登录窗口相对于轮播图定位
 * @param {type}
 * @return:
 */
  .carousel {
    position: relative;
    width: inherit;
    overflow: hidden;
    .loginContent {
      position: absolute;
      z-index: 2;
      top: 22%;
      right: 3%;

      width: 350px;
      padding: 0 20px 15px 20px;

      background: white;

      .loginTitle {
        height: 62px;

        .titleLeft {
          float: left;

          margin-top: 20px;

          font-size: 18px;
        }

        .titleRight {
          float: right;

          margin-top: 7px;

          span {
            position: relative;

            display: inline-block;

            img {
              vertical-align: middle;
            }

            em {
              position: absolute;
              top: 5px;
              left: 21px;

              color: #00a0e9;

              font-size: 12px;
              font-style: normal;
            }
          }

          .togglePic {
            top: 8px;

            width: 121px;
            height: 28px;

            background: url("~@/assets/img/tishi.png");
            background-size: 121px 28px;
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

          width: 80%;
          margin-top: 20px;
          padding-bottom: 5px;

          border-bottom: 1px solid #1ab6f9;

          img {
            width: 30px;
            height: 30px;

            vertical-align: middle;
          }

          input {
            width: 70%;
            height: 25px;
            padding-left: 15px;

            vertical-align: middle;

            border: none;
            outline: none;

            font-size: 14px;
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
        margin-top: 20px;

        cursor: pointer;
        text-align: center;

        color: white;
        border: none;
        border-radius: 2px;
        background: linear-gradient(to right, #004de9, #21d4fd);

        font-size: 14px;
      }
    }
  }
}
</style>
