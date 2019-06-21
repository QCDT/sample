<template>
  <div class="SettingWrap">
      <div class="SettingContent">
        <div class="SettingTitle"> <!-- 数据设置的header -->
            <span class="DataInfo">备份表单信息</span>
            <div>
                <el-button type="primary" size="mini" @click="addbackups">添加</el-button>
                <el-button type="danger" size="mini">删除</el-button>
            </div> <!-- 添加的弹窗 -->
            <el-dialog
                title="添加表单信息"
                :visible.sync="centerDialogVisible"
                width="30%"
                class="addBox"
                >
                <div class="addContent">
                    <span>路径:</span>
                    <el-input  placeholder="请输入内容" size="mini" class="addInput"></el-input>
                </div>
                <div class="addContent">
                    <span>用户名:</span>
                    <el-input placeholder="请输入内容" size="mini" class="addInput"></el-input>
                </div>
                <div class="addContent">
                    <span>密码:</span>
                    <el-input  placeholder="请输入内容" size="mini" class="addInput"></el-input>
                </div>
                <div class="addContent">
                    <span>端口号:</span>
                    <el-input  placeholder="请输入内容" size="mini" class="addInput"></el-input>
                </div>
                <div class="addContent">
                    <span>数据库名称:</span>
                    <el-input  placeholder="请输入内容" size="mini" class="addInput"></el-input>
                </div>
                <div class="addContent">
                    <span>IP:</span>
                    <el-input  placeholder="请输入内容" size="mini" class="addInput"></el-input>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>
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
                <template slot-scope="scope">{{ scope.row.date }}</template>
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
      </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      centerDialogVisible: false, // 添加按钮的弹窗显示与隐藏
      tableData: [ // 备份信息数据
        {
          date: '2019-03-08 15:04:53',
          username: 'admin',
          filename: 'sample',
          address: 'D:/backUpDB/20190308150447_sample.sql'
        },
        {
          date: '2019-03-08 15:04:53',
          username: 'admin',
          filename: 'sample',
          address: 'D:/backUpDB/20190308150447_sample.sql'
        },
        {
          date: '2019-03-08 15:04:53',
          username: 'admin',
          filename: 'sample',
          address: 'D:/backUpDB/20190308150447_sample.sql'
        }
      ]
    }
  },
  methods: {
    addbackups () {
      this.centerDialogVisible = true
    }
  }
}
</script>
