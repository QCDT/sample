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
            <img src="@/assets/img/saomiao.gif" @click="bindingCard">
            </div>
        </div>
        <span slot="footer" class="dialog-footer" v-show="LoginTab">
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
        roleName:'',
        receivePerson: ''
      }
    },
    methods:{
        loginTab () { // 扫码登录切换
            this.LoginTab = !this.LoginTab
        },
        verifyPerson(){ //登录验证
          if(this.userName =='' || this.userPassword ==''){
            this.$message.error('用户名或密码不能为空');
          }
          if(this.btnText=='登录'){
            this.$axios({
              method: 'post',
              url: 'sampleGuide/doLogin/selectByName',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              data:this.qs.stringify({
                username: this.userName,
                password: this.userPassword
              })
            })
              .then(({data})=>{
                console.log(data)
                if(data.code == 400){
                  this.$message.error('用户名或密码错误');
                  this.$router.push("/")
                }else{
                  // this.receivePerson = data.loginedUser
                  //    this.roleName = data.role
                  this.$cookies.set('userName', data.loginedUser, '1y')
                  this.$cookies.set('roleName', data.role, '1y')
                  this.$emit('close', false)
                  // this.reload()
                  // this.$emit('userName', this.receivePerson)
                  // this.$emit('roleName', this.roleName)
                }
              })
          }else if(this.btnText=='验证'){
            this.$axios({
              method: 'post',
              url: 'sampleGuide/sampleReceive/checkReceivePerson',
              data:({
                username: this.userName,
                password: this.userPassword
              })
            })
              .then(({data})=>{
                console.log(data)
                if(data.code == 400){
                  this.$message.error('用户名或密码错误');

                }else{
                  if(data.data.chinesename){
                    this.receivePerson = data.data.chinesename
                  }else {
                    this.receivePerson = data.data.username
                  }
                  this.$emit('userName', this.receivePerson)
                  this.$emit('close', false)
                }
              })
          }

        },
        goBack(){
            this.$emit('close', false)
        },
        bindingCard(){
        MyActiveX1.RDR_Close();
        let devicetypeValue = this.$cookies.get('readerType')
        let OpentypeValue = this.$cookies.get('portType')
        let comPortValue = this.$cookies.get('comPortNo')
        let comBaudRateValue = this.$cookies.get('comBaudRate')
        let comFrameStructureValue = this.$cookies.get('comFrameStructure')
        let netIpAddress = this.$cookies.get('netIpAddress')
        let netPort = this.$cookies.get('netPortNo')
        console.log(devicetypeValue,OpentypeValue,comPortValue,comBaudRateValue,comFrameStructureValue,netIpAddress,netPort)
        let n = this.$store.state.OnOpen(devicetypeValue,OpentypeValue,comPortValue,comBaudRateValue,comFrameStructureValue,netIpAddress,netPort)
        if (n!=0) {
          return
        }
        let nret=0;
        //盘点标签初始化,申请盘点标签所需要的内存空间。返回，成功：0 ；失败：非0 （查看错误代码表）。
        nret = MyActiveX1.RDR_InitInventory();
        if (nret!=0) {
          alert("盘点标签初始化失败！")
          return;
        }
        //盘点标签时，使能15693协议。返回，成功：0 ；失败：非0 （查看错误代码表）。
        nret = MyActiveX1.RDR_Enable15693(0,0x00,0)
        nret = MyActiveX1.RDR_Enable14443A()
        if (nret!=0) {
          //结束标签盘点操作，释放内存空间。
          MyActiveX1.RDR_FinishInventory()
          return;
        }
        this.readRfid()
        MyActiveX1.RDR_Close()
      },
        readRfid(){
        let nret = 0
        let recordCnt = ''
        let j =0
        nret = MyActiveX1.RDR_Inventory(0,"")
        // alert(nret)
        if (nret !== 0) {
          this.$alert('读取标签失败，请检查设备连接以及参数设置！', '提示', {
            confirmButtonText: '确定',
            type: 'error'
          })
          MyActiveX1.RDR_FinishInventory()
          return
        }
        recordCnt = MyActiveX1.RDR_GetRecordCnt()
        // console.log(recordCnt)
        let sTagInfo = MyActiveX1.GetRecord(j).split("-");
        let sTagID = sTagInfo[sTagInfo.length-1];

        if(recordCnt == 1){
          this.cardNub = sTagID;
          // alert(this.cardNub)
          this.$axios({
            method:'post',
            url: '/sampleGuide/doLogin/selectByCode',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data:this.qs.stringify({
              rfidCode: this.cardNub
            })
          })
            .then(({data})=>{
              console.log(data)
              if(data.code = 200){
                this.$cookies.set('userName', data.loginedUser, '1y')
                this.$cookies.set('roleName', data.role, '1y')
                this.$emit('close', false)
                // this.$router.push("/Home");
              }
            })
        }else{
          this.$alert('IC卡只能绑定一个！', '提示', {
            confirmButtonText: '确定',
            type: 'error'
          })
        }
      },
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
