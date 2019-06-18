<template>
  <div class="caixue-wrap">
    <tmptaggle :mainPic="left.mainPic" :link_1="left.mainPic" :link_2="left.mainPic">
      <img src="@/assets/img/caixue_onepeople.png" alt slot="pic1">
      <img src="@/assets/img/caixue_morepeople.png" alt slot="pic2">
    </tmptaggle>
    <tmptaggle :mainPic="right.mainPic" :link_1="left.mainPic" :link_2="left.mainPic">
      <img src="@/assets/img/caixue_addonepatient.png" alt slot="pic1">
      <img src="@/assets/img/caixue_addmorepatient.png" alt slot="pic2">
    </tmptaggle>
    <goBack></goBack>
  </div>
</template>
<script>
import tmptaggle from "./caixue/tmptaggle";
import goBack from "@/components/tmp/zhanglan/go-1";
export default {
  props: {},
  components: { tmptaggle, goBack },
  data() {
    return {
      left: {
        mainPic: require("@/assets/img/caixue_huanzhe1.png"),
        link_1: "/home",
        link_2: "/home"
      },
      right: {
        mainPic: require("@/assets/img/caixue_addPatient.png"),
        link_1: "/home",
        link_2: "/home"
      }
    };
  },
  methods: {},
  computed: {}
};
</script>
<style scoped lang='less'>
.caixue-wrap {
  width: 1300px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  padding-top: 200px;
}
</style>
