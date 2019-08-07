<template>
  <div>
    <div class="collapse">
      <div class="index">{{`1`}}</div>
      <div class="codeing pointer" @click="test=!test">样本盒RFID编号：{{`Fb7iNJ20180820193851`}}</div>
      <div class="name">样本盒名称：{{`YS冻存管(备份)样本盒`}}</div>
      <div class="location">样本盒位置：{{`PK检测冰箱1-1-1`}}</div>
      <div class="end">
        <div class="status">正常样本</div>
        <div class="caozuo">
          <router-link :to="{name:'check'}" style="color:#333">
            <h1 class="pointer">开始盘点</h1>
          </router-link>
        </div>
      </div>
    </div>
    <el-collapse-transition>
      <div v-show="test">
        <table>
          <tr>
            <th class="index"></th>
            <th>样本RFID编号</th>
            <th>样本盒名称</th>
            <th>样本来源</th>
            <th>样本类别</th>
            <th>采样日期</th>
            <th>原位置</th>
            <th>现位置</th>
          </tr>
          <tr>
            <td class="index">1</td>
            <td>E00401509347E7A2</td>
            <td>测试1</td>
            <td></td>
            <td>全血</td>
            <td>2018-9-20</td>
            <td>PK检测冰箱1-1-1</td>
            <td>PK检测冰箱2-1-1</td>
          </tr>
        </table>
      </div>
    </el-collapse-transition>
  </div>
</template>
<script>
export default {
  props: {},
  components: {},
  data () {
    return {
      test: false
    }
  },
  methods: {},
  computed: {}
}
</script>
<style scoped lang='less'>
.index {
  width: 38px;
  line-height: 38px;
  text-align: center;
}
table {
  width: 100%;
  border-collapse: collapse;
}
table,
th,
td {
  height: 38px;
  border: 1px solid #333;
}
td {
  text-align: center;
}
/* */
.collapse {
  display: flex;
  background-color: #fff;
  height: 40px;
  font-size: 20px;
  align-items: center;
  justify-content: space-between;
  .index {
    display: flex;
    width: 40px;
    height: 40px;
    align-items: center;
    justify-content: center;
    background-color: #e3863b;
    color: #fff;
    font-weight: 900;
    font-size: 15px;
  }
  .codeing,
  .name,
  .location {
    width: 25%;
    display: flex;
    align-items: center;
    text-indent: 3rem;
  }
  .end {
    width: 20%;
    display: flex;
    align-items: center;
    text-indent: 3rem;
  }
}
.pointer {
  cursor: pointer;
  &:hover {
    color: #424242;
  }
}
</style>
