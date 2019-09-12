<template>
  <!-- 共有多少条数据...销毁..打印标签..转移..导出... -->
  <div class="selection-box">
    <div class="sum">
      <div class="item">
        <span>共有:</span>
        <span>{{count}}</span>
        <span style="margin:0 0.3em">条数据</span>
      </div>
      <div class="item">
        <tmpinput>
          打印样式设置
          <el-select
            slot="elUI"
            size="small"
            clearable
            v-model="value"
            filterable
            placeholder="请选择"
            style="width:60%"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </tmpinput>
      </div>
    </div>
    <div class="right" v-show="$route.params.id == 1">
      <div class="item" @click="delSample">
        <i class="icon icon-shanchu"></i>
        <small>销毁</small>
      </div>
      <div class="item" @click="printTag">
        <i class="icon icon-print"></i>
        <small>打印标签</small>
      </div>
        <div class="item" @click="transfer">
          <i class="icon icon-zhuanyi"></i>
          <small>转移</small>
        </div>
      <!-- </router-link> -->
      <div class="item" @click="printLocation">
        <i class="icon icon-weizhi"></i>
        <small>打印位置信息</small>
      </div>
        <div class="item" @click="amendSample">
          <i class="icon icon-yemianxiugai"></i>
          <small>修改</small>
        </div>
       <div class="item" @click="exportExcel">
        <i class="icon icon-pdf" style="color:#A33639"></i>
        <small>导出PDF</small>
      </div>
      <div class="item" @click="exportPdf">
          <i class="icon icon-excel" style="color:#217346"></i>
          <small>导出Excel</small>
      </div>
    </div>

    <div class="right" v-show="$route.params.id != 1" >
      <div class="item" @click="addLoanSample">
          <img src="@/assets/img/scan_bot_out.png" alt="" width=30>
          <small>添加借出</small>
      </div>
    </div>

  </div>
