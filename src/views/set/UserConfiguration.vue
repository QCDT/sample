<<<<<<< HEAD
<template>
 <div>
     <div class="userWrap">
        <div class="userTitle">
            <div class="userType">
                <i>{{userType?"用户名": '角色名'}}</i>
                <el-input v-model="userName" size="mini"></el-input>
            </div>
            <div class="userType">
                <i>{{userType?"角色名": '权限'}}</i>
                <el-input v-model="roleName" size="mini"></el-input>
            </div>
            <div class="userType">
                <el-button type="primary" size="mini">搜索</el-button>
                <el-button type="primary" size="mini" @click="AddType">{{userType?"添加用户": '添加角色'}}</el-button>
                <el-tooltip class="item" effect="dark" content="用户设置" placement="bottom">
                    <img src="@/assets/img/ren2.png" v-show ="userType" @click="TabUser" />
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="角色设置" placement="bottom">
                    <img src="@/assets/img/ren.png" v-show ="!userType" @click="TabUser"/>
                </el-tooltip>
            </div>
        </div>
        <div class="userList">
            <el-table
                ref="multipleTable"
                :data="tableData"
                style="width: 100%"
                size = 'mini'
                :row-style="{textAlign: 'center',padding:'0px',}"
                :cell-style="{textAlign: 'center'}"
                :header-cell-style ="{textAlign:'center', background:'#00c9ff',color:'white'}"
                border
                >
                <el-table-column
                type="index"
                width="100"
                label="序号"
                >
                </el-table-column>
                <el-table-column
                prop="username"
                label="用户名"
                >
                </el-table-column>
                <el-table-column
                prop="rolename"
                label="角色名"
                >
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <img src="@/assets/img/xiugaiyonghu.png" class="edit" @click="handleEdit(scope.$index, scope.row)" v-show="userType"/>
                        <img src="@/assets/img/shanchuyonghu.png" @click="handleDelete(scope.$index, scope.row)" v-show="userType"/>
                        <img src="@/assets/img/xiugai02.png"  @click="handleEdit(scope.$index, scope.row)" v-show="!userType"/>
                        <img src="@/assets/img/shanchu02.png" @click="handleDelete(scope.$index, scope.row)" v-show="!userType"/>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog
            :title='addUserType? "添加角色": "修改角色"'
            :visible.sync="RoleDialogVisible"
            width="40%"
            center>
            <div>
                <div class="roleDialogVisible">
                    <span>角色名</span>
                    <i><el-input  placeholder="请输入内容" size="mini" class="addInput" clearable></el-input></i>
                </div>
                <div>
                    <div class="jurisdiction">
                        <span>权限操作</span>
                    </div>
                    <div>
                        <el-checkbox v-model="item.checked" v-for="(item,index) in authority"  :key="index" class="jurisdictionType">{{item.title}}</el-checkbox>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="RoleDialogVisible = false">保存</el-button>
                <el-button type="primary" @click="RoleDialogVisible = false">返回</el-button>
            </span>
        </el-dialog>
        <el-dialog
            :title="addUserType? '添加用户': '修改用户'"
            :visible.sync="UserDialogVisible"
            width="35%"
            center>
            <div class="dialogContentWrap">
                <div class="dialogContent">
                    <span>用户名</span>
                    <i><el-input v-model="userName" placeholder="请输入内容" size="mini" class="addInput" clearable></el-input></i>
                </div>
                <div class="dialogContent">
                    <span>密码</span>
                    <i><el-input v-model="userPassword" placeholder="请输入密码" size="mini" class="addInput" clearable  show-password></el-input></i>
                </div>
                <div class="dialogContent">
                    <span>确认密码</span>
                    <i><el-input v-model="repeatPassword" placeholder="请输入密码" size="mini" class="addInput" clearable  show-password></el-input></i>
                </div>
                <div class="dialogContent">
                    <span>角色</span>
                    <i><el-input v-model="userName" placeholder="请输入内容" size="mini" class="addInput" clearable></el-input></i>
                </div>
                <div class="dialogContent">
                    <span>实验室</span>
                    <i>
                        <el-checkbox v-model="firstLevel">一期临床实验室</el-checkbox>
                        <el-checkbox v-model="secondLevel">二期临床实验室</el-checkbox>
                    </i>
                </div>
                <div class="dialogContent">
                    <span>谁可以看</span>
                    <i><el-input  placeholder="请输入内容" size="mini" class="addInput" clearable  show-password></el-input></i>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="UserDialogVisible = false">保存</el-button>
                <el-button type="primary" @click="UserDialogVisible = false">返回</el-button>
            </span>
        </el-dialog>
     </div>
 </div>
