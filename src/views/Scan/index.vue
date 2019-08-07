<template>
  <div class="scan-wrap">
    <div v-show="!newBoxMaskTran && !reBoxMaskTran && !newMaskTran && !reMaskTran">
    <!-- 拉条:侧边导航栏:转运 分组合演 患者采血 自动录入 离心机 -->
    <BTNTopPosa></BTNTopPosa>
    <!-- 扫描动态图    -->
    <saomiaoAndGuanli :switchSaoMiao="switchSaoMiao"></saomiaoAndGuanli>
    <!-- 表单 -->
    <div class="table-box">
      <formTopContent :count="!switchSaoMiao ? tableData.length : boxData.length" :switchSaoMiao="switchSaoMiao">
        <el-switch v-model="switchSaoMiao" slot="saomiao"></el-switch>
        <el-switch v-model="switchGuanLi" slot="guanli"></el-switch>
      </formTopContent>
        <!-- 扫描样本 -->
          <div class="scanSample"  v-show="!switchSaoMiao" >
            <el-table
              :row-style="{height:'32px',textAlign: 'center',padding:'0px'}"
              :cell-style="{textAlign: 'center',padding: '0px'}"
              border
              stripe
              max-height= '120'
              :data="tableData"
              tooltip-effect="dark"
              :style="{width: '100%',margin:'0 auto',}"
              @select="selects"
              @select-all="selects"
            >
              <el-table-column type="selection" width="55" ></el-table-column>
              <el-table-column type="index" width="50" label="序号" ></el-table-column>
              <el-table-column label="RFID编码" prop="coding" show-overflow-tooltip></el-table-column>
              <el-table-column prop="name" label="样本名称" show-overflow-tooltip></el-table-column>
              <el-table-column prop="address" label="位置信息" show-overflow-tooltip></el-table-column>
              <el-table-column prop="status" width="80" label="状态" show-overflow-tooltip ></el-table-column>
              <el-table-column prop="info" width="130" label="详细信息" show-overflow-tooltip></el-table-column>
              <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" content="新建" placement="bottom-start" >
                    <img 
                      src="@/assets/img/new.png" 
                      class="tb-img" 
                      @click="newMask(scope.row, scope.$index)"  
                      v-show="scope.row.address ? false : true"
                    >
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="修改" placement="bottom-start" >
                    <img 
                      src="@/assets/img/xiugai2.png" 
                      class="tb-img" 
                      v-show="scope.row.address ? true : false"  
                      @click="reMask(scope.row,scope.$index)" 
                    >
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </div>
        <!-- 扫描样本盒 -->
          <div class="scanSampleBox" v-show="switchSaoMiao">
            <el-table
              :row-style="{height:'32px',textAlign: 'center',padding:'0px'}"
              :cell-style="{textAlign: 'center',padding: '0px'}"
              border
              stripe
              :data="boxData"
              max-height = '120'
              tooltip-effect="dark"
              :style="{width: '100%',margin:'0 auto'}"
              @select="selects"
              @select-all="selects"
            >
              <el-table-column type="selection" width="55" ></el-table-column>
              <el-table-column type="index" width="50" label="序号" ></el-table-column>
              <el-table-column label="RFID编码" >
                <template slot-scope="scope">{{ scope.row.coding }}</template>
              </el-table-column>
              <el-table-column prop="name" label="样本盒名称" show-overflow-tooltip></el-table-column>
              <el-table-column prop="address" label="位置信息" show-overflow-tooltip></el-table-column>
              <el-table-column prop="status" width="80" label="状态" show-overflow-tooltip ></el-table-column>
              <el-table-column prop="info" width="130" label="详细信息" show-overflow-tooltip></el-table-column>
              <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" content="新建" placement="bottom-start" >
                    <img 
                      src="@/assets/img/scanBox.png" 
                      class="tb-img" 
                      @click="newBoxMaskTran=true"  
                      v-show="scope.row.address ? false : true"
                    >
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="修改" placement="bottom-start" >
                    <img 
                      src="@/assets/img/editScanBox.png" 
                      class="tb-img" 
                      v-show="scope.row.address ? true : false"  
                      @click="reBoxMask(scope.row,scope.$index)" 
                    >
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </div>
      </div>
     </div> 
    <!-- ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓  底部按钮 -->
    <BTNbot :switchSaoMiao="switchSaoMiao" :switchGuanLi="switchGuanLi" :checkedlist="checkedlist" @zhuanyun="zhuanyun" v-if="!newMaskTran && !reMaskTran"></BTNbot>
    <!-- ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑   -->
    <!-- 新建样本 -->
    <!-- <div>
      <maskTran v-if="newMaskTran" :rgba="0">
        <newSample title="新建样本" @goBack="newMaskTran=false" @save="save"></newSample>
      </maskTran>    
    </div> -->
    <transition name="el-fade-in-linear">
      <!-- <maskTran v-if="newMaskTran" :rgba="0"> -->
        <newSample  v-if="newMaskTran" title="新建样本" :RFID="RFID" @goBack="newMaskTran=false" @save="save"></newSample>
      <!-- </maskTran> -->
    </transition>
    <!-- 修改样本 -->
    <transition name="el-fade-in-linear">
      <!-- <maskTran v-if="reMaskTran" :rgba="0"> -->
        <!-- rgba:透明度 -->
        <reSample v-if="reMaskTran" title="修改样本" @changeSave="changeSave" @goBack="reMaskTran=false"></reSample>
      <!-- </maskTran> -->
    </transition>
    <!-- 新建样本盒 -->
    <transition name="el-fade-in-linear">
      <maskTran v-if="newBoxMaskTran" :rgba="0">
        <newSampleBox title="新建样本盒" @goBack="newBoxMaskTran=false" @save="save"></newSampleBox>
      </maskTran>
    </transition>
    <!-- 修改样本盒 -->
    <transition name="el-fade-in-linear">
      <maskTran v-if="reBoxMaskTran" :rgba="0">
        <!-- rgba:透明度 -->
        <reSampleBox title="修改样本盒" @changeSave="changeSave" @goBack="reBoxMaskTran=false"></reSampleBox>
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
// import { setInterval } from "timers";
import BTNTopPosa from "./BTN-topPosa";
import BTNbot from "./BTN-bot";
import formTopContent from "./formTopContent/index";
import saomiaoAndGuanli from "./saomiaoAndGuanli/";
import maskTran from "@/components/tmp/zhanglan/maskTran";
import tmpButton from "@/components/tmp/zhanglan/tmpButton";
import newSample from "./newSample";
import reSample from "./reSample";
import newSampleBox from "./newSampleBox";
import reSampleBox from "./reSampleBox";
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
    newSampleBox,
    reSampleBox,
    BTNbot,
    alertZhuanYun
  },
  data() {
    return {
      checkedlist:[],  //选中项的数组
      reMaskTran: false, // 修改样本
      newMaskTran: false, // 新建样本
      reBoxMaskTran: false, // 修改样本盒
      newBoxMaskTran: false, // 新建样本盒
      RFID: '',
      // 开关
      switchSaoMiao: false, // 扫描样本盒
      switchGuanLi: false, // 管理模式
      togegleZhuanYun: false, // 转运
      toggleSaoMiao: false,
      tableData: [
        {
          id:1,
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
          address: "", // 位置信息
          status: "正常", // 状态
          info: "详细信息", // 详细信息
          caozuo: "操作" // 操作
        }
      ],
      boxData: [
        {
          id:1,
          coding: "111", // 序号编码
          name: "Mark", // 样本名称
          address: "海尔冰箱3-1-101海尔冰箱", // 位置信息
          status: "正常", // 状态
          info: "详细信息", // 详细信息
          caozuo: "操作" // 操作
      },{
          coding: "122", // 序号编码
          name: "sadad", // 样本名称
          address: "", // 位置信息
          status: "正常", // 状态
          info: "详细信息", // 详细信息
          caozuo: "操作" // 操作
        },{
          coding: "122", // 序号编码
          name: "sadad", // 样本名称
          address: "", // 位置信息
          status: "正常", // 状态
          info: "详细信息", // 详细信息
          caozuo: "操作" // 操作
        },{
          coding: "122", // 序号编码
          name: "sadad", // 样本名称
          address: "", // 位置信息
          status: "正常", // 状态
          info: "详细信息", // 详细信息
          caozuo: "操作" // 操作
        },{
          coding: "122", // 序号编码
          name: "sadad", // 样本名称
          address: "", // 位置信息
          status: "正常", // 状态
          info: "详细信息", // 详细信息
          caozuo: "操作" // 操作
        },{
          coding: "122", // 序号编码
          name: "sadad", // 样本名称
          address: "", // 位置信息
          status: "正常", // 状态
          info: "详细信息", // 详细信息
          caozuo: "操作" // 操作
        },{
          coding: "122", // 序号编码
          name: "sadad", // 样本名称
          address: "", // 位置信息
          status: "正常", // 状态
          info: "详细信息", // 详细信息
          caozuo: "操作" // 操作
        },{
          coding: "122", // 序号编码
          name: "sadad", // 样本名称
          address: "", // 位置信息
          status: "正常", // 状态
          info: "详细信息", // 详细信息
          caozuo: "操作" // 操作
        },{
          coding: "122", // 序号编码
          name: "sadad", // 样本名称
          address: "", // 位置信息
          status: "正常", // 状态
          info: "详细信息", // 详细信息
          caozuo: "操作" // 操作
        },{
          coding: "122", // 序号编码
          name: "sadad", // 样本名称
          address: "", // 位置信息
          status: "正常", // 状态
          info: "详细信息", // 详细信息
          caozuo: "操作" // 操作
        },{
          coding: "122", // 序号编码
          name: "sadad", // 样本名称
          address: "", // 位置信息
          status: "正常", // 状态
          info: "详细信息", // 详细信息
          caozuo: "操作" // 操作
        }
        ],
      // multipleSelection: [],
      // toggleSaoMiao: false
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
    newMask(row, index){
      // console.log(index,row)
      console.log(row, index)
       this.newMaskTran=true
       this.RFID = row.coding
    },
    save() {
      this.$message("确认保存-父组件");
      this.newMaskTran = false;
    },
    //   修改样本
    changeSave() {
      this.$message("确认保存-父组件");
      this.reMaskTran = false;
    },
    reMask(rowData, index) {
      this.reMaskTran = true;
      // this.RFID = row.coding
      console.log("index: ", index);
    },

    reBoxMask(rowData, index){
      this.reBoxMaskTran = true;
    },
    selects(selection) {
      this.checkedlist = selection;
    }
  }
};
</script>
<style scoped lang='less'>
.scan-wrap {
  position: relative;
  // padding: 35px 20px 0;
  padding:  0 20px;
  overflow: hidden;
}
.scanSample{
  transition: .5s;
}
.scanSampleBox{
  transition: .5s;
}
// 表单
.table-box {
  padding-top: 20px;
  .tb-img {
    width: 25px;
    vertical-align: middle;
    cursor: pointer;
  }

}


</style>
