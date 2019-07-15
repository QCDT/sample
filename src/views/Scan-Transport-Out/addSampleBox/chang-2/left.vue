<template>
  <div>
    <!-- 选择冰箱 -->
    <div class="item">
      <h1>选择冰箱:</h1>
      <div class="row">
        <el-select size="small" v-model="locationData.freezer">
          <el-option
            v-for="item in freezer"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="item">
      <h1>选择层:</h1>
      <div class="row">
        <el-select size="small" v-model="locationData.layer ">
          <el-option
            v-for="item in layer"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="item">
      <h1>选择抽屉:</h1>
      <div class="row">
        <el-select size="small" v-model="locationData.chouti">
          <el-option
            v-for="item in chouti"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="item">
      <h1>选择样本盒:</h1>
      <div class="row">
        <el-select size="small" v-model="locationData.sampleBox">
          <el-option
            v-for="item in sampleBox"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  components: {},
  data () {
    return {
      locationData: {},
      freezer: [
        { value: '冰箱', label: '冰箱' },
        { value: '冰箱1', label: '冰箱2' }
      ],
      layer: [
        { value: '层数', label: '层数' },
        { value: '层数1', label: '层数1' }
      ],
      chouti: [
        { value: '抽屉', label: '抽屉' },
        { value: '抽屉1', label: '抽屉1' }
      ],
      sampleBox: [
        { value: '样本盒', label: '样本盒' },
        { value: '样本盒1', label: '样本盒1' }
      ],
      value: '',
      input: ''
    }
  },
  watch: {
    locationData: {
      handler (locationData) {
        locationData.freezer ? null : delete locationData.freezer
        locationData.layer ? null : delete locationData.layer
        locationData.chouti ? null : delete locationData.chouti
        locationData.sampleBox ? null : delete locationData.sampleBox
        this.$emit('locationData', locationData)
      },
      deep: true
    }
  },
  methods: {},
  computed: {}
}
</script>
<style scoped lang='less'>
.row {
  display: flex;
  align-items: center;
}
</style>
