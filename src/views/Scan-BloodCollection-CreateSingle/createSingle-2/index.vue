<template>
  <div>
    <div class="row top-input">
      <div class="item">
        <span>单人核验订单名称:</span>
        <el-input style="width:120px" size="mini"></el-input>
      </div>
      <div class="item">
        <span>单人核验订单名称:</span>
        <el-input style="width:120px" size="mini"></el-input>
      </div>
      <tmpButton>创建订单</tmpButton>
    </div>
    <div class="form-table">
      <el-table
        :row-style="{height:'32px',textAlign: 'center',padding:'0px',}"
        :cell-style="{padding:'0px',textAlign: 'center'}"
        border
        stripe
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        :style="{width: '100%',margin:'0 auto',}"
        :header-cell-style="getRowClass"
      >
        <el-table-column type="index" label="序号" width="70"></el-table-column>

        <el-table-column label="订单名称" width="300">
          <template slot-scope="scope">
            <div class="flex">
              <router-link :to="{name:'createSingle-3'}" style="color:#333">路由</router-link>
              <!-- <el-button @click="changProject(scope.row,scope.$index)" type="text" size="small">姓名</el-button> -->
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="fangan" label="创建日期" show-overflow-tooltip></el-table-column>

        <el-table-column prop="shenban" label="创建人员" show-overflow-tooltip></el-table-column>
        <el-table-column prop="persorn" label="状态" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <div class="flex">
              <router-link :to="{name:'checkMore-2'}" style="color:#333">删除</router-link>
              <!-- <el-button @click="changProject(scope.row,scope.$index)" type="text" size="small">姓名</el-button> -->
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import tmpButton from "@/components/tmp/zhanglan/tmpButton";
export default {
  props: {},
  components: { tmpButton },
  data() {
    return {
      tableData: [
        {
          id: "1",
          name: "订单名称", // 订单名称
          fangan: "2018.01.01", // 创建日期
          shenban: "张三", // 创建人员
          persorn: "XXX状态" // 状态
        }
      ],
      multipleSelection: []
    };
  },
  methods: {
    getRowClass({ rowIndex }) {
      return rowIndex == 0 ? this.$store.getters.formTheme : "";
    },
    changProject(rowData, index) {}
  },
  computed: {},
  created() {
    this.$emit("getMessage", 1);
  }
};
</script>
<style scoped lang='less'>
.top-input {
  display: flex;
 
  margin-bottom: 5px;
}
.item {
  display: flex;
  align-items: center;
  margin-right: 20px;
}
.form-table {
  background-color: #eee;
}
</style>