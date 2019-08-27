<template>
  <!-- 借出详情 -->
  <div class="loadn-particulars-index">
    <fromName>表单信息</fromName>
    <div class="fotm-table-one">
      <el-table
        :row-style="{height:'32px',textAlign: 'center',padding:'0px'}"
        :cell-style="{padding:'0px',textAlign: 'center'}"
        border
        stripe
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        :style="{width: '100%'}"
      >
        <el-table-column prop="newTime" label="表单名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="newUserName" label="创建时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="takeOutName" label="创建用户名"></el-table-column>
        <el-table-column prop="returnTiem" label="取走人" show-overflow-tooltip></el-table-column>
        <el-table-column prop="mark" label="预计归还时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="status" label="备注" show-overflow-tooltip></el-table-column>
        <el-table-column prop="status" label="表单状态" show-overflow-tooltip></el-table-column>
      </el-table>
    </div>

    <div class="fotm-table-two">
      <fromName>该表单样本信息</fromName>
      <el-button round  class="center" type="primary" v-show="status=='未核验'">开始核验</el-button>

      <div class="fotm-table-box">
        <div class="form-two-menu" v-show="status=='未核验'">
          <img src="@/assets/img/yangbenhe.png" @click="add">
          <img src="@/assets/img/yangben.png" @click="searchAdd">
        </div>
        <el-table
          :row-style="{height:'32px',textAlign: 'center',padding:'0px',}"
          :cell-style="{padding:'0px',textAlign: 'center'}"
          border
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          :style="{width: '100%'}"
        >
          <el-table-column type="index" label="序号" width="70"></el-table-column>
          <el-table-column prop="newUserName" label="RFID编号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="takeOutName" label="样本名字"></el-table-column>
          <el-table-column prop="returnTiem" label="位置信息" show-overflow-tooltip></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <i v-show="status=='未核验'" class="el-icon-delete del" @click="delDingdan(scope.row,scope.$index)" ></i>
            </template>
          </el-table-column>
        </el-table>
        <h1>详细异常描述</h1>
        <div class="checkDetailsContent">
          <div class="checkLeft">
            <p><span>异常详情</span></p>
          </div>
          <div>
            <p><span>样本名称(位置信息)</span></p>
          </div>
        </div>
      </div>

      <el-button round class="center enter-btn" type="primary" v-show="status=='未核验'">确认核验</el-button>
      <el-button class="center" type="primary" @click="$router.go(-1)" size="mini">返回</el-button>
    </div>
    <!-- 添加扫描样本盒 -->
    <transition name="el-fade-in-linear">
      <maskTran v-if="AddBox">
        <add @close="AddBox=false"></add>
      </maskTran>
    </transition>
  </div>
</template>
<script>
import fromName from '@/components/tmp/zhanglan/fromName'
import maskTran from '@/components/tmp/zhanglan/masking'
import add from '@/views/Scan-Loan-Particulars/add'
export default {
  props: {},
  components: { fromName, maskTran, add },
  data () {
    return {
      AddBox: false,
      SearchAdd: false,
      status: '未核验',
      tableData: [
        {
          // 序号[非ID] 订单名称 创建事件 创建用户名 取出人 预计归还事件 备注 订单状态 操作
          id: '1',
          orderName: '表单名称', // 表单名称
          newTime: 20180102, // 创建时间
          newUserName: '创建用户名', // 创建用户名
          takeOutName: 'meu', // 取走人
          returnTiem: 123123, // 预计归还时间
          mark: '无备注', // 备注
          status: '未核验' // 表单状态
        }
      ],
      multipleSelection: []
    }
  },
  methods: {
    add () {
      this.AddBox = true
    },
    searchAdd () {
      // this.$message('查询样本添加')
      // setTimeout(() => {
      //   this.$message('和查询页面类似')
      // }, 0)
      // this.$router.push({: 'aa'})
      // this.ifSearchAddBox = true
    },
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
    // 删除订单中样本
    delDingdan (row, index) {
      this.$confirm('确定要删除该样本吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.tableData.splice(index, 1)
          this.$message({ type: 'success', message: '删除成功!' })
        })
        .catch(() => {
          this.$message({ type: 'info', message: '已取消删除' })
        })
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
.loadn-particulars-index {
  padding: 0 20px;
}
.center {
  display: block;
  margin: 0 auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 10px;
}
.fotm-table-one {
  margin: 10px 20px 50px;
}
.fotm-table-two {
  &/deep/ .from-name h1 {
    border-left-color: rgb(127, 255, 212) !important;
  }
  &/deep/.is-leaf {
    color: #333 !important;
    background-color: rgb(127, 255, 212) !important;
  }
}
.fotm-table-box {
  margin: 0px 20px 50px;
}
.form-two-menu {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
  img{
    height: 30px;
    margin-right: 10px;
    cursor: pointer;
  }
}
.del{
  font-size: 20px;
  cursor: pointer;
}
h1 {
  display: flex;
  justify-content: center;
  padding-top: 20px;
  margin-bottom: 10px;
}
.enter-btn {
  margin-bottom: 20px;
}
.icon{
    cursor: pointer;
}
.el-icon-zoom-in{
    font-size: 17px;
    margin: 0 20px 5px;
}
.checkDetailsContent{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  p{
    border: 1px solid #ccc;
    width: 45vw;
    text-align: center;
  }
  .checkLeft{
    p{
      border-right: none;
    }
  }
}
</style>
