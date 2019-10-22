<template>
  <!-- 修改转出订单 -->
  <div>
    <table class="transfer-order-box">
      <tr>
        <th class="title" colspan="4">{{title}}</th>
      </tr>
      <tr v-for="(item,index) in addContentA" :key="index">
        <td colspan="2" width="50%">
          <fromItem>
            {{item}}
            <input type="text" v-model="dataListA[index]" slot="input">
          </fromItem>
        </td>
        <td colspan="2" width="50%">
          <fromItem>
             {{addContentB[index]}}
             <input type="text" v-model="dataListA[index]" slot="input">
          </fromItem>
        </td>
      </tr>
      <tr>
        <td colspan="4" class="mark">
          <h1>备注:</h1>
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="mark"
            maxlength="1000"
            show-word-limit
          ></el-input>
        </td>
      </tr>
      <tr></tr>
    </table>
    <div class="ack-btn">
      <tmpButton  @click="confirmAddOrder">确认</tmpButton>
    </div>
  </div>
</template>
<script>
import fromItem from './tmp-fromItem'
import tmpButton from '@/components/tmp/zhanglan/tmpButton'
export default {
  props: {
    title: String
  },
  components: {
    fromItem,
    tmpButton
  },
  data () {
    return {
      mark: '',
      addContentA:["订单号","收件人","收件人联系方式","收件地址"],
      addContentB:["订单名称","寄件人","寄件人联系方式","寄件地址"],
      dataListA:[],
      dataListB:[]
    }
  },
  methods: {
    confirmAddOrder(){
      this.$emit('confirm')
    }
  },
  computed: {}
}
</script>
<style scoped lang='less'>
.transfer-order-box {
  width: 100%;
  margin-top: 20px;
}
table {
  border-collapse: collapse;
  border: 1px solid #999;
}
td {
  height: 40px;
  border: 1px solid #999;
}
.title {
  height: 40px;
  font-size: 20px;
  font-weight: 600;
}
.mark {
  padding: 20px 30px;
  h1 {
    margin-bottom: 10px;
  }
}
.ack-btn {
  margin-bottom: 20px;
  display: flex;
  padding: 10px 0;
  justify-content: center;
  align-items: center;
}
</style>
