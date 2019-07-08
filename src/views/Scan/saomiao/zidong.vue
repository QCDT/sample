<template>
  <div>
    <div class="automaticWrap">
      <div class="uploading">
        <input type="file" @change="fileUrl" ref="file">
      </div>
      <div class="automaticEntry">
        <div class="entryTitle" ><span>样本盒列表</span></div>
        <div class="entryBtns">
          <i class="el-icon-circle-plus-outline">开始录入样本盒</i>
          <i class="el-icon-circle-plus-outline">开始录入样本</i>
          <i class="el-icon-circle-plus-outline">停止录入样本</i>
          <i class="el-icon-zoom-in">样本盒核验</i>
          <i class="el-icon-circle-plus-outline">打印样本盒标签</i>
        </div>
        <el-table
            ref="multipleTable"
            :data="sampleBoxList"
            tooltip-effect="dark"
            style="width: 100%"
            :row-style="{height:'25px',textAlign: 'center',padding:'0px',}"
            :cell-style="{padding:'0px',textAlign: 'center'}"
            :header-cell-style ="{height:'25px',textAlign:'center',padding:'0px', background:'#f4f4f4', color:'black'}"
            border
            height="170"
            size="mini"
            >
            <el-table-column
            type="selection"
            width="50">
            </el-table-column>
            <el-table-column
            prop="data"
            label="样本盒RFID编号"
            width="120"
            >
            </el-table-column>
            <el-table-column
            prop="username"
            label="样本盒名称"
            width="100"
            show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
            prop="filename"
            label="录入人"
            >
            </el-table-column>
            <el-table-column
            prop="filename"
            label="录入时间"
            >
            </el-table-column>
            <el-table-column
            prop="filename"
            label="样本盒规格"
            show-overflow-tooltip
            width="120"
            >
            </el-table-column>
            <el-table-column
            prop="filename"
            label="样本盒位置"
            show-overflow-tooltip
            width="120"
            >
            </el-table-column>
            <el-table-column
            prop="filename"
            label="正常/批量"
            >
            </el-table-column>
            <el-table-column
            prop="filename"
            label="备注"
            show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
            prop="filename"
            label="样本盒录入状态"
            width="120"
            >
            </el-table-column>
            <el-table-column
            prop="filename"
            label="样本录入状态"
            width="120"
            >
            </el-table-column>
        </el-table>
      </div>
      <div class="automaticEntry">
        <div class="entryTitle" ><span>当前样本盒中样本列表</span></div>
        <div class="entryBtns">
          <i class="el-icon-circle-plus-outline">打印样本标签</i>
        </div>
        <el-table
            ref="multipleTable"
            :data="sampleBoxList"
            tooltip-effect="dark"
            style="width: 100%"
            :row-style="{height:'25px',textAlign: 'center',padding:'0px',}"
            :cell-style="{padding:'0px',textAlign: 'center'}"
            :header-cell-style ="{height:'25px',textAlign:'center',padding:'0px', background:'#f4f4f4', color:'black'}"
            border
            height="170"
            size='mini'
            >
            <el-table-column
            type="selection"
            width="50">
            </el-table-column>
            <el-table-column
            prop="data"
            label="样本RFID编号"
            width="150"
            show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
            prop="username"
            label="条形码ID"
            width="110"
            show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
            prop="username"
            label="所属样本盒名称"
            width="120"
            show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
            prop="name"
            label="样本名称"
            width="100"
            show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
            prop="filename"
            label="录入人"
            >
            </el-table-column>
            <el-table-column
            prop="filename"
            label="录入时间"
            >
            </el-table-column>
            <el-table-column
            prop="filename"
            label="样本位置"
            show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
            prop="filename"
            label="样本类别"
            >
            </el-table-column>
            <el-table-column
            prop="filename"
            label="正常/批量"
            >
            </el-table-column>
            <el-table-column
            prop="filename"
            label="样本来源"
            >
            </el-table-column>
            <el-table-column
            prop="filename"
            label="备注"
            show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
            prop="filename"
            width="150"
            label="中心实验室项目编号"
            show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
            prop="filename"
            label="方案编号"
            show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
            prop="filename"
            label="剂量组"
            >
            </el-table-column>
            <el-table-column
            prop="filename"
            label="受试者编号"
            width="100"
            show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
            prop="filename"
            label="实验采血日期"
            width="120"
            show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
            prop="filename"
            label="基质描述"
            show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
            prop="filename"
            label="采血管类型"
            width="120"
            show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
            prop="filename"
            label="采血管规格"
            width="120"
            show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
            prop="filename"
            label="录入状态"
            show-overflow-tooltip
            >
            </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  components: {},
  data () {
    return {
      fileList: [],
      sampleBoxList:[
      ]
    }
  },
  methods: {
    fileUrl(){
       console.log(this.$refs.file.value)
    }
      // handleChange(file,fileList) {
      //   console.log(fileList);
      // },
      // beforeRemove(file, fileList) {
      //   return this.$confirm(`确定移除 ${ file.name }？`);
      //   console.log(fileList);
      // }
  },
  computed: {}
}
</script>
<style scoped lang='less'>
.automaticWrap{
  width: 95%;
  margin: 0 auto;
  background: rgba(252,252,252,0.6);
  border: 1px solid rgba(204, 204, 204, 0.6);
  border-radius:5px;
  padding: 0 10px;
  .uploading{
    margin:10px 0;
  }
  .automaticEntry{
    width:65%;
    margin-top: 10px;
    border: 1px solid #95B8E7;
    .entryTitle{
      height: 25px;
      line-height: 25px;
      color:#0e2d5f;
      border-bottom: 1px solid #95B8E7;
      background:#f4f4f4;
    }
    .entryBtns{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 25px;
      background:#f4f4f4;
      border-bottom: 1px solid #ddd;
      font-size: 12px;
    }
  }
}
</style>
