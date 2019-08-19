<template>
  <!-- 归还记录 -->
  <div class="record-box">
    <div class="title">
      <span>历史归还记录</span>
    </div>
    <div class="body">
      <div class="left">
        <div class="row">
          <div class="item">
            <span>表单名称</span>
            <el-input size="mini"></el-input>
          </div>
          <div class="item">
            <span>样本名称</span>
            <el-input size="mini"></el-input>
          </div>
        </div>
        <div class="form-menu row">
          <div>表单数量:&nbsp;&nbsp;{{`1`}}</div>
          <div>
            <i class="icon icon-pdf"></i>
            <i class="icon icon-excel"></i>
          </div>
        </div>
        <div class="form-table">
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
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column type="index" label="序号" width="70"></el-table-column>
            <el-table-column label="表单名称" width="100">
              <template slot-scope="scope">
                <el-button @click="delDingdan(scope.row,scope.$index)" type="text" size="small">表单名称</el-button>
              </template>
            </el-table-column>

            <el-table-column prop="takeOutName" label="归还人"></el-table-column>
            <el-table-column prop="returnTiem" label="归还日期" show-overflow-tooltip></el-table-column>
          </el-table>
        </div>
      </div>
      <div class="right">
        <div class="row">
          归还时间
          <el-date-picker
            size="mini"
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
        <div class="row">
          <!-- <button>搜索</button> -->
          <button class="icon icon-sousuo">
            <small>搜索</small>
          </button>
        </div>
        <div class="form-table">
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
            <el-table-column prop="takeOutName" label="样本名称"></el-table-column>
            <el-table-column prop="takeOutName" label="样本类别"></el-table-column>
            <el-table-column prop="returnTiem" label="受试者编号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="returnTiem" label="静置时间" show-overflow-tooltip></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="bot-btn">
      <button @click="$router.go(-1)">返回</button>
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  components: {},
  data () {
    return {
      value1: '',
      tableData: [
        {
          // 序号[非ID] 订单名称 创建事件 创建用户名 取出人 预计归还事件 备注 订单状态 操作
          id: '1',
          orderName: '表单名称', // 表单名称
          newTime: 20180102, // 归还人
          newUserName: '创建用户名' // 归还日期
        }
      ],
      multipleSelection: []
    }
  },
  methods: {
    getRowClass ({ rowIndex }) {
      /* 表头样式 */
      return rowIndex == 0 ? this.$store.getters.formTheme : ''
    }
  },
  computed: {}
}
</script>
<style scoped lang='less'>
.record-box {
  background-color: #eee;
  height:98%;
}
.title {
  font-size: 28px;
  display: flex;
  padding-top: 20px;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  span {
    border-bottom: 2px solid #3cd7ff;
  }
}
.body {
  display: flex;
  .left,
  .right {
    flex: 1;
    padding: 0 20px;
  }
}
.row {
  display: flex;
  align-items: center;
  white-space: nowrap;
  margin-bottom: 5px;
  .item {
    display: flex;
    align-items: center;
  }
}
.form-menu {
  display: flex;
  justify-content: space-between;
}
.icon-sousuo {
  outline: none;
  border: 0;
}
.bot-btn {
  display: flex;
  justify-content: center;
  margin: 50px 0 0;
  margin-bottom: 50px;
  padding-bottom: 50px;
}
</style>
