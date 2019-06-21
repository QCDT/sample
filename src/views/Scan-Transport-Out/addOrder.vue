<template>
  <div class="add-order-tmp">
    <!-- 添加订单的表单页面 -->
    添加订单的表单页面
    <test title="添加转出订单"></test>
  </div>
</template>
<script>
import transferOrder from "../Scan-Transport-Out-Change/transferOrder";
import test from "../Scan-Transport-Out-Change/transferOrder";

export default {
  props: {},
  components: { transferOrder, test },
  data() {
    return {};
  },
  methods: {},
  computed: {}
};
</script>
<style scoped lang='less'>
.add-order-tmp {
  background-color: #fff;
  margin-top: 87px;
}
</style>