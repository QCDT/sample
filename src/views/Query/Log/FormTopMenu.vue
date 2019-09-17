<template>
  <div>
    <h1 class="title">{{title}}</h1>
    <div class="info">
      <div class="sum">
        <span>共有:</span>
        <span>{{count}}</span>
        <span>数据</span>
      </div>
      <div class="right">
        <div class="item">
          <i class="icon icon-pdf" style="color:#A33639"></i>
        </div>
        <div class="item">
            <div @click="isEmpty">
              <i class="icon icon-excel" style="color:#217346"></i>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    count: Number,
    multipleSelection: { type: Array, default: () => [] }
  },
  components: {},
  data () {
    return {
      //   ↓  导出
      /**
       * json_fields: key:表头 val:行数据[值];[常规字段 | 支持嵌套(obj) | 支持回调 ]
       * json_data:将要导出的表格数据
       */
      json_fields: {
        序号: 'coding',
        RFID编码: 'RFID',
        操作: 'ope',
        操作人: 'opePerson',
        操作时间: 'opeTime',
        '去走人/归还人': 'person',
        预期归还日期: 'expTime',
        样本位置: 'location',
        借出归还备注: 'loanMark',
        预期归还备注: 'expMark'

        // 性别: "sex",
        // 电话: { field: "phone.mobile", callback: value => `${value}` }
      }
    }
  },
  methods: {
    isEmpty () {
      if(this.multipleSelection.length == 0){
        this.$message({
          message: '请选择需要导出的样本日志信息',
          type: 'warning'
        });
      }else{
        let newExportArr = this.multipleSelection.map((item)=>{
          return item.id
        })
        //导出归还订单Excel
        this.$axios({
          method:'post',
          url:'sampleGuide/query/exportRfidSampleExcel',
          responseType: 'blob',
          headers: {
            'Access-Control-Expose-Headers': 'filename'
          },
          data:({
            idList: newExportArr
          })

        })
          .then((data)=>{
            console.log(data);
            let fileName = data.headers.filename;
            let blob = new Blob([data.data], {type: 'application/vnd.ms-excel;charset=UTF-8'});
            if(window.navigator.msSaveBlob){
              window.navigator.msSaveBlob(blob,fileName);
            }else{
              let a = document.createElement('a');
              let href = window.URL.createObjectURL(blob); // 创建链接对象
              a.href =  href;
              a.download = fileName;   // 自定义文件名
              document.body.appendChild(a);
              a.click();
              window.URL.revokeObjectURL(href);  //移除链接对象
              document.body.removeChild(a);
            }
          })
      }
    }
  },
  computed: {}
}
</script>
<style scoped lang='less'>
.title {
  height: 1.5rem;
  margin-top: 2.3125rem;
  margin-bottom: 0.8125rem;

  text-align: center;

  color: rgba(89, 89, 89, 1);

  font-family: SimHei;
  font-size: 1.5rem;
  font-weight: 400;
}
.info {
  display: flex;
  justify-content: space-between;
  .right {
    display: flex;
    i {
      font-size: 25px;
      padding: 0 3px;
      margin-right: 15px;
      margin-bottom: 5px;
    }
  }
}
</style>
