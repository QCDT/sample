<template>
  <div class="tmp-progress-el">
    <el-progress :text-inside="true" :stroke-width="strokeWidth" :percentage="percentage"></el-progress>
  </div>
</template>
<script>
export default {
  props: {
    strokeWidth: { type: String, default: 12 },
    percentage: { type: String, default: 12 }
  },
  components: {},
  data () {
    return {}
  },
  methods: {},
  computed: {}
}
</script>
<style scoped lang='less'>
.tmp-progress-el {
  &/deep/.el-progress-bar__inner {
    display: flex;
    justify-content: flex-end;
    // align-items: center;
  }
}
</style>
