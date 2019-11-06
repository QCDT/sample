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
              <span class="info-title">订单号</span>:
              <span class="detail">{{detailInfo.order}}</span> 
            </td>
            <td colspan="2" width="50%">
              <span class="info-title">订单名称</span>:
              <span class="detail">{{detailInfo.orderName}}</span>
            </td>
          </tr>
          <tr>
            <td colspan="2" width="50%">
              <span class="info-title">收件人</span>:
              <span class="detail">{{detailInfo.recipients}}</span>
            </td>
            <td colspan="2" width="50%">
              <span class="info-title">寄件人</span>:
              <span class="detail">{{detailInfo.sender}}</span>
            </td>
          </tr>
          <tr>
            <td colspan="2" width="50%">
              <span class="info-title">收件人联系方式</span>: 
              <span class="detail">{{detailInfo.contactWay}}</span>
            </td>
            <td colspan="2" width="50%">
              <span class="info-title">寄件人联系方式</span>:
              <span class="detail">{{detailInfo.sendercontactWay}}</span>
            </td>
          </tr>
          <tr>
            <td colspan="2" width="50%">
              <span class="info-title">收件地址</span>:
              <span class="detail">{{detailInfo.site}}</span>
            </td>
            <td colspan="2" width="50%">
              <span class="info-title">发货地址</span>:
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
      <span>5</span>
      <span>个样本盒</span>
    </div>
    <!-- 折叠面板
    <collapse></collapse>
    <collapse></collapse> -->
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
      }
    }
  },
  methods: {
    handleChange (val) {
      console.log(val)
    }
  },
  computed: {}
}
</script>
<style scoped lang='less'>
.order-datails-box {
  padding-top: 30px;
}
.orderInfo{
  margin-bottom: 15px;
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
    &:hover{
      background: #00c9ff;
      color: white;
    }
  }
}
</style>
