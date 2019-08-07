<template>
  <!-- 添加样本盒 -->
  <div class="add-sample-box">
    <fromName>转出样本盒</fromName>
    <div class="content">
      <div class="left">
        <div class="invariant">
          <h1>选择转运样本盒</h1>
          <el-select size="small" v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="change">
          <!-- <transition name="el-zoom-in-top" mode="out-in"> -->
            <oneL v-if="value===1" @test="test"></oneL>
            <twoL v-if="value===2" @locationData="locationData"></twoL>
            <threeL v-if="value===3" @test="test"></threeL>
          <!-- </transition> -->
        </div>
      </div>
      <div class="right">
        <!-- <transition name="el-zoom-in-top"  mode="out-in"> -->
          <oneR v-if="value===1" @test="test"></oneR>
          <twoR v-if="value===2||value===3" @test="test"></twoR>
        <!-- </transition> -->
      </div>
    </div>
    <div class="bot-btn">
      <button @click="save">保存</button>
      <button @click="$emit('close')">返回</button>
    </div>
  </div>
</template>
<script>
import fromName from '@/components/tmp/zhanglan/fromName'
import oneL from './chang-1/left'
import oneR from './chang-1/right'
import twoL from './chang-2/left'
import twoR from './chang-2/right'
import threeL from './chang-3/left'
import threeR from './chang-3/right'

export default {
  props: {},
  components: { fromName, oneL, oneR, twoL, twoR, threeL, threeR },
  data () {
    return {
      a: '',
      options: [
        { value: 1, label: '新建样本盒' },
        { value: 2, label: '选择已有样本盒' },
        { value: 3, label: '扫描已有样本盒' }
      ],
      value: ''
    }
  },
  methods: {
    test (v) {
      console.log('v: ', v)
      this.a = v
    },
    save () {
      this.$emit('save')
    },
    locationData (v) {
      /* 左2:冰箱位置 */
      console.log('冰箱位置: ', v)
    }
  },
  computed: {}
}
</script>
<style scoped lang='less'>
.add-sample-box {
  background-color: #eee;
  height: 95%;
  padding: 20px 20px 0;
  &/deep/h1 {
    font-weight: 500;
    margin-bottom: 5px;
  }
}
.content {
  display: flex;
  height: 65%;

  .left,
  .right {
    flex: 1;
    height: 100%;
    width: 50%;
    padding: 0 200px 0 40px;

    box-sizing: border-box;
  }
  .left {
    border-right: 1px solid #3cd7ff;
  }
}
.invariant {
  margin-bottom: 10px;
}
.bot-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  button {
    margin: 0 20px;
  }
}
</style>
