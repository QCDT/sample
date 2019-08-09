<!--
 * @Description: In User Settings Edit
 * @Author: 刘一帆
 * @Date: 2019-07-15 16:37:07
 * @LastEditTime: 2019-08-08 19:52:34
 * @LastEditors: Please set LastEditors
 -->
<template>
  <!-- 共有多少条数据...销毁..打印标签..转移..导出... -->
  <div class="selection-box">
    <div class="sum">
      <div class="item">
        <span>共有:</span>
        <span>{{count}}</span>
        <span style="margin:0 0.3em">条数据</span>
      </div>
      <div class="item">
        <tmpinput>
          打印样式设置
          <el-select
            slot="elUI"
            size="small"
            clearable
            v-model="value"
            filterable
            placeholder="请选择"
            style="width:60%"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </tmpinput>
      </div>
    </div>
    <div class="right">
      <div class="item" @click="delSample">
        <i class="icon icon-shanchu"></i>
        <small>销毁</small>
      </div>
      <div class="item" @click="printTag">
        <i class="icon icon-print"></i>
        <small>打印标签</small>
      </div>
      <!-- <router-link :to="{name:'transfer'}" style="color:#000"> -->
        <div class="item" @click="transfer">
          <i class="icon icon-zhuanyi"></i>
          <small>转移</small>
        </div>
      <!-- </router-link> -->
      <div class="item" @click="printLocation">
        <i class="icon icon-weizhi"></i>
        <small>打印位置信息</small>
      </div>
      <!-- <router-link :to="{name:'changsample'}" style="color:#000"> -->
        <div class="item" @click="amendSample">
          <i class="icon icon-yemianxiugai"></i>
          <small>批量修改</small>
        </div>
      <!-- </router-link> -->
       <div class="item" @click="exportExcel">
        <i class="icon icon-pdf" style="color:#A33639"></i>
        <small>导出PDF</small>
      </div>
      <div class="item" @click="exportPdf">
          <i class="icon icon-excel" style="color:#217346"></i>
          <small>导出Excel</small>
      </div>
    </div>
  </div>
</template>
<script>
import tmpinput from '@/components/tmp/zhanglan/tmp-empty-input'
export default {
  props: {
    count: Number,
    multipleSelection: { type: Array, default: () => [] }
  },
  components: { tmpinput },
  data () {
    return {
      options: [
        {
          value: '选项1',
          label: '苹果'
        },
        {
          value: '选项5',
          label: '香蕉'
        }
      ],
      value: ''
      //   ↑
    }
  },
  methods: {
    // 销毁样本
    delSample(){
       if(this.multipleSelection.length == 0){
          this.$message({
            message: '请选择需要销毁的样本',
            type: 'warning'
          });
       }else{
          console.log(this.multipleSelection)
       }
    },
    // 打印标签
    printTag(){
      if(this.multipleSelection.length == 0){
        this.$message({
          message: '请选择需要打印标签的样本',
          type: 'warning'
        });
      }else{
        console.log(this.multipleSelection)
      }
    },
    // 转移样本
    transfer(){
      if(this.multipleSelection.length == 0){
        this.$message({
          message: '请选择需要转移的样本',
          type: 'warning'
        });
      }else{
         this.$router.push({name:'transfer'})
      }
    },
    //打印位置信息
    printLocation(){
      if(this.multipleSelection.length == 0){
        this.$message({
          message: '请选择需要打印位置信息的样本',
          type: 'warning'
        });
      }else{
         console.log(this.multipleSelection)
      }
    },
    amendSample(){
      if(this.multipleSelection.length == 0){
        this.$message({
          message: '请选择需要修改的样本',
          type: 'warning'
        });
      }else{
         this.$router.push({name: 'changsample'})
      }
    },
    exportExcel(){
      if(this.multipleSelection.length == 0){
        this.$message({
          message: '请选择需要导出的样本',
          type: 'warning'
        });
      }else{
         console.log(this.multipleSelection)
      }
    },
    exportPdf(){
      if(this.multipleSelection.length == 0){
        this.$message({
          message: '请选择需要导出的样本',
          type: 'warning'
        });
      }else{
        console.log(this.multipleSelection)
      }
    }
  },
  computed: {}
}
</script>
<style scoped lang='less'>
.selection-box {
  display: flex;
  justify-content: space-between;

  //   扫描总数...那一排的

  width: 100%;
  margin: 0 auto;
  margin-bottom: 10px;
  white-space: nowrap;
  .sum {
    display: flex;
    // background-color: #333;
    align-items: center;
    .item {
      margin-right: 30px;
    }
  }
  span {
    font-size: 16px;
  }

  span:nth-child(2) {
    padding-left: 0.5em;

    background-color: #fff;
  }

  .right {
    display: flex;

    .item {
      //   background-color: #333;
      margin: 0 10px;
      padding: 0 5px;
      cursor: pointer;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      i {
        font-size: 22px;
        margin-bottom: 1px;
      }
      small {
        font-size: 10px;
      }
    }
  }
}
</style>
