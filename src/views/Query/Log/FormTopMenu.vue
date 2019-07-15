<template>
  <div>
    <h1 class="title">{{title}}</h1>
    <div class="info">
      <div class="sum">
        <span>扫描总数:</span>
        <span>{{count}}</span>
      </div>
      <div class="right">
        <div class="item">
          <i class="icon icon-pdf" style="color:#A33639"></i>
        </div>
        <div class="item">
          <download-excel
            class="export-excel-wrapper"
            :data="multipleSelection"
            :fields="json_fields"
            name="Excle名称.xls"
          >
            <div @click="isEmpty">
              <i class="icon icon-excel" style="color:#217346"></i>
            </div>
          </download-excel>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    count: Number,
    multipleSelection: { type: Array, default: () => [] }
  },
  components: {},
  data () {
    return {
      //   ↓  导出
      /**
       * json_fields: key:表头 val:行数据[值];[常规字段 | 支持嵌套(obj) | 支持回调 ]
       * json_data:将要导出的表格数据
       */
      json_fields: {
        序号: 'coding',
        RFID编码: 'RFID',
        操作: 'ope',
        操作人: 'opePerson',
        操作时间: 'opeTime',
        '去走人/归还人': 'person',
        预期归还日期: 'expTime',
        样本位置: 'location',
        借出归还备注: 'loanMark',
        预期归还备注: 'expMark'

        // 性别: "sex",
        // 电话: { field: "phone.mobile", callback: value => `${value}` }
      },
      json_data: [
        { name: '张三', sex: '男', phone: { mobile: '13333333333' } },
        { name: '张四', sex: '男', phone: { mobile: '15555555555' } }
      ],
      json_meta: [[{ ' key ': ' charset ', ' value ': ' utf- 8 ' }]]
      //   ↑  导出
    }
  },
  methods: {
    isEmpty () {
      console.log('999123: ')
      this.multipleSelection.length == 0
        ? this.$message('请选择要导出的数据')
        : 0
    }
  },
  computed: {}
}
</script>
<style scoped lang='less'>
.title {
  height: 1.5rem;
  margin-top: 2.3125rem;
  margin-bottom: 0.8125rem;

  text-align: center;

  color: rgba(89, 89, 89, 1);

  font-family: SimHei;
  font-size: 1.5rem;
  font-weight: 400;
}
.info {
  display: flex;
  justify-content: space-between;
  .right {
    display: flex;
    i {
      font-size: 25px;
      padding: 0 3px;
      margin-right: 15px;
      margin-bottom: 5px;
    }
  }
}
</style>
