<template>
  <div class="check-progress-box">
    <div class="pilot" v-show="showPilot">
      <h1>核验成功</h1>
      <h2>2/2</h2>
    </div>
    <div class="pilot" v-show="!showPilot">
      <h1>
        核验中,请稍后
        <span class="dian">{{dian}}</span>
      </h1>
      <h2>2/2</h2>
    </div>

    <div class="bar">
      <el-progress text-inside :stroke-width="12" :percentage="percentage" :color="customColor"></el-progress>
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  components: {},
  data() {
    return {
      dian: "...",
      timerDian: null,
      showPilot: false,
      percentage: 20,
      customColor: "#90bf46"
    };
  },
  filters: {
    dian() {
      return 11;
    }
  },
  methods: {
    runDian() {
      this.timerDian = setInterval(() => {
        this.dian == "..." ? (this.dian = "") : (this.dian += ".");
      }, 300);
    }
  },
  computed: {},
  created() {
    this.showPilot ? null : this.runDian();
  }
};
</script>
<style scoped lang='less'>
.check-progress-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pilot {
  display: flex;
  flex-direction: column;
  align-items: center;
  .dian {
    display: inline-block;

    width: 1rem;
  }
  h1 {
    font-size: 18px;
  }
}
.bar {
  width: 100%;
  &/deep/.el-progress-bar__inner {
    display: flex;
    justify-content: flex-end;
  }
}
</style>