<template>
  <!-- 添加样品计划 -->
  <div class="add-sample-plan-steps-index">
    <div class="step-box">
      <steps :active="active" :stepsData="stepsData"></steps>
    </div>
    <router-view @setStepsActive="setStepsActive"></router-view>
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
        { text: '创建订单' },
        { text: '添加样本' },
        { text: '样本核验' },
        { text: '完成' }
      ]
    }
  },
  methods: {
    setStepsActive (v) {
      this.active = v
    }
  },
  computed: {}
}
</script>
<style scoped lang='less'>
.add-sample-plan-steps-index {
  padding: 0 20px;
}
.step-box{
    background-color: #eee;
}
</style>
