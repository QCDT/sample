<template>
  <div class="SettingWrap">
      <div class="SettingContent">
        <div class="SettingTitle"> <!-- 数据设置的header -->
            <span class="DataInfo">备份数据表单信息</span>
            <div>
                <el-button type="primary" size="mini" @click="addbackups">添加</el-button>
                <el-button type="danger" size="mini" @click="delbackups">删除</el-button>
            </div>
        </div>
        <div>       <!-- 表格结构 样式中 :cell-style 单元格样式 :row-style 行样式 :header-cell-style 表头单元格样式 -->
            <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                :row-style="{height:'32px',textAlign: 'center',padding:'0px',}"
                :cell-style="{padding:'0px',textAlign: 'center'}"
                :header-cell-style ="{height:'30px',textAlign:'center',padding:'0px', background:'#00c9ff',color:'white'}"
                @selection-change = "handleSelectionChange"
                border
                >
                <el-table-column
                type="selection"
                width="50">
                </el-table-column>
                <el-table-column
                type="index"
                width="70"
                label="序号"
                class="DataTable"
                >
                </el-table-column>
                <el-table-column
                prop="data"
                label="备份时间"
                class="DataTable"
                >
                <template slot-scope="scope">{{ scope.row.data }}</template>
                </el-table-column>
                <el-table-column
                prop="username"
                label="备份用户"
                class="DataTable"
                >
                </el-table-column>
                <el-table-column
                prop="filename"
                label="文件名"
                class="DataTable"
                >
                </el-table-column>
                <el-table-column
                prop="address"
                width="400"
                label="保存路径"
                >
                </el-table-column>
            </el-table>
        </div>
        <div class="btn"><button @click="$router.push('/set')">返回</button></div>
      </div>
      <!-- 添加的弹窗 -->
      <el-dialog
        title="添加表单信息"
        :visible.sync="centerDialogVisible"
        width="35%"
        class="addBoxWrap"
        >
        <div class="addBox">
          <div class="addContent">
              <span>路径:</span>
              <el-input  v-model="addpath" placeholder="请输入内容" size="mini" class="addInput" disabled></el-input>
          </div>
          <div class="addContent">
              <span>用户名:</span>
              <el-input v-model="username" placeholder="请输入内容" size="mini" class="addInput" disabled></el-input>
          </div>
          <div class="addContent">
              <span>密码:</span>
              <el-input v-model="password"  placeholder="请输入内容" size="mini" class="addInput" disabled show-password></el-input>
          </div>
          <div class="addContent">
              <span>端口号:</span>
              <el-input v-model="port" placeholder="请输入内容" size="mini" class="addInput" disabled></el-input>
          </div>
          <div class="addContent">
              <span>数据库名称:</span>
              <el-input v-model="name"  placeholder="请输入内容" size="mini" class="addInput" disabled></el-input>
          </div>
          <div class="addContent">
              <span>IP:</span>
              <el-input  v-model="ip" placeholder="请输入内容" size="mini" class="addInput" disabled></el-input>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false" size="mini">取 消</el-button>
            <el-button type="primary" @click="addbackupsContent" size="mini">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  inject:['reload'],
  data () {
    return {
      username: '',
      password:'',
      addpath:'D:\\backUpDB',
      name: '',
      ip: '',
      port:'',
      centerDialogVisible: false, // 添加按钮的弹窗显示与隐藏
      delbackupsList: [], // 删除项的集合
      tableData: [ // 备份信息数据
        // {
        //   date: '2019-03-08 15:04:53',
        //   username: 'admin',
        //   filename: 'sample',
        //   address: 'D:/backUpDB/20190308150447_sample.sql'
        // },
        // {
        //   date: '2019-03-08 15:04:53',
        //   username: 'admin',
        //   filename: 'sample',
        //   address: 'D:/backUpDB/20190308150447_sample.sql'
        // },
        // {
        //   date: '2019-03-08 15:04:53',
        //   username: 'admin',
        //   filename: 'sample',
        //   address: 'D:/backUpDB/20190308150447_sample.sql'
        // }
      ]
    }
  },
  created(){
    this.$axios({
      method: 'get',
      url: 'sampleGuide/backupDatabase/selectAllBackupOrder'
    })
    .then(({data})=>{
      console.log(data)
      data.data.forEach((item)=>{
        this.tableData.push({
          id: item.id,
          data: item.backupTime,
          username:item.backupUser.username,
          filename:item.dbName,
          address: item.backupPath,
        })
      })
    }),
    this.$axios({
      method: 'get',
      url: 'sampleGuide/backupDatabase/findDatabaseInfo'
    })
    .then(({data})=>{
      // console.log(data)
      data.data.forEach((item)=>{
        this.username = item.dbUsername
        this.password = item.dbPassword
        this.ip = item.ip
        this.port = item.portNumber
        this.name = item.dbName
      })
    })
  },
  methods: {
    addbackups () {
      this.centerDialogVisible = true
    },
    addbackupsContent(){
      this.$axios({
        method: 'post',
        url: 'sampleGuide/backupDatabase/addBackupOrder',
        data:({
          ip: this.ip,
          portNumber: this.port,
          dbUsername: this.username,
          dbPassword: this.password,
          dbName: this.name,
          backupPath: this.addpath
        })
      })
      .then((data)=>{
          console.log(data);
          this.$message({
            message: '添加成功!',
            type: 'success'
          });
          this.reload()
      })
    },
    handleSelectionChange(selection){
      // console.log(selection)
      this.delbackupsList = []
      selection.forEach((item)=>{
          this.delbackupsList.push(item.id)
      })
      // console.log(this.delbackupsList)
    },
    delbackups() {
      alert(111)
      alert(222)
      if(this.delbackupsList.length == 0){
        this.$message({
          message: '请先选择需要删除的信息！',
          type: 'warning'
        });
      }else{
        this.$confirm(`当前已选中${this.delbackupsList.length}条信息，确定删除吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios({
            method: 'post',
            url: 'sampleGuide/backupDatabase/batchUpdateBackupOrderStatus',
            headers: {
              'Content-Type': 'application/json; charset=UTF-8'
            },
            data:({
              backupOrderList: this.delbackupsList
              // id: 1
            })
          })
          .then((data)=>{
            console.log(data)
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.reload()
          })
        }).catch(() => {
        });
      }
    }
  }
}
</script>
<style lang="less" scoped>
.SettingWrap{
    width: 100%;
    margin-top: 20px;
    font-size: 16px;
    .SettingContent{
        margin: 0 auto;
        width: 95%;
        .SettingTitle{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            .DataInfo{
                border-left: 2px solid #00c9ff;
                padding-left: 5px;
                font-size: 16px;
            }
        }
    }
    .addBox{
        width: 80%;
        margin: 0 auto;
        .addContent{
            margin-top: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            span{
                display: inline-block;
                width: 25%;
                font-size: 16px;
            }
            .addInput{
                width: 50%;
            }
        }
    }
    .btn{
      text-align: center;
      margin-top: 20px;
      button{
        width: 120px;
        height: 30px;
        border: 1px solid #00c9ff;
        background: #fff;
        color: #00c9ff;
        border-radius: 5px;
        cursor: pointer;
        &:hover{
          background: #00c9ff;
          color: #fff;
        }
      }
    }
}
</style>
