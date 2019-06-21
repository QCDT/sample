
<template>
  <div class="fenzu-wrap">
    <!-- 上下结构 上边一个是一个表格 -->
    <!-- 下边是一个返回按钮 -->
    <div class="form-box fenzu-top">
      <!-- 表格内容 -->
      <!-- 表格分4个部分:  -->
      <!-- 顶部按钮 表格信息 表格 操作表格的按钮 -->
      <div class="f-top-btn">
        <button>查询</button>
        <button>创建编组核验</button>
      </div>
      <div class="f-info">
        <span>扫描总数:</span>
        <span>20</span>
      </div>
      <div class="f-cont">
        <!-- 表格 -->
        <!-- row-style  cell-style 表格样式 -->
        <el-table
          :row-style="{height:'32px',textAlign: 'center',padding:'0px',}"
          :cell-style="{padding:'0px',textAlign: 'center'}"
          border
          stripe
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          :style="{width: '1296px',margin:'0 auto',}"
          :header-cell-style="getRowClass"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="序号编码" width="120">
            <template slot-scope="scope">{{ scope.row.coding }}</template>
          </el-table-column>
          <el-table-column prop="name" label="样本名称" width="120"></el-table-column>
          <el-table-column prop="address" label="位置信息" show-overflow-tooltip></el-table-column>
          <el-table-column prop="status" label="状态" show-overflow-tooltip></el-table-column>
          <el-table-column prop="info" label="详细信息" show-overflow-tooltip></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">123</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <!-- <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button> -->
          <!-- <el-button @click="toggleSelection()">取消选择</el-button> -->
        </div>
      </div>
      <div class="f-bot-btn">
        <el-checkbox v-model="checked">备选项</el-checkbox>
      </div>
    </div>
    <div class="fenzu-bot">
      <goBack></goBack>
      <!-- 复用返回按钮 -->
    </div>
  </div>
</template>
<script>
import goBack from '@/components/tmp/zhanglan/go-1.vue'

export default {
  components: { goBack },
  data () {
    return {
      // El UI
      // 开关的值
      //   value: false,

      //   value1: false,
      //   value2: false,
      //   value3: "",
      //   value4: "",
      checked: true,
      tableData: [
        {
          coding: '123', // 序号编码
          name: 'Mark', // 样本名称
          address: '海尔冰箱3-1-101海尔冰箱', // 位置信息
          status: '正常', // 状态
          info: '详细信息', // 详细信息
          caozuo: '操作' // 操作
        },
        {
          coding: '123', // 序号编码
          name: 'Mark', // 样本名称
          address: '海尔冰箱3-1-101海尔冰箱', // 位置信息
          status: '正常', // 状态
          info: '详细信息', // 详细信息
          caozuo: '操作' // 操作
        },
        {
          coding: '123', // 序号编码
          name: 'Mark', // 样本名称
          address: '海尔冰箱3-1-101海尔冰箱', // 位置信息
          status: '正常', // 状态
          info: '详细信息', // 详细信息
          caozuo: '操作' // 操作
        },
        {
          coding: '123', // 序号编码
          name: 'Mark', // 样本名称
          address: '海尔冰箱3-1-101海尔冰箱', // 位置信息
          status: '正常', // 状态
          info: '详细信息', // 详细信息
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
    /**
     * @description: 设置表头样式
     * @param {type}
     * @return:
     */
    getRowClass ({ rowIndex }) {
      if (rowIndex == 0) {
        return {
          background: '#3cd7ff',
          padding: '0px 0',
          height: '30px',
          lineHeight: '1.875rem',
          fontWeight: '900',
          fontSize: '1rem',
          color: '#fff',
          textAlign: 'center'
        }
      } else {
        return ''
      }
    },
    // 操作事件

    handleClick (row) {
      console.log(row)
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

  padding-top: 10px;

  // 上下结构
  .fenzu-top {
    width: 1300px;
    margin: 0 auto;
    padding: 25px 15px;
  }

  .fenzu-bot {
    width: 1330px;
    margin: 0 auto;

    background-color: #999;
  }
}

.form-box {
  border: 1px solid rgba(204, 204, 204, 0.6);
  border-radius: 3px;
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
  //   表格上边的 哪一行信息
  .f-info {
    width: 1200px;
    margin: 0 auto;
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
</style>
