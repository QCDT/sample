<template>
  <!-- 修改转出订单 -->
  <div>
    <table class="transfer-order-box">
      <tr>
        <th class="title" colspan="4">{{title}}</th>
      </tr>
      <tr v-for="(item,index) in addContentA" :key="index">
        <td colspan="2">
          <fromItem>
            {{item}}
            <input type="text" v-model="dataListA[index]" slot="input" :disabled='index==0'>
          </fromItem>
        </td>
        <td colspan="2">
          <fromItem>
             {{addContentB[index]}}
             <input type="text" v-model="dataListB[index]" slot="input">
          </fromItem>
        </td>
      </tr>
      <tr>
        <td colspan="2">
           <fromItem>
              收件人地址
            <!-- <span>收件人地址</span> -->
            <el-cascader
              size="mini"
              slot="input"
              :options="options"
              v-model="selectedOptionA">
            </el-cascader>
            <input type="text" slot="inputAddress" v-model="addressA">
          </fromItem>
        </td>
        <td colspan="2">
           <fromItem>
              寄件人地址
            <!-- <span>收件人地址</span> -->
              <el-cascader
                size="mini"
                slot="input"
                :options="options"
                v-model="selectedOptionB">
              </el-cascader>
              <input type="text" slot="inputAddress" v-model="addressB">
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
    </table>
    <div class="ack-btn">
      <tmpButton  @click="confirmAddOrder">确认</tmpButton>
    </div>
  </div>
</template>
<script>
import { provinceAndCityData ,CodeToText} from 'element-china-area-data'
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
  created(){
  },
  watch:{
    selectedOptionA(){
      this.areaA = this.selectedOptionA.map((item)=>{
        return CodeToText[item]
      }).join('')
      console.log(this.areaA)
    },
    selectedOptionB(){
      this.areaB = this.selectedOptionB.map((item)=>{
        return CodeToText[item]
      }).join('')
      console.log(this.areaB)
    }
  },
  data () {
    return {
      mark: '',
      addContentA:["订单号","收件人","收件人联系方式"],
      addContentB:["订单名称","寄件人","寄件人联系方式"],
      addressA:'',
      addressB:'',
      areaA:'',
      areaB:'',
      dataListA:[],
      dataListB:[],
      options: provinceAndCityData,
      selectedOptionA: [],
      selectedOptionB: []
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
  // text-align: center;
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
