<template>
  <div class="order-datails-box">
    <!-- 转出订单信息的表单 -->
    <div class="orderInfo">
      <table>
          <tr>
            <th colspan="4" class="title">转出订单信息</th>
          </tr>
          <tr>
            <td colspan="2" width="50%">
              <span class="info-title">订单号:</span>
              <span class="detail">{{detailInfo.order}}</span> 
            </td>
            <td colspan="2" width="50%">
              <span class="info-title">订单名称:</span>
              <span class="detail">{{detailInfo.orderName}}</span>
            </td>
          </tr>
          <tr>
            <td colspan="2" width="50%">
              <span class="info-title">收件人:</span>
              <span class="detail">{{detailInfo.recipients}}</span>
            </td>
            <td colspan="2" width="50%">
              <span class="info-title">寄件人:</span>
              <span class="detail">{{detailInfo.sender}}</span>
            </td>
          </tr>
          <tr>
            <td colspan="2" width="50%">
              <span class="info-title">收件人联系方式:</span> 
              <span class="detail">{{detailInfo.contactWay}}</span>
            </td>
            <td colspan="2" width="50%">
              <span class="info-title">寄件人联系方式:</span>
              <span class="detail">{{detailInfo.sendercontactWay}}</span>
            </td>
          </tr>
          <tr>
            <td colspan="2" width="50%">
              <span class="info-title">收件地址:</span>
              <span class="detail">{{detailInfo.site}}</span>
            </td>
            <td colspan="2" width="50%">
              <span class="info-title">发货地址:</span>
              <span class="detail">{{detailInfo.sendersite}}</span>
            </td>
          </tr>
          <tr>
            <td colspan="4" width="100%" style="height:0px;padding-top:10px;padding-bottom:10px;">
              <h2 class="info-title">备注:</h2>
              <span class="detail">{{detailInfo.remarks}}</span>
            </td>
          </tr>
      </table>
    </div>
    <fromName>转入样本盒中样本信息</fromName>
    <div class="row">
      <span>共有:</span>
      <span>{{sampleBoxArr.length}}</span>
      <span>个样本盒</span>
    </div>
    <div class="collapseWrap" v-for="(item,index) in sampleBoxArr" :key="index">
        <div class="collapse" :class="{activeColor: item.showSample}">
          <div class="index">{{index+1}}</div>
          <div class="pointer" @click="showSampleInfo(index)" style="width:25%">样本盒RFID编号：{{item.Rfid}}</div>
          <div style="width:26%">样本盒名称：{{item.sampleBoxName}}</div>
          <div style="width:29%">样本盒位置：{{item.location}}</div>
          <div style="width:10%">正常样本</div>
          <div class="end">
              <!-- <router-link :to="{name:'check'}" style="color:#333"> -->
                <h1 class="pointer">{{item.transportStatus}}</h1>
              <!-- </router-link> -->
          </div>
        </div>
        <el-collapse-transition>
          <div v-show="item.showSample" class="sampleInfo" >
            <table>
              <tr>
                <th class="index"></th>
                <th>样本RFID编号</th>
                <th>样本盒名称</th>
                <th>样本来源</th>
                <th>样本类别</th>
                <th>采样日期</th>
                <th>原位置</th>
                <th>现位置</th>
              </tr>
              <tr v-for="(item,index) in item.sampleInfo" :key="index">
                <td class="index">{{index+1}}</td>
                <td>{{item.Rfid}}</td>
                <td>{{item.name}}</td>
                <td>{{item.sampleSource}}</td>
                <td>{{item.sampleCategory}}</td>
                <td>{{item.samplingDate}}</td>
                <td>{{item.position}}</td>
                <td>{{item.newLocation}}</td>
              </tr>
            </table>
          </div>
        </el-collapse-transition>
    </div>
    <div class="bot-btn">
      <button>保存</button>
      <button @click="$emit('close')">返回</button>
    </div>
  </div>
