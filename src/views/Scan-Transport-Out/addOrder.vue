<template>
  <!-- 添加订单的表单页面 -->
  <div class="add-order-tmp">
    <div class="in">
      <addOrder style="background:#fff" title="添加转出订单" @confirm="confirm"></addOrder>
      <sampleBox v-show="showAddSampleBox"></sampleBox>
      <div class="btn"><button @click="$router.go(-1)">返回</button></div>
    </div>
  </div>
</template>
<script>
import addOrder from '../Scan-Transport-Out-Change/transferOrder'
import sampleBox from './sampleBox'
export default {
  props: {},
  components: { addOrder, sampleBox },
  data () {
    return {
      showAddSampleBox:false,
    }
  },
  methods: {
    confirm () {
      this.showAddSampleBox = true
      // console.log('11: ', '确认')
    },
  },
  computed: {}
}
</script>
<style scoped lang='less'>
.add-order-tmp {
  width: 100%;
  background-color: #eee;
  margin-top:20px;
  height: 90%;
}
.in {
  padding: 10px;
}
.btn{
  text-align: center;
  button{
    width: 100px;
    height: 25px;
    color: #00c9ff;
    background: transparent;
    border: 1px solid #00c9ff;
    border-radius: 5px;
    &:hover{
      background: #00c9ff;
      color: white;
    }
  }
}
</style>
