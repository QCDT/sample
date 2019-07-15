<template>
  <div>
    <div class="press">
      <Progress />
    </div>
    <div class="content">
      <div class="left">
        <h1 class="name">名称</h1>
        <h2 class="remind">请添加检测样本</h2>
        <div class="collapse">
          <collapse></collapse>
        </div>
      </div>
      <div class="right">
        <div class="time-interval">
          <div>
            <span>间隔时间</span>:&nbsp;
            <el-select v-model="value" placeholder size="mini" style="width:70px;margin-right:30px">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div>
            <button>开始核验</button>
          </div>
        </div>
        <!-- <h1 class="name">样品分析序列</h1> -->

        <htTable :model="model" :row="row" :col="col"></htTable>
        <div class="row-sb" style="padding-top:10px">
          <div class="first">
            <div class="item">
              <span class="round" style="background-color:skyblue"></span> 已添加
            </div>
            <div class="item">
              <span class="round"></span> 未添加
            </div>
          </div>
          <div class="last">
            <button @click="overviews">一键总览</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 一键总览 -->
    <transition name="el-fade-in-linear">
      <masking v-if="ifOverViews">
        <overviews @close="ifOverViews=false"></overviews>
      </masking>
    </transition>
  </div>
</template>
<script>
import Progress from '@/components/tmp/zhanglan/Progress/index'
import htTable from '@/views/Scan-Detection/table'
import collapse from './collapse'
import overviews from './overviews'
import masking from '@/components/tmp/zhanglan/masking'
export default {
  props: {},
  components: { htTable, collapse, overviews, masking, Progress },
  data () {
    return {
      ifOverViews: false /* 一键总览 */,
      model: 2 /* 1,2,3 */,
      row: 12 /* max:12,min:1 */,
      col: 12 /* max:12,min:1 */,
      options: [
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: ''
    }
  },
  methods: {
    overviews () {
      this.$message('一键总览')
      this.ifOverViews = true
    }
  },
  computed: {},
  created () {
    this.$emit('setStepsActive', 1)
  }
}
</script>
<style scoped lang='less'>
.content {
  display: flex;
  .left,
  .right {
    width: 50%;
  }
  .left {
    display: flex;
    align-items: center;
    flex-direction: column;
    .remind {
      margin-bottom: 10px;
      font-weight: 500;
    }
  }
}
.name {
  display: flex;

  font-size: 20px;
  font-weight: 500;
  padding-top: 30px;
  margin-bottom: 20px;
}
.time-interval {
  align-items: center;
  display: flex;
  padding-top: 30px;
  margin-bottom: 20px;

  justify-content: space-around;
}
.right {
  display: flex;
  align-items: center;
  flex-direction: column;
  .row-sb {
    display: flex;

    justify-content: space-between;
    margin-bottom: 10px;
  }
  .first {
    display: flex;
    margin-right: 20px;
    .item {
      display: flex;
      align-items: center;
      margin: 0 10px;
      .round {
        display: inline-block;
        width: 13px;
        height: 13px;
        border: 1px solid #333;
        border-radius: 50%;
        margin: 0 7px;
      }
    }
  }
}
.press {
  width: 50%;
  margin: 0 auto;
}
</style>
