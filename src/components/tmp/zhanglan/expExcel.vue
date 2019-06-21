<template>
  <!-- ↓    导出 -->
  <div>
    <download-excel
      class="export-excel-wrapper"
      :data="json_data"
      :fields="json_fields"
      name="Excle名称.xls"
    >
      <slot>导出</slot>
    </download-excel>
    <!-- ↑ -->
  </div>
</template>
<script>
export default {
  props: {},
  components: {},
  data () {
    return {
      //   ↓  导出
      /**
       * json_fields: key:表头 val:行数据[值];[常规字段 | 支持嵌套(obj) | 支持回调 ]
       * json_data:将要导出的表格数据
       */
      json_fields: {
        姓名: 'name',
        性别: 'sex',
        电话: { field: 'phone.mobile', callback: value => `${value}` }
      },
      json_data: [
        { name: '张三', sex: '男', phone: { mobile: '13333333333' } },
        { name: '张四', sex: '男', phone: { mobile: '15555555555' } }
      ],
      json_meta: [[{ ' key ': ' charset ', ' value ': ' utf- 8 ' }]]
      //   ↑  导出
    }
  },
  methods: {},
  computed: {},
  created () {

  }
}
</script>
<style scoped lang='scss'>
</style>
