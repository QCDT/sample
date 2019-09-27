<template>
  <div class="scan-wrap">
    <div v-show="!newBoxMaskTran && !newMaskTran && !reMaskTran && !togegleZhuanYun && !showSampleBoxInfo">
      <!-- 拉条:侧边导航栏:转运 分组合演 患者采血 自动录入 离心机 -->
      <BTNTopPosa></BTNTopPosa>
      <!-- 扫描动态图    -->
      <saomiaoAndGuanli :switchSaoMiao="switchSaoMiao"  @changeBox='changeBox' @changeSample="changeSample"></saomiaoAndGuanli>
      <!-- 表单 -->
      <div class="table-box">
        <formTopContent :count="!switchSaoMiao ? tableData.length : boxData.length" :switchSaoMiao="switchSaoMiao">
          <el-switch v-model="switchSaoMiao" slot="saomiao"></el-switch>
          <el-switch v-model="switchGuanLi" slot="guanli"></el-switch>
        </formTopContent>
          <!-- 扫描样本 -->
            <div  v-show="!switchSaoMiao" >
              <el-table
                :row-style="{height:'32px',textAlign: 'center'}"
                :cell-style="{textAlign: 'center', padding: '0'}"
                border
                max-height= '190'
                :data="tableData"
                tooltip-effect="dark"
                style='width:100%'
                @selection-change="selects"
              >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column type="index"  label="序号" width="70"></el-table-column>
                <el-table-column label="RFID编码" prop="coding" show-overflow-tooltip></el-table-column>
                <el-table-column prop="name" label="样本名称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="address" label="位置信息" show-overflow-tooltip></el-table-column>
                <el-table-column prop="status" label="状态" width="120" show-overflow-tooltip ></el-table-column>
                <el-table-column prop="info" label="详细信息" width="120" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <span class="infoStyle" v-show="scope.row.address ? true : false"  @click="sampleInfo(scope.row,scope.$index)">详细信息</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作" fixed="right" width="120">
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
            <div v-show="switchSaoMiao">
              <el-table
                :row-style="{height:'32px',textAlign: 'center',padding:'0px'}"
                :cell-style="{textAlign: 'center',padding: '0px'}"
                border
                :data="boxData"
                max-height= '190'
                tooltip-effect="dark"
                :style="{width: '100%'}"
                @selection-change="selectBox"
              >
                <el-table-column type="selection" width="55" ></el-table-column>
                <el-table-column type="index" width="70" label="序号" ></el-table-column>
                <el-table-column label="RFID编码" >
                  <template slot-scope="scope">{{ scope.row.coding }}</template>
                </el-table-column>
                <el-table-column prop="name" label="样本盒名称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="address" label="位置信息" show-overflow-tooltip></el-table-column>
                <el-table-column prop="status" label="状态" show-overflow-tooltip ></el-table-column>
                <el-table-column label="详细信息" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span class="infoStyle" v-show="scope.row.address ? true : false"  @click="sampleBoxInfo(scope.row, scope.$index)">详细信息</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" content="新建" placement="bottom-start" >
                      <img
                        src="@/assets/img/scanBox.png"
                        class="tb-img"
                        @click="newBoxMask(scope.row,scope.$index)"
                        v-show="scope.row.address ? false : true"
                      >
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="修改" placement="bottom-start" >
                      <img
                        src="@/assets/img/editScanBox.png"
                        class="tb-img"
                        @click="reBoxMask(scope.row,scope.$index)"
                        v-show="scope.row.address ? true: false "
                      >
                    </el-tooltip>
                  </template>
                </el-table-column>
              </el-table>
            </div>
      </div>
      <!-- ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓  底部按钮 -->
      <BTNbot :switchSaoMiao="switchSaoMiao"  :switchGuanLi="switchGuanLi" :checkedBoxlist="checkedBoxlist" :checkedlist="checkedlist" @zhuanyun="zhuanyun"></BTNbot>
      <!-- ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑   -->
    </div>
      <!-- 新建样本 -->
      <transition name="el-fade-in-linear">
          <newSample  v-if="newMaskTran" title="新建样本" :RFID="RFID" @goBack="newMaskTran=false"></newSample>
      </transition>
      <!-- 修改样本 -->
      <transition name="el-fade-in-linear">
          <!-- rgba:透明度 -->
          <reSample v-if="reMaskTran" title="修改样本" :selectedId='selectedId' @changeSave="changeSave" @goBack="reMaskTran=false"></reSample>
      </transition>
      <!-- 新建样本盒/修改样本盒 -->
      <transition name="el-fade-in-linear">
          <newSampleBox v-if="newBoxMaskTran" :sampleBoxId='sampleBoxId' :boxRfid='boxRfid'  :title="sampleBoxTitle" @changeBoxRfid="changeBoxRfid" @goBack="newBoxMaskTran=false"></newSampleBox>
      </transition>
      <!-- 样本盒详情-->
      <transition name="el-fade-in-linear">
          <showInfo v-if="showSampleBoxInfo" :sampleBoxId='sampleBoxId' @goBack="showSampleBoxInfo=false"></showInfo>
      </transition>
      <!-- 转移 -->
      <transition name="el-fade-in-linear">
        <!-- <maskTran :rgba="0"> -->
          <!-- rgba:透明度 -->
          <alertZhuanYun :switchSaoMiao="switchSaoMiao" :checkedBoxlist='checkedBoxlist' :checkedlist='checkedlist' v-if="togegleZhuanYun" @save="saveZhuanYun" @goBack="togegleZhuanYun=false"></alertZhuanYun>
        <!-- </maskTran> -->
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
import alertZhuanYun from "./alert-ZhuanYun";
import showInfo from './newSampleBox/showInfo'
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
    BTNbot,
    alertZhuanYun,
    showInfo
  },
  data() {
    return {
      checkedlist:[],  //选中项的数组
      checkedBoxlist: [], //样本盒选中数组
      reMaskTran: false, // 修改样本
      newMaskTran: false, // 新建样本
      newBoxMaskTran: false, // 新建样本盒
      showSampleBoxInfo: false, //样本盒详细信息
      selectedId:'', //修改样本时所需要的id
      sampleBoxTitle: '',
      RFID: '',
      boxRfid: '',
      sampleBoxId:-1,
      // 开关
      switchSaoMiao: false, // 扫描样本盒
      switchGuanLi: false, // 管理模式
      togegleZhuanYun: false, // 转运
      toggleSaoMiao: false,
      tableData: [
        // {
        //   id:1,
        //   coding: "123", // 序号编码
        //   name: "Mark", // 样本名称
        //   address: "海尔冰箱3-1-101海尔冰箱", // 位置信息
        //   status: "正常", // 状态
        // },
        // {
        //   coding: "123", // 序号编码
        //   name: "Mark", // 样本名称
        //   address: "", // 位置信息
        //   status: "正常", // 状态
        // }
      ],
      boxData: [
        // {
        //   id:1,
        //   coding: "111", // 序号编码
        //   name: "Mark", // 样本名称
        //   // address: "海尔冰箱3-1-101海尔冰箱", // 位置信息
        //   status: "正常", // 状态
        //   info: "详细信息", // 详细信息
        // }
      ],
      // multipleSelection: [],
      // toggleSaoMiao: false
    };
  },

  methods: {
    /* 转运 */
    zhuanyun() {
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
    changeBox (boxData) {
      console.log(boxData)
      this.boxData = boxData
    },
    changeSample(tableData){
      this.tableData = tableData
      // this.$store.commit('changeReturnBack', selection)
    },
    sampleInfo(row,index){
      this.$router.push({
        name: 'sample',
        params:{
          id:row.id
        }
      })
    },
    sampleBoxInfo(row,index){
      this.sampleBoxId = row.id
      this.showSampleBoxInfo = true
    },
    newBoxMask(row){
      this.newBoxMaskTran=true
      this.boxRfid = row.coding
      this.sampleBoxTitle = '新建样本盒'
    },
    //   修改样本
    changeSave() {
      this.$message("确认保存-父组件");
      this.reMaskTran = false;
    },
    reMask(rowData, index) {
      this.reMaskTran = true;
      // this.RFID = row.coding
      this.selectedId = rowData.id
      console.log(rowData.id);
    },
    reBoxMask(row){
      this.$axios({
        method:'post',
        url:'/sampleGuide/set/isCanBeUpdateSampleBox',
        data:({
          id: row.id
        })
      })
      .then(({data})=>{
          console.log(data)
          if(data.data == 0){
            this.$message({
              message: '该样本盒中存在非正常状态样本，不可修改！',
              type: 'warning'
            });
          }else{
            this.boxRfid = row.coding
            this.newBoxMaskTran=true
            this.sampleBoxTitle = '修改样本盒'
            this.sampleBoxId = row.id
          }
      })
    },
    changeBoxRfid(rfid){
      this.boxRfid = rfid
    },
    selectBox(selection) {
      this.checkedBoxlist = selection
    },
    selects(selection){
      this.checkedlist = selection
      this.$store.commit('changeReturnBack', selection)
    }
  }
};
</script>
<style scoped lang='less'>
.scan-wrap {
  position: relative;
  // padding: 35px 20px 0;
  padding:  0 20px;
  // height: 100%;
  overflow: hidden;
}
.infoStyle{
  cursor: pointer;
}
// 表单
.table-box {
  padding-top: 20px;
  height:16vw;
  .tb-img {
    width: 25px;
    vertical-align: middle;
    cursor: pointer;
  }

}


</style>
