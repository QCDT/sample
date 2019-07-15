<template>
  <div class="scan-wrap">
    <!-- 拉条:侧边导航栏:转运 分组合演 患者采血 自动录入 离心机 -->
    <BTNTopPosa></BTNTopPosa>
    <!-- 扫描动态图    -->
    <saomiaoAndGuanli :switchSaoMiao="switchSaoMiao"></saomiaoAndGuanli>
    <!-- 表单 -->
    <div class="table-box">
      <formTopContent :count="tableData.length" :switchSaoMiao="switchSaoMiao">
        <el-switch v-model="switchSaoMiao" slot="saomiao"></el-switch>
        <el-switch v-model="switchGuanLi" slot="guanli"></el-switch>
      </formTopContent>
      <el-table
        :row-style="{height:'32px',textAlign: 'center',padding:'0px',}"
        :cell-style="{padding:'0px',textAlign: 'center'}"
        border
        stripe
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        :style="{width: '100%',margin:'0 auto',}"
     
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
            <el-button @click="newMaskTran=true" type="text" size="small">新建</el-button>
            <el-button @click="reMask(scope.row,scope.$index)" type="text" size="small">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓  底部按钮 -->
    <BTNbot :switchSaoMiao="switchSaoMiao" :switchGuanLi="switchGuanLi" @zhuanyun="zhuanyun"></BTNbot>
    <!-- ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑   -->
    <!-- 新建样本 -->
    <transition name="el-fade-in-linear">
      <maskTran v-if="newMaskTran" :rgba="0">
        <newSample title="新建样本" @goBack="newMaskTran=false" @save="save"></newSample>
      </maskTran>
    </transition>
    <!-- 修改样本 -->
    <transition name="el-fade-in-linear">
      <maskTran v-if="reMaskTran" :rgba="0">
        <!-- rgba:透明度 -->
        <reSample title="修改样本" @changeSave="changeSave" @goBack="reMaskTran=false"></reSample>
      </maskTran>
    </transition>
    <!-- 转运 -->
    <transition name="el-fade-in-linear">
      <maskTran v-if="togegleZhuanYun" :rgba="0">
        <!-- rgba:透明度 -->
        <alertZhuanYun @save="saveZhuanYun" @goBack="togegleZhuanYun=false"></alertZhuanYun>
      </maskTran>
    </transition>
  </div>
</template>
<script>
import { setInterval } from "timers";
import BTNTopPosa from "./BTN-topPosa";
import BTNbot from "./BTN-bot";
import formTopContent from "./formTopContent/index";
import saomiaoAndGuanli from "./saomiaoAndGuanli/";
import maskTran from "@/components/tmp/zhanglan/maskTran";
import tmpButton from "@/components/tmp/zhanglan/tmpButton";
import newSample from "./newSample";
import reSample from "./reSample";
import alertZhuanYun from "./alert-ZhuanYun";
export default {
  components: {
    BTNTopPosa,
    formTopContent,
    saomiaoAndGuanli,
    maskTran,
    tmpButton,
    newSample,
    reSample,
    BTNbot,
    alertZhuanYun
  },
  data() {
    return {
      reMaskTran: false, // 修改
      newMaskTran: false, // 新建
      // 开关
      switchSaoMiao: false, // 扫描样本盒
      switchGuanLi: false, // 管理模式
      togegleZhuanYun: false, // 转运
      toggleSaoMiao: false,
      // 底部按钮组的 图片
      botGroupPic: [
        {
          pic: require("@/assets/img/scan_bot_out.png"),
          link: "loan",
          title: "借出"
        },
        {
          pic: require("@/assets/img/scan_bot_in.png"),
          link: "guihuan",
          title: "归还"
        },
        {
          pic: require("@/assets/img/scan_bot_laji.png"),
          link: "laji",
          title: "销毁"
        },
        {
          pic: require("@/assets/img/scan_bot_tie.png"),
          link: "biaoqian",
          title: "标签"
        },
        { pic: require("@/assets/img/scan_bot_zhuanyi.png"), title: "转移" }
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
        },
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
    /* 转运 */
    zhuanyun() {
      console.log("1111111: ", 1111111);
      this.togegleZhuanYun = true;
    },
    /* 保存 */
    saveZhuanYun() {
      this.$message("转运->保存");
      this.togegleZhuanYun = false;
    },
    //   新建样本
    save() {
      this.$message("确认保存-父组件");
      this.newMaskTran = false;
    },
    //   修改样本
    changeSave() {
      this.$message("确认保存-父组件");
      this.reMaskTran = false;
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
    // 操作事件

    reMask(rowData, index) {
      this.reMaskTran = true;
      console.log("index: ", index);
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
</style>
