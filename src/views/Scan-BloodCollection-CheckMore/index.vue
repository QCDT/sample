<template>
  <!-- 多人核验 -->
  <div class="check-single-index">
    <div class="steps-box">
      <steps :active="active" :stepsData="stepsData"></steps>
    </div>

    <router-view @getMessage="showMsg"></router-view>
  </div>
</template>
<script>
import steps from '@/components/tmp/zhanglan/steps'

export default {
  props: {},
  components: { steps },
  data () {
    return {
      active: 0,
      stepsData: [
        { text: '订单信息' },
        { text: '选择样本' },
        { text: '患者核验' },
        { text: '完成' }
      ]
    }
  },
  methods: {
    showMsg (val) {
      // methods方法  val即为子组件传过来的值
      console.log(val)
      this.active = val
    }
  },
  computed: {}
}
</script>
<style scoped lang='less'>
.check-single-index {
  padding: 20px;

}

.steps-box {
  background-color: #eee;
}
</style>