</template>
<script>
export default {
  data () {
    return {
      userName: '', // 用户名
      roleName: '', // 角色名
      userPassword: '', // 密码
      repeatPassword: '', // 二次密码
      firstLevel: false, //
      secondLevel: false,
      RoleDialogVisible: false, // 角色设置的弹窗
      UserDialogVisible: false, // 用户设置的弹窗
      userType: true, // 切换用户设置和角色设置
      addUserType: true, // 添加和修改弹窗的切换
      tableData: [ // 搜索后数据
        {
          username: 'admin',
          rolename: '管理员'
        },
        {
          username: 'admin',
          rolename: '管理员'
        },
        {
          username: 'admin',
          rolename: '管理员'
        }
      ],
      authority: [ // 角色权限设置数据
        {
          title: '新建，修改样本',
          checked: false
        },
        {
          title: '样本的借出和归还',
          checked: false
        },
        {
          title: '销毁样本和样本盒',
          checked: false
        },
        {
          title: '导出Excel',
          checked: false
        },
        {
          title: '转移样本和样本盒',
          checked: false
        },
        {
          title: '查看日志信息',
          checked: false
        },
        {
          title: '读卡器参数设置',
          checked: false
        },
        {
          title: '冰箱设置',
          checked: false
        },
        {
          title: '管理用户',
          checked: false
        },
        {
          title: '转运',
          checked: false
        }
      ]
    }
  },
  methods: {
    TabUser () { // 用户切换和角色切换的方法
      this.userType = !this.userType
    },
    handleEdit (index, row) {
      console.log(index, row)
      if (this.userType) {
        this.UserDialogVisible = true
      } else {
        this.RoleDialogVisible = true
      }
      this.addUserType = false
    },
    handleDelete (index, row) {
      console, log(index, row)
    },
    AddType () { // 添加方法
      if (this.userType) {
        this.UserDialogVisible = true
      } else {
        this.RoleDialogVisible = true
      }
      this.addUserType = true
    }
  }
}
</script>
<style lang="less" scoped>
.userWrap {
  width: 90%;
  margin: 0 auto;
  margin-top: 30px;
}
.userWrap .userTitle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 60%;
  margin: 0 auto;
  margin-bottom: 20px;
}
.userWrap .userTitle img {
  width: 32px;
  height: 32px;
  margin-left: 10px;
  vertical-align: middle;
  cursor: pointer;
}
.userWrap .userTitle .userType {
  display: flex;
  justify-content: space-between;
  margin-right: 10px;
}
.userWrap .userTitle .userType i {
  width: 30%;
  line-height: 28px;
}
.userWrap .userList img {
  width: 32px;
  height: 32px;
  vertical-align: top;
  margin-right: 5px;
  cursor: pointer;
}
.userWrap .userList .edit {
  margin-top: 3px;
}
.userWrap .dialogContent {
  display: flex;
  align-items: center;
  margin-top: 15px;
}
.userWrap .dialogContent > span {
  width: 7vw;
  display: inline-block;
}
.userWrap .dialogContent .addInput {
  width: 70%;
}
.userWrap .jurisdiction {
  margin-bottom: 10px;
}
.userWrap .jurisdictionType {
  width: 38%;
}
.userWrap .roleDialogVisible {
  margin-bottom: 10px;
}
.userWrap .roleDialogVisible .addInput {
  width: 40%;
  margin-left: 20px;
}

