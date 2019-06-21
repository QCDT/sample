<template>
  <div>
    <label class="tmp-upload">
      <slot>导入</slot>
      <input
        type="file"
        ref="upload"
        accept=".xls, .xlsx"
        @change="impExcle"
        class="outputlist_upload"
      >
    </label>
  </div>
</template>
<script>
import XLSX from 'xlsx'

export default {
  props: {},
  components: {},
  data () {
    return {
      // ↓    导入
      outputs: []
      // ↑
    }
  },
  methods: {
    // ↓    导入
    impExcle () {
      // 绑定监听表格导入事件
      this.readExcel(event)
    },
    readExcel (e) {
      // 表格导入
      var that = this
      const files = e.target.files

      if (files.length <= 0) {
        // 如果没有文件名
        return false
      } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
        this.$message({
          message: '上传格式不正确，请上传xls或者xlsx格式',
          type: 'warning'
        })
        return false
      }

      const fileReader = new FileReader()
      fileReader.onload = ev => {
        try {
          const data = ev.target.result
          const workbook = XLSX.read(data, {
            type: 'binary'
          })
          const wsname = workbook.SheetNames[0] // 取第一张表
          const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]) // 生成json表格内容
          //   console.log("ws",ws);
          this.$emit('change', ws)
          that.outputs = [] // 清空接收数据
          // 编辑数据
          for (var i = 0; i < ws.length; i++) {
            var sheetData = {
              address: ws[i].addr,
              value: ws[i].value
            }
            that.outputs.push(sheetData)
          }
          this.$refs.upload.value = ''
        } catch (e) {
          return false
        }
      }
      fileReader.readAsBinaryString(files[0])
    }
  },
  computed: {},
  mounted () {
    //   ↓  导入
    // this.$refs.upload.addEventListener("change", e => {
    // 绑定监听表格导入事件
    //   this.readExcel(e);
    // });
    //  ↑
  }
}
</script>
<style scoped lang='less'>
.tmp-upload {
  .outputlist_upload {
    display: none;
  }
}
</style>
