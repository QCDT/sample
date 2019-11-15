<template>
  <div class="out-change-index">
    <TransferOrder style="background:#fff; margin-top:10px" @test="test" title="修改转出订单"></TransferOrder>
    <h1 class="form-title"> <img src="@/assets/img/zhuanchuyangbenhe.png"></h1>
    <div class="form-top-info">
      <div class="sum">
        <span>共有:</span>
        <span>2</span>
        <span>个样本盒</span>
      </div>
      <div class="btn">
        <div @click="addBox"  class="searchIcon">
            <img src="@/assets/img/addBox.png">
            <span>添加样本盒</span>
        </div>
      </div>
    </div>
    <div class="form">
      <el-table
        :row-style="{height:'32px',textAlign: 'center',padding:'0px',}"
        :cell-style="{padding:'0px',textAlign: 'center'}"
        border
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        :style="{width: '100%',margin:'0 auto',}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="index" label="序号" width="70"></el-table-column>
        <el-table-column prop="name" label="项目名称" width="120"></el-table-column>
        <el-table-column prop="fangan" label="方案号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="shenban" label="申办方"></el-table-column>
        <el-table-column prop="persorn" label="负责人" show-overflow-tooltip></el-table-column>
        <el-table-column prop="yaowu" label="药物名称" show-overflow-tooltip></el-table-column>
        <el-table-column fixed="right" label="操作" width="140">
          <template slot-scope="scope">
            <div class="flex">
              <!-- outchangeedit -->
              <router-link :to="{name:'outchangeedit'}" style="color:#333;">修改</router-link>
              <router-link :to="{name:'check'}" style="color:#333;">盘点</router-link>
              <el-button type="text" @click="open(scope.row,scope.$index)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <transition name="el-fade-in-linear">
      <masking v-if="masking">
        <addBox @goBack="goBack"></addBox>
      </masking>
    </transition>
  </div>
</template>
<script>
import TransferOrder from './transferOrder'
import tmpButton from '@/components/tmp/zhanglan/tmpButton'
import masking from '@/components/tmp/zhanglan/masking'
import addBox from './addBox'
export default {
  props: {},
  components: { TransferOrder, tmpButton, masking, addBox },
  data () {
    return {
      masking: false,
      tableData: [
        {
          id: '1',
          name: '替格瑞洛', // 项目名称
          fangan: 'SN-YQ-2018005/V 1.0', // 方案号
          shenban: '石药集团中奇制药技术', // 申办方
          persorn: '李四', // 负责人
          yaowu: 'CSPCHA115胶囊' // 药物名称
        }
      ],
      multipleSelection: []
    }
  },
  methods: {
    goBack () {
      this.masking = false
    },
    addBox () {
      this.$message({ type: 'success', message: '添加样本盒!' })
      this.masking = !this.masking
    },
    test (v) {
      console.log('v: ', v)
    },

    clearProject (row, index) {
      /*  删除数据 */ this.tableData.splice(index, 1)
    },

    open () {
      /*  删除确认 */ this.$confirm(
        '此操作将永久删除该文件, 是否继续?',
        '提示',
        { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }
      )
        .then(() => {
          this.clearProject()
          this.$message({ type: 'success', message: '删除成功!' })
        })
        .catch(() => {
          this.$message({ type: 'info', message: '已取消删除' })
        })
    },
    changProject () {
      this.$message('修改')
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    }
  },
  computed: {}
}
</script>
<style scoped lang='less'>
.out-change-index {
  padding: 10px 20px 0 20px;
  background: #eee;
}
.form-title {
  text-align: center;
}
.form-top-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.searchIcon{
  background: #00c9ff;
  color: white;
  border: 1px solid #00c9ff;
  line-height: 25px;
  padding:0 2px;
  border-radius: 5px;
  cursor: pointer;
  img{
    width: 16px;
    height: 16px;
    vertical-align: top;
    margin-top: 5px;
    margin-right: 5px;
  }
}
</style>
