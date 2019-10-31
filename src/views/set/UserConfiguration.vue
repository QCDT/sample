<template>
 <div>
     <cardfile  @reception= 'refData'></cardfile>
     <div class="userWrap">
        <div class="userTitle">  <!-- 搜索用户和角色部分  -->
            <div class="userType">
                <i>{{userType?"用户名": '角色名'}}</i>
                <el-input v-model="searchUserName" size="mini"></el-input>
            </div>
            <div class="userType">
                <i>{{userType?"角色名": '权限'}}</i>
                <el-select v-model="roleValue" clearable placeholder="请选择" size="mini" v-show="userType">
                  <el-option
                    v-for="item in roleOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-select v-model="jurisdictionValue" placeholder="请选择" size="mini" v-show="!userType">
                  <el-option
                    v-for="item in authority"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </div>
            <div class="userType">
                <el-button type="primary" size="mini" @click="searchUser">搜索</el-button>
                <el-button type="primary" size="mini" @click="AddType">{{userType?"添加用户": '添加角色'}}</el-button>
            </div>
        </div>
        <div class="userIcon">
          <el-tooltip class="item" effect="dark" content="用户设置" placement="bottom">
              <img src="@/assets/img/ren2.png" v-show ="userType" @click="TabUser" />
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="角色设置" placement="bottom">
              <img src="@/assets/img/ren.png" v-show ="!userType" @click="TabUser"/>
          </el-tooltip>
        </div>
        <div class="userList">
          <!-- 用户列表展示 -->
            <el-table
                ref="multipleTable"
                :data="UsertableData"
                style="width: 100%"
                size = 'mini'
                max-height="380"
                :row-style="{textAlign: 'center',padding:'0px',}"
                :cell-style="{textAlign: 'center'}"
                :header-cell-style ="{textAlign:'center', background:'#00c9ff',color:'white'}"
                border
                v-show="userType"
                >
                <el-table-column
                type="index"
                width="100"
                label="序号"
                >
                </el-table-column>
                <el-table-column
                prop="userName"
                label="用户名"
                >
                </el-table-column>
                <el-table-column
                prop="roleName"
                label="角色名"
                >
                </el-table-column>
                <el-table-column
                prop="createTime"
                label="创建时间"
                >
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <img src="@/assets/img/xiugaiyonghu.png" class="edit" @click="handleEdit(scope.$index, scope.row)"/>
                        <img src="@/assets/img/shanchuyonghu.png" @click="handleDelete(scope.$index, scope.row)"/>
                    </template>
                </el-table-column>
            </el-table>
          <!-- 角色列表展示 -->
            <el-table
                ref="multipleTable"
                :data="RoletableData"
                style="width: 100%"
                size = 'mini'
                max-height="380"
                :row-style="{textAlign: 'center',padding:'0px',}"
                :cell-style="{textAlign: 'center'}"
                :header-cell-style ="{textAlign:'center', background:'#00c9ff',color:'white'}"
                border
                v-show="!userType"
                >
                <el-table-column
                type="index"
                width="100"
                label="序号"
                >
                </el-table-column>
                <el-table-column
                prop="roleName"
                label="角色名"
                width="150"
                >
                </el-table-column>
                <el-table-column
                prop="jurisdiction"
                label="权限"
                width="450"
                show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <img src="@/assets/img/xiugai02.png"  @click="handleEdit(scope.$index, scope.row)"/>
                        <img src="@/assets/img/shanchu02.png" @click="handleDelete(scope.$index, scope.row)"/>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 角色添加和修改的页面-->
        <el-dialog
            :title='addUserType? "添加角色": "修改角色"'
            :visible.sync="RoleDialogVisible"
            width="40%"
            center>
            <div class="dialogContentWrap">
                <div class="roleDialogVisible">
                    <span>角色名</span>
                    <i><el-input v-model="newRoleName"  placeholder="请输入内容" size="mini" class="addInput" @blur="verifyRole" clearable></el-input></i>
                    <span class="verifyMsg">{{roleMsg}}</span>
                </div>
                <div>
                  <div class="jurisdiction">
                      <span>权限操作</span>
                      <el-checkbox class="checkedAll" v-model="checkedAll"></el-checkbox>
                  </div>
                  <div>
                      <el-checkbox v-model="item.checked" v-for="(item,index) in authority"  :key="index" class="jurisdictionType">{{item.label}}</el-checkbox>
                  </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="roleOperation"  size="mini">保存</el-button>
                <el-button type="primary" @click="RoleDialogVisible = false" size="mini">返回</el-button>
            </span>
        </el-dialog>
        <!-- 用户添加和修改的页面-->
        <el-dialog
            :title="addUserType? '添加用户': '修改用户'"
            :visible.sync="UserDialogVisible"
            width="60%"
            center>
            <div class="dialogContentWrap">
                <div class="dialogContent">
                    <span>用户名</span>
                    <i><el-input v-model= userName  placeholder="请输入内容" size="mini" class="addInput" clearable  prop="name" @blur="rulesUserName" maxlength = 15></el-input></i>
                    <span class="verifyMsg">{{userNamemsg}}</span>
                </div>
                <div class="dialogContent">
                    <span>密码</span>
                    <i><el-input v-model= userPassword placeholder="请输入密码" size="mini" class="addInput" clearable  show-password  maxlength = 15  @blur="verifyPassword"></el-input></i>
                    <span class="verifyMsg">
                      {{passwordMsg}}
                    </span>
                </div>
                <div class="dialogContent">
                    <span>确认密码</span>
                    <i><el-input v-model="repeatPassword" placeholder="请输入密码" size="mini" class="addInput" clearable  show-password  maxlength= 15 @blur="verifyPasswordA"></el-input></i>
                    <span class="verifyMsg">{{repeatPasswordMsg}}</span>
                </div>
                <div class="dialogContent">
                    <span>绑定IC卡</span>
                    <i><el-input placeholder="请输入内容" size="mini" v-model="cardNub" class="addInput" disabled></el-input></i>
                    <img src="@/assets/img/saomiao.gif" @click="bindingCard">
                </div>
                <div class="dialogContent">
                    <span>角色</span>
                    <i>
                        <el-select v-model="roleOptionValue" placeholder="请选择" size="mini">
                          <el-option
                            v-for="item in roleOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                    </i>
                </div>
                <div class="dialogContent">
                    <span>姓名</span>
                    <i><el-input v-model= compellation placeholder="请输入内容" size="mini" class="addInput" clearable @blur="verifyCompellation" maxlength= 15></el-input></i>
                    <span class="verifyMsg">{{compellationMsg}}</span>
                </div>
                <div class="dialogContent">
                    <span>实验室</span>
                    <i>
                      <el-checkbox v-for="item in labList"  :key="item.id" v-model="item.checked" @change="labChange">{{item.label}}</el-checkbox>
                    </i>
                </div>
                <div class="dialogContent">
                    <span>谁可以看(样本信息)</span>
                    <i>
                        <el-select v-model="selectValue" placeholder="请选择" size="mini">
                          <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                    </i>
                </div>
                <div v-show="selectValue === 2" class="showUser">
                   <el-checkbox class="userItem" v-for="item in showUser"  :key="item.id" v-model="item.checked" @change="userChange">{{item.label}}</el-checkbox>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="userOperation" :disabled="Userdisabled" size="mini">保存</el-button>
                <el-button type="primary" @click="UserDialogVisible = false" size="mini">返回</el-button>
            </span>
        </el-dialog>
     </div>
 </div>
