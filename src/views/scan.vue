<template>
  <div class="scan-wrap">
    <!-- 扫描动态图    -->
    <div class="sample-tmp">
      <!-- 动态图片 -->
      <div class="pic">
        <img src="@/assets/img/sample.gif" alt>
      </div>
      <!-- 文字:扫描样本 -->
      <h1>扫描样本</h1>
      <!-- 操作步骤文字 -->
      <span>请将样本放置在读写器上，然后点击上方按钮开始扫描</span>
    </div>
    <!-- 表单 -->
    <!--
        注意: 这三个设置不影响表头的
    row-style="height:20px"  表格行高
    cell-style="padding:0"   表格padding
    style="font-size: 10px"  表格字体
    -->
    <div class="table-box">
      <!-- 扫描总数 20 批量管理模式... -->
      <div class="selection-box">
        <div class="sum">
          <span>扫描总数:</span>
          <span>20</span>
        </div>
        <div class="right">
          <div class="item">
            <span>开始扫描样本盒:</span>
            <el-switch v-model="value1"></el-switch>
          </div>
          <div class="item">
            <span>批量管理模式:</span>
            <el-switch v-model="value2"></el-switch>
          </div>
        </div>
      </div>
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
    <!-- 拉条:侧边导航栏:转运 分组合演 患者采血 自动录入 离心机 -->
    <div class="group" :style="{ transform:  `translateX(-${groupChang>96?96:groupChang}%)` }">
      <ul>
        <li v-for="(item,index) in groupListPic" :key="index">
          <router-link :to="{name:item.linkName}">
            <img :src="item.pic" alt>
          </router-link>
        </li>
      </ul>
      <!-- toggleGroup 拉条的显示与隐藏 -->
      <div class="group-btn" @click="toggleGroup">
        <i class="icon icon-icon-test1"></i>
      </div>
    </div>
  </div>
</template>
<script>
import { setInterval } from 'timers'
export default {
  data () {
    return {
      /**
       * @description: groupChang:控制拉条的长度,它是一个
       *               groupFangXiang: 箭头方向,这是一个布尔值[false:不显示]
       * @param {type}
       * @return:
       */
      groupChang: 96,
      groupFangXiang: false,
      // El UI
      // 开关的值
      value: false,

      value1: false,
      value2: false,
      value3: '',
      value4: '',

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
      multipleSelection: [],
      //   拉条:侧边导航栏的 图片
      groupListPic: [
        { pic: require('@/assets/img/zhuangyun1.png'), linkName: 'zhuanyun' },
        { pic: require('@/assets/img/fenzuheyan1.png'), linkName: 'fenzu' },
        { pic: require('@/assets/img/huanzhecaixue.png'), linkName: 'caixue' },
        { pic: require('@/assets/img/zidongluru.png'), linkName: 'zidong' },
        { pic: require('@/assets/img/lixinji1.png'), linkName: 'lixin' }
      ]
    }
  },

  methods: {
    /**
     * @description:    拉条的显示与因此
     * @param {type}
     * @return:
     */
    toggleGroup () {
      if (this.groupFangXiang) {
        this.groupChang = 100
        this.groupFangXiang = false
      } else {
        this.groupChang = 0
        this.groupFangXiang = true
      }
    },
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
  }
}
</script>
<style scoped lang='less'>
.scan-wrap {
  position: relative;

  width: 1366px;
  padding-top: 35px;
  // background-color: #333;
}

/**
 * @description: sample-tmp 后期需要复用
 * @param {type}
 * @return:
 */
.sample-tmp {
  display: flex;

  // justify-content:center;
  align-items: center;
  flex-direction: column;

  width: 1366px;

  color: #00c9ff;
  .pic {
    margin-bottom: 12px;

    > img {
      width: 105px;
      height: 105px;
    }
  }

  h1 {
    margin-bottom: 7px;

    font-size: 1.25rem;
    font-weight: 500;
  }
}

// 表单
.table-box {
  width: 1296px;
  margin: 0 auto;
  padding-top: 20px;

  img {
    width: 30px;
    height: 30px;
  }

  .selection-box {
    display: flex;
    justify-content: space-between;

    //   扫描总数...那一排的

    width: 1200px;
    margin: 0 auto;
    margin-bottom: 10px;
    span {
      font-size: 16px;
    }

    span:nth-child(2) {
      padding-left: 0.5em;

      background-color: #fff;
    }

    .right {
      display: flex;

      .item {
        margin-left: 20px;

        > span {
          padding-right: 7px;
        }
      }
    }
  }
}

//  侧边导航栏
.group {
  position: absolute;
  top: 35px;
  left: 0px;
  //   left: -500px;

  display: flex;
  overflow: hidden;

  border-radius: 0 0.625rem 0.625rem 0;
  transition: all 0.75s ease-in-out;
  ul {
    display: flex;

    border: 1px solid #eee;
    li {
      padding: 5px 5px; // 修改大小记得修改 data里的数据
      margin: 10px 5px;
      cursor: pointer;

      img {
        width: 80px; // 修改大小记得修改 data里的数据
        height: 80px; // 修改大小记得修改 data里的数据

        border: 0;
      }
    }
  }
  .zuozuo {
    .el-button--small,
    .el-button--small.is-round {
      padding: 0 !important;
    }
  }
  // 拉条按钮
  .group-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 5%;
    cursor: pointer;

    border: 1px solid #eee;
    border-left: none;
    border-color: #0ddfff;
    border-radius: 0 0.625rem 0.625rem 0;
    // background-color: #333;
    background-color: #0ddfff;

    > i {
      color: #e2e2e2;

      font-size: 20px;
      font-weight: 100;
      //   background-color: #fff;
    }
  }
}
</style>
