<template>
    <div class="headWrap" id="zl">
        <!--  -->
        <div class="center">
            <!-- 左边:导航条 -->
            <div class="left">
                <div class="logo">
                    <img src="@/assets/img/logo.png" alt>
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
                    <div
                        class="item logout-wrap"
                        @mouseenter="showIndex=4"
                        @mouseleave="showIndex=-1"
                    >
                        <img src="@/assets/img/header_home1.png" alt>
                        <p class="logout" :class="{show:showIndex===4}">
                            <span>切换用户</span>
                            <span>推出</span>
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
      test () {
            console.log("1: ", 1);
      },
      testclick() {
            console.log("111: ", 111);
      }
    }
}
</script>
