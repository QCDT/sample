<template>
  <!-- 样本盒规格 -->
  <div class="sample-box-specification">
    <span class="title">样本盒规格:</span>
    <el-select style="width:125px" :size="size" v-model="specData.row" placeholder>
      <el-option v-for="item in row" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <i class="end">行</i>
    <el-select style="width:125px" :size="size" v-model="specData.col" placeholder>
      <el-option v-for="item in col" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <i class="end">列</i>
    <el-select style="width:120px" :size="size" v-model="specData.displayModel" placeholder>
      <el-option
        v-for="item in displayModel"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
    <i class="end">显示模式</i>
  </div>
</template>
<script>
export default {
  props: {
    size: { type: String, default: 'small' }
  },
  components: {},
  data () {
    return {
      specData: {
        row: '', // 行
        col: '', // lie
        displayModel: '' // 显示模式
      },
      row: [{ value: '行', label: '行' }, { value: '行2', label: '行2' }],
      col: [{ value: '列', label: '列' }],
      displayModel: [{ value: '显示模式', label: '显示模式' }]
    }
  },
  watch: {
    specData: {
      handler (specData) {
        specData.row ? null : delete specData.row
        specData.col ? null : delete specData.col
        specData.displayModel ? null : delete specData.displayModel
        this.$emit('change', specData)
      },
      deep: true
    }
  },
  methods: {},
  computed: {}
}
</script>
<style scoped lang='less'>
.sample-box-specification {
  display: flex;
  align-items: center;
  white-space: nowrap;
}
.title {
  padding-right: 0.7rem;
}
.end {
  padding: 0 10px 0 3px;
}
</style>
