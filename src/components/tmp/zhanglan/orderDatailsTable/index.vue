<template>
  <!-- 转出订单信息:订单信息,是个表格,收件人寄件人什么的,没有输入框 -->
  <div>
    <table>
      <tr>
        <th colspan="4" class="title">转出订单信息</th>
      </tr>
      <tr>
        <td colspan="2" width="50%">
          <span>订单号</span>:
        </td>
        <td colspan="2" width="50%">
          <span>订单名称</span>:
        </td>
      </tr>
      <tr>
        <td colspan="2" width="50%">
          <span>收件人</span>:
        </td>
        <td colspan="2" width="50%">
          <span>寄件人</span>:
        </td>
      </tr>
      <tr>
        <td colspan="2" width="50%">
          <span>收件人联系方式</span>:
        </td>
        <td colspan="2" width="50%">
          <span>寄件人联系方式</span>:
        </td>
      </tr>
      <tr>
        <td colspan="2" width="50%">
          <span>收件地址</span>:
        </td>
        <td colspan="2" width="50%">
          <span>发货地址</span>:
        </td>
      </tr>
      <tr>
        <td colspan="4" width="100%" style="height:0px;padding-top:10px;padding-bottom:10px;">
          <h2>备注:</h2>
          <div class="mark">这是备注</div>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  props: {},
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
span {
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
</style>