</template>
<script>
import cardfile from "@/components/cardfile";
export default {
  inject:['reload'],
  components:{
    cardfile
  },
  data () {
    return {
      labList:[],
      labListid: [],
      showUserList:[],
      roleMsg:'',
      searchUserName: '', //用户名，角色搜索框
      userNamemsg: '',// 用户名的校验提示信息
      passwordMsg: '', // 密码的校验提示信息
      repeatPasswordMsg: '', // 二次密码验证
      compellationMsg:'',// 姓名验证提示信息
      compellation: '', //姓名值
      Userdisabled: false, //添加保存按钮禁用
      roleValue: '', // 角色下拉框的value
      roleOptionValue: '', // 添加和修改中角色下拉框的value
      cardNub: '', // 绑定IC卡值
      userId: '', //用户ID
      roleId: '', // 角色ID
      userName: '', // 用户名
      roleName: '', // 角色名
      addUserName: '',
      userPassword: '', // 密码
      repeatPassword: '', // 二次密码
      newRoleName: '', // 添加角色
      RoleDialogVisible: false, // 角色设置的弹窗
      UserDialogVisible: false, // 用户设置的弹窗
      userType: true, // 切换用户设置和角色设置
      addUserType: true, // 切换添加和修改弹窗
      selectValue: '', //谁可以看下拉框
      jurisdictionValue: '', // 权限的id
      elref: '',
      list: [

      ], // 选择
      showUser: [], // 部分人可见显示信息
      roleOptions:[
        // {
        //   value: '',
        //   label: '',
        // }
      ],
      options:[
        {
          value: 0,
          label: '公开',
        },
        {
          value: 1,
          label: '保密',
        },
        {
          value: 2,
          label: '部分人可见'
        }
      ],
      UsertableData: [ // 用户数据
        // {
        //   id: '',
        //   userName: 'admin',
        //   roleName: '管理员'
        // }
        // {
        //   username: 'admin',
        //   rolename: '管理员'
        // },
        // {
        //   username: 'admin',
        //   rolename: '管理员'
        // }
      ],
      RoletableData: [ // 角色数据
        // {
        //   id: '',
        //   roleName: '管理员'
        //   jurisdiction : ''
        // }
      ],
      authority: [ // 角色权限设置数据
        {
          value: 1,
          label: '新建、修改样本',
          checked: false
        },
        {
          value: 2,
          label: '样本的借出和归还',
          checked: false
        },
        {
          value: 3,
          label: '销毁样本及样本盒',
          checked: false
        },
        {
          value: 4,
          label: '转移样本及样本盒',
          checked: false
        },
        {
          value: 5,
          label: '导出Excel',
          checked: false
        },
        {
          value:6,
          label: '查看日志信息',
          checked: false
        },
        {
          value: 7,
          label: '读卡器参数设置',
          checked: false
        },
        {
          value: 8,
          label: '冰箱设置',
          checked: false
        },
        {
          value: 9,
          label: '管理用户',
          checked: false
        },
        {
          value:10,
          label: '转运',
          checked: false
        }
      ]
    }
  },
  created () {
      this.$axios({ //.............获取所有用户的请求
        method:'get',
        url:'sampleGuide/userInfo/initialUser'
      })
      .then(({data})=>{
        // console.log(data)
        // console.log(data.data.userList)
         data.data.userList.forEach((item)=>{
          this.UsertableData.push({
            id: item.id,   //...............用户Id
            userName: item.username,  //...........用户名
            roleName: item.name,  //........角色名
            createTime: item.create_date ,// ......创建时间
          })
          this.showUser.push({
            id: item.id,
            label: item.username,
            checked: false
          })
          // console.log(this.showUser)
        })
        data.data.laboratoryDictList.forEach((item)=>{
            this.labList.push({
              id: item.id,
              label: item.name,
              checked: false
            })
        })
      })
      this.$axios({ // ...................获取所有角色请求
        method: 'get',
        url: 'sampleGuide/rolePerm/findAllRole'
      })
      .then(({data})=>{
        // console.log(data)
        data.data.forEach((item)=>{
            this.RoletableData.push({ //.............角色表格数据
               id: item.id,  // ........... 角色Id
               roleName: item.name, // ...........角色名
               jurisdiction: item.pname.join(",")// ..........权限
            })
            this.roleOptions.push({ //..............角色下拉框
              value: item.id,
              label: item.name
            })
        })
      })
  },
  computed:{
    jurisdictionList(){
      this.list =[]
      this.authority.forEach((item)=>{
        if(item.checked){
           this.list.push(item.value)
        }
      })
      return this.list
    },
    checkedAll:{
      get(){
        return this.authority.every(item => item.checked)
      },
      set(val){
        return this.authority.forEach((item)=>{
          item.checked = val
        })
      }
    }
  },
  methods: {
    refData(value){
      this.elref = value
    },
    TabUser () { // 用户切换和角色切换的方法
      this.userType = !this.userType
      this.searchUserName = ''
      this.roleValue = ''
      this.jurisdictionValue = ''
    },
    verifyCompellation (){ //............姓名验证
      if(this.compellation == ''){
        this.compellationMsg = '姓名不能为空'
      }else{
        let reg = /^[\u4e00-\u9fa5]{2,6}$/
        if(!reg.test(this.compellation)){
           this.compellationMsg = '请输入真实姓名'
        }else{
          this.compellationMsg = ''
         this.Userdisabled = false
        }
      }
    },
    verifyPassword () { // .........密码验证
       if(this.userPassword == ''){
         this.passwordMsg = '密码不能为空'
       }else{
         this.passwordMsg = ''
       }
    },
    verifyPasswordA () { // ..........二次密码验证
       if(this.repeatPassword == ''){
         this.repeatPasswordMsg = '密码不能为空'
       }else if(this.repeatPassword != this.userPassword ){
          this.repeatPasswordMsg = '两次密码不一致'
       }else{
         this.repeatPasswordMsg = ''
       }
    },
    verifyRole(){ // ................角色验证
      if(this.newRoleName ==''){
        this.roleMsg = '角色名称不能为空!'
      }else{
        if(this.addUserType){
          this.$axios({
            method:'post',
            url:'sampleGuide/rolePerm/findResetRoleName',
            data:({
                name: this.newRoleName
            })
          })
          .then(({data})=>{
            if(data.data === 1){
              this.roleMsg = '角色名称已存在!'
            }else{
              this.roleMsg = ''
            }
            console.log(data)
          })
          .catch((error)=>{
              console.log(error)
          })
        }else{
          this.$axios({
            method:'post',
            url:'sampleGuide/rolePerm/findResetRoleNameUpdate',
            data:({
                id: this.roleId,
                name: this.newRoleName
            })
          })
          .then(({data})=>{
            if(data.data == 2){
              this.roleMsg = '角色名称已存在'
            }else{
              this.roleMsg = ''
            }
            console.log(data)
          })
          .catch((error)=>{
              console.log(error)
          })
        }
      }
    },
    rulesUserName () { //...........用户名验证
        if(this.userName == ''){
          this.userNamemsg = "用户名不能为空"
        }else{
          if(this.addUserType){
            this.$axios({
              method: 'post',
              url: 'sampleGuide/userInfo/findResetUserName',
              data:({
                  username: this.userName
              })
            })
            .then(({data})=>{
                if(data.data == 1){
                  this.userNamemsg = "该用户名已存在"
                  // this.Userdisabled = true
                }else{
                  this.Userdisabled = false
                  this.userNamemsg = ''
                }
            })
          }else{
            this.$axios({
              method:'post',
              url:'sampleGuide/userInfo/findUserByIdUpdate',
              data:({
                 username: this.userName,
                 id:this.userId
              })
            })
            .then(({data})=>{
              if(data.data == 2){
                 this.userNamemsg = "该用户名已存在"
              }else{
                this.userNamemsg = ''
                this.Userdisabled = false
              }
            })
          }

        }
    },
    // 部分人可见---- 可见用户的id集合
    userChange () {
      let newshowUserList = []
      this.showUserList = []
      newshowUserList = this.showUser.filter((item)=>{ return item.checked})
      newshowUserList.forEach((item)=>{
          this.showUserList.push(item.id)
      })
      console.log(this.showUserList)
    },
    // 实验室集合
    labChange () {
      let newLabList = []
      this.labListid = []
      newLabList = this.labList.filter((item)=>{ return item.checked})
      newLabList.forEach((item)=>{
        this.labListid.push(item.id)
      })
    },
    bindingCard(){
      console.log(this.elref)
      //console.log(this.$refs.MyActive)
      this.elref.RDR_Close()
      let devicetypeValue = this.$cookies.get('readerType')
      let OpentypeValue = this.$cookies.get('portType')
      let comPortValue = this.$cookies.get('comPortNo')
      let comBaudRateValue = this.$cookies.get('comBaudRate')
      let comFrameStructureValue = this.$cookies.get('comFrameStructure')
      let netIpAddress = this.$cookies.get('netIpAddress')
      let netPort = this.$cookies.get('netPortNo')
      //console.log(devicetypeValue,OpentypeValue,comPortValue,comBaudRateValue,comFrameStructureValue,netIpAddress,netPort)
      let n = this.$store.state.OnOpen(this.elref,devicetypeValue,OpentypeValue,comPortValue,comBaudRateValue,comFrameStructureValue,netIpAddress,netPort)
      // alert(n);
      if (n!=0) {
          return
      }
      let nret=0;
      //盘点标签初始化,申请盘点标签所需要的内存空间。返回，成功：0 ；失败：非0 （查看错误代码表）。
	    nret = this.elref.RDR_InitInventory();
      if (nret!=0) {
        alert("盘点标签初始化失败！")
        return;
      }
      //盘点标签时，使能15693协议。返回，成功：0 ；失败：非0 （查看错误代码表）。
      nret = this.elref.RDR_Enable15693(0,0x00,0)
      nret = this.elref.RDR_Enable14443A()
      if (nret!=0) {
        //结束标签盘点操作，释放内存空间。
          this.elref.RDR_FinishInventory()
        return;
      }
     this.readRfid()
     this.elref.RDR_Close()
    },
    readRfid(){
      let nret = 0
      let recordCnt = ''
      let j =0
      nret = this.elref.RDR_Inventory(0,"")
      // alert(nret)
      if (nret !== 0) {
        this.$alert('读取标签失败，请检查设备连接以及参数设置！', '提示', {
          confirmButtonText: '确定',
          type: 'error'
        })
        this.elref.RDR_FinishInventory()
        return
      }
      recordCnt = this.elref.RDR_GetRecordCnt()
      // console.log(recordCnt)
      let sTagInfo = this.elref.GetRecord(j).split("-");
      let sTagID = sTagInfo[sTagInfo.length-1];
      // alert(recordCnt)
      if(recordCnt == 1){
        this.cardNub = sTagID
        this.$alert('RFID芯片替换成功！', '提示', {
          confirmButtonText: '确定',
          type: 'success'
        })
      }else{
        this.$alert('IC卡只能绑定一个！', '提示', {
          confirmButtonText: '确定',
          type: 'error'
        })
      }
    },
    roleOperation () {
      if(this.newRoleName == '' || this.jurisdictionList.length == 0){
        this.$message({
          message: '请完善角色信息',
          type: 'warning'
        });
      }else{
      // console.log(this.jurisdictionList)
        if(this.addUserType){ //...........新增角色
          this.$axios({
            method: 'post',
            url: 'sampleGuide/rolePerm/insertRole',
            data: ({
                name: this.newRoleName,
                integerList: this.jurisdictionList
            })
          })
          .then(({data})=>{
               console.log(data)
               this.$message({
                  message: '新增角色成功！',
                  type: 'success'
               });
               this.RoleDialogVisible = false
               this.reload()
               this.userType = true
            })
          .catch(error=>{
            this.$message.error('新增角色失败，请重试');
          })
        }else{ // ...............修改角色
          // console.log(this.jurisdictionList)
          this.$axios({
            method: 'post',
            url: 'sampleGuide/rolePerm/updateRole',
            data: ({
                id: this.roleId,
                name: this.newRoleName,
                integerList: this.jurisdictionList
            })
          })
            .then(({data})=>{
              console.log(data)
              this.$message({
                message: '修改角色成功！',
                type: 'success'
              });
              this.RoleDialogVisible = false
              this.reload()
            })
            .catch(error=>{
                this.$message.error('修改角色失败,请重试!');
            })
        }
      }
    },
    userOperation () {
        if(this.addUserType){ //........新增用户
          console.log(this.roleName)
          this.$axios({
            method: 'post',
            url: 'sampleGuide/userOther/insertUser',
            data: ({
                username: this.userName,
                password: this.repeatPassword,
                visible_strategy: this.selectValue,
                rfidCode : this.cardNub,
                visible_data_user_id: this.showUserList.join(','),
                visible_data_laboratory_id: this.labListid.join(','),
                addUserRoleId: this.roleOptionValue,
                chinesename:this.compellation
            })
          })
          .then(({data})=>{
              console.log(data)
              this.$message({
                message: '新增用户成功！',
                type: 'success'
              });
              this.reload()
              this.UserDialogVisible = false
          })
          .catch((error)=>{
             this.$message.error('新增用户失败，请重试');
          })
        }else{
          // console.log(this.userId);
          this.$axios({ //............修改用户
            method: 'post',
            url: 'sampleGuide/userOther/updateUserById',
            data: ({
                id: this.userId,
                username: this.userName,
                password: this.repeatPassword,
                userRoleIdUpdate: this.roleOptionValue,
                visible_data_laboratory_id: this.labListid.join(','),
                chinesename: this.compellation,
                visible_data_user_id: this.showUserList.join(','),
                visible_strategy: this.selectValue,
                rfidCode: this.cardNub
            })
          })
          .then(({data})=>{
                this.$message({
                  message: '修改用户成功！',
                  type: 'success'
                });
                this.UserDialogVisible = false
                this.reload()
          })
          .catch(error=>{
            this.$message.error('修改用户失败，请重试');
          })
        }
    },
    searchUser () { // ..............搜索按钮点击事件
      if(this.userType){
        this.UsertableData = [] //..........用户 角色搜索
        this.$axios({
          method:'post',
          url:'sampleGuide/userInfo/findUserByNameAndRole',
          // headers: {
          //         'Content-Type': 'application/json;charset=UTF-8'
          //     },
          data:({
            username: this.searchUserName,
            rolePermId: this.roleValue,
          })
        })
        .then(({ data }) => {
          // console.log(data);
          if(data.data.length == 0){
            return;
          }
          data.data.forEach((item)=>{
            this.UsertableData.push({
              id: item.id,
              userName: item.username,
              roleName: item.name,
              createTime: item.create_date
            })
          })
        })
        .catch(error => {
          this.$message.error('搜索用户失败，请重试');
        });
      }else{ // ............................ 角色，权限搜索
        this.RoletableData = []
        console.log(this.jurisdictionValue)
        this.$axios({
          method:'post',
          url:'sampleGuide/rolePerm/findRoleByNameAndPermission',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          },
          data:({
            name: this.searchUserName,
            permissionPermId: this.jurisdictionValue
          })
        })
        .then(({data})=>{
          console.log(data)
          if(data.data.length == 0){
            return;
          }
          data.data.forEach((item)=>{
            this.RoletableData.push({
              id: item.id,
              roleName: item.name,
              jurisdiction: item.pname.join(",")
            })
          })
        })
        .catch(error=>{
          this.$message.error('搜索角色失败，请重试');
        })
      }
    },
    handleEdit (index, row) {
      if (this.userType) { // ...........修改用户时获取相应信息
        this.UserDialogVisible = true
        this.userNamemsg = ''
          this.$axios({
            method:'post',
            url:'sampleGuide/userInfo/findByUsername',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: this.qs.stringify({
              username: row.userName,
            })
          })
          .then(({data})=>{
             console.log(data)
             this.userName = data.data.username
             this.roleOptionValue = data.data.rid
             this.userPassword = data.data.password
             this.repeatPassword = data.data.password
             this.userId = this.UsertableData[index].id
             this.compellation = data.data.chinesename
             this.cardNub = data.data.rfidCode  //visible_data_laboratory_id
             this.selectValue = data.data.visible_strategy
            this.showUser.forEach((item)=>{
              item.checked = false
              if(data.data.visible_data_user_id == ''){
                return
              }else{
                data.data.visible_data_user_id.split(',').forEach((option)=>{
                    if(item.id == option){
                        console.log(item)
                       item.checked = true
                    }
                })
              }

            })
             console.log(data.data.visible_data_laboratory_id.split(','));
             this.labList.forEach((item)=>{
               item.checked = false
                data.data.visible_data_laboratory_id.split(',').forEach((option)=>{
                    if(item.id == option){
                        console.log(item)
                       item.checked = true
                    }
                })
             })
          })
          .catch(error=>{
            this.$message.error('获取信息失败，请重试');
          })
      } else {
        console.log(row.jurisdiction)
        this.RoleDialogVisible = true
        this.roleMsg = ''
        this.newRoleName = row.roleName //.....修改的角色名的获取
        this.roleId = row.id
        this.list = []
        this.authority.forEach((item)=>{
            item.checked = false
            row.jurisdiction.split(',').forEach((option)=>{
              if(item.label == option){
                item.checked = true
              }
            })
        })
      }
      this.addUserType = false
    },
    handleDelete (index, row) {
      if(this.userType){
         this.$confirm('确认删除该用户吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.userId = this.UsertableData[index].id
          this.$axios({
            method:'post',
            url:'sampleGuide/userOther/deleteUserById',
            data:({
              id: this.userId
            })
          })
          .then(({data})=>{
              this.$message({
                    message: '删除成功！',
                    type: 'success'
              });
              this.reload()
          })
          .catch(error=>{
              this.$message({
                  message: '删除失败，请重试',
                  type: 'warning'
              })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }else{
        this.$confirm('确认删除该角色吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.roleId = this.RoletableData[index].id
          this.$axios({
            method: 'post',
            url: 'sampleGuide/rolePerm/findNumByRole',
            data:({
              id: this.roleId
            })
          })
          .then(({data})=>{
                console.log(data)
                if(data.data == 0){
                  this.$axios({
                    method:'post',
                    url:'sampleGuide/rolePerm/deleteRoleById',
                    headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                    },
                    data:({
                      id: this.roleId
                    })
                  })
                  .then(({data})=>{
                      this.$message({
                            message: '删除成功！',
                            type: 'success'
                        });
                      this.reload()
                  })
                .catch(error=>{
                  this.$message.error('删除失败，请重试');
                })
                }else{
                  this.$alert('该角色下存在用户，不可删除！', '提示', {
                      confirmButtonText: '确定',
                      type: 'error'
                  });
                }
          })
          .catch(error=>{
            this.$message.error('获取信息失败，请重试');
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      }
    },
    AddType () { // 添加方法
      if (this.userType) {
        this.UserDialogVisible = true
        this.userName = ''
        this.roleOptionValue = ''
        this.userPassword = ''
        this.repeatPassword = ''
        this.compellation = ''
        this.userNamemsg = ''
        this.selectValue = 0
        this.cardNub =''
        this.labList.forEach((item)=>{
            item.checked = false
        })
      } else {
        this.roleMsg = ''
        this.RoleDialogVisible = true
        this.list = []
        this.newRoleName = ''
        this.authority.forEach((item)=>{
            item.checked = false
        })
      }
      this.addUserType = true
    }
  }
}
</script>
<style lang="less" scoped>
.userWrap{
    width: 90%;
    margin: 0 auto;
    margin-top: 30px;
    .userTitle{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 60%;
        margin: 0 auto;
        margin-bottom: 20px;
        button{
          background: #00c9ff;
          border: 1px solid #00c9ff;
        }
        .userType{
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 10px;
            i{
                width: 40%;
            }
        }
    }
    .userIcon{
      text-align: right;
      margin-bottom: 7px;
      img{
          width: 32px;
          height: 32px;
          margin-left: 10px;
          vertical-align: middle;
          cursor: pointer;
      }
    }
    .showUser{
      margin-top: 10px;
      .userItem{
        width: 17%
      }
    }
    .userList{
        img{
            width: 32px;
            height: 32px;
            vertical-align: top;
            margin-right: 5px;
            cursor:pointer;
        }
        .edit{
            margin-top: 3px;
        }
    }
    .dialogContent{
        display: flex;
        // justify-content: space-around;
        align-items: center;
        margin-top: 15px;
        img{
            width: 24px;
            height: 24px;
            margin-left: 5px;
            cursor: pointer;
        }
        // font-size: 12PX;
        > span{
            width:10vw;
            display: inline-block;
        }
        // .el-radio{
        //     margin-right: 15px;
        // }
    }
    .jurisdiction{
        margin-bottom: 10px;
      .checkedAll{
        margin-left: 20px;
      }
    }
    .jurisdictionType{
        width: 38%;
    }
    .roleDialogVisible{
        margin-bottom: 10px;
        .addInput{
            width: 40%;
            margin-left: 20px;
        }
    }
  .dialogContentWrap{
    width: 70%;
    margin: 0 auto;
    text-align: left;
  }
  .verifyMsg{
    font-size: 12px;
    width:7vw;
    color: red;
    margin-left: 3px
  }
}

</style>
