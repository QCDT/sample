<template>
  <!-- 转出订单信息:订单信息,是个表格,收件人寄件人什么的,没有输入框 -->
  <div>
    <table>
      <tr>
        <th colspan="4" class="title">转出订单信息</th>
      </tr>
      <tr>
        <td colspan="2" width="50%">
          <span class="info-title">订单号</span>:
          <span class="detail">{{detailData.order}}</span> 
        </td>
        <td colspan="2" width="50%">
          <span class="info-title">订单名称</span>:
          <span class="detail">{{detailData.orderName}}</span>
        </td>
      </tr>
      <tr>
        <td colspan="2" width="50%">
          <span class="info-title">收件人</span>:
          <span class="detail">{{detailData.recipients}}</span>
        </td>
        <td colspan="2" width="50%">
          <span class="info-title">寄件人</span>:
          <span class="detail">{{detailData.sender}}</span>
        </td>
      </tr>
      <tr>
        <td colspan="2" width="50%">
          <span class="info-title">收件人联系方式</span>: 
          <span class="detail">{{detailData.contactWay}}</span>
        </td>
        <td colspan="2" width="50%">
          <span class="info-title">寄件人联系方式</span>:
          <span class="detail">{{detailData.sendercontactWay}}</span>
        </td>
      </tr>
      <tr>
        <td colspan="2" width="50%">
          <span class="info-title">收件地址</span>:
          <span class="detail">{{detailData.site}}</span>
        </td>
        <td colspan="2" width="50%">
          <span class="info-title">发货地址</span>:
          <span class="detail">{{detailData.sendersite}}</span>
        </td>
      </tr>
      <tr>
        <td colspan="4" width="100%" style="height:0px;padding-top:10px;padding-bottom:10px;">
          <h2 class="info-title">备注:</h2>
          <span class="detail">{{detailData.remarks}}</span>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  props: {detailData:Object},
  components: {},
  data () {
    return {}
  },
  methods: {},
  computed: {}
}
</script>
<style scoped lang='less'>
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
</style>
