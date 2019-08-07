<template>
  <div class="printerWrap">
      <div class="printerTitle">
          <span>打印机设置</span>
      </div>
      <div class="printerContent">
        <div class="printerLeft">
            <p>
                <span class="choiceType">选择样本盒或样本</span>
                <el-select v-model="printValue"  size="mini" class="selectBox">
                    <el-option
                    v-for="item in printType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </p>
            <div>
                <p><span class="choiceType">选择打印内容</span></p>
                <div  v-show="printValue == '样本'">
                   <el-checkbox-group 
                      v-model="printListA"
                      :max="3">
                      <el-checkbox v-for="(item,index) in printContentA" :key='index' :label="item" class="choiceContent">{{item}}</el-checkbox>
                   </el-checkbox-group>
                  <!-- <el-checkbox  v-model="item.checked" >{{item.title}}</el-checkbox> -->
                </div>
                <div v-show="printValue == '样本盒'">
                  <el-checkbox-group 
                      v-model="printListB"
                      :max="3">
                      <el-checkbox v-for="(item,index) in printContentB" :key='index' :label="item" class="choiceContent">{{item}}</el-checkbox>
                  </el-checkbox-group>
                </div>
                <div class="btns">
                   <el-button type="primary" size="mini" @click="savePrint">保存</el-button>
                    <el-button type="primary" size="mini" @click="$router.go(-1)">返回</el-button>
                </div>
            </div>
        </div>
        <div class="printerRight">
            <span><img src="@/assets/img/printer.jpg"/></span>
            <div class="preview" v-show="printValue === '样本'">
              <p v-for="item in printListA" :key="item"><span >{{item}}</span></p>
            </div>
            <div class="preview" v-show="printValue === '样本盒'">
              <p v-for="item in printListB" :key="item"><span>{{item}}</span></p>
            </div>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      printListA:[],
      printListB: [],
      printValue: '样本',
      printType: [
        {
          value: '样本',
          label: '样本'
        },
        {
          value: '样本盒',
          label: '样本盒'
        }
      ],
      printContentA: [ 
          '样本名称', '录入人名称', '冰箱名称','录入时间', '采样时间',
          '过期时间', '样本来源', '样本类别', '样本位置'
        ],
      printContentB: [
        '样本盒名称', '录入人名称','冰箱名称','录入时间','样本盒位置'
      ]
    }
  },
  methods:{
    savePrint(){
      // console.log(111)
    }
  }
}
</script>
<style lang="less" scoped>
.printerWrap{
  width: 100%;
  background: white;
}
.printerTitle{
    font-size: 18px;
    margin:20px 0;
    text-align: center;
}
.printerContent{
    width: 58%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    .btns{
      text-align: center;
      margin-top: 50px;
      button{
        margin-right: 10px;
      }
    }
    .printerLeft{
        margin-top: 60px;
        margin-right:20px;
        p{
            margin-top:10px;
            .printContent{
                width:130px;
            }
        }
        .btn{
            margin-top:20px;
        }
        .choiceType{
            font-size: 14PX;
            margin-right: 15px;
        }
        .choiceContent{
          display: inline-block;
          width: 25%;
          margin-top: 15px;
        }
        .selectBox{
          width:170px;
        }
    }
    .printerRight{
        position: relative;
        img{
            width: 300px;
            height: 350px;
        }
        .preview{
          position: absolute;
          left: 41%;
          top: 65%;
          p{
            margin-bottom: 10px;
          }
        }
    }
}
</style>

