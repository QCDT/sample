<template>
  <!-- 添加患者信息 -->
  <div class>
    <chunk @close="$emit('close')">
      <span slot="title">修改腕带信息</span>
      <div slot="content" class="patientWrap">
        <div class="patientInfo">
          <span>RFID编号</span>
          <el-input size="mini" disabled></el-input>
          <img src="@/assets/img/saomiao.gif">
        </div>
        <div class="patientBtn">
            <el-button type="primary" size="mini">确认并打印腕带</el-button>
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
      showPrint: false
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
    text-align: center;
    // line-height: 45px;
    width: 100%;
    margin-top: 15px;
    >span{
      width: 30%;
      display: inline-block;
    }
    &/deep/.el-input{
      width: 50%;
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