<template>
  <!-- 转入主页 -->
  <div class="transport-in-index">
    <fromName>转出订单查询</fromName>
    <addAndSearch type="in"></addAndSearch>
    <div class="count">
      <span>共有:</span>
      <span>{{tableData.length}}</span>
      <span style="margin:0 0.3em">条数据</span>
    </div>
    <el-table :row-style="{height:'32px',textAlign: 'center',padding:'0px',}" :cell-style="{padding:'0px',textAlign: 'center'}" border  ref="multipleTable" :data="tableData" tooltip-effect="dark" :style="{width: '100%',margin:'0 auto',}" > 
      <el-table-column type="index" label="序号" width="70"></el-table-column>
      <el-table-column prop="orderId" label="订单号" width="120"></el-table-column> 
      <el-table-column label="订单名称" width="200" show-overflow-tooltip>
        <template slot-scope="scope">
           <span class="OrderName" @click="showOrderInfo(scope.row,scope.$index)">{{tableData[scope.$index].orderName}}</span>
        </template>
      </el-table-column> 
      <el-table-column prop="address" label="收件人" show-overflow-tooltip></el-table-column> 
      <el-table-column prop="consigneeAddress" label="收件地址" show-overflow-tooltip></el-table-column> 
      <el-table-column prop="contactWay" label="联系方式" show-overflow-tooltip></el-table-column> 
      <el-table-column prop="entryClerk" label="录入人" show-overflow-tooltip></el-table-column> 
      <el-table-column prop="status" label="冰箱状态" show-overflow-tooltip></el-table-column> 
      <el-table-column fixed="right" label="操作" width="100"> 
        <template slot-scope="scope"> 
          <el-button @click="handleClick(scope.row,scope.$index)" type="text" size="small">123</el-button> 
        </template> 
      </el-table-column> 
    </el-table>
  </div>
</template>
<script>
import addAndSearch from '../Scan-Transport-Out/addAndSearch'
import fromName from '@/components/tmp/zhanglan/fromName'
export default {
  props: {},
  components: { addAndSearch, fromName },
  data () {
    return {
      tableData: [
        {
          orderId: 'V2e0kN2156', // 订单号
          orderName: 'CSPA-CSPCHA115-2018-HPK转运订单二剂量', // 订单名称
          address: '惠通医疗', // 收件人
          consigneeAddress: '北京市丰台区万丰路华信大厦综合楼7058室', // 收件地址
          contactWay: '010-68683182', // 联系方式
          entryClerk: 'admin', // 录入人
          status: '已存入' // 冰箱状态
        }
      ],
      multipleSelection: []
    }
  },
  methods: {
    handleClick (row, index) {
      console.log(row, index)
    },
    showOrderInfo(row,index){
      console.log(row)
      this.$router.push({name:'orderinfo'})
    }
  },
  computed: {}
}
</script>
<style scoped lang='less'>
.transport-in-index {
  padding: 0 20px;
}
.count {
  padding: 20px 0 10px;
  // font-size: 16px;
}
.OrderName{
  cursor: pointer;
}
</style>
