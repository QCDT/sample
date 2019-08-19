<template>
  <div class="loan-wrap">
    <transition name="el-fade-in-linear">
      <Add :showDingdan="showDingdan" @clearAdd="clearAdd" @submitForm="submitForm"/>
    </transition>
    <div class="top">
      <fromName>借出订单列表</fromName>
      <tmpButton @click="showAdd" style="height:26px">添加订单</tmpButton>
    </div>

    <el-table
      :row-style="{height:'32px',textAlign: 'center',padding:'0px',}"
      :cell-style="{padding:'0px',textAlign: 'center'}"
      border
      stripe
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      :style="{width: '100%',margin:'0 auto',}"
      :header-cell-style="getRowClass"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="index" label="序号" width="70"></el-table-column>
      <el-table-column label="订单名称" width="100">
        <template slot-scope="scope">
            <span class="orderName" @click="showOrder">{{tableData[scope.$index].orderName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="newTime" label="创建时间" show-overflow-tooltip></el-table-column>
      <el-table-column prop="newUserName" label="创建用户名" show-overflow-tooltip></el-table-column>
      <el-table-column prop="takeOutName" label="取出人"></el-table-column>
      <el-table-column prop="returnTiem" label="预计归还时间" show-overflow-tooltip></el-table-column>
      <el-table-column prop="mark" label="备注" show-overflow-tooltip></el-table-column>
      <el-table-column prop="status" label="订单状态" show-overflow-tooltip></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <i class="el-icon-delete del" @click="delDingdan(scope.row,scope.$index)"></i>
        </template>
      </el-table-column>
    </el-table>
    <goBack></goBack>
    <!-- 蒙版 -->
  </div>
</template>
<script>
import goBack from '@/components/tmp/zhanglan/go-1'
import fromName from '@/components/tmp/zhanglan/fromName'
import Add from '@/views/Scan-Loan/Add'
import tmpButton from '@/components/tmp/zhanglan/tmpButton'
export default {
  props: {},
  components: { goBack, fromName, Add, tmpButton },
  data () {
    return {
      // 切换 添加借出订单选项
      showDingdan: false,

      tableData: [
        {
          // 序号[非ID] 订单名称 创建事件 创建用户名 取出人 预计归还事件 备注 订单状态 操作
          id: '1',
          orderName: '替格瑞洛', // 订单名称
          newTime: 1231231, // 创建时间
          newUserName: 'krystal', // 创建用户名
          takeOutName: 'meu', // 取出人
          returnTiem: 123123, // 预计归还时间
          mark: '暂无备注', // 备注
          status: '已核验' // 订单状态
        }
      ],
      multipleSelection: []
    }
  },
  methods: {
    // El UI ...
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },

    getRowClass ({ rowIndex }) {
      /* 表头样式 */
      return rowIndex == 0 ? this.$store.getters.formTheme : ''
    },
    // 删除订单
    delDingdan (row, index) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({ type: 'success', message: '删除成功!' })
        })
        .catch(() => {
          this.$message({ type: 'info', message: '已取消删除' })
        })
    },
    showOrder(){
      this.$router.push({name:'particulars'})
    },
    // ↓    添加订单
    showAdd () {
      /* 显示 */ this.showDingdan = true
    },
    clearAdd () {
      /* 隐藏 */ this.showDingdan = false
    },
    submitForm (v) {
      /* 添加订单 */ this.tableData.push(v)
      this.clearAdd()
    }
    // ↑
  },
  computed: {}
}
</script>
<style scoped lang='less'>
.loan-wrap {
  padding: 20px 20px 0;
}
.orderName{
  cursor: pointer;
}
.del{
  font-size: 20px;
  cursor: pointer;
}
.top {
  display: flex;
  justify-content: space-between;

  button {
    cursor: pointer;
  }
}
</style>
