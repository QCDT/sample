<template>
  <div class="select-sample">
    <i class="el-icon-close" @click="$emit('close')"></i>
    <h1 class="title">选择样本</h1>
    <div class="search-box">
      <div class="form-input">
        <div class="row">
          <div class="item">
            <span>样本名称</span>:&nbsp;
            <el-input size="mini" placeholder="请输入内容" style="width:100%;margin-right:10%"></el-input>
          </div>
          <div class="item">
            <span>录入人员</span>:&nbsp;
            <el-input size="mini" placeholder="请输入内容" style="width:100%;margin-right:10%"></el-input>
          </div>
          <div class="item">
            <span>采样时间</span>:&nbsp;
            <el-date-picker
              size="mini"
              style="width:100%;margin-right:10%"
              v-model="value1"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </div>
        <div class="row">
          <div class="item">
            <span>样本来源</span>:&nbsp;
            <el-input size="mini" placeholder="请输入内容" style="width:100%;margin-right:10%"></el-input>
          </div>
          <div class="item">
            <span>类别</span>:&nbsp;
            <el-input size="mini" placeholder="请输入内容" style="width:100%;margin-right:10%"></el-input>
          </div>
          <div class="item">
            <span>录入日期</span>:&nbsp;
            <el-date-picker
              size="mini"
              style="width:100%;margin-right:10%"
              v-model="value1"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </div>
        <div class="info">
          <div class="items">
            <h1>位置信息:</h1>
          </div>
          <div class="items single">
            <span>冰箱</span>:&nbsp;
            <el-select size="mini" style="width:50%" v-model="value" placeholder="冰箱">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="items single">
            <span>层数</span>:&nbsp;
            <el-select size="mini" style="width:50%" v-model="value" placeholder="层数">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="items single">
            <span>抽屉</span>:&nbsp;
            <el-select size="mini" style="width:50%" v-model="value" placeholder="抽屉">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="items single">
            <span>样本盒</span>:&nbsp;
            <el-select size="mini" style="width:50%" v-model="value" placeholder="样本盒">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="items single">
            <span>项目名称</span>:&nbsp;
            <el-select size="mini" style="width:100%" v-model="value" placeholder="样本盒">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="search">
        <blueSearch name="查询" @click="search"></blueSearch>
      </div>
    </div>

    <div class="form-table-box">
      <div class="row">
        <span>信息</span>
        <span>共有 0条数据</span>
      </div>
      <div class="form-cont">
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
          <el-table-column type="selection" show-overflow-tooltip></el-table-column>
          <el-table-column label="序号" width="70px">
            <template slot-scope="scope">{{ scope.row.coding }}</template>
          </el-table-column>
          <el-table-column prop="name" label="样本名称" show-overflow-tooltip></el-table-column>

          <el-table-column prop="enterName" label="录入人" show-overflow-tooltip></el-table-column>
          <el-table-column prop="enterTime" label="录入日期" show-overflow-tooltip></el-table-column>
          <el-table-column prop="sampl" label="样本类别" show-overflow-tooltip></el-table-column>
          <el-table-column prop="source" label="位置信息" show-overflow-tooltip></el-table-column>
       </el-table>
      </div>
    </div>
    <div class="bot-btn">
      <tmpButton @click="confirmAdd" style="padding:5px 10px">确认添加</tmpButton>
    </div>
  </div>
</template>
<script>
import tmpButton from '@/components/tmp/zhanglan/tmpButton'

import blueSearch from '@/components/tmp/zhanglan/blueSearch'
export default {
  props: {},
  components: { blueSearch, tmpButton },
  data () {
    return {
      // value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value1: '',
      options: [
        {
          value: '速度',
          label: '速度'
        }
      ],
      value: '',
      tableData: [
        {
          coding: 1, // 序号
          name: '血样', // 样本名称
          enterName: '录入人', // 录入人
          enterTime: '2018.09.09', // 录入日期
          sampl: '2018.09.09', // 采样信息
          source: '人', // 样本来源
          classes: 'B类' // 样本类别
        }
      ],
      multipleSelection: []
    }
  },
  methods: {
    search () {
      this.$message('查询')
    },
    getRowClass ({ rowIndex }) {
      return rowIndex == 0 ? this.$store.getters.formTheme : 0
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    confirmAdd () {
      /* 确认添加 */
      this.$emit('confirmAdd', 123)
    }
  },
  computed: {}
}
</script>
<style scoped lang='less'>
.select-sample {
  position: relative;

  margin: 97px 100px 0;

  background-color: #fff;
  box-shadow: 0 0 5px #333;
  height: 72vh;
}

.title {
  display: flex;
  align-items: center;
  justify-content: center;

  height: 25px;

  color: #fff;
  background-color: #3cd7ff;

  font-size: 18px;
  font-weight: 500;
}

.el-icon-close {
  position: absolute;
  right: 0;

  display: inline-block;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 25px;
  height: 25px;

  cursor: pointer;
  transition: color 0.1s;

  color: #fff;

  font-weight: 900;

  &:hover {
    color: #f42;
  }
}

.search-box {
  display: flex;

  padding-top: 15px;
  border: 1px solid #e2e2e2;
}
.search {
  //   width: 25%;
  //   background-color: #333;
}
.form-input {
  width: 75%;
  padding: 0 20px;
  //   background-color: #999;
}

.form-table-box {
  padding: 10px 20px;
}

.row {
  display: flex;
  white-space: nowrap;
  margin-bottom: 10px;
  .item {
    display: flex;
    align-items: center;

    span {
      min-width: 4rem;
      text-align-last: justify;
    }
  }
}
.info {
  display: flex;
  white-space: nowrap;
  justify-content: start;
  margin-bottom: 10px;
  .items {
    display: flex;

    align-items: center;

    flex: 0;
  }
  .single {
    min-width: 152px;
  }
}
.bot-btn {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