</style>

=======
<template>
 <div>
     <div class="userWrap">
        <div class="userTitle">
            <div class="userType">
                <i>{{userType?"用户名": '角色名'}}</i>
                <el-input v-model="userName" size="mini"></el-input>
            </div>
            <div class="userType">
                <i>{{userType?"角色名": '权限'}}</i>
                <el-input v-model="roleName" size="mini"></el-input>
            </div>
            <div class="userType">
                <el-button type="primary" size="mini" @click="searchUser">搜索</el-button>
                <el-button type="primary" size="mini" @click="AddType">{{userType?"添加用户": '添加角色'}}</el-button>
                <el-tooltip class="item" effect="dark" content="用户设置" placement="bottom">
                    <img src="@/assets/img/ren2.png" v-show ="userType" @click="TabUser" />
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="角色设置" placement="bottom">
                    <img src="@/assets/img/ren.png" v-show ="!userType" @click="TabUser"/>
                </el-tooltip>
            </div>
        </div>
        <div class="userList">
            <el-table
                ref="multipleTable"
                :data="tableData"
                style="width: 100%"
                size = 'mini'
                max-height="380"
                :row-style="{textAlign: 'center',padding:'0px',}"
                :cell-style="{textAlign: 'center'}"
                :header-cell-style ="{textAlign:'center', background:'#00c9ff',color:'white'}"
                border
                >
                <el-table-column
                type="index"
                width="100"
                label="序号"
                >
                </el-table-column>
                <el-table-column
                prop="username"
                label="用户名"
                >
                </el-table-column>
                <el-table-column
                prop="rolename"
                label="角色名"
                >
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <img src="@/assets/img/xiugaiyonghu.png" class="edit" @click="handleEdit(scope.$index, scope.row)" v-show="userType"/>
                        <img src="@/assets/img/shanchuyonghu.png" @click="handleDelete(scope.$index, scope.row)" v-show="userType"/>
                        <img src="@/assets/img/xiugai02.png"  @click="handleEdit(scope.$index, scope.row)" v-show="!userType"/>
                        <img src="@/assets/img/shanchu02.png" @click="handleDelete(scope.$index, scope.row)" v-show="!userType"/>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog
            :title='addUserType? "添加角色": "修改角色"'
            :visible.sync="RoleDialogVisible"
            width="40%"
            center>
            <div>
                <div class="roleDialogVisible">
                    <span>角色名</span>
                    <i><el-input  placeholder="请输入内容" size="mini" class="addInput" clearable></el-input></i>
                </div>
                <div>
                    <div class="jurisdiction">
                        <span>权限操作</span>
                    </div>
                    <div>
                        <el-checkbox v-model="item.checked" v-for="(item,index) in authority"  :key="index" class="jurisdictionType">{{item.title}}</el-checkbox>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="RoleDialogVisible = false">保存</el-button>
                <el-button type="primary" @click="RoleDialogVisible = false">返回</el-button>
            </span>
        </el-dialog>
        <el-dialog
            :title="addUserType? '添加用户': '修改用户'"
            :visible.sync="UserDialogVisible"
            width="35%"
            center>
            <div class="dialogContentWrap">
                <div class="dialogContent">
                    <span>用户名</span>
                    <i><el-input v-model="userName" placeholder="请输入内容" size="mini" class="addInput" clearable></el-input></i>
                </div>
                <div class="dialogContent">
                    <span>密码</span>
                    <i><el-input v-model="userPassword" placeholder="请输入密码" size="mini" class="addInput" clearable  show-password></el-input></i>
                </div>
                <div class="dialogContent">
                    <span>确认密码</span>
                    <i><el-input v-model="repeatPassword" placeholder="请输入密码" size="mini" class="addInput" clearable  show-password></el-input></i>
                </div>
                <div class="dialogContent">
                    <span>角色</span>
                    <i><el-input v-model="userName" placeholder="请输入内容" size="mini" class="addInput" clearable></el-input></i>
                </div>
                <div class="dialogContent">
                    <span>实验室</span>
                    <i>
                        <el-checkbox v-model="firstLevel">一期临床实验室</el-checkbox>
                        <el-checkbox v-model="secondLevel">二期临床实验室</el-checkbox>
                    </i>
                </div>
                <div class="dialogContent">
                    <span>谁可以看</span>
                    <i><el-input  placeholder="请输入内容" size="mini" class="addInput" clearable  show-password></el-input></i>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="UserDialogVisible = false">保存</el-button>
                <el-button type="primary" @click="UserDialogVisible = false">返回</el-button>
            </span>
        </el-dialog>
     </div>
 </div>
