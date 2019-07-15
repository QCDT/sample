<template>
  <!-- 核验中 -->
  <div class="checking-box">
    <div class="steps">
      <steps :active="stepsActive" :stepsData="stepsData"></steps>
    </div>
    <div class="progress-bar-box">
      <div class="pic">
        <img src="@/assets/img/sandian_heyanjia.png" alt>
      </div>
      <div class="right-progress">
        <div class="loading" v-if="percentage !== 100">
          <h1>
            核验中,请稍后
            <span style="width:20px;display: inline-block;">{{dian}}</span>
          </h1>
          <h2>0/0</h2>
        </div>
        <div v-else class="loading">
          <h1>核验完成</h1>
          <h2>0/0</h2>
        </div>
        <el-progress :percentage="percentage" :color="customColor" :stroke-width="12"></el-progress>
        <div class="bot-flex">
          <div class="time-interval">
            <span>间隔时间:&nbsp;&nbsp;&nbsp;</span>
            <el-select size="mini" style="width:70px" v-model="value" placeholder>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>&nbsp;秒
          </div>
          <div class="right-btn">
            <tmpButton>修改编组</tmpButton>
            <tmpButton>编组核验</tmpButton>
          </div>
        </div>
      </div>
      <div class="self-inspection">
        <tmpButton style="padding:7px 12px">修改完成</tmpButton>
        <tmpButton style="padding:7px 12px">自检</tmpButton>
      </div>
    </div>
    <!-- 表单 -->
    <div class="form-table">

      <el-table :row-style="{height:'32px',textAlign: 'center',padding:'0px',}" :cell-style="{padding:'0px',textAlign: 'center'}" border stripe ref="multipleTable" :data="tableData" tooltip-effect="dark" :style="{width: '100%',margin:'0 auto',}" :header-cell-style="getRowClass" @selection-change="handleSelectionChange" >
        <el-table-column type="index" label="序号" width="70"></el-table-column>
        <el-table-column label="试管1" width="200">
          <template slot-scope="scope">
            <button>{{ scope.row.orderName }}</button>
          </template>
        </el-table-column>
        <el-table-column label="试管2" width="200">
          <template slot-scope="scope">
            <button>{{ scope.row.orderName }}</button>
          </template>
        </el-table-column>
        <el-table-column label="试管3" width="200">
          <template slot-scope="scope">
            <button>{{ scope.row.orderName }}</button>
          </template>
        </el-table-column>
        <el-table-column label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="flex">
              <el-button @click="changProject(scope.row,scope.$index)" type="text" size="small">上</el-button>
              <el-button type="text" @click="open">下</el-button>
              <el-button type="text" @click="open">X</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="persorn" label="分离时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="persorn" label="核验时间" show-overflow-tooltip></el-table-column>
        <el-table-column label="是否溶血" width="100">
          <template slot-scope="scope">
            <el-checkbox v-model="tableData[scope.$index].test"/>
          </template>
        </el-table-column>
        <el-table-column label="操作人" width="100">
          <template slot-scope="scope">
            <div class="flex">
              <input type="text" @click="changProject(scope.row,scope.$index)" style="width:60%">
            </div>
          </template>
        </el-table-column>
      </el-table>
        <div class="table-info">
            <span>信息:&nbsp;&nbsp;共有&nbsp;{{tableData.length}}&nbsp;组</span>

        </div>
    </div>

    <div class="bot-btn">
      <tmpButton @click="cancel" style="padding:7px 12px">返回</tmpButton>
    </div>
  </div>
</template>
<script>
import tmpButton from '@/components/tmp/zhanglan/tmpButton'
import steps from '@/components/tmp/zhanglan/steps'
import { clearInterval, setTimeout, setInterval } from 'timers'
export default {
  props: {},
  components: { tmpButton, steps },
  data () {
    return {
      checked: '',
      percentage: 0, // 完成进度的百分比
      customColor: '#90bf46', // 已完成进度部分的颜色
      dian: '.',
      stepsActive: 0,
      stepsData: [
        { text: '订单信息' },
        { text: '选择样本' },
        { text: '编组核验' },
        { text: '完成' }
      ],
      timeSteps: null, // 定时 进度条
      timeLoading: null, // 定时 请稍后...
      options: [
        {
          value: 1,
          label: 1
        }
      ],
      value: 1,
      tableData: [
        {
          id: '1',
          name: '替格瑞洛', // 项目名称
          fangan: 'SN-YQ-2018005/V 1.0', // 方案号
          shenban: '石药集团中奇制药技术', // 申办方
          persorn: '李四', // 负责人
          yaowu: 'CSPCHA115胶囊', // 药物名称
          test: false
        }
      ],
      multipleSelection: []
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    open () {},
    changProject (rowData, index) {},
    getRowClass ({ rowIndex }) {
      return rowIndex == 0 ? this.$store.getters.formTheme : ''
    },
    customColorMethod (percentage) {
      /* 不同进度,不同颜色 */
      if (percentage < 30) {
        return '#909399'
      } else if (percentage < 99) {
        return '#e6a23c'
      } else {
        return '#409eff'
      }
    },
    setDian () {
      this.timeLoading = setInterval(() => {
        this.dian == '...' ? (this.dian = '') : (this.dian += '.')
        this.percentage >= 100
          ? (this.percentage = 100)
          : (this.percentage += 5)
      }, 500)
    },
    setStepsActive () {
      this.timeSteps = setInterval(() => {
        if (this.stepsActive++ > 3) this.stepsActive = 0
      }, 1500)
    },
    cancel () {
      /* 返回按钮 */
      this.clearSome()
      this.$emit('cancel')
    },

    clearSome () {
      /* 清除定时器 */
      clearInterval(this.timeSteps)
      clearInterval(this.timeLoading)
    }
  },

  computed: {},
  created () {
    this.setStepsActive()
    this.setDian()
  },
  beforeDestroy () {
    this.clearSome()
  }
}
</script>
<style scoped lang='less'>
.checking-box {
  position: relative;

  height: calc(100% - 1.45rem);
  padding-top: 1.45rem;
}

.bot-btn {
  position: absolute;
  bottom: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 150px;
}

.steps {
  margin-bottom: 10px;
}

/* 进度条 */
.progress-bar-box {
  display: flex;

  height: 100px;
  justify-content: space-around;

  padding: 10px 0;

  background-color: #fff;
  /* 左边的图片:试管位置示例 */
  .pic {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20%;
    img {
      cursor: pointer;
      transform: scale(0.8, 0.7) translateY(10px);
    }
  }
}

/* 核验中 -> 中间部分 */
.right-progress {
  //   background-color: #777;
  display: flex;
  flex-direction: column;
  //   justify-content: space-between;

  width: 60%;
  //   padding-top: 20px;
}

.bot-flex {
  /* 中间底部 */
  display: flex;
  margin-bottom: 10px;
  padding-top: 10px;

  .time-interval {
    display: flex;
    align-items: center;
    justify-content: center;
    // 时间间隔

    width: 50%;
  }

  .right-btn {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 40%;

    & /deep/ button {
      margin: 0 10px;
    }
  }
}

.loading {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  h1 {
    font-size: 22px;
  }
}

/* 自检&&修改完成 */
.self-inspection {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;

  width: 20%;
}

.form-table {
  padding: 15px;

  background-color: #fff;
  .table-info{
      padding-top: 7px;
  }
}
</style>
