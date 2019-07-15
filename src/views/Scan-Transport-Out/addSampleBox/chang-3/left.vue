<template>
  <div class="chang-3-box">
    <div class="saomiao">
      <img src="@/assets/img/saomiao.gif" alt title="扫描" />
    </div>
    <span>RFID编号:</span>
    <span>样本盒名称:</span>
    <span>位置信息:</span>
  </div>
</template>
<script>
export default {
  props: {},
  components: {},
  data () {
    return {}
  },

  methods: {},
  computed: {}
}
</script>
<style scoped lang='less'>
.chang-3-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;

}
span{
  padding-top: 10px;
  width: 6rem;

}
</style>
