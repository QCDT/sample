<template>
  <div class="tbody-wrap">
    <h1 class="sample-boxTit">系统保存的样本盒信息</h1>
    <div class="row-top">
      <div class="item">
        <b style="background:gray"></b>
        <span>已使用</span>
      </div>
      <div class="item">
        <b style="border:1px solid gray"></b>
        <span>未使用</span>
      </div>
    </div>
    <table class="table" :style="{borderColor:borderColor,borderWidth:borderWidth}">
      <tr class="row" v-for="(row,index) in matrixData" :key="index">
        <td
          v-for="(item,ind) in row"
          :key="ind"
          :style="{backgroundColor:item.bgc,borderColor:borderColor,width:width,height:height}"
        >{{ind+1}}</td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  props: {
    width: String /* td宽 */,
    height: String /* td高 */,
    borderColor: { type: String, default: '#3cd7ff' } /* 框框颜色 */,
    borderWidth: { type: String, default: '2px' } /* table的宽度 */,
    matrixData: {
      type: Array,
      default: () => [[{ bgc: '#fff' }, { bgc: '#fff' }]]
    }
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
.sample-boxTit {
  display: flex;
  align-items: center;
  justify-content: center;

  height: 40px;

  font-size: 18px;
  font-weight: 500;
}

.row-top {
  display: flex;
  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 10px;

  .item {
    display: flex;
    align-items: center;

    margin: 0 12px;

    b {
      display: inline-block;

      width: 20px;
      height: 20px;
      margin: 0 7px;
    }
  }
}
table {
  border-spacing: 0;

  border: 2px solid #43ccfe;

  border-collapse: collapse;
}

td {
  border: 1px solid #43ccfe;
}

td {
  padding: 0.155rem 0.405rem;

  text-align: center;

  font-size: 0.655rem;
  font-size: 11px;
}
</style>
