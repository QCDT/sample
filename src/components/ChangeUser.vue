<template>
          <!-- 验证登录-->
    <el-dialog
        :visible.sync="dialogLogin"
        width="30%"
        center
        class="dialogLogin"
        :close-on-click-modal="false"
        :close-on-press-escape ='false'
        >
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
        <span slot="footer" class="dialog-footer">
            <el-button @click="goBack" size="mini">返回</el-button>
            <el-button type="primary" @click="verifyPerson" size="mini">{{btnText}}</el-button>
        </span>
    </el-dialog>
</template>
<script>
export default {
    inject:['reload'],
    props: {
        dialogLogin: Boolean,
        // disabledClose: false,
        btnText: String
    },
    data(){
      return{
        userName: '', // 登录用户名
        userPassword: '',// 登录密码
        LoginTab: true, // 扫码登录切换
        roleName:'' ,
        receivePerson: ''
      }
    },
    methods:{
        loginTab () { // 扫码登录切换
            this.LoginTab = !this.LoginTab
        },
        verifyPerson(){ //登录验证
            this.reload()
        //    this.$axios({
        //         method: 'post',
        //         url: 'sampleGuide/sampleReceive/checkReceivePerson',
        //         data:({
        //             username: this.userName,
        //             password: this.userPassword
        //         })
        //    })
        //    .then(({data})=>{
        //        console.log(data)
        //        if(data.code == 200){
        //            this.receivePerson = data.data.username
        //         //    this.roleName = data.data
        //            this.$emit('close', false)
        //            this.$emit('userName', this.receivePerson)
        //            this.$emit('roleName', this.roleName)
        //        }else{
        //              this.$message.error('用户名或密码错误');
        //        }
        //    })
        },
        goBack(){
            this.$emit('close', false)
        }
    }
}
</script>
<style lang="less" scoped>
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
.dialogLogin{
    /deep/.el-dialog__header{
        display: none;
    }
}
</style>