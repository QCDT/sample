<template>
  <!-- 转入主页 -->
  <div class="transport-in-index">
    <fromName>转出订单查询</fromName>
    <addAndSearch  type='in'></addAndSearch>
  </div>
</template>
<script>
import addAndSearch from "../Scan-Transport-Out/addAndSearch";
import fromName from "@/components/tmp/zhanglan/fromName";
export default {
  props: {},
  components: { addAndSearch, fromName },
  data() {
    return {};
  },
  methods: {},
  computed: {}
};
</script>
<style scoped lang='less'>
.transport-in-index {
  padding: 0 20px;
}
</style>