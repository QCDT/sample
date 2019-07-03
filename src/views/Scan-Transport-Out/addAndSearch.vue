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
    <!--  -->
    <transition name="el-fade-in-linear">
      <masking v-if="orderTmp" :rgba="0">
        <addOrder></addOrder>
        <tmpButton @click="closeMask">返回</tmpButton>
      </masking>
    </transition>
    <!--  -->
    <div class="form-box">
      <div class="item">
        <span>转入订单号码:</span>
        <el-input v-model="input" size="small" placeholder="请输入内容"></el-input>
      </div>
      <div class="item">
        <span>转入订单号码:</span>
        <el-input v-model="input" size="small" placeholder="请输入内容"></el-input>
      </div>
      <div class="item">
        <span>转入订单号码:</span>
        <el-input v-model="input" size="small" placeholder="请输入内容"></el-input>
      </div>
      <div class="item">
        <span>转入订单号码:</span>
        <el-input v-model="input" size="small" placeholder="请输入内容"></el-input>
      </div>
      <div class="item">
        <span>转入订单号码:</span>
        <el-input v-model="input" size="small" placeholder="请输入内容"></el-input>
      </div>
      <div class="item">
        <span>转入订单号码:</span>
        <tmpButton>
          <div class="search-box">
            <i class="icon icon-sousuo"></i>
            <b>查询</b>
          </div>
        </tmpButton>
      </div>
    </div>
  </div>
</template>
<script>
import fromName from "@/components/tmp/zhanglan/fromName";
import tmpButton from "@/components/tmp/zhanglan/tmpButton";
import masking from "@/components/tmp/zhanglan/masking";
import addOrder from "./addOrder";
import name from "@/components/tmp/zhanglan/tmpButton";
import upLoad from "@/components/tmp/zhanglan/upLoad.vue";
export default {
  props: {
    type: {
      type: String
    }
  },
  components: { fromName, tmpButton, masking, addOrder, upLoad },
  data() {
    return {
      input: "",
      orderTmp: false
    };
  },
  methods: {
    addOrder() {
      console.log("addorder: ", "添加订单");
      this.orderTmp = true;
    },
    closeMask() {
      this.orderTmp = false;
    }
  },
  computed: {}
};
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
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    background-color: #fff;
  }
  b {
    padding: 4.5px;
  }
}
</style>
