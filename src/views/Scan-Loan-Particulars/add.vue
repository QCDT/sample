<template>
  <!-- 扫描样本盒添加 -->
  <div class="add-box">
    <cardfile></cardfile>
    <div class="content">
        <div class='title'>
          <h1>样本借出</h1>
          <i class="el-icon-close" @click="$emit('close')"></i>
        </div>
        <div class="contentA" v-show="scanStatus">
          <div class="pic">
            <img src="@/assets/img/saomiao.gif" @click="scanSampleBox">
          </div>
          <el-button type="primary" size='small' @click="$emit('close')">返回</el-button>
        </div>
        <div class="contentB" v-show='!scanStatus'>
            <div class="top">
              <div class="left">
                <p><span class="leftItem">样本盒信息</span></p>
                <p><span class="leftItem">样本盒名称:</span><span>AAA</span></p>
                <p><span class="leftItem">样本盒位置:</span><span>AAA</span></p>
                <p><span class="leftItem">可借出样本数:</span><span>AAA</span></p>
              </div>
              <div class="right">
                  <table class="table">
                    <tr v-for="(item,index) in 10" :key="index">
                      <td v-for="(item,ind) in 10" :key="ind">{{ind}}</td>
                    </tr>
                  </table>
                  <div class="map">
                    <span
                      v-for="(item,index) in mapData"
                      :key="index"
                      :style="{ backgroundColor: item.bgc}"
                      v-text="item.text"
                    />
                  </div>
              </div>
            </div>
            <div class="bottom">
                <el-button type="primary" size='small' @click="addSample">全部添加</el-button>
                <el-button type="primary" size='small' @click="$emit('close')">返回</el-button>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import cardfile from "@/components/cardfile";
export default {
  props: {},
  components: {
    cardfile
  },
  data () {
    return {
      scanStatus:true,
      mapData: [
        { text: '已使用', bgc: '#7D7C7F' },
        { text: '借用', bgc: '#FCFD01' },
        { text: '未使用', bgc: '#EDF1F3' }
      ],
    testData:[
      {position:'name-10-2',x:0,y:9,is_used:1},{position:'name-1-2',is_used:2},{position:'name-1-2',is_used:3}],
      
      testData2:[[0,0],[0,1]],
      testData3:[81]
    
  }},
  methods: {
    scanSampleBox(){
      
      /* this.$axios({
        method:'post',
        url:'sampleGuide/scan/addInBoxSamplesToLoanOrder',
        data:({
          //loanOrderId:,// 借出表单ID
         // rfidCodeList:,//借出样本的RFID
        })
     }) */
      this.scanStatus = false
    },
    addSample(){
      this.$emit('close')
      // this.scanStatus = false
    }
  },
  computed: {}
}
</script>
<style scoped lang='less'>
.add-box {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
.content{
  width: 65%;
  margin: 0 auto;
  background-color: #fff;
  .title {
    display: flex;
    justify-content: center;
    position: relative;
    height: 32px;
    align-items: center;
    color: #fff;
    background-color: #3cd7ff;
    .el-icon-close {
      position: absolute;
      right: 10px;
      top: 6px;
      color: black;
      font-size: 18px;
      font-weight: 600;
      cursor: pointer;
    }
  }
  .contentA{
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding : 50px 50px 130px;
      .pic{
          margin-bottom: 50px;
          cursor: pointer;
      }
      button{
        width:100px;
        border: 1px solid #00c9ff;
        background: #00c9ff;
      }
  }
  .contentB{
    padding: 50px 50px 70px;
    .top{
      display: flex;
      justify-content: center;
      .left{
        width: 40%;
        p{
          margin-bottom: 20px;
          .leftItem{
            font-weight: 600;
            margin-right: 10px;
          }
        }
      }
      .right{
        display: flex;
        justify-content: center;
        align-items: center;
        .map {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 60px;
          height: 90px;
          cursor: pointer;
          white-space: nowrap;
          font-size: 14px;
          margin-left: 15px;
          span {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2px 3px;
            color: #333;
            border-radius: 3px;
            font-size: 14px;
          }
        }
        .table {
          border-spacing: 0;
          border: 2px solid #ccc;
          border-collapse: collapse;
          td {
            width: 20px;
            height: 20px;
            border: 1px solid #ccc;
            text-align: center;
            font-size: 12px;
          }
        }
      }
    }
    .bottom{
      text-align: center;
      margin-top: 50px;
      button{
        width: 100px;
        background: #00c9ff;
        border: 1px solid #00c9ff;
      }
    }
  }

}
</style>
