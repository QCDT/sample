<template>
  <div class="scan-wrap">
    <!-- 扫描动态图    -->
    <saomiaoAndGuanli :switchSaoMiao="switchSaoMiao"></saomiaoAndGuanli>
    <!-- 表单 -->
    <!--
        注意: 这三个设置不影响表头的
    row-style="height:20px"  表格行高
    cell-style="padding:0"   表格padding
    style="font-size: 10px"  表格字体
    -->

    <div class="table-box">
      <formTopContent :count="tableData.length" :switchSaoMiao="switchSaoMiao">
        <el-switch v-model="switchSaoMiao" slot="saomiao"></el-switch>
        <el-switch v-model="switchGuanLi" slot="guanli"></el-switch>
      </formTopContent>
      <!-- row-style  cell-style 表格样式 -->
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
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="序号编码" width="120">
          <template slot-scope="scope">{{ scope.row.coding }}</template>
        </el-table-column>
        <el-table-column prop="name" label="样本名称" width="120"></el-table-column>
        <el-table-column prop="address" label="位置信息" show-overflow-tooltip></el-table-column>
        <el-table-column prop="status" label="状态" show-overflow-tooltip></el-table-column>
        <el-table-column prop="info" label="详细信息" show-overflow-tooltip></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">123</el-button>
          </template>
        </el-table-column>
      </el-table>
     
    </div>
    <!-- 拉条:侧边导航栏:转运 分组合演 患者采血 自动录入 离心机 -->
    <group></group>
    <div class="bot-group">
      <div class="item" v-for="(item,index) in botGroupPic" :key="index">
        <router-link :to="{name:item.link}">
          <img :src="item.pic" alt>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { setInterval } from "timers";
import group from "@/views/Scan/banMenu";
import formTopContent from "./formTopContent/index";
import saomiaoAndGuanli from "./saomiaoAndGuanli/";
export default {
  components: { group, formTopContent, saomiaoAndGuanli },
  data() {
    return {
      // 开关
      switchSaoMiao: false,
      switchGuanLi: false,
      toggleSaoMiao: false,
      // 底部按钮组的 图片
      botGroupPic: [
        { pic: require("@/assets/img/scan_bot_out.png"), link: "loan" },
        { pic: require("@/assets/img/scan_bot_in.png"), link: "guihuan" },
        { pic: require("@/assets/img/scan_bot_laji.png"), link: "laji" },
        { pic: require("@/assets/img/scan_bot_tie.png"), link: "biaoqian" },
        {
          pic: require("@/assets/img/scan_bot_zhuanyi.png"),
          link: "zhuanyunbot"
        }
      ],
      // El UI

      tableData: [
        {
          coding: "123", // 序号编码
          name: "Mark", // 样本名称
          address: "海尔冰箱3-1-101海尔冰箱", // 位置信息
          status: "正常", // 状态
          info: "详细信息", // 详细信息
          caozuo: "操作" // 操作
        }
      ],
      multipleSelection: [],
      toggleSaoMiao: false
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
    /*  设置表头样式 */
    getRowClass({ rowIndex }) {
        return rowIndex == 0? {
          background: "#3cd7ff",
          padding: "0px 0",
          height: "30px",
          lineHeight: "1.875rem",
          fontWeight: "900",
          fontSize: "1rem",
          color: "#fff",
          textAlign: "center"
        }:"";
    
    },
    // 操作事件

    handleClick(row) {
      console.log(row);
    }
  }
};
</script>
<style scoped lang='less'>
.scan-wrap {
  position: relative;
  padding: 35px 20px 0;
  overflow: hidden;
}

// 表单
.table-box {
  padding-top: 20px;
}

.bot-group {
  width: 100%;

  position: fixed;
  height: 100px;

  bottom: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  .item {
    margin: 0 20px;
    cursor: pointer;
    > img {
      height: 50px;
    }
  }
}
</style>
