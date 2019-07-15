<template>
  <!-- 样本检测 -->
  <div class="detection-wrap">
    <div class="in">
      <ChaXun></ChaXun>
      <div class="row">
        <button class="add-test-plan" @click="addTestPlan">添加检测计划</button>
      </div>
      <div class="form center">
        <el-table
          :row-style="{height:'32px',textAlign: 'center',padding:'0px',}"
          :cell-style="{padding:'0px',textAlign: 'center'}"
          border
          stripe
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          height="250"
          :style="{width: '100%',margin:'0 auto',}"
          :header-cell-style="getRowClass"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="index" label="序号" width="70"></el-table-column>
          <el-table-column label="分析批名称" width="100">
            <template slot-scope="scope">
              <router-link :to="{name:'steps-3'}">
                <button @click="fenxi">分析名称</button>
              </router-link>
            </template>
          </el-table-column>
          <el-table-column prop="item" label="所属项目" show-overflow-tooltip></el-table-column>
          <el-table-column prop="newTime" label="创建日期"></el-table-column>
          <el-table-column prop="person" label="创建人" show-overflow-tooltip></el-table-column>
          <el-table-column prop="content" label="检测内容" show-overflow-tooltip></el-table-column>
          <el-table-column prop="status" label="核验状态" show-overflow-tooltip></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <div class="flex">
                <el-button @click="changProject(scope.row,scope.$index)" type="text" size="small">修改</el-button>
                <el-button type="text" @click="open">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-checkbox v-model="checked">隐藏已核验订单</el-checkbox>
      </div>
    </div>
    <goBack></goBack>
    <transition name="el-fade-in-linear">
      <masking v-if="ifaddTestPlan">
        <addTestPlan @close="ifaddTestPlan=false"></addTestPlan>
      </masking>
    </transition>
  </div>
</template>
<script>
import masking from "@/components/tmp/zhanglan/masking";
import goBack from "@/components/tmp/zhanglan/go-1";
import ChaXun from "@/views/Scan-Detection/ChaXun";
import addTestPlan from "./addTestPlan";
export default {
  props: {},
  components: { goBack, ChaXun, masking, addTestPlan },
  data() {
    return {
      ifaddTestPlan: false,
      dialogVisible: false,
      checked: "",
      value: "",
      tableData: [
        {
          id: "1",
          batchName: "名称", // 分析批名称
          item: "所属项目", // 所属项目
          newTime: "创建日期", // 创建日期
          person: "创建人", // 创建人
          content: "检测内容", // 检测内容
          status: "核验状态" // 核验状态
        }
      ],
      multipleSelection: []
    };
  },
  methods: {
    addTestPlan() {
      this.$message("添加样品检测计划");
      this.ifaddTestPlan = true;
    },
    fenxi() {
      this.$message("分析批名称");
    },
    // El UI ...
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
    clearProject(row, index) {
      /*  删除数据 */ this.tableData.splice(index, 1);
    },

    changProject() {}
  },
  computed: {}
};
</script>
<style scoped lang='less'>
.detection-wrap {
  padding: 0 20px;

  .in {
    background: #f5fcff;
    border: 1px solid rgba(204, 204, 204, 0.6);
    border-radius: 5px;
    padding: 50px 50px 20px;
  }
}
.add-test-plan {
  margin-bottom: 10px;
}
</style>
