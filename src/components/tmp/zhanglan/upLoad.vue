<template>
  <div class="upload-tmp">
    <span>导入文件</span>
  </div>
</template>
<script>
import tmpButton from '@/components/tmp/zhanglan/tmpButton'
export default {
  props: {},
  components: { tmpButton },
  data () {
    return {}
  },
  methods: {},
  computed: {}
}
</script>
<style scoped lang='less'>
.upload-tmp {
  width: 400px;
  padding: 15px;
  margin-bottom: 20px;
  font-size: 12px;

  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}

</style>
