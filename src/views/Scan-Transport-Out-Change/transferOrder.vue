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
import { provinceAndCityData ,CodeToText,regionData} from 'element-china-area-data'
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
    if(this.title == '添加转出订单'){
      this.$axios({
        method:'get',
        url:'/sampleGuide/trans/autoTransportOrder'
      })
      .then(({data})=>{
        console.log(data)
        if(data.code == 200){
          this.dataListA.push(data.data)
          console.log(this.dataListA)
        }
      })
    }else{
      
    }
  },
  watch:{
    selectedOptionA(){
      this.areaA = this.selectedOptionA.map((item)=>{
        return CodeToText[item]
      })
      console.log(this.areaA)
    },
    selectedOptionB(){
      this.areaB = this.selectedOptionB.map((item)=>{
        return CodeToText[item]
      })
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
      if(this.dataListA.length === 3 && this.dataListB.length ===3 && this.areaA && this.areaB && this.addressA && this.addressB ){
        let  reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
        if(!reg.test(this.dataListA[2])){
            alert("收件人手机格式不正确");
            return;
        }
        if(!reg.test(this.dataListB[2])){
            alert("寄件人手机格式不正确");
            return;
        }
        this.$axios({
          method:'post',
          url:'/sampleGuide/trans/selectOrderByNameOrNumber',
          data:({
            orderName:this.dataListB[0]
          })
        })
        .then(({data})=>{
          console.log(data)
          if(data.code == 200){
            if(data.data == 0){
              this.$message({
                message: '订单名称已存在!',
                type: 'warning'
              });
            }else{
              this.$axios({
                method:'post',
                url:'/sampleGuide/trans/addTransportOrder',
                data:({
                  orderNumber: this.dataListA[0],
                  recipients:this.dataListA[1],
                  recipientsTel:this.dataListA[2],
                  orderName:this.dataListB[0],
                  sender:this.dataListB[1],
                  senderTel:this.dataListB[2],
                  recipientsAddress:this.addressA,
                  recipientsProvince: this.areaA[0],
                  recipientsCity:this.areaA[1],
                  senderProvince: this.areaB[0],
                  senderCity: this.areaB[1],
                  senderAddress:this.addressB,
                  remarks: this.mark
                })
              })
              .then(({data})=>{
                console.log(data)
                if(data.code==200){
                  this.$message({
                    message: '新增转运订单成功!',
                    type: 'success'
                  });
                  this.$emit('confirm')
                }else{
                  this.$message({
                    message:data.message,
                    type: 'warning'
                  });
                }
              })
            }
          }else{
            this.$message({
              message:data.message,
              type: 'warning'
            });
          }
        })
      }else{
        this.$message({
          message: '请完善订单信息！',
          type: 'warning'
        });
      }
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
