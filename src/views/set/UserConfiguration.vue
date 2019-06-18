<template>
<<<<<<< HEAD
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
            width="30%"
            center>
            <div>
                <div>
                    <span>角色名</span>
                    <el-input  placeholder="请输入内容" size="mini" class="addInput" clearable></el-input>
                </div>
                <div>
                    <div>
                        <span>权限操作</span>
                    </div>
                    <div>
                        <el-checkbox v-model="item.checked" v-for="(item,index) in authority"  :key="index">{{item.title}}</el-checkbox>
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
            width="30%"
            center>
            <div>
                <div class="dialogContent">
                    <span>用户名</span>
                    <el-input v-model="userName" placeholder="请输入内容" size="mini" class="addInput" clearable></el-input>
                </div>
                <div class="dialogContent">
                    <span>密码</span>
                    <el-input v-model="userPassword" placeholder="请输入密码" size="mini" class="addInput" clearable  show-password></el-input>
                </div>
                <div class="dialogContent">
                    <span>确认密码</span>
                    <el-input v-model="repeatPassword" placeholder="请输入密码" size="mini" class="addInput" clearable  show-password></el-input>
                </div>
                <div class="dialogContent">
                    <span>角色</span>
                    <el-input v-model="userName" placeholder="请输入内容" size="mini" class="addInput" clearable></el-input>
                </div>
                <div class="dialogContent">
                    <span>实验室</span>
                    <div>
                        <el-checkbox v-model="firstLevel">一期临床实验室</el-checkbox>
                        <el-checkbox v-model="secondLevel">二期临床实验室</el-checkbox>
                    </div>
                </div>
                <div class="dialogContent">
                    <span>谁可以看</span>
                    <el-input  placeholder="请输入内容" size="mini" class="addInput" clearable  show-password></el-input>
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
        return{
            userName: '', // 用户名
            roleName: '', // 角色名
            userPassword: '', //密码
            repeatPassword: '',// 二次密码
            firstLevel: false,// 
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
            authority:[ // 角色权限设置数据
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
            console.log(index,row)
            if(this.userType){
                this.UserDialogVisible = true
            }else{
                this.RoleDialogVisible = true
            }
            this.addUserType = false
        },
        handleDelete (index, row) {
            console,log(index, row)
        },
        AddType () { // 添加方法
            if(this.userType){
                this.UserDialogVisible = true
            }else{
                this.RoleDialogVisible = true
            }
            this.addUserType = true
        }
    }
}
</script>
=======
  <div>
        <h6>??????????</h6>
  </div>
</template>
<script>
export default {
props:{},
components:{},
data() {  return {};},
 methods: {},
computed: {},
}
</script>
<style scoped lang='less'>

</style>
>>>>>>> zhanglan
