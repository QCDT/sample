
<template>
  <div class="fenzu-wrap">
    <div class="form-box fenzu-top">
      <ChaXunAndNew></ChaXunAndNew>
      <div class="f-info">
        <span>扫描总数:</span>
        <span>{{tableData.length}}</span>
      </div>
      <div class="f-cont">
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
          <el-table-column fixed="left" label width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">
                <i class="el-icon-lock" style="font-size:23px;color:#333"></i>
              </el-button>
            </template>
          </el-table-column>
          <el-table-column fixed="left" label width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">
                <i class="el-icon-unlock" style="font-size:23px"></i>
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="序号" width="120">
            <template slot-scope="scope">{{ scope.row.coding }}</template>
          </el-table-column>
          <el-table-column label="编组订单名称" width="200">
            <template slot-scope="scope">
                <button @click="showCheck">
                     {{ scope.row.orderName }}
                </button>
               </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建日期" show-overflow-tooltip></el-table-column>
          <el-table-column prop="createPerson" label="创建人员" show-overflow-tooltip></el-table-column>
          <el-table-column prop="status" label="状态" show-overflow-tooltip></el-table-column>
          <el-table-column fixed="right" label="操作" width="250">
            <template slot-scope="scope">
              <el-button @click="delSample(scope.row,scope.$index)" type="text" size="small">
                <i class="icon icon-shanchu" style="color:#333" title="删除"></i>
              </el-button>
              <el-button @click="exportExc(scope.row)" type="text" size="small">
                <i class="icon icon-excel" style="color:#333" title="导出Excel"></i>
              </el-button>
              <el-button @click="exportExc(scope.row)" type="text" size="small">
                <i class="icon icon-pdf" style="color:#333" title="导出Excel"></i>
              </el-button>
              <el-button @click="addPasword(scope.row)" type="text" size="small">
                <i class="el-icon-lock" style="font-size:16px;color:#333" title="添加密码"></i>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="f-bot-btn">
        <el-checkbox v-model="checked">隐藏已核验订单</el-checkbox>
      </div>
    </div>
    <!-- 添加密码 -->
    <transition name="el-fade-in-linear">
      <maskTran v-show="addPasswordMask">
        <addPasswordMask @cancel="addPasswordMask=false" @submitForm="setPassword"></addPasswordMask>
      </maskTran>
    </transition>
    <!-- 核验中 -->
    <transition name="el-fade-in-linear">
      <maskTran v-if="checking" title="3管核验" bgc='#eee' :rgba=0>
        <alertChecking @cancel="checking=false" ></alertChecking>
        <!-- <addPasswordMask @cancel="checking=false" @submitForm="setPassword"></addPasswordMask> -->
      </maskTran>
    </transition>
  </div>
</template>
<script>
import goBack from '@/components/tmp/zhanglan/go-1.vue'
import ChaXunAndNew from './ChaXunAndNew'
import maskTran from '@/components/tmp/zhanglan/maskTran'
import addPasswordMask from './addPasswordMask'
import alertChecking from './alert-checking'
export default {
  components: { goBack, ChaXunAndNew, maskTran, addPasswordMask, alertChecking },
  data () {
    return {
      checking: false, // 核验中
      addPasswordMask: false, // 添加密码
      checked: false, // 移仓已核验订单
      tableData: [
        {
          coding: '1', // 序号
          orderName: '基因血订单5', // 编组订单名称
          createTime: '2018.11.05', // 创建日期
          createPerson: '创建人员', // 创建人员
          status: '已核验', // 状态
          caozuo: '操作' // 操作
        },
        {
          coding: '2', // 序号
          orderName: '基因血订单6', // 编组订单名称
          createTime: '2018.11.06', // 创建日期
          createPerson: '创建人员', // 创建人员
          status: '已核验', // 状态
          caozuo: '操作' // 操作
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
    /*  设置表头样式 */
    getRowClass ({ rowIndex }) {
      return rowIndex == 0 ? this.$store.getters.formTheme : ''
    },
    // 操作事件

    handleClick (row) {
      console.log(row)
    },
    addPasword () {
      /* 添加密码 */
      this.$message('添加密码')
      this.addPasswordMask = true
    },
    setPassword (obj) {
      /* 收到密码 */
      this.addPasswordMask = false
      this.$notify({
        title: '收到密码',
        message: obj,
        type: 'success'
      })
    },

    delSample (rowData, index) {
      /* 删除 */
      this.$notify({
        title: '删除',
        message: `第${index}个`,
        type: 'success'
      })
    },
    exportExc () {
      /* 导出excel */
      this.$message('添加密码')
    },
    showCheck () {
      /* 核验中 */
      this.checking = true
    }
  },
  computed: {}
}
</script>
<style scoped lang='less'>
// 结构
.fenzu-wrap {
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  // 上下结构
  .fenzu-top {
    padding-top: 20px;
  }
}

.form-box {
  border: 1px solid rgba(204, 204, 204, 0.6);
  border-radius: 3px;
  padding: 0 20px;
  position: relative;
  height: 500px;
  // 顶部菜单
  .f-top-btn {
    display: flex;
    justify-content: center;

    button {
      width: 264px;
      height: 32px;
      margin: 0 58px;

      cursor: pointer;
      text-align: center;

      color: #fff;
      border: 0;
      border-radius: 5px;
      outline: 0;
      background-color: #3cd7ff;

      font-size: 15px;
      line-height: 32px;
      margin-bottom: 25px;
    }
  }

  .f-info {
    /* 扫描总数 */

    margin-bottom: 3px;
    span {
      font-size: 16px;
    }

    span:nth-child(2) {
      padding-left: 0.5em;

      background-color: #fff;
    }
  }
}
.f-bot-btn {
  /* 隐藏已核验订单 */
  position: absolute;
  bottom: 5px;
}
.caozuo {
  display: flex;
}
</style>