</template>
<script>
import tmpinput from '@/components/tmp/zhanglan/tmp-empty-input'
export default {
  inject:['reload'],
  props: {
    count: Number,
    showBtn: Boolean,
    multipleSelection: { type: Array, default: () => [] }
  },
  components: { tmpinput },
  data () {
    return {
      options: [
        {
          value: '选项1',
          label: '苹果'
        },
        {
          value: '选项5',
          label: '香蕉'
        }
      ],
      value: ''
      //   ↑
    }
  },
  methods: {
    // 销毁样本
    delSample(){
       if(this.multipleSelection.length == 0){
          this.$message({
            message: '请选择需要销毁的样本',
            type: 'warning'
          });
       }else{
          // console.log(this.multipleSelection)
         let sampleInfo = this.multipleSelection.every((item)=>{
           return item.status == '正常'
         })
         if(sampleInfo){
           this.$confirm('已选中'+this.multipleSelection.length+'条数据，确定销毁样本吗?', '提示', {
             confirmButtonText: '确定',
             cancelButtonText: '取消',
             type: 'warning'
           }).then(() => {
             this.$axios({
               method:'post',
               url:'sampleGuide/query/deleteListSampleById',
               data:({
                 list: this.multipleSelection.map((item)=>{return item.id})
               })
             })
               .then(({data})=>{
                 console.log(data)
                 if(data.data == 0){
                   this.$message({
                     type: 'success',
                     message: '删除成功!'
                   });
                   this.reload()
                 }else{
                   this.$message({
                     type: 'warning',
                     message: data.data
                   });
                 }

               })
           }).catch(() => {
             this.$message({
               type: 'info',
               message: '已取消删除'
             });
           });
         }else{
           this.$message({
             message: '请选择样本状态为正常的样本',
             type: 'warning'
           });
         }

       }
    },
    // 打印标签
    printTag(){
      if(this.multipleSelection.length == 0){
        this.$message({
          message: '请先选择要打印标签的样本',
          type: 'warning'
        });
      }else{
          this.$confirm('已选中'+this.multipleSelection.length+'条数据，确定打印该标签吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$axios({
              method: 'post',
              url:'sampleGuide/query/printLabel',
              data:({
                sampleCategoryDict:0,
                rfidCodeList: this.multipleSelection.map((item)=>{return item.rfId})
              })
            })
              .then(({data})=>{
                console.log(data)
                data.data.forEach((item)=>{
                  try{
                      var myobject = new ActiveXObject("GoDEXATL.Function");
                      myobject.openport("6")
                      myobject.setup(20, 19, 4, 0, 3,0)
                      myobject.sendcommand("^L\r\n");
                      myobject.ecTextOut(260, 20, 17, "Arial", item.firstLine);
                      myobject.ecTextOut(260, 50, 17, "Arial", item.secondLine);
                      myobject.ecTextOut(260, 50, 17, "Arial", item.thirdLine);
                      myobject.sendcommand("E\r\n")
                  }catch(e){
                      alert("打印故障，请检查打印机是否连接！")
                  }finally{
                      myobject.closeport();
                  }
                })
              })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消打印'
            });
          });
  }
    },
    // 转移样本
    transfer(){
      if(this.multipleSelection.length == 0){
        this.$message({
          message: '请选择需要转移的样本',
          type: 'warning'
        });
      }else{
         this.$router.push({name:'transfer'})
      }
    },
    //打印位置信息
    printLocation(){
      if(this.multipleSelection.length == 0){
        this.$message({
          message: '请选择需要打印位置信息的样本',
          type: 'warning'
        });
      }else{
         console.log(this.multipleSelection)
      }
    },
    amendSample(){
      if(this.multipleSelection.length == 0){
        this.$message({
          message: '请选择需要修改的样本',
          type: 'warning'
        });
      }else{
         this.$router.push({name: 'changsample'})
      }
    },
    exportExcel(){
      if(this.multipleSelection.length == 0){
        this.$message({
          message: '请选择需要导出的样本',
          type: 'warning'
        });
      }else{
         console.log(this.multipleSelection)
      }
    },
    exportPdf(){
      if(this.multipleSelection.length == 0){
        this.$message({
          message: '请选择需要导出的样本',
          type: 'warning'
        });
      }else{
        console.log(this.multipleSelection)
      }
    },
    //添加借出
    addLoanSample(){
        if(this.multipleSelection.length == 0){
        this.$alert('请选择需要借出的样本', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
      }else {
        let newExportArr = this.multipleSelection.map((item)=>{
          return item.id
        })
        console.log(newExportArr)
          // //多样本添加到借出订单
          this.$axios({
            method:'post',
            url:'sampleGuide/scan/addSamplesToLoanOrder',
            data:({
              sampleIdList:newExportArr,// 当前样本ID数组
              loanOrderId:this.$route.params.id,//当前ID编号
            })
          })
            .then(({data})=>{
              console.log(data);
              if(data.code == 500){
                this.$message({
                  message: data.message,
                  type: 'success'
                });
              }else{
                this.$message({
                  message: '添加成功！',
                  type: 'success'
                });
                this.$router.push({
                  name:"particulars",
                  params:{
                    id: this.$route.params.id
                  }
                })
              }
            })
      }
    }
  },
  computed: {}
}
</script>
<style scoped lang='less'>
.selection-box {
  display: flex;
  justify-content: space-between;

  //   扫描总数...那一排的

  width: 100%;
  margin: 0 auto;
  margin-bottom: 10px;
  white-space: nowrap;
  .sum {
    display: flex;
    // background-color: #333;
    align-items: center;
    .item {
      margin-right: 30px;
    }
  }
  span {
    font-size: 16px;
  }

  span:nth-child(2) {
    padding-left: 0.5em;

    background-color: #fff;
  }

  .right {
    display: flex;

    .item {
      //   background-color: #333;
      margin: 0 10px;
      padding: 0 5px;
      cursor: pointer;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      i {
        font-size: 22px;
        margin-bottom: 1px;
      }
      small {
        font-size: 10px;
      }
    }
  }
}
</style>
