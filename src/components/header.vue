<template>
  <div class="headWrap">
    <div class="center">
      <!-- 左边:导航条 -->
      <div class="left-box">
        <div class="logo">
          <el-image style="width: 100%; height: 100%" :src="require('@/assets/img/logo190x71.png')"></el-image>
        </div>
        <div class="navbar">
          <div class="row-top"> <h1>智能样本管理系统</h1> <h2> <span>轻松管理您的样本</span> <small>Get your sample easily</small> </h2> <h3>解放军总医院</h3>
          </div>
          <div class="row-bot">
            <ul>
              <li v-for="(item,index) in homeLink" :key="index">
                <span>
                  <router-link
                    :to="item.link"
                    @click.native="active=index"
                    :class="{active:index===active}"
                  >{{item.text}}
                  </router-link>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 右边:退出 -->
      <div class="right-box">
        <small class="versions">Sampleguide 3.0</small>
        <div class="icon-wrap">
          <div class="item" @mouseenter="showIndex=1" @mouseleave="showIndex=-1">
            <img src="@/assets/img/header_user1.png">
            <p :class="{show:showIndex===1}">
              <span>用户名: {{userName}}</span>
              <span>角色名: {{roleName}}</span>
            </p>
          </div>
          <div class="item" @mouseenter="showIndex=2" @mouseleave="showIndex=-1">
            <img src="@/assets/img/header_tell1.png">
            <p class="tel" :class="{show:showIndex===2}">
              <span>联系电话: 010-68683182</span>
              <span>E-mail：service@huitonghealthcare.com</span>
            </p>
          </div>
          <div class="item">
            <img src="@/assets/img/header_help1.png">
          </div>
          <div class="item logout-wrap" @mouseenter="showIndex=4" @mouseleave="showIndex=-1">
            <img src="@/assets/img/header_home1.png">
            <p class="logout" :class="{show:showIndex===4}">
              <span @click="userTab">切换用户</span>
              <span>退出</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <ChangeUser :dialogLogin = 'dialogLogin' btnText= '登录' @close='close' @userName = 'changeUserName' @roleName='changeRoleName'></ChangeUser>
  </div>
</template>
<script>
import  ChangeUser from '@/components/ChangeUser'
export default {
  components:{
    ChangeUser
  },
  data () {
    return {
      active: 0,
      show: false,
      showIndex: -1,
      dialogLogin: false,
      userName:'',
      roleName:'',
      homeLink: [
        { link: '/home', text: '首页' },
        { link: '/scan', text: '扫描' },
        { link: '/query', text: '查询' },
        { link: '/check', text: '盘点' },
        { link: '/set', text: '设置' },
        { link: '/analyze', text: '数据分析' }
      ]
    }
  },

  methods: {
    userTab(){
      this.dialogLogin = true
    },
    close(value){
        this.dialogLogin = false
    },
    changeRoleName(value){
      this.roleName = value
    },
    changeUserName(value){
      this.userName = value
    },
    setActive () {
      let routName = {
        home: 0,
        Home: 0,
        scan: 1,
        query: 2,
        check: 3,
        set: 4,
        analyze: 5
      }
      this.active = routName[this.$route.path.match(/\w+/)[0]]
    }
  },
  created () {
    this.setActive() // 设置焦点
  }
}
</script>
<style scoped lang='less'>
.headWrap{
  height: 70px;
}
.center {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 2;
  background: white;
}
.logo {
  cursor: pointer;
  width: 190px;
  height: 71px;
  transform: scale(0.7, 0.7);
}
.left-box {
  display: flex;
}

.navbar {
  display: flex;
  flex-direction: column;
}
.row-top {
  display: flex;
  align-items: center;

  // height: 35px;
  margin-bottom: 5px;

  cursor: default;

  h1 {
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    //   只能样本管理系统
    font-size: 14.5px;

    color: #878a95;
  }

  h2 {
    display: flex;
    align-items: flex-start;
    // background-color: #333;
    justify-content: center;
    white-space: nowrap;

    font-weight: 500;
    p {
      font-size: 13px;
      padding: 0;
    }
    span {
      color: #878a95;

      font-size: 12px;
    }
  }
}
.row-bot {
  ul {
    display: flex;

    li {
      margin-right: 1.5px;
      padding: 5px 15px 0;

      background: #00c9ff;

      &:first-child {
        border-right: 1px solid #00c9ff;
        border-left: 1px solid #00c9ff;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }

      &:last-child {
        border-right: 1px solid #00c9ff;
        border-left: 1px solid #00c9ff;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
      }

      a {
        display: flex;

        padding: 0px 20px 2px;

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
        color: #00c9ff;
        background: #fff;
      }
    }
  }
}

h1 {
  display: flex;
  align-items: center;

  box-sizing: border-box;
  height: 100%;
  padding: 2px 10px;

  border-left: 2px solid #00c9ff;

  font-size: 16px;
  font-weight: 500;
}

h2 {
  display: flex;
  align-items: center;
  flex-direction: column;

  height: 100%;
  padding: 0 10px;

  border-left: 2px solid #00c9ff;

  span {
    color: rgb(135, 138, 149);

    font-size: 12px;
  }

  small {
    font-weight: 300;
  }
}

h3 {
  display: flex;
  align-items: center;

  height: 100%;
  padding: 0 10px;

  border-left: 2px solid #00c9ff;

  font-size: 16px;
  font-weight: 500;
}

.right-box {
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  width: 160px;
  height: 100%;
  padding-right: 20px;

  .versions {
    display: flex;
    justify-content: flex-end;
    white-space: nowrap;
    padding-top: 10px;
    font-size: 14px;
    cursor: text;
    user-select: none;
  }
}

.icon-wrap {
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
      background-color: #00c9ff;

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
  z-index: 2;

  transform: translateX(5px);
}
</style>
