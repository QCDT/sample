<template>
  <div>
    <el-table
      :row-style="{height:'32px',textAlign: 'center',padding:'0px',}"
      :cell-style="{padding:'0px',textAlign: 'center'}"
      border
      stripe
      ref="multipleTable"
      :data="tableData1"
      tooltip-effect="dark"
      :style="{width: '100%',margin:'0 auto',}"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="序号" width="120">
        <template slot-scope="scope">{{ scope.row.coding }}</template>
      </el-table-column>
      <el-table-column prop="name" label="姓名编号" width="120"></el-table-column>
      <el-table-column prop="address" label="姓名" show-overflow-tooltip></el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  props: {},
  components: {},
  data() {
    return {
      tableData1: [
        {
          coding: "123", // 序号编码
          name: "Mark", // 样本名称
          address: "海尔冰箱3-1-101海尔冰箱", // 位置信息
          status: "正常", // 状态
          info: "详细信息", // 详细信息
          caozuo: "操作" // 操作
        },
        {
          coding: "123", // 序号编码
          name: "Mark", // 样本名称
          address: "海尔冰箱3-1-101海尔冰箱", // 位置信息
          status: "正常", // 状态
          info: "详细信息", // 详细信息
          caozuo: "操作" // 操作
        }
      ]
    };
  },
  methods: { handleSelectionChange() {} },
  computed: {}
};
</script>
<style scoped lang='scss'>
</style>