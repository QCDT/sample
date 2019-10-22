<template>
  <!-- 转出主页:添加订单按钮 查询部分 -->
  <div>
    <div v-if="type==='in'">
      <upLoad></upLoad>
    </div>
    <tmpButton style="margin-bottom:20px" @click="addOrder" v-if="type==='out'">
      <div class="btn-box">
        <i class="icon icon-add"></i>
        <span>添加订单</span>
      </div>
    </tmpButton>
    <div class="form-box" v-if="type === 'in'">
      <div class="item">
        <span>转入订单号码:</span>
        <el-input v-model="input" size="small" placeholder="请输入内容"></el-input>
      </div>
      <div class="item">
        <span>转入订单名称:</span>
        <el-input v-model="input" size="small" placeholder="请输入内容"></el-input>
      </div>
      <div class="item">
        <span>转入录入人员:</span>
        <el-input v-model="input" size="small" placeholder="请输入内容"></el-input>
      </div>
      <div class="item">
        <span>转入寄件人员:</span>
        <el-input v-model="input" size="small" placeholder="请输入内容"></el-input>
      </div>
      <div class="item">
        <span>转入寄件地址:</span>
        <el-input v-model="input" size="small" placeholder="请输入内容"></el-input>
      </div>
      <div class="item">
          <div class="search-box">
            <i class="icon icon-sousuo"></i>
            <b>查询</b>
          </div>
      </div>
    </div>
    <div class="form-box" v-if="type === 'out'">
      <div class="item">
        <span>转出订单号码:</span>
        <el-input v-model="input" size="small" placeholder="请输入内容"></el-input>
      </div>
      <div class="item">
        <span>转出订单名称:</span>
        <el-input v-model="input" size="small" placeholder="请输入内容"></el-input>
      </div>
      <div class="item">
        <span>转出录入人员:</span>
        <el-input v-model="input" size="small" placeholder="请输入内容"></el-input>
      </div>
      <div class="item">
        <span>转出收件人员:</span>
        <el-input v-model="input" size="small" placeholder="请输入内容"></el-input>
      </div>
      <div class="item">
        <span>转出收货地址:</span>
        <el-input v-model="input" size="small" placeholder="请输入内容"></el-input>
      </div>
      <div class="item">
          <div class="search-box">
            <i class="icon icon-sousuo"></i>
            <b>查询</b>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import fromName from '@/components/tmp/zhanglan/fromName'
import tmpButton from '@/components/tmp/zhanglan/tmpButton'
import masking from '@/components/tmp/zhanglan/masking'
import addOrder from './addOrder'
import name from '@/components/tmp/zhanglan/tmpButton'
import upLoad from '@/components/tmp/zhanglan/upLoad.vue'
export default {
  props: {
    type: {
      type: String
    }
  },
  components: { fromName, tmpButton, masking, addOrder, upLoad },
  data () {
    return {
      input: '',
      orderTmp: false,
    }
  },
  methods: {
    addOrder () {
      this.$router.push('/scan/transport/out/add')
      // this.orderTmp = true
      // this.$emit('addOrder',this.orderTmp)
    },
    // closeMask () {
    //   this.orderTmp = false
    //   this.$emit('addOrder',this.orderTmp)
    // }
  },
  computed: {}
}
</script>
<style scoped lang='less'>
.btn-box {
  padding: 1px 25px;
  display: flex;

  align-items: center;

  i {
    font-size: 19px;
    padding: 0 2px;
  }
  font-size: 15px;
}
.form-box {
  border: 1px solid #979797;
  padding: 12px;
  display: flex;
  .item {
    padding: 0 20px;
    span {
      display: inline-block;
      margin-bottom: 10px;
    }
  }
}
.search-box {
  background: #00c9ff;
  border-radius: 5px;
  padding: 5px 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
  color: white;
  cursor: pointer;
  span {
    background-color: #fff;
  }
  b {
    padding: 4.5px;
  }
}
.rollOut{
  width: 100%;
  background: #fff;
  position: absolute;
  top: 11%;
  left: 0;
  z-index: 1;
  // text-align: center;
}
.btn{
  text-align: center;
}
</style>
