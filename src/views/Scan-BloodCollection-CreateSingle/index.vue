<template>
  <!-- 创建单人核验 -->
  <div class="create-single-index">
    <div class="steps-box">
      <steps :active="active" :stepsData="stepsData"></steps>
    </div>
    <!-- 
    <router-link :to="{name:'createSingle-1'}" style="color:#333">111111</router-link>
    <router-link :to="{name:'createSingle-2'}" style="color:#333">2222</router-link>
    <router-link :to="{name:'createSingle-3'}" style="color:#333">33333333</router-link>
    -->
    <router-view @getMessage="showMsg"></router-view>
  </div>
</template>
<script>
import steps from "@/components/tmp/zhanglan/steps";
export default {
  props: {},
  components: { steps },
  data() {
    return {
      active: 1,
      stepsData: [
        { text: "患者信息" },
        { text: "选择样本" },
        { text: "患者核验" },
        { text: "完成" }
      ]
    };
  },
  methods: {
    showMsg(v) {
      this.active = v;
    }
  },
  computed: {}
};
</script>
<style scoped lang='less'>
.create-single-index {
  padding: 20px;
}
.steps-box {
  background-color: #eee;
}
</style>
