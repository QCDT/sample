<template>
  <div class="yangben-wrap">
    <!-- 样本信息 -->
    <div class="left">
      <h1>样本流程</h1>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!--  -->
        <el-tab-pane label="详细日志" name="first">详细日志</el-tab-pane>
        <!--  -->
        <el-tab-pane label="重要日志" name="second">
          <el-timeline>
            <el-timeline-item timestamp="2018/4/12" placement="top">
              <el-card>
                <h4>转入</h4>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/3" placement="top">
              <el-card>
                <h4>样本接收</h4>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/2" placement="top">
              <el-card>
                <h4>开始离心</h4>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/2" placement="top">
              <el-card>
                <h4>结束离心</h4>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/2" placement="top">
              <el-card>
                <h4>分装</h4>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="center">
      <span
        class="item"
        v-for="(item,index) in centerData"
        :key="index"
      >{{item.key}}: {{item.value}}</span>
    </div>
    <div class="right">
      <h1>位置信息</h1>
      <h1>存储柜-1-1-1-1</h1>
      <div class="matrix-box">
        <div class="matrix">
          <div class="row" v-for="(row,index) in matrixData" :key="index">
            <em
              v-for="(item,ind) in row"
              :key="ind"
              :style="{backgroundColor:item.bgc}"
            >{{index*10+ind+1}}</em>
          </div>
        </div>
        <div class="map">
          <span>已使用</span>
          <span>借用</span>
          <span>当前位置</span>
          <span>未使用</span>
        </div>
      </div>
      <div class="mark">
        <h1>备注</h1>
        <el-input
          type="textarea"
          :rows="4"
          placeholder="请输入内容"
          maxlength="1000"
          show-word-limit
          v-model="mark"
        ></el-input>
      </div>
    </div>
    <goBack></goBack>
  </div>
</template>
<script>
import goBack from '@/components/tmp/zhanglan/go-1'
export default {
  props: {},
  components: { goBack },
  data () {
    return {
      // 备注
      mark: '',
      // 点阵数据
      matrixData: [
        [
          { bgc: '#111' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' }
        ],
        [
          { bgc: '#222' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' }
        ],
        [
          { bgc: '#333' },
          { bgc: '#f42' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' }
        ],
        [
          { bgc: '#444' },
          { bgc: '#f99' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' }
        ],
        [
          { bgc: '#000' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' }
        ],
        [
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' }
        ],
        [
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' }
        ],
        [
          { bgc: '#555' },
          { bgc: 'blue' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' }
        ],
        [
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' }
        ],
        [
          { bgc: '#555' },
          { bgc: 'yellow' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' },
          { bgc: '#555' },
          { bgc: '#777' }
        ]
      ],
      activeName: 'second',
      centerData: [
        { key: 'RFID编号', value: 'E00401509346E824', type: 'text' },
        { key: '*样本名称', value: 'NMDP-D1-101-0h', type: 'text' },
        { key: '样本类别', value: '全血', type: 'text' },
        { key: '样本来源', value: ' ', type: 'text' },
        { key: '采样日期', value: ' ', type: 'text' },
        { key: '录入日期', value: '2019-05-8 16:06:04 ', type: 'text' },
        { key: '过期日期', value: ' ', type: 'text' },
        { key: '提前报警天数', value: ' ', type: 'text' },
        { key: '管帽色', value: ' ', type: 'text' },
        { key: '项目编号', value: ' ', type: 'text' },
        { key: '方案编号', value: 'BJK-PK-NMDP ', type: 'text' },
        { key: '剂量计', value: '8mg', type: 'text' },
        { key: '受试者号', value: '101', type: 'text' },
        { key: '实验采血日期', value: 'Day 1 0h ', type: 'text' },
        { key: '基质描述', value: 'Blood', type: 'text' }
      ]
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  },
  computed: {}
}
</script>
<style scoped lang='less'>
.yangben-wrap {
    display: flex;

    height: 70vh;
    padding: 0 150px;
    padding-top: 3vh;
    padding-bottom: 3vh;

    background-color: #eee;

    .left {
        overflow: auto;
        flex: 1;

        padding: 0 20px;

        border-right: 1px solid #bbb;
        background-color: #fff;
    }

    .center {
        flex: 1;

        padding: 0 20px;

        border-right: 1px solid #bbb;
    }

    .right {
        flex: 1;

        padding: 0 20px;
    }
}

.center {
    display: flex;
    flex-direction: column;

//   align-items:center;
    justify-content: space-around;

    .item {
        margin-bottom: 10px;

        font-size: 16px;
    }
}

// right
.right {
    h1 {
        margin-bottom: 10px;

        font-size: 15.5px;
        font-weight: 500;
    }
}

.matrix-box {
    display: flex;
    justify-content: space-between;

    .matrix {
        border-top: 1px solid #333;
        border-left: 1px solid #333;
    }

    .row {
        display: flex;

        border-bottom: 1px solid #333;
    }

    em {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 23px;
        height: 20px;

        border-right: 1px solid #333;

        font-size: 11px;
    }
}

.mark {
    padding-top: 30px;

    h1 {
        margin-bottom: 12px;
    }
}

.map {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    width: 60px;
    height: 150px;

    cursor: pointer;
    white-space: nowrap;

    font-size: 13px;

    span {
        display: flex;
        align-items: center;
        justify-content: center;

        padding: 2px 3px;
  font-size: 13px;
        color: #333;
        border-radius: 3px;
        background-color: #f99;
    }
}

</style>
