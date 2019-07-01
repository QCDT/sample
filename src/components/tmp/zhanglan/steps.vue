<template>
  <!-- 进度条 -->
  <div class="jin-du-tiao">
    <div class="in">
      <el-steps :active="active" finish-status="success" v-if="stepsData">
        <el-step :title="title.text" v-for="(title,index) in stepsData" :key="index"></el-step>
      </el-steps>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    active: { type: Number, default: 2 },
    stepsData: { type: Array, default: () => [] }
  },
  components: {},
  data () {
    return {}
  },
  methods: {},
  computed: {}
}
</script>
<style scoped lang='less'>
.jin-du-tiao {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 50px;
  margin-bottom: 1rem;
  padding: 15px 0 8px;

//   background-color: #fff;

  .in {
    width: 50%;
  }
}

.in /deep/ .el-step__head.is-success {
  display: flex;
  align-items: center;
}

.in /deep/ .el-step__head.is-process {
  display: flex;
  align-items: center;
}

.in /deep/ .el-step__head.is-wait {
  display: flex;
  align-items: center;
}
</style>
