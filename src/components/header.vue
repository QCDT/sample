<template>
  <div class="headWrap" id="zl">
    <!--  -->
    <div class="center">
      <!-- 左边:导航条 -->
      <div class="left">
        <div class="logo">
          <img src="@/assets/img/logo190x71.png" alt>
        </div>
        <div class="navbar">
          <div class="navbar-top">
            <h1>智能样本管理系统</h1>
            <h2>
              <p>轻松管理您的样本</p>
              <span>Get your sample easily</span>
            </h2>

            <h3>解放军总医院</h3>
          </div>
          <div class="nav">
            <ul>
              <li v-for="(item,index) in homeLink" :key="index">
                <span @mouseenter="test">
                  <router-link
                    :to="item.link"
                    @click.native="active=index"
                    :class="{active:index===active}"
                  >{{item.text}}</router-link>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 右边:退出 -->
      <div class="right">
        <small>Sampleguide 3.0</small>
        <router-link :to="{name:'test'}" tag="div">test</router-link>
        <div class="iconWrap">
          <div class="item" @mouseenter="showIndex=1" @mouseleave="showIndex=-1">
            <img src="@/assets/img/header_user1.png" alt>
            <p :class="{show:showIndex===1}">
              <span>用户名: admin</span>
              <span>角色名: 超级管理员</span>
            </p>
          </div>
          <div class="item" @mouseenter="showIndex=2" @mouseleave="showIndex=-1">
            <img src="@/assets/img/header_tell1.png" alt>
            <p class="tel" :class="{show:showIndex===2}">
              <span>联系电话: 010-68683182</span>
              <span>E-mail：service@huitonghealthcare.com</span>
            </p>
          </div>
          <div class="item">
            <img src="@/assets/img/header_help1.png" alt>
          </div>
          <div class="item logout-wrap" @mouseenter="showIndex=4" @mouseleave="showIndex=-1">
            <img src="@/assets/img/header_home1.png" alt>
            <p class="logout" :class="{show:showIndex===4}">
              <span>切换用户</span>
              <span>退出</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      show: false,
      showIndex: -1,
      homeLink: [
        { link: "/home", text: "首页" },
        { link: "/scan", text: "扫描" },
        { link: "/query", text: "查询" },
        { link: "/check", text: "盘点" },
        { link: "/set", text: "设置" },
        { link: "/analyze", text: "数据分析" }
      ]
    };
  },

  methods: {
    test() {
      console.log("1: ", 1);
    },
    testclick() {
      console.log("111: ", 111);
    },
    setActive() {
      let routName = {
        home: 0,
        Home: 0,
        scan: 1,
        query: 2,
        check: 3,
        set: 4,
        analyze: 5
      };
      this.$router.path;
      console.log("this.$route.path: ", this.$route.path.split("/")[1]);
      this.active = routName[this.$route.path.split("/")[1]];
      //   let reg = /^\/.+/;
      //   console.log("this.$route.path.match(reg): ", this.$route.path.match(reg));
      //   this.active = routName[this.$route.path.match(reg)[0]];
    }
  },
  created() {
    this.setActive(); // 设置焦点
  }
};
</script>
<style scoped lang='less'>
#zl {
  .center {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 1330px;
    height: 87px;
    margin: 0 auto;
  }

  .left {
    display: flex;

    width: 1105px;

    .logo {
      display: flex;
      align-items: center;

      margin-right: 5px;

      cursor: pointer;

      > img {
        width: 190px;
        height: 71px;
      }
    }
  }

  .navbar {
    display: flex;
    flex-direction: column;

    .navbar-top {
      display: flex;
      align-items: center;

      height: 28px;
      margin-bottom: 5px;

      cursor: default;

      h1 {
        white-space: nowrap;
        //   只能样本管理系统

        color: #878a95;
      }

      h2 {
        display: flex;
        align-items: flex-start;
        // background-color: #333;

        white-space: nowrap;

        font-weight: 500;

        span {
          color: #878a95;

          font-size: 1em;
        }
      }
    }
  }

  .nav {
    ul {
      display: flex;

      li {
        margin-right: 1.5px;
        padding: 5px 15px 0;

        background: #3cd7ff;

        &:first-child {
          border-right: 1px solid #3cd7ff;
          border-left: 1px solid #3cd7ff;
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
        }

        &:last-child {
          border-right: 1px solid #3cd7ff;
          border-left: 1px solid #3cd7ff;
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
        }

        a {
          display: flex;

          padding: 5px 30px 2px;

          border-top-left-radius: 8px;
          border-top-right-radius: 8px;

          font-size: 16px;
          font-weight: 900;

          &:hover {
            color: #3cd7ff;
            background: #fff;
          }
        }

        .active {
          color: #3cd7ff;
          background: #fff;
        }
      }
    }
  }

  h1 {
    display: flex;
    align-items: top;

    box-sizing: border-box;
    height: 100%;
    padding: 2px 10px;

    border-left: 2px solid rgb(60, 215, 255);

    font-size: 16px;
    font-weight: 500;
  }

  h2 {
    display: flex;
    align-items: center;
    flex-direction: column;

    height: 100%;
    padding: 0 10px;

    border-left: 2px solid rgb(60, 215, 255);

    p {
      color: rgb(135, 138, 149);

      font-size: 12px;
    }

    span {
      font-weight: 300;
    }
  }

  h3 {
    display: flex;
    align-items: center;

    height: 100%;
    padding: 0 10px;

    border-left: 2px solid rgb(60, 215, 255);

    font-size: 16px;
    font-weight: 500;
  }

  .right {
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    width: 160px;
    height: 100%;
    padding-right: 20px;

    small {
      display: flex;
      justify-content: flex-end;

      padding-top: 10px;
    }
  }

  .iconWrap {
    display: flex;
    justify-content: space-between;

    .item {
      position: relative;

      > img {
        width: 24px;
        height: 24px;
      }

      .tel {
        width: 300px;
        margin-left: -190px;
      }

      > p {
        position: absolute;
        z-index: 99;
        top: 30px;

        display: none;

        margin-left: -68px;
        padding: 10px 12px;

        color: #fff;
        border-radius: 5px;
        background-color: #3cd7ff;

        font-size: 16px;
        font-weight: 100;

        span {
          display: block;

          white-space: nowrap;

          &:first-child {
            margin-bottom: 10px;
          }
        }
      }
    }
  }

  .show {
    display: block !important;
  }

  .logout-wrap {
    height: 30px;
    margin-left: -15px;
    padding-left: 15px;
  }

  .logout {
    z-index: 99; //不能正常出发移入移出时,把这个数字调大一些试试

    transform: translateX(5px);
  }
}
</style>
