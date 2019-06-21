<template>
  <!-- 转出主页 -->
  <div class="scan-transport-out-index">
    <fromName>转出订单查询</fromName>
    <addAndSearch type='out'></addAndSearch>
    <div class="count">
      <span>共有:</span>
      <span>2</span>
      <span style="margin:0 0.3em">条数据</span>
    </div>
    <div class="form-box">
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
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="index" label="序号" width="70"></el-table-column>
        <el-table-column prop="orderName" label="订单名称" width="120"></el-table-column>
        <el-table-column prop="recipients" label="收件人" show-overflow-tooltip></el-table-column>
        <el-table-column prop="site" label="收件地址"></el-table-column>
        <el-table-column prop="contactWay" label="联系方式" show-overflow-tooltip></el-table-column>
        <el-table-column prop="entryClerk" label="录入人" show-overflow-tooltip></el-table-column>
        <el-table-column fixed="right" label="导出" width="100">
          <template slot-scope="scope">
            <div class="flex">
              <el-button @click="changProject(scope.row,scope.$index)" type="text" size="small">
                <i class="icon icon-liebiao" style="color:#000"></i>
              </el-button>
              <el-button @click="changProject(scope.row,scope.$index)" type="text" size="small">
                <i class="icon icon-excel" style="color: rgb(33, 115, 70);"></i>
              </el-button>
              <el-button type="text" @click="open">
                <i class="icon icon-pdf" style="color: rgb(163, 54, 57)"></i>
              </el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <div class="flex">
              <router-link :to="{name:'outchange'}" style="color:#333">
                <i class="icon icon-edit"></i>
              </router-link>

              <el-button type="text" @click="open(scope.row,scope.$index)">
                <i class="icon icon-shanchu"></i>
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import addAndSearch from "./addAndSearch";
import fromName from "@/components/tmp/zhanglan/fromName";
export default {
  props: {},
  components: { fromName, addAndSearch },
  data() {
    return {
      tableData: [
        {
          order: "订单号", // 订单号
          orderName: "订单名称", // 订单名称
          recipients: "收件人", // 收件人
          site: "地址", // 收件地址
          contactWay: "联系方式", // 联系方式
          entryClerk: "录入人" // 联系方式
        }
      ],
      multipleSelection: []
    };
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    /**
     * @description: 设置表头样式
     * @param {type}
     * @return:
     */
    getRowClass({ rowIndex }) {
      if (rowIndex == 0) {
        return {
          background: "#3cd7ff",
          padding: "0px 0",
          height: "30px",
          lineHeight: "1.875rem",
          fontWeight: "900",
          fontSize: "1rem",
          color: "#fff",
          textAlign: "center"
        };
      } else {
        return "";
      }
    },
    open() {
      /*  删除确认 */ this.$confirm(
        "此操作将永久删除该文件, 是否继续?",
        "提示",
        { confirmButtonText: "确定", cancelButtonText: "取消", type: "warning" }
      )
        .then(() => {
          this.clearProject();
          this.$message({ type: "success", message: "删除成功!" });
        })
        .catch(() => {
          this.$message({ type: "info", message: "已取消删除" });
        });
    },
    changProject() {
      console.log(": ", "修改");
    }
  },
  computed: {}
};
</script>
<style scoped lang='less'>
.scan-transport-out-index {
  padding: 0 20px;
}
.count {
  padding: 20px 0 10px;
  font-size: 16px;
}
.flex {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
</style>