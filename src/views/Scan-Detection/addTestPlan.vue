<template>
  <div class="add-test-plan">
    <div class="menu-box">
      <i class="el-icon-close" @click="$emit('close')"></i>
      <div class="item" :class="{active:activeIndex===1}" @click="activeIndex=1">完善采血信息</div>
      <div class="item" :class="{active:activeIndex===2}" @click="activeIndex=2">选择采血订单</div>
      <div class="poa-blue-bar" :class="{right:activeIndex===2}"></div>
      <div class="poa-blue-bar-gray"></div>
    </div>
    <div class="map one" v-if="activeIndex===1">
      <div class="row">
        <span>采血分组数量</span>:&nbsp;&nbsp;
        <el-input style="width:60px" size="mini" v-model="groupNumber"></el-input>&nbsp;&nbsp;
        <el-button size="mini">确定</el-button>
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
        >
          <el-table-column type="index" label="序号" width="120"></el-table-column>
          <el-table-column prop="address" label="前时间窗" show-overflow-tooltip></el-table-column>
          <el-table-column prop="status" label="后时间窗" show-overflow-tooltip></el-table-column>
        </el-table>
      </div>
    </div>
    <div class="map two" v-if="activeIndex===2">
      <div class="row">患者信息列表</div>
      <div class="for-table-two">
        <selectBloodOrder></selectBloodOrder>
      </div>
    </div>
  </div>
</template>
<script>
import selectBloodOrder from "./selectBloodOrder";
export default {
  props: {},
  components: { selectBloodOrder },
  data() {
    return {
      groupNumber: 4,
      activeIndex: 1,
      tableData: [
        {
          coding: "123", // 序号编码
          name: "Mark", // 样本名称
          address: "海尔冰箱3-1-101海尔冰箱", // 位置信息
          status: "正常", // 状态
          info: "详细信息", // 详细信息
          caozuo: "操作" // 操作
        },
        {
          coding: "123", // 序号编码
          name: "Mark", // 样本名称
          address: "海尔冰箱3-1-101海尔冰箱", // 位置信息
          status: "正常", // 状态
          info: "详细信息", // 详细信息
          caozuo: "操作" // 操作
        }
      ]
    };
  },
  methods: {
    handleSelectionChange() {},
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
  computed: {}
};
</script>
<style scoped lang='less'>
.add-test-plan {
  position: absolute;
  top: 50%;
  left: 50%;

  width: 1200px;
  height: 50vh;
  margin-top: -25vh;
  margin-left: -600px;

  border-radius: 10px;
  background-color: #fff;
}

.menu-box {
  position: relative;

  display: flex;
  overflow: hidden;

  height: 40px;
  margin: 10px 20px 0;
  padding-bottom: 2px;

  user-select: none;

  .el-icon-close {
    position: absolute;
    right: 0;

    display: block;
    display: flex;
    align-items: center;
    justify-content: center;

    width: 40px;
    height: 40px;

    font-weight: 900;

    font-size: 20px;
  }

  .item {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 50%;
    height: 40px;

    cursor: pointer;
    transition: all 0.1s;

    color: #555;

    font-size: 18px;

    &:hover {
      color: #3cd7ff;
    }
  }

  .active {
    color: #3cd7ff;
  }

  .poa-blue-bar {
    position: absolute;
    z-index: 1;
    bottom: 0;
    left: 12.5%;

    width: 25%;
    height: 3px;

    transition: all 0.2s;

    border-radius: 10px;
    background-color: #3cd7ff;
  }

  .poa-blue-bar-gray {
    position: absolute;
    bottom: 0;

    width: 50%;
    width: 100%;
    height: 3px;

    border-radius: 10px;
    background-color: #eee;
  }

  .right {
    left: 62.5%;
  }
}

.map {
  padding: 20px;
}

.row {
  display: flex;
  align-items: center;
  height: 27px;
  margin-bottom: 10px;

  white-space: nowrap;
  font-weight: 500;
}
</style>