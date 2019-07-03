<template>
  <!-- 添加患者信息 -->
  <div class>
    <chunk @close="$emit('close')">
      <span slot="title">添加患者信息</span>
      <div slot="content" class="patientWrap">
        <div class="patientInfo">
          <span>编号</span>
          <el-input size="mini"></el-input>
        </div>
        <div class="patientInfo">
          <span>姓名</span>
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
          <span>病房</span>
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
       <div class="patientBtn"><el-button type="primary" size="mini">打印腕带</el-button></div>
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
      value: '',
      radio: '1',
      wardOptions: [
      ]
    };
  },
  methods: {
  },
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
  }
  .patientBtn{
    text-align: center;
    margin-top: 20px;
  }
}
</style>