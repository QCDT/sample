<template>
  <div class="collapse-box">

    <div class="zhedie">
      <div class="item" @click="show=!show">
        <h1>0/12</h1>
        <span>A1-A12</span>
      </div>
      <el-collapse-transition>
        <div class="content" v-show="show" @click.self="show=!show">
          <div class="single" @click.self="show=!show">
            <h1 @click.self="show=!show">A1</h1>
            <input disabled type="text" @click.self="ifSelectSample=true" />
          </div>
          <div class="single" @click.self="show=!show">
            <h1 @click.self="show=!show">A1</h1>
            <input disabled type="text" @click.self="ifSelectSample=true" />
          </div>
        </div>
      </el-collapse-transition>
    </div>
    <div class="zhedie">
      <div class="item" @click="show2=!show2">
        <h1>0/12</h1>
        <span>A1-A12</span>
      </div>
      <el-collapse-transition>
        <div class="content" v-show="show2" @click.self="show2=!show2">
          <div class="single" @click.self="show2=!show2">
            <h1 @click.self="show=!show2">A1</h1>
            <input disabled type="text" @click.self="ifSelectSample=true" />
          </div>
          <div class="single" @click.self="show2=!show2">
            <h1 @click.self="show2=!show2">A1</h1>
            <input  disabled type="text" @click.self="ifSelectSample=true" />
          </div>
        </div>
      </el-collapse-transition>
    </div>

    <transition name="el-fade-in-linear">
      <masking v-if="ifSelectSample">
        <selectSample @close="ifSelectSample=false"></selectSample>
      </masking>
    </transition>
  </div>
</template>
<script>
import masking from '@/components/tmp/zhanglan/masking'
import selectSample from './selectSample'
export default {
  props: {},
  components: { masking, selectSample },
  data () {
    return {
      ifSelectSample: false,
      show: false,
      show2: false
    }
  },
  methods: {
    click () {
      this.$message('123')
    }
  },
  computed: {}
}
</script>
<style scoped lang='less'>
.zhedie {
  border: 1px solid #333;
  &:last-child {
    border-top: 1px solid transparent;
  }
  .item {
    position: relative;
    display: flex;
    width: 270px;
    justify-content: center;
    align-items: center;
    padding: 10px 15px;
    h1 {
      position: absolute;
      left: 15px;
    }
  }
  .content {
    .single {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      padding: 10px 15px;
      border-top: 1px solid #333;
      h1 {
        position: absolute;
        left: 15px;
      }
    }
  }
}
</style>
