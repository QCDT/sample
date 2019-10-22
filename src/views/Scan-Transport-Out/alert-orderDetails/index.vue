<template>
  <div class="order-datails-box">
    <!-- 转出订单信息的表单 -->
    <orderDatailsTable style="margin-bottom:25px" :detailData="detailData"></orderDatailsTable>
    <fromName>转入样本盒中样本信息</fromName>
    <div class="row">
      <span>共有:</span>
      <span>5</span>
      <span>个样本盒</span>
    </div>
    <!-- 折叠面板 -->
    <collapse></collapse>
    <collapse></collapse>
    <div class="bot-btn">
      <button>保存</button>
      <button @click="$emit('close')">返回</button>
    </div>
  </div>
</template>
<script>
import orderDatailsTable from '@/components/tmp/zhanglan/orderDatailsTable/index'
import fromName from '@/components/tmp/zhanglan/fromName'
import collapse from './collapse'
export default {
  props: {detailData:Object},
  components: { collapse, orderDatailsTable, fromName },
  data () {
    return {
      activeNames: ['1']
    }
  },
  methods: {
    handleChange (val) {
      console.log(val)
    },
    abc () {
      console.log('111111111111111: ', 111111111111111)
    }
  },
  computed: {}
}
</script>
<style scoped lang='less'>
.order-datails-box {
  padding-top: 30px;
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
    &:hover{
      background: #00c9ff;
      color: white;
    }
  }
}
</style>
