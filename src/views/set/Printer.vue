<template>
  <div class="printerWrap">
      <div class="printerTitle">
          <span>打印机设置</span>
      </div>
      <div class="printerContent">
        <div class="printerLeft">
            <p>
                <span class="choiceType">选择样本盒或样本</span>
                <el-select v-model="printValue" filterable size="mini" class="selectBox">
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
                <p>
                <el-checkbox class="printContent" v-model="item.checked" v-for="(item,index) in printContentA" :key='index'>{{item.title}}</el-checkbox>
                </p>
                <p>
                <el-checkbox class="printContent" v-model="item.checked" v-for="(item,index) in printContentB" :key='index'>{{item.title}}</el-checkbox>
                </p>
                <p>
                <el-checkbox class="printContent" v-model="item.checked" v-for="(item,index) in printContentC" :key='index'>{{item.title}}</el-checkbox>
                </p>
            </div>
            <el-button type="primary" class="btn" size="small">打印预览</el-button>
        </div>
        <div class="printerRight">
            <span><img src="@/assets/img/printer.jpg"/></span>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      printValue: '',
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
        {
          title: '样本名称',
          checked: false
        },
        {
          title: '录入人名称',
          checked: false
        },
        {
          title: '冰箱名称',
          checked: false
        }
      ],
      printContentB: [
        {
          title: '录入时间',
          checked: false
        },
        {
          title: '采样时间',
          checked: false
        },
        {
          title: '过期时间',
          checked: false
        }
      ],
      printContentC: [
        {
          title: '样本来源',
          checked: false
        },
        {
          title: '样本类别',
          checked: false
        },
        {
          title: '样本位置',
          checked: false
        }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
.printerWrap{
  width: 100%;
//   text-align: center;
}
.printerTitle{
    font-size: 18px;
    margin:20px 0;
    text-align: center;
}
.printerContent{
    width: 100%;
    display: flex;
    justify-content: center;
    .printerLeft{
        // float: left;
        margin-top: 60px;
        margin-right:20px;
        text-align: center;
        p{
            margin-top:10px;
            text-align: left;
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
        .selectBox{
            width:170px;
        }
    }
    .printerRight{
        img{
            width: 300px;
            height: 350px;
        }
    }
}
</style>

