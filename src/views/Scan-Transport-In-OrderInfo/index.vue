<template>
  <div class="order-info-index">
    <table>
      <tr>
        <th width="100% " colspan="4">转入订单信息</th>
      </tr>
      <tr>
        <td colspan="2" width="50% ">订 单 号： WGb4bL20180809161215</td>
        <td colspan="2" width="50% ">订 单 名 称： 测试</td>
      </tr>
      <tr>
        <td colspan="2" width="50% ">订 单 号： WGb4bL20180809161215</td>
        <td colspan="2" width="50% ">订 单 名 称： 测试</td>
      </tr>
      <tr>
        <td colspan="2" width="50% ">订 单 号： WGb4bL20180809161215</td>
        <td colspan="2" width="50% ">订 单 名 称： 测试</td>
      </tr>
      <tr>
        <td colspan="2" width="50% ">订 单 号： WGb4bL20180809161215</td>
        <td colspan="2" width="50% ">订 单 名 称： 测试</td>
      </tr>
      <tr>
        <td width="100%" colspan="4">备注</td>
      </tr>
    </table>
    <div class="jin-du-tiao">
      <div class="in">
        <el-steps :active="active" finish-status="success">
          <el-step title="导入订单"></el-step>
          <el-step title="盘点核验"></el-step>
          <el-step title="存入冰箱"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
      </div>
    </div>
    <!-- <el-button style="margin-top: 12px;" @click="next">下一步</el-button> -->
    <fromName>转入样本和中样本信息</fromName>
    <div class="row">
      <span>共有:</span>
      <span>1</span>
      <span>共有个样本盒</span>
    </div>
    <div class="row bot-item">
      <h6>1</h6>
      <h2 @click="toggleBotTable=!toggleBotTable">
        <i class="icon icon-gou"></i>
        <span>样本盒RFID编号：E004015092347BfCB</span>
      </h2>
      <h1>样本盒名称：PK采血管样本盒1</h1>
      <h1>样本盒位置：储存箱-115-1-1-1</h1>
      <h1>正常样本</h1>
      <router-link :to="{name:'check'}">开始盘点</router-link>
    </div>

    <el-collapse-transition>
      <botTable v-show="toggleBotTable"></botTable>
    </el-collapse-transition>
    <div class="bot-btn">
      <tmpButton @click="$router.go(-1)">返回</tmpButton>
      <tmpButton @click="$router.go(-1)">保存</tmpButton>
    </div>
  </div>
</template>
<script>
import fromName from '@/components/tmp/zhanglan/fromName'
import goBack from '@/components/tmp/zhanglan/go-1'
import botTable from './table'
import tmpButton from '@/components/tmp/zhanglan/tmpButton'
export default {
  props: {},
  components: { fromName, botTable, goBack, tmpButton },
  data () {
    return {
      active: 2,
      toggleBotTable: false
    }
  },
  methods: {
    next () {
      if (this.active++ > 3) this.active = 0
    }
  },
  computed: {}
}
</script>
<style scoped lang='less'>
.order-info-index {
  padding: 0 20px;
  //   background-color: #f0f0f0;
}
table {
  width: 100%;
  border: 1px solid #333;
  border-collapse: collapse;
  background-color: #f0f0f0;
}
th,
td {
  border: 1px solid #333;
  height: 35px;
  padding: 0 20px;
}
.jin-du-tiao {
  width: 100%;
  height: 4.375rem;
  border: 1px solid #cccccc;
  margin: 1rem auto;
  background-color: #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 0 8px;
  .in {
    width: 50%;
  }
}
.in /deep/ .el-step__head.is-success {
  display: flex;
  align-items: center;
}
.in /deep/ .el-step__head.is-process {
  display: flex;
  align-items: center;
}
.in /deep/ .el-step__head.is-wait {
  display: flex;
  align-items: center;
}

a {
  color: #333;
}

.bot-item {
  display: flex;
  justify-content: space-between;
  padding: 0 20px 0 0;
  background-color: #fff;
  height: 40px;
  align-items: center;
  white-space: nowrap;
  background-color: #f0f0f0;
  h6 {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background-color: #e3863b;
  }
  h1 {
    font-weight: 500;
    font-size: 15px;
  }
  h2 {
    //   background-color: #999;
    cursor: pointer;
    font-weight: 500;
    font-size: 15px;
    background-color: #fff;
    padding: 3px 5px;
    .icon {
      background-color: #1aad19;
      border-radius: 50%;
      // font-size: 13px;
      margin: 0 5px;
      color: #fff;
    }
  }
}
.bot-btn{
    padding-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    &/deep/button{
margin: 0 30px;
    }
}
</style>