</template>
<script>
import fromName from '@/components/tmp/zhanglan/fromName'
export default {
  props: {detailData:Number},
  components: {fromName },
  data () {
    return {
      // showSample:false,
      detailInfo:{
        order:'',
        orderName:'',
        recipients:'',
        sender:'',
        contactWay:'',
        sendercontactWay:'',
        site:'',
        sendersite:'',
        remarks:''
      },
      sampleBoxArr:[]
    }
  },
  created(){
    this.$axios({
      method:'post',
      url:'/sampleGuide/transBox/findTransportSampleBoxBytransportOrderId',
      data:({
        transportOrderId: this.detailData
      })
    })
    .then(({data})=>{
      console.log(data)
      this.detailInfo.order = data.data.transportOrderEntity.orderNumber
      this.detailInfo.orderName = data.data.transportOrderEntity.orderName
      this.detailInfo.recipients = data.data.transportOrderEntity.recipients
      this.detailInfo.sender = data.data.transportOrderEntity.sender
      this.detailInfo.contactWay = data.data.transportOrderEntity.recipientsTel
      this.detailInfo.sendercontactWay = data.data.transportOrderEntity.senderTel
      this.detailInfo.site = data.data.transportOrderEntity.recipientsProvince+data.data.transportOrderEntity.recipientsCity+data.data.transportOrderEntity.recipientsAddress
      this.detailInfo.sendersite =data.data.transportOrderEntity.senderProvince+data.data.transportOrderEntity.senderCity+data.data.transportOrderEntity.senderAddress
      this.detailInfo.remarks = data.data.transportOrderEntity.remarks
      data.data.transportRfidSampleBoxList.forEach((item)=>{
        this.sampleBoxArr.push({
          id: item.id,
          Rfid: item.rfidCode,
          sampleBoxName:item.name,
          location:item.position,
          showSample: false,
          transportStatus: item.transportStatus==0?'未盘点':item.transportStatus==1?"已盘点":'已转出',
          sampleInfo:[],
        })
      })
    })
  },
  methods: {
    handleChange (val) {
      console.log(val)
    },
    showSampleInfo(index){
      if(this.sampleBoxArr[index].showSample == false){
        this.$axios({
          method:'post',
          url:'/sampleGuide/transSample/selectTransportSampleInfo',
          data:({
            transportRfidSampleBoxId:this.sampleBoxArr[index].id
          })
        })
        .then(({data})=>{
          console.log(data)
          data.data.forEach((item)=>{
            this.sampleBoxArr[index].sampleInfo.push({
              id: item.id,
              Rfid: item.rfidCode,
              name: item.name,
              sampleSource: item.sampleSource,
              sampleCategory: item.sampleCategory,
              samplingDate:item.samplingDate,
              position:item.position,
              newLocation: item.newLocation,
            })
          })
        })
      }
      this.sampleBoxArr[index].showSample = !this.sampleBoxArr[index].showSample
      // this.showSample = !this.showSample
    }
  },
  computed: {}
}
</script>
<style scoped lang='less'>
.order-datails-box {
  padding-top: 30px;
}
.row{
  margin-bottom: 10px;
}
.orderInfo{
  margin-bottom: 20px;
  table {
    white-space: nowrap;
    width: 100%;
    border-collapse: collapse;
    background-color: #fff;
  }
  table,
  td {
    border: 1px solid #333;
  }
  td {
    height: 40px;
    padding: 0 40px;
  }
  .title {
    height: 40px;
    font-weight: 900;
    font-size: 19px;
  }
  .info-title {
    display: inline-block;
    min-width: 6rem;
    text-align-last: justify;
  }
  .mark {
    margin-top: 2px;
    padding: 10px;
    border-radius: 10px;
    font-family: "Courier New", Courier, monospace;
  }
  .detail {
    padding-left: 15px;
  }
}
.collapse {
  display: flex;
  background-color: #fff;
  height: 30px;
  font-size: 20px;
  align-items: center;
  justify-content: space-between;
  .index {
    display: flex;
    width: 30px;
    height: 100%;
    align-items: center;
    justify-content: center;
    background-color: #e3863b;
    color: #fff;
    font-weight: 900;
    font-size: 15px;
    margin-right: 20px;
  }
  .end {
    padding-right: 20px;
  }
}
.collapseWrap{
  .index {
    width: 30px;
    line-height: 30px;
    text-align: center;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  table,
  th,
  td {
    height: 30px;
    border: 1px solid #f1f1f1;
    background: #fff;
  }
  td {
    text-align: center;
  }
  .activeColor{
    background-color: #e3863b;
  }
  .pointer {
    cursor: pointer;
    &:hover {
      color: #424242;
    }
  }
}
.bot-btn{
  text-align: center;
  margin-top: 30px;
  button{
    width: 80px;
    height: 25px;
    border: 1px solid #00c9ff;
    border-radius: 5px;
    margin-right: 15px;
    background: #fff;
    color: #00c9ff;
    &:hover{
      background: #00c9ff;
      color: white;
    }
  }
}
</style>
