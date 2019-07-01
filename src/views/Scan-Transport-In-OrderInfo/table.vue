<template>
  <div>
    <table class="table2" border="1" style="display: table;">
      <tbody>
        <tr class="tableHeadTwo">
          <td></td>
          <td>样本Rfid编号</td> <td>样本名称</td> <td>样本来源</td> <td>样本类别</td> <td>采样日期</td> <td>现位置</td> <td>操作</td>
        </tr>
        <tr class="tableHeadTwo tableContent">
          <td>1</td>
          <td>E00401509079D3F9</td>
          <td>TGRL/IF17-0hA</td>
          <td></td>
          <td>血浆</td>
          <td></td>
          <td>TRGLI其检测管样本盒6-1/1</td>
          <td class="zy">
            <i class="el-icon-edit" @click="edit()"></i>
          </td>
        </tr>
    
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props: {},
  components: {},
  data () {
    return {}
  },
  methods: {
      edit(){
          this.$message('123')
      }
  },
  computed: {}
}
</script>
<style scoped lang='less'>
table {
  width: 100%;
  border: 1px solid #333;
  border-collapse: collapse;
  white-space: nowrap;
    background-color: #f0f0f0;

}
th,
td {
  border: 1px solid #333;
  height: 35px;
  padding: 0 20px;
}
td {
    // min-width: 2rem;
    // text-overflow: ellipsis
}
.el-icon-edit{
    cursor: pointer;
}
</style>
