<template>
  <div class="loan-wrap">
    <transition name="el-fade-in-linear">
      <Add :showDingdan="showDingdan" @clearAdd="clearAdd" @submitForm="submitForm"/>
    </transition>
    <div class="top">
      <fromName>借出订单列表</fromName>
      <button @click="showAdd">添加订单</button>
    </div>

    <el-table
      :row-style="{height:'32px',textAlign: 'center',padding:'0px',}"
      :cell-style="{padding:'0px',textAlign: 'center'}"
      border
      stripe
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      :style="{width: '1430px',margin:'0 auto',}"
      :header-cell-style="getRowClass"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="index" label="序号" width="70"></el-table-column>
      <el-table-column prop="name" label="订单名称" width="120"></el-table-column>
      <el-table-column prop="newTime" label="创建时间" show-overflow-tooltip></el-table-column>
      <el-table-column prop="newUserName" label="创建用户名" show-overflow-tooltip></el-table-column>
      <el-table-column prop="takeOutName" label="取出人"></el-table-column>
      <el-table-column prop="returnTiem" label="预计归还时间" show-overflow-tooltip></el-table-column>
      <el-table-column prop="mark" label="备注" show-overflow-tooltip></el-table-column>
      <el-table-column prop="status" label="订单状态" show-overflow-tooltip></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="delDingdan(scope.row,scope.$index)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 蒙版 -->
  </div>
</template>
<script>
import goBack from "@/components/tmp/zhanglan/go-1";
import fromName from "@/components/tmp/zhanglan/fromName";
import Add from "@/views/Scan/botGropLink/Loan/Add";
export default {
  props: {},
  components: { goBack, fromName, Add },
  data() {
    return {
      // 表头样式
      formTitleStyle: {
        background: "#3cd7ff",
        padding: "0px 0",
        height: "30px",
        lineHeight: "1.875rem",
        fontWeight: "900",
        fontSize: "1rem",
        color: "#fff",
        textAlign: "center"
      },
      // 切换 添加借出订单选项
      showDingdan: false,

      tableData: [
        {
          // 序号[非ID] 订单名称 创建事件 创建用户名 取出人 预计归还事件 备注 订单状态 操作
          id: "1",
          name: "替格瑞洛", // 订单名称
          newTime: 1231231, //创建时间
          newUserName: "krystal", //创建用户名
          takeOutName: "meu", //取出人
          returnTiem: 123123, //预计归还时间
          mark: "暂无备注", //备注
          status: "已核验" // 订单状态
        }
      ],
      multipleSelection: []
    };
  },
  methods: {
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

    getRowClass({ rowIndex }) {
      /* 表头样式*/
      return rowIndex == 0 ? this.formTitleStyle : "";
    },
    // 删除订单
    delDingdan(row, index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.tableData.splice(index, 1);
          this.$message({ type: "success", message: "删除成功!" });
        })
        .catch(() => {
          this.$message({ type: "info", message: "已取消删除" });
        });
    },

    // ↓    添加订单
    showAdd() {
      /* 显示*/ this.showDingdan = true;
    },
    clearAdd() {
      /* 隐藏*/ this.showDingdan = false;
    },
    submitForm(v) {
      /* 添加订单*/ this.tableData.push(v);
      this.clearAdd();
    }
    // ↑
  },
  computed: {}
};
</script>
<style scoped lang='less'>
.loan-wrap {
  position: relative;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 20px 20px 0 20px;
}

.top {
  display: flex;
  justify-content: space-between;

  button {
    cursor: pointer;
  }
}
</style>