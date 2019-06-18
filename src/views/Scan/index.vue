<template>
  <div class="scan-wrap">
    <!-- 扫描动态图    -->
    <saomiaoAndGuanli :switchSaoMiao='switchSaoMiao'></saomiaoAndGuanli>
    <!-- 表单 -->
    <!--
        注意: 这三个设置不影响表头的
    row-style="height:20px"  表格行高
    cell-style="padding:0"   表格padding
    style="font-size: 10px"  表格字体
    -->

    <div class="table-box">
      <formTopContent :count="tableData.length" :switchSaoMiao='switchSaoMiao'>
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
      <div style="margin-top: 20px">
        <!-- <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button> -->
        <!-- <el-button @click="toggleSelection()">取消选择</el-button> -->
      </div>
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
      toggleSaoMiao:false,
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

  watch: {
    switchSaoMiao(v) {
        console.log('v: ',v)
     this.toggleSaoMiao=v
    }
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
  width: 1366px;
  padding-top: 35px;
  overflow: hidden;
  // background-color: #333;
}

// 表单
.table-box {
  width: 1296px;
  margin: 0 auto;
  padding-top: 20px;

  img {
    width: 30px;
    height: 30px;
  }
}

//  侧边导航栏
.group {
  position: absolute;
  top: 35px;
  left: 0px;
  //   left: -500px;

  display: flex;
  overflow: hidden;

  border-radius: 0 0.625rem 0.625rem 0;
  transition: all 0.9s ease-in-out;
  ul {
    display: flex;

    border: 1px solid #eee;
    li {
      padding: 5px 5px; // 修改大小记得修改 data里的数据
      margin: 10px 5px;
      cursor: pointer;

      img {
        width: 80px; // 修改大小记得修改 data里的数据
        height: 80px; // 修改大小记得修改 data里的数据

        border: 0;
      }
    }
  }
  .zuozuo {
    .el-button--small,
    .el-button--small.is-round {
      padding: 0 !important;
    }
  }
  // 拉条按钮
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
      // width:50px;
      height: 50px;
    }
  }
}
</style>
