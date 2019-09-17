<template>
  <!-- 共有多少条数据...销毁..打印标签..转移..导出... -->
  <div>
    <object id="LODOP_OB"
            classid="clsid:2105C259-1E0C-4534-8141-A753534CB4CA" width=0 height=0>
      <embed id="LODOP_EM" type="application/x-print-lodop" width=0 height=0/>
    </object>
  <div class="selection-box">
    <div class="sum">
      <div class="item">
        <span>共有:</span>
        <span>{{count}}</span>
        <span style="margin:0 0.3em">条数据</span>
      </div>
      <div class="item">
        <!-- <tmpinput>
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
        </tmpinput> -->
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
       <div class="item" @click="exportPdf">
        <i class="icon icon-pdf" style="color:#A33639"></i>
        <small>导出PDF</small>
      </div>
      <div class="item" @click="exportExcel">
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
      CreatedOKLodop7766:null,
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
                 if(data.code == 200){
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
        let sampleInfo = this.multipleSelection.every((item)=>{
          return item.status == '正常'})
        if(sampleInfo){
          this.$router.push({
            name:'transfer',
            params:{
              id:this.multipleSelection.map((item)=>{return item.id}).join()
            }
          })
        }else{
          this.$message({
            message: '请选择样本状态为正常的样本',
            type: 'warning'
          });
        }

      }
    },
    //打印位置信息
    printLocation(){
      if(this.multipleSelection.length == 0){
        this.$message({
          message: '请先选择要打印标签的样本',
          type: 'warning'
        });
      }else{
        let sampleInfo = this.multipleSelection.every((item)=>{
          return item.location
        })
        // console.log(sampleInfo)
        if(sampleInfo){
          this.$confirm('已选中'+this.multipleSelection.length+'条数据，确定打印该位置信息吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$axios({
              method: 'post',
              url:'sampleGuide/query/queryPrint',
              data:({
                sampleCategoryDict:0,
                rfidCodeList: this.multipleSelection.map((item)=>{return item.rfId})
              })
            }).then(({data})=>{
                console.log(data)
             if(data.code == 200){
               let LODOP = this.getLodop();
               LODOP.PRINT_INIT("打印位置信息");
               LODOP.SET_PRINTER_INDEXA("XP-58");
               LODOP.SET_PRINT_PAGESIZE(3, '550', '', ''); //设置纸张宽度和高度，单位为：0.1mm
               let distanceTop = 0
               distanceTop += 80
               data.data.forEach((item)=>{
                 distanceTop += 20;
                 LODOP.ADD_PRINT_TEXT(distanceTop, 20, 120, 15, item.name);
                 distanceTop += 20;
                 LODOP.ADD_PRINT_TEXT(distanceTop, 20, 220, 15, item.refrigeratorStruName);
                 distanceTop += 20;
                 LODOP.ADD_PRINT_TEXT(distanceTop, 20, 220, 15, item.locationNoRefName);
                 distanceTop += 20;
                 LODOP.ADD_PRINT_TEXT(distanceTop, 20, 220, 15, "---------------------");
               })
               distanceTop += 20;
               let date = LODOP.FORMAT("TIME:yyyy-mm-dd hh:mm:ss", "now");
               LODOP.ADD_PRINT_TEXT(distanceTop, 20, 220, 15, date);
               LODOP.PRINT(); //直接打印
             }else{
               this.$message({
                 message: '打印故障，请检查打印机是否连接！',
                 type: 'warning'
               });
             }
              })
          })
        }
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
        let newExportArr = this.multipleSelection.map((item)=>{
          return item.id
        })
        //导出归还订单Excel
        this.$axios({
          method:'post',
          url:'sampleGuide/query/exportExcel',
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
    },
    //导出Excel
    exportLoanPdf(){

    },
    getLodop(oOBJECT,oEMBED){
      /**************************
       本函数根据浏览器类型决定采用哪个页面元素作为Lodop对象：
       IE系列、IE内核系列的浏览器采用oOBJECT，
       其它浏览器(Firefox系列、Chrome系列、Opera系列、Safari系列等)采用oEMBED,
       如果页面没有相关对象元素，则新建一个或使用上次那个,避免重复生成。
       64位浏览器指向64位的安装程序install_lodop64.exe。
       **************************/

      var strHtmInstall="<br><font color='#FF00FF'>打印控件未安装!点击这里<a href='../resources/plugins/install_lodop32.exe' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</font>";
      var strHtmUpdate="<br><font color='#FF00FF'>打印控件需要升级!点击这里<a href='../resources/plugins/install_lodop32.exe' target='_self'>执行升级</a>,升级后请重新进入。</font>";
      var strHtm64_Install="<br><font color='#FF00FF'>打印控件未安装!点击这里<a href='../resources/plugins/install_lodop64.exe' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</font>";
      var strHtm64_Update="<br><font color='#FF00FF'>打印控件需要升级!点击这里<a href='../resources/plugins/install_lodop64.exe' target='_self'>执行升级</a>,升级后请重新进入。</font>";
      var strHtmFireFox="<br><br><font color='#FF00FF'>（注意：如曾安装过Lodop旧版附件npActiveXPLugin,请在【工具】->【附加组件】->【扩展】中先卸它）</font>";
      var strHtmChrome="<br><br><font color='#FF00FF'>(如果此前正常，仅因浏览器升级或重安装而出问题，需重新执行以上安装）</font>";
      var LODOP;
      try{
        //=====判断浏览器类型:===============
        var isIE	 = (navigator.userAgent.indexOf('MSIE')>=0) || (navigator.userAgent.indexOf('Trident')>=0);
        var is64IE  = isIE && (navigator.userAgent.indexOf('x64')>=0);
        //=====如果页面有Lodop就直接使用，没有则新建:==========
        if (oOBJECT!=undefined || oEMBED!=undefined) {
          if (isIE)
            LODOP=oOBJECT;
          else
            LODOP=oEMBED;
        } else {
          if (this.CreatedOKLodop7766==null){
            LODOP=document.createElement("object");
            LODOP.setAttribute("width",0);
            LODOP.setAttribute("height",0);
            LODOP.setAttribute("style","position:absolute;left:0px;top:-100px;width:0px;height:0px;");
            if (isIE) LODOP.setAttribute("classid","clsid:2105C259-1E0C-4534-8141-A753534CB4CA");
            else LODOP.setAttribute("type","application/x-print-lodop");
            document.documentElement.appendChild(LODOP);
            this.CreatedOKLodop7766=LODOP;
          } else
            LODOP=this.CreatedOKLodop7766;
        };



        //=====判断Lodop插件是否安装过，没有安装或版本过低就提示下载安装:==========
        if ((LODOP==null)||(typeof(LODOP.VERSION)=="undefined")) {
          document.documentElement.innerHTML="";
          if (navigator.userAgent.indexOf('Chrome')>=0)
            document.documentElement.innerHTML=strHtmChrome+document.documentElement.innerHTML;
          if (navigator.userAgent.indexOf('Firefox')>=0)
            document.documentElement.innerHTML=strHtmFireFox+document.documentElement.innerHTML;
          if (is64IE) document.write(strHtm64_Install); else
          if (isIE)   document.write(strHtmInstall);    else
            document.documentElement.innerHTML=strHtmInstall+document.documentElement.innerHTML;
          return LODOP;
        } else
        if (LODOP.VERSION<"6.1.9.8") {
          if (is64IE) document.write(strHtm64_Update); else
          if (isIE) document.write(strHtmUpdate); else
            document.documentElement.innerHTML=strHtmUpdate+document.documentElement.innerHTML;
          return LODOP;
        };
        //=====如下空白位置适合调用统一功能(如注册码、语言选择等):====
        LODOP.SET_LICENSES("","66D3272D394565664366F195E9A46B6E","C94CEE276DB2187AE6B65D56B3FC2848","");
        //============================================================
        return LODOP;
      } catch(err) {
        if (is64IE)
          document.documentElement.innerHTML="Error:"+strHtm64_Install+document.documentElement.innerHTML;else
          document.documentElement.innerHTML="Error:"+strHtmInstall+document.documentElement.innerHTML;
        return LODOP;
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
    /*margin-left: -54%;*/
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
