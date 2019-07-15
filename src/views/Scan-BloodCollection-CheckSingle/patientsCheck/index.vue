<template>
  <!-- 患者核验 -->
  <div>
    <div class="color-chunk">
      <colorChunk>
        <span slot="title">订单信息</span>
        <span slot="content">
          <div class="row one">
            <div class="item">
              <span>编号:&nbsp;&nbsp;&nbsp;001</span>
            </div>
            <div class="item">
              <span>姓名:&nbsp;&nbsp;&nbsp;张三</span>
            </div>
            <div class="item">
              <span>性别:&nbsp;&nbsp;&nbsp;男</span>
            </div>
          </div>
          <div class="row one">
            <div class="item">
              <span>身份证:&nbsp;&nbsp;&nbsp;333333333333333333</span>
            </div>
          </div>
          <div class="row one">
            <div class="item">
              <span>采血管备注:&nbsp;&nbsp;&nbsp;</span>
              <el-input size="mini" v-model="mark" placeholder="请输入内容"></el-input>
            </div>
          </div>
        </span>
      </colorChunk>
      <colorChunk>
        <span slot="title">开始核验</span>
        <span slot="content">
          <div class="two">
            <div class="pic">
              <img src="@/assets/img/check_heyan.gif" alt>
            </div>
            <div class="progress">
              <el-progress
                :text-inside="true"
                :stroke-width="12"
                :percentage="percentage"
                :color="customColor"
              ></el-progress>
            </div>
          </div>
        </span>
      </colorChunk>
      <colorChunk>
        <span slot="title">倒计时时间</span>
        <span slot="content">
          <div class="three">
            <div class="time-now">{{resTime}}</div>
            <div class="big-time">
              {{second}}
              <span>s</span>
            </div>
          </div>
        </span>
      </colorChunk>
    </div>
    <div class="form-top-menu">
      <form-top-menu></form-top-menu>
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
      >
        <el-table-column type="index" label="序号" width="70"></el-table-column>
        <el-table-column label="采血管" width="150">
          <template slot-scope="scope">
            <div class="flex">
              <router-link
                :to="{name:'patientsCheck'}"
                style="color:#333"
              >{{tableData[scope.$index].name}}</router-link>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="fangan" label="计划采血时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="shenban" label="核验时间"></el-table-column>
        <el-table-column prop="shenban" label="实际采血时间"></el-table-column>
        <el-table-column label="试管容量类别" width="120">
          <template slot-scope="scope">
            <el-input size="mini" placeholder="试管容量类别"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="实际容量" width="100">
          <template slot-scope="scope">
            <div class="flex">
              <el-input size="mini" placeholder="实际容量"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <div class="flex">
              <i class="icon icon-th1" style="font-size:22px"></i>
              <!-- <router-link :to="{name:'patientOrderInfo'}" style="color:#333">X</router-link> -->
              <!-- <el-button @click="changProject(scope.row,scope.$index)" type="text" size="small">姓名</el-button> -->
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作人" width="100">
          <template slot-scope="scope">
            <div class="flex">
              <el-input size="mini" placeholder="操作人"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作备注" width="200">
          <template slot-scope="scope">
            <div class="flex">
              <el-input size="mini" placeholder="操作备注"></el-input>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import colorChunk from './colorChunk'
import { setTimeout, setInterval } from 'timers'
import formTopMenu from './formTopMenu'
export default {
  props: {},
  components: { colorChunk, formTopMenu },
  data () {
    return {
      mark: '',
      percentage: 60,
      customColor: '#90bf46',
      second: 45,
      test: {
        hour12: false,
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      },
      day: ['天', '一', '二', '三', '四', '五', '六'],
      timer: null,
      newDate: '',
      time: '',
      resTime: '',

      tableData: [
        {
          id: '1',
          name: 'CSPCHA115-25mg-Sub102-D1-0h', // 采血管
          fangan: '2018.11.23.10.10.10', // 计划采血时间
          shenban: '2018.11.23.10.10.10', // 核验时间
          shenban: '2018.11.23.10.10.10' // 实际采血时间
        }
      ],
      multipleSelection: []
    }
  },
  methods: {
    getRowClass ({ rowIndex }) {
      return rowIndex == 0 ? this.$store.getters.formTheme : ''
    },
    changProject (rowData, index) {},
    setsecond () {
      /* 设置倒计时 */

      this.second - 1 < 0 ? (this.second = 12) : --this.second
    },
    setDate () {
      /* 拿到时间 */ this.newDate = new Date()
      this.time = this.newDate.getTime()
    },
    format () {
      /* 格式化时间 */ this.newDate.setTime((this.time += 1000))
      let t = this.newDate.toLocaleString('chinese', this.test)
      let d = `星期${this.day[this.newDate.getUTCDay()]}`
      this.resTime = `20${t + d}`.replace('/', '年').replace('/', '月')
    },

    runing () {
      /* 格式化时间 -> 定时器 */ this.format()
      this.timer = setInterval(_ => {
        this.format()
        this.setsecond()
      }, 1000)
    },
    clearTimer () {
      clearInterval(this.timer)
    },
    run () {
      this.setDate()
      this.format()
      this.runing()
    }
  },
  computed: {},
  created () {
    this.$emit('getMessage', 2)
    this.run()
  },
  beforeDestroy () {
    this.clearTimer()
  }
}
</script>
<style scoped lang='less'>
.color-chunk {
  display: flex;
  justify-content: space-between;

  margin-bottom: 10px;
  &/deep/.color-chunk-box {
    width: 32.2%;
  }
}
.one {
  display: flex;

  .item {
    display: flex;
    margin: 0 30px 10px 0;
    font-size: 16px;
    white-space: nowrap;
  }
}
// 二
.two /deep/.el-progress-bar__inner {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.two {
  .pic {
    cursor: pointer;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  .progress {
    padding-top: 15px;
    width: 90%;
  }
}
.three {
  .time-now {
    display: flex;
    justify-content: center;
    margin-bottom: 18px;
  }
  .big-time {
    width: 4.5rem;
    justify-content: flex-end;
    //   justify-content: center;
    margin: 0 auto;
    display: flex;
    align-items: center;

    font-size: 50px;
    color: #000;
    user-select: none;
  }
}
</style>
