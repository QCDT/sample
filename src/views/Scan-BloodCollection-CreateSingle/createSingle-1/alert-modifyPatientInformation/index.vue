<<<<<<< HEAD
<template>
  <!-- 添加患者信息 -->
  <div class>
    <chunk @close="$emit('close')">
      <span slot="title">修改患者信息</span>
      <span slot="content">
        <h1>修改患者信息</h1>
      </span>
    </chunk>
  </div>
</template>
<script>
import tmpButton from '@/components/tmp/zhanglan/tmpButton'
import chunk from '@/views/Scan-BloodCollection-CreateSingle/createSingle-1/tmp-chunk'
export default {
  props: {},
  components: { tmpButton, chunk },
  data () {
    return {
      input: '',
      showPrint: false
    }
  },
  methods: {},
  computed: {}
}
</script>
<style scoped lang='less'>
</style>
=======
<template>
  <!-- 添加患者信息 -->
  <div class>
    <chunk @close="$emit('close')">
      <span slot="title">修改患者信息</span>
      <div slot="content" class="patientWrap">
        <el-checkbox v-model="replace">替换受试者</el-checkbox>
        <div class="patientInfo">
          <span>患者编号</span>
          <el-input size="mini"></el-input>
        </div>
        <div class="patientInfo">
          <span>患者姓名</span>
          <el-input size="mini"></el-input>
        </div>
        <div class="patientInfo">
          <span>姓名缩写</span>
          <el-input size="mini"></el-input>
        </div>
        <div class="patientInfo">
          <span>性别</span>
          <el-radio v-model="radio" label="1">男</el-radio>
          <el-radio v-model="radio" label="2">女</el-radio>
        </div>
        <div class="patientInfo">
          <span>身份证号</span>
          <el-input size="mini"></el-input>
        </div>
        <div class="patientInfo">
          <span>病房号</span>
          <el-select
            v-model="value"
            size="mini"
            filterable
            allow-create
            default-first-option
            placeholder="请选择病房">
            <el-option
              v-for="item in wardOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
       <div class="patientBtn">
         <el-button type="primary" size="mini">打印腕带</el-button>
        </div>
       <div class="patientInfo">
         <span>样本编号</span>
         <el-input size="mini"></el-input>
       </div>
       <div class="patientInfo" v-show="replace">
         <span>RFID编号</span>
         <el-input size="mini" disabled></el-input>
         <img src="@/assets/img/saomiao.gif">
       </div>
       <div class="patientBtn">
          <el-button type="primary" size="mini">确认</el-button>
       </div>
      </div>
    </chunk>
  </div>
</template>
<script>
import tmpButton from "@/components/tmp/zhanglan/tmpButton";
import chunk from "@/views/Scan-BloodCollection-CreateSingle/createSingle-1/tmp-chunk";
export default {
  props: {},
  components: { tmpButton, chunk },
  data() {
    return {
      input: "",
      showPrint: false,
      replace: false,
      radio: '1',
    };
  },
  methods: {},
  computed: {}
};
</script>
<style scoped lang='less'>
.patientWrap{
  // height: 200px;
  // background: red;
  .patientInfo{
    width: 70%;
    margin: 0 auto;
    // line-height: 45px;
    margin-top: 15px;
    >span{
      width: 30%;
      display: inline-block;
    }
    &/deep/.el-input{
      width: 70%;
    }
    img{
      width:30px;
      height: 30px;
      vertical-align: middle;
      margin-left:10px;
    }
  }
  .patientBtn{
    text-align: center;
    margin-top: 20px;
  }
}
</style>
>>>>>>> a6994a54ee8e86d397c8410f1933627f6e9d8b14
