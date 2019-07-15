<template>
  <!-- 添加患者信息 -->
  <div class>
    <chunk @close="$emit('close')">
      <span slot="title">修改腕带信息</span>
      <span slot="content">
        <h1>修改腕带信息</h1>
      </span>
    </chunk>
  </div>
</template>
<script>
import tmpButton from '@/components/tmp/zhanglan/tmpButton'
import chunk from '@/views/Scan-BloodCollection-CreateSingle/createSingle-1/tmp-chunk'
export default {
  props: {},
  components: { tmpButton, chunk },
  data () {
    return {
      input: '',
      showPrint: false
    }
  },
  methods: {},
  computed: {}
}
</script>
<style scoped lang='less'>
</style>
