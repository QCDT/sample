<template>
  <div class="upload-tmp">
    <el-upload
      class="upload-demo"
      ref="upload"
      action=""
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :auto-upload="false">
      <el-button slot="trigger" size="small" type="primary">导入文件</el-button>
    </el-upload>
  </div>
</template>
<script>
export default {
  props: {},
  data () {
    return {}
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  },
  computed: {}
}
</script>
<style scoped lang='less'>
.upload-tmp {
  width: 200px;
  padding: 15px;
  margin-bottom: 20px;
  font-size: 12px;

  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}

</style>
