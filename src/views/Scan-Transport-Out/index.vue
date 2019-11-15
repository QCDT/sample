<template>
  <!-- 转出主页 -->
  <div class="scan-transport-out-index">
    <fromName>转出订单查询</fromName>
    <addAndSearch type="out"  @changeTable='changeTable'></addAndSearch>
    <div class="count">
      <span>共有:</span>
      <span>{{tableData.length}}</span>
      <span style="margin:0 0.3em">条数据</span>
    </div>
    <div class="form-box" v-show="orderTmp">
      <el-table
        :row-style="{height:'32px',textAlign: 'center',padding:'0px',}"
        :cell-style="{padding:'0px',textAlign: 'center'}"
        border
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        :style="{width: '100%',margin:'0 auto',}"
        @selection-change="handleSelectionChange"
        @row-click ='orderDetails'
        :show-overflow-tooltip='true'
      >
        <el-table-column type="index" label="序号" width="70"></el-table-column>
        <el-table-column prop="order" label="订单号" width="220"></el-table-column>
        <el-table-column prop="orderName" label="订单名称" width="200">
        </el-table-column>
        <el-table-column prop="recipients" label="收件人" width="100"></el-table-column>
        <el-table-column prop="site" label="收件地址" show-overflow-tooltip></el-table-column>
        <el-table-column prop="contactWay" label="联系方式" width="180"></el-table-column>
        <el-table-column prop="entryClerk" label="录入人" width="100"></el-table-column>
        <el-table-column label="导出" width="100">
          <template slot-scope="scope">
            <div class="flex">
              <el-button @click="changProject(scope.row,scope.$index)" type="text" size="small"  @click.stop>
                <i class="icon icon-liebiao" style="color:#000"></i>
              </el-button>
              <el-button @click="changProject(scope.row,scope.$index)" type="text" size="small"  @click.stop>
                <i class="icon icon-excel" style="color: rgb(33, 115, 70);"></i>
              </el-button>
              <el-button type="text" @click="open"  @click.stop>
                <i class="icon icon-pdf" style="color: rgb(163, 54, 57)"></i>
              </el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80">
          <template slot-scope="scope">
            <div class="flex" v-show="scope.row.status == 0">
              <i class="icon icon-edit btn" @click="amendOrder(scope.row)"></i>
              <i class="icon icon-shanchu" @click="delOrder(scope.row,scope.$index)" @click.stop></i>
            </div>
            <span v-show="scope.row.status != 0">{{scope.row.status}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 订单详情页 -->
    <div class="OrderDetailsWrap"  v-if="ifOrderDetails">
      <orderDetails @close="ifOrderDetails=false" :detailData="detailData"></orderDetails>
    </div>
  </div>
</template>
<script>
import addAndSearch from './addAndSearch'
import fromName from '@/components/tmp/zhanglan/fromName'
import maskTran from '@/components/tmp/zhanglan/maskTran'
import orderDetails from '@/views/Scan-Transport-Out/alert-orderDetails'
export default {
  inject:['reload'],
  props: {},
  components: { fromName, addAndSearch, maskTran, orderDetails },
  data () {
    return {
      ifOrderDetails: false,
      orderTmp: true,
      detailData:'', //点击行的订单信息
      tableData: [
       
      ],
      multipleSelection: []
    }
  },
  created(){
    this.$axios({
      method:'post',
      url:'/sampleGuide/trans/selectOrderInfo',
      data:({})
    })
    .then(({data})=>{
      console.log(data)
      data.data.forEach((item)=>{
        this.tableData.push({
          id:item.id,
          order: item.orderNumber, // 订单号
          orderName: item.orderName, // 订单名称
          recipients: item.recipients, // 收件人
          site: item.recipientsAddress, // 收件地址
          contactWay: item.recipientsTel, // 联系方式
          entryClerk: item.inputUserName, // 录入人
          remarks: item.remarks, //备注
          status:item.status==2?'已转出':item.status //订单状态
        }) 
      })
    })
  },
  methods: {
    changeTable(val){
      this.tableData = val
    },
    orderDetails(row){
      this.ifOrderDetails = true;
      // this.$message('订单详情orderDetails');
      this.detailData = row.id;
      // console.log(this.detailData);
    },
    amendOrder (row) {
      this.$router.push({
        name:'outchange',
        params:{
           id:row.id
          }
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    delOrder (row,index) {
      /*  删除确认 */ this.$confirm(
        '确定删除该订单吗?',
        '提示',
        { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }
      )
        .then(() => {
          this.$axios({
            method:'post',
            url:'/sampleGuide/trans/deleteTransportOrderById',
            data:({
              id: row.id
            })
          })
          .then(({data})=>{
            console.log(data)
            if(data.code == 200){
              this.$message({ type: 'success', message: '删除成功!' })
              this.reload()
            }
          })
        })
        .catch(() => {
          this.$message({ type: 'info', message: '已取消删除' })
        })
    },
    changProject () {
      console.log(': ', '修改')
    }
  },
  computed: {}
}
</script>
<style scoped lang='less'>
.scan-transport-out-index {
  padding: 0 20px;
  margin-top: 10px;
}
.OrderDetailsWrap{
  position: absolute;
  left: 0;
  top: 9%;
  width: 95%;
  height: 100%;
  z-index: 1;
  background: rgba(245, 252, 255, 1);
  padding: 0 30px;
}
.count {
  padding: 20px 0 10px;
  font-size: 16px;
}
.flex {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.icon {
  font-size: 18px;
  cursor: pointer;
}
</style>
