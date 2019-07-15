<template>
  <div>
    <expExcel :test="`测试数据123`">
      <!-- <el-button type="primary" size="small">导出EXCEL</el-button> -->
    </expExcel>
  </div>
</template>
<script>
import XLSX from 'xlsx'
import impExcel from '@/components/tmp/zhanglan/impExcel'
import expExcel from '@/components/tmp/zhanglan/expExcel'
export default {
  props: {},
  components: { impExcel, expExcel },
  data () {
    return {}
  },
  methods: {
    res111 (v) {
      console.log('v: ', v)
    }
  },
  computed: {}
}
</script>
<style scoped lang='less'>
</style>
