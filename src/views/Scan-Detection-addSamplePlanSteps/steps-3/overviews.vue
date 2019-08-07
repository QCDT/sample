<template>
  <!-- 一键总览 -->
  <div class="over-views-box">
    <div class="title">
      样品分析序列/Sample Analysis Sequence
      <i class="el-icon-close" @click="$emit('close')"></i>
    </div>
    <div class="one-chunk">
      <table>
        <tr>
          <td style="width:10%">
            <div>分析批名称</div>
            <div>Batch Name</div>
          </td>
          <td style="width:60%">211</td>
          <td style="width:14%">
            <div>LC-MS-MS编号</div>
            <div>LC-MS-MS ID</div>
          </td>
          <td style="width:16%">1234</td>
        </tr>
      </table>
    </div>
    <div class="row-center">
      <small>样品分析序列/Sample Analysis Sequence</small>
    </div>
    <div class="two-chunk">
      <htTable :model="model" :row="row" :col="col"></htTable>
    </div>
  </div>
</template>
<script>
import htTable from '@/views/Scan-Detection/table'
export default {
  props: {},
  components: { htTable },
  data () {
    return {
      model: 2 /* 1,2,3 */,
      row: 12 /* max:12,min:1 */,
      col: 12 /* max:12,min:1 */
    }
  },
  methods: {},
  computed: {}
}
</script>
<style scoped lang='less'>
.over-views-box {
  position: absolute;
  top: 50%;
  left: 50%;

  width: 80%;
  height: 67vh;
  margin-top: -40vh;
  margin-left: -40%;
  padding: 20px;

  background-color: #fff;
}

.title {
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 10px;

  font-size: 20px;

  .el-icon-close {
    position: absolute;
    right: 0;

    cursor: pointer;
    transition: color 0.2s;

    &:hover {
      color: #f42;
    }
  }
}

.one-chunk {
  //   margin-bottom: 5px;
  table {
    width: 100%;

    border-collapse: collapse;
  }

  table,
  td {
    border: 2px solid #111;
  }

  td {
    text-align: center;
  }
}

.row-center {
  padding: 4px 0;

  font-size: 14px;
}
</style>