</template>
<script>
export default {
  data () {
    return {
      userName: '', // 用户名
      roleName: '', // 角色名
      userPassword: '', // 密码
      repeatPassword: '', // 二次密码
      firstLevel: false, //
      secondLevel: false,
      RoleDialogVisible: false, // 角色设置的弹窗
      UserDialogVisible: false, // 用户设置的弹窗
      userType: true, // 切换用户设置和角色设置
      addUserType: true, // 添加和修改弹窗的切换
      tableData: [ // 搜索后数据
        // {
        //   username: 'admin',
        //   rolename: '管理员'
        // },
        // {
        //   username: 'admin',
        //   rolename: '管理员'
        // },
        // {
        //   username: 'admin',
        //   rolename: '管理员'
        // }
      ],
      authority: [ // 角色权限设置数据
        {
          title: '新建，修改样本',
          checked: false
        },
        {
          title: '样本的借出和归还',
          checked: false
        },
        {
          title: '销毁样本和样本盒',
          checked: false
        },
        {
          title: '导出Excel',
          checked: false
        },
        {
          title: '转移样本和样本盒',
          checked: false
        },
        {
          title: '查看日志信息',
          checked: false
        },
        {
          title: '读卡器参数设置',
          checked: false
        },
        {
          title: '冰箱设置',
          checked: false
        },
        {
          title: '管理用户',
          checked: false
        },
        {
          title: '转运',
          checked: false
        }
      ]
    }
  },
  created(){
      this.$axios({
        method:'get',
        url:'sampleGuide/userInfo/findAllUser'
      })
      .then(({data})=>{
         console.log(data)
         data.data.forEach((item)=>{
          this.tableData.push({
            username: item.username,
            rolename: item.name
          })
        })
      })
  },
  methods: {
    TabUser () { // 用户切换和角色切换的方法
      this.userType = !this.userType
    },
    searchUser () {
      this.tableData = []
      console.log(this.roleName)
      this.$axios({
        method:'post',
        url:'sampleGuide/userInfo/findUserByNameAndRole',
        headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
        data:({
          username: this.userName,
          rolePermId: this.roleName
        })
      })
      .then(({ data }) => {
        console.log(data);
        if(data.data.length == 0){
          return;
        }
        data.data.forEach((item)=>{
          this.tableData.push({
            username: item.username,
            rolename: item.name
          })
        })
      })
      .catch(error => {
        console.log(error);
      });
    },
    handleEdit (index, row) {
      console.log(index, row)
      if (this.userType) {
        this.UserDialogVisible = true
      } else {
        this.RoleDialogVisible = true
      }
      this.addUserType = false
    },
    handleDelete (index, row) {
      console, log(index, row)
    },
    AddType () { // 添加方法
      if (this.userType) {
        this.UserDialogVisible = true
      } else {
        this.RoleDialogVisible = true
      }
      this.addUserType = true
    }
  }
}
</script>
>>>>>>> a6994a54ee8e86d397c8410f1933627f6e9d8b14
