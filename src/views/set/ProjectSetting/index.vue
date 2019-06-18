<template>
  <div class="project-setting-page project-wrap">
    <newProject
      v-if="dialogVisible"
      :MASK_name="MASK_name"
      :MASK_items="MASK_items"
      @closeProject="closeProject"
      @maskProject="maskProject"
      :MASK_btn="MASK_btn"
      :dialogVisible="dialogVisible"
    ></newProject>
    <!-- 表格名称 -->
    <div class="top">
      <fromName>项目列表</fromName>
      <h1>项目列表</h1>
    </div>
    <div class="cent">
      <item-sum name="项目总数:" :number="tableData.length"></item-sum>
      <button @click="openProject">新建项目</button>
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
        :style="{width: '1296px',margin:'0 auto',}"
        :header-cell-style="getRowClass"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="index" label="序号" width="70"></el-table-column>
        <el-table-column prop="name" label="项目名称" width="120"></el-table-column>
        <el-table-column prop="fangan" label="方案号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="shenban" label="申办方"></el-table-column>
        <el-table-column prop="persorn" label="负责人" show-overflow-tooltip></el-table-column>
        <el-table-column prop="yaowu" label="药物名称" show-overflow-tooltip></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <div class="flex">
              <el-button @click="changProject(scope.row,scope.$index)" type="text" size="small">修改</el-button>
              <el-button type="text" @click="open">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="bot">
      <goBack></goBack>
    </div>
  </div>
</template>
<script>
import itemSum from "@/components/tmp/zhanglan/item-sum";
import goBack from "@/components/tmp/zhanglan/go-1";
import masking from "@/views/set/ProjectSetting/masking";
import fromName from "@/components/tmp/zhanglan/fromName";
import newProject from "./newProject/index";
export default {
  components: { itemSum, goBack, masking, fromName, newProject },
  data() {
    return {
      // 新建项目
      MASK_items: [
        { text: "项目名称", name: "项目名称", key: "name", value: "1" },
        { text: "方案号", fangan: "方案号", key: "fangan", value: "2" },
        { text: "申办方", shenban: "申办方", key: "shenban", value: "3" },
        { text: "负责人", persorn: "负责人", key: "persorn", value: "4" },
        { text: "药物名称", yaowu: "药物", key: "yaowu", value: "5" }
      ],
      //返回按钮
      dialogVisible: false,
      // 删除按钮 确认框
      MASK_name: "新建项目",
      MASK_btn: "创建",
      MASK_event: true, // true创建项目 false 为修改项目
      MASK_cha_index: -1, //修改的哪一行
      //   MASK_del_index: -1, //删除的哪一行
 
   
 

      tableData: [
        {
          id: "1",
          name: "替格瑞洛", // 项目名称
          fangan: "SN-YQ-2018005/V 1.0", // 方案号
          shenban: "石药集团中奇制药技术", // 申办方
          persorn: "李四", // 负责人
          yaowu: "CSPCHA115胶囊" // 药物名称
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
    // EL UI操作事件
    changProject(row, index) {
      // row 当前行的数据,index 当前行的索引
      this.MASK_name = "修改项目";
      this.MASK_btn = "修 改";
      this.MASK_event = false; // true 为创建 false 为修改
      this.MASK_cha_index = index; //修改的哪一行
      console.log("修改蒙版数据: ", "修改项目");

      this.MASK_value = this.tableData[index];
      this.dialogVisible = true;
    },

    // 显示蒙版-->新建项目的点击按钮
    openProject() {
      this.MASK_name = "新建项目";
      this.MASK_btn = "创 建";
      this.MASK_event = true; // true 为创建 false 为修改
      this.dialogVisible = true;
    },
    // ↓    触发蒙版里的事件:修改,创建
    maskProject(val) { /* 修改 OR 创建 */ this.MASK_event ? this.addProject(val) : this.putProject(val); },
    addProject(val) { /*  创建 */ this.tableData.push(val); this.$message({ message: "添加成功", type: "success" }); this.closeProject(); },
    putProject(val) { /*  修改 */ 
    console.log('998: ',998)
    this.tableData[this.MASK_cha_index] = val; 
    this.closeProject()
    },
    clearProject(row, index) { /*  删除数据 */ this.tableData.splice(index, 1); },
    open() {  /*  删除确认 */this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", { confirmButtonText: "确定", cancelButtonText: "取消", type: "warning" }) .then(() => { this.clearProject(); this.$message({ type: "success", message: "删除成功!" }); }) .catch(() => { this.$message({ type: "info", message: "已取消删除" }); }); } ,
    closeProject() { /*取消 | 关闭创建项目的窗口 */this.dialogVisible = false; },
  }
};
</script>
<style scoped lang='less'>
.bot {
  background-color: #fff;
}

.cent {
  button {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    margin-right: 15px;
    padding: 2px 15px;

    color: #fff;
    border: 1px solid #3cd7ff;
    border-radius: 3px;
    outline: none;
    background: #3cd7ff;

    font-size: 15px;
  }
}

.project-wrap {
  position: relative;

  width: 1226px;
  margin: 0 auto;
  padding-top: 10px;
  .cent {
    display: flex;
    justify-content: space-between;

    width: 1226px;
    // padding: 0 35px;
    margin: 0 auto;
    margin-bottom: 8px;
  }

  .center {
    background-color: #fff;
  }

  .bot {
    position: fixed;
    bottom: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 150px;
  }
}

.flex {
  display: flex;
}
</style>
