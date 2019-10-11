<template>
  <!-- 转移 -->
  <div class="transfer-wrap">
    <!-- 左边 -->

    <div class="left-box">
      <div class="table-box">
        <!-- row-style  cell-style 表格样式 -->
        <el-table
          :row-style="{height:'32px',textAlign: 'center',padding:'0px',}"
          :cell-style="{padding:'0px',textAlign: 'center'}"
          :row-class-name="changeTrStyle"
          border
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          :style="{width: '100%'}"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" width="70" label="序号" ></el-table-column>
          <el-table-column label="RFID编号" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.coding }}</template>
          </el-table-column>
          <el-table-column prop="name" label="样本名称" show-overflow-tooltip ></el-table-column>
          <el-table-column prop="address" label="原位置" show-overflow-tooltip></el-table-column>
          <el-table-column label="现位置" width="160">
            <template slot-scope="scope">
              <span>{{locationList[scope.$index]}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 右边 -->
    <div class="right-box">
      <h1>选择修改位置</h1>
      <div class="input-item">
        <span>*冰箱名称</span>
        <el-select size="mini" @change="showlabRow" @focus="hideTable=true" v-model="labValue" placeholder="请选择">
          <el-option
            v-for="item in labOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <span>*层数</span>
        <el-select size="mini" v-model="labRow" @focus="hideTable=true" @change="showDrawer" placeholder="请选择">
          <el-option
            v-for="item in labRowOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="input-item">
        <span>*抽屉</span>
        <el-select size="mini" v-model="labDrawer" @focus="hideTable=true" @change="showSampleBox" placeholder="请选择">
          <el-option
            v-for="item in labDrawerOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <span>*样本盒</span>
        <el-select size="mini"  v-model="sampleBoxValue" @change="showSample"  placeholder="请选择">
          <el-option
            v-for="item in sampleBoxOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="row" v-show="!hideTable"  v-loading="loading">
          <table class="table">
            <tr v-for="row in rowValue" :key="row">
                <td
                  v-for="col in colValue"
                  :key="col"
                  :class="showSampleStatus(row, col)"
                  @click="chooseLocation(row,col)"
                >{{showTable(row,col)}}
                </td>
            </tr>
          </table>
          <div class="map">
            <span
              v-for="(item,index) in mapData"
              :key="index"
              :style="{ backgroundColor: item.bgc}"
              v-text="item.text"
            />
          </div>
      </div>
    </div>
    <div class="btn">
      <button @click="$router.go(-1)">返回</button>
      <button @click="transferSample">确认</button>
    </div>
  </div>
</template>
<script>
import goBack from '@/components/tmp/zhanglan/go-1'
export default {
  props: {},
  components: { goBack},
  inject:['reload'],
  data () {
    return {
      tableData: [],
      mapData: [
        { text: '已使用', bgc: '#00c9ff' },
        { text: '借用', bgc: '#FCFD01' },
        { text: '已选中',bgc:'#86D647'},
        { text: '未使用', bgc: '#eee' }
      ],
      sampleStruList:[],
      locationList:[],
      affirmTransfer:false, //是否已经转移
      num:0,
      loading:false,
      hideTable:true,
      multipleSelection: [],
      labValue:'',//.......冰箱id
      labOption:[],//......所有冰箱集合
      labRow:'',//.........层数id
      labRowOption:[],//...所有层数集合
      labDrawer:'',//......抽屉id
      labDrawerOption:[],//.....所有抽屉的集合
      sampleBoxValue:'',//....样本盒id
      sampleBoxOption:[],//.....所有样本盒集合
      loanSampleArr:[],// ........样本盒中借出样本集合
      normalSampleArr:[], //.......样本盒中正常状态样本
      rowValue:'',//样本盒行数
      colValue:'',//样本盒列数
      showModel:'',//样本盒显示模式
      optionalLocation:[],//样本盒中可选位置
      activeList:[] //当前位置集合
    }
  },
  created(){
    this.$axios({ //............样本转移初始化
      method:'post',
      url:'sampleGuide/query/selectSampleBack',
      data:({
        listId:this.$route.params.id.split(',')
      })
    })
    .then(({data})=>{
      console.log(data)
      data.data.forEach((item)=>{
        this.tableData.push({
          num: this.num++,
          id: item.id,
          coding:item.rfidCode,
          name:item.name,
          address:item.sampleStru.detailLocation
        })
      })
    })
    this.$axios({ //.......冰箱初始化
      method:'get',
      url:'sampleGuide/set/selectRefrigeratorName'
    })
    .then(({data})=>{
      // console.log(data)
      data.data.forEach((item)=>{
        this.labOption.push({
          label:item.name,
          value:item.id
        })
      })
    })
  },
  methods: {
    changeTrStyle({row,rowIndex}){
      if(this.affirmTransfer && this.locationList[rowIndex] != undefined){
        return 'bgColorOne'
      }
      for(let i=0; i<this.multipleSelection.length; i++){
        if(row.coding == this.multipleSelection[i].coding){
          return 'bgColorTwo'
        }
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      this.multipleSelection.sort(this.compare('num'))
      console.log(this.multipleSelection)
    },
    compare(property){
      return function(a,b){
          var value1 = a[property];
          var value2 = b[property];
          return value1 - value2;
      }
    },
    transferSample(){
      if(this.labValue && this.labRow && this.labDrawer && this.sampleBoxValue && this.activeList.length){
        let listStruId = []
        for(let i=0; i<this.activeList.length; i++){
          this.sampleStruList.forEach((item)=>{
            if(this.activeList[i][0] == item.row && this.activeList[i][1] == item.col){
              listStruId.push(item.id)
            }
          })
        }
        this.$axios({
          method:'post',
          url:'sampleGuide/query/batchTransfer',
          data:({
            listId: this.multipleSelection.map((item)=> {return item.id}),
            rfidSampleBoxId:this.sampleBoxValue,
            listStruId:listStruId
          })
        })
        .then(({data})=>{
          console.log(data)
          if(data.code = 200){
            this.$message({
              message: '转移成功！',
              type: 'success'
            });
            this.showSample()
            this.$refs.multipleTable.clearSelection();
            this.affirmTransfer = true
            // this.reload()
          }
        })
        .catch((error)=>{
            this.$message({
              message: '转移失败！',
              type: 'error'
            });
        })
      }else{
        this.$message({
          message: '请完善页面信息！',
          type: 'warning'
        });
      }
    },
    showlabRow(){ //........根据选择的冰箱加载冰箱层数
      this.labRow = ''
      this.labRowOption = []
      this.labDrawer = ''
      this.labDrawerOption = []
      this.sampleBoxValue = ''
      this.sampleBoxOption = []
      this.$axios({
        method: 'post',
        url:'sampleGuide/set/selectTier',
        data:({
          refrigeratorStruId: this.labValue
        })
      })
      .then(({data})=>{
        console.log(data)
        data.data.forEach((item)=>{
          this.labRowOption.push({
            value: item.id,
            label:item.row
          })
        })
      })
    },
    showDrawer(){ //.....根据选择的层数加载该层数的抽屉
      this.labDrawer = ''
      this.labDrawerOption = []
      this.sampleBoxValue = ''
      this.sampleBoxOption = []
      this.$axios({
        method: 'post',
        url:'/sampleGuide/guest/selectDrawerStruByTierStru',
        data:({
          tierStruId:{
            id:this.labRow
	        }
        })
      })
      .then(({data})=>{
          console.log(data)
          data.data.forEach((item)=>{
            this.labDrawerOption.push({
              value:item.id,
              label:item.number
            })
          })
      })
    },
    showSampleBox(){//.....根据选择的抽屉加载对应的样本盒
      this.sampleBoxValue = ''
      this.sampleBoxOption = []
      console.log(this.labDrawer)
      this.$axios({
        method:'post',
        url:'sampleGuide/scan/getSampleBoxRowList',
        data:({
          id:this.labDrawer
        })
      })
      .then(({data})=>{
        console.log(data)
        data.data.forEach((item)=>{
          this.sampleBoxOption.push({
            label:item.row,
            value: item.id
          })
        })
      })
    },
    showSample(){ //.......根据样本盒查询样本信息
      this.loading = true
      this.hideTable = false
      this.loanSampleArr = []
      this.normalSampleArr = []
      this.optionalLocation = []
      this.activeList = []
      this.$axios({
        method:'post',
        url:'/sampleGuide/scan/findSampleStruBySampleBoxId',
        data:({
          sampleBoxStruId: this.sampleBoxValue
        })
      })
      .then(({data})=>{
        console.log(data)
        this.rowValue = data.data.sampleBoxRow
        this.colValue = data.data.sampleBoxCol
        this.showModel = data.data.sampleBoxSpec
        this.sampleStruList = data.data.sampleStruList
        data.data.sampleStruList.forEach((item)=>{
            if(item.sampleStatus == 2){
              this.loanSampleArr.push([item.row,item.col])
            }
            if(item.sampleStatus == 1){
              this.normalSampleArr.push([item.row,item.col])
            }
            if(item.sign == 0){
              this.optionalLocation.push([item.row,item.col])
            }
        })
         this.loading = false
      })
    },
    chooseLocation(row,col){ //......选择新建样本位置
      this.activeList = []
      if(this.multipleSelection.length == 0){
        this.$message({
          message: '请先勾选需要转移的样本！',
          type: 'warning'
        });
        return
      }
      for(let i=0; i<this.normalSampleArr.length; i++){
        if(JSON.stringify(this.normalSampleArr[i]) == JSON.stringify([row, col])){
          return;
        }
      }
      for(let i=0; i<this.loanSampleArr.length; i++){
        if(JSON.stringify(this.loanSampleArr[i]) == JSON.stringify([row, col])){
          return;
        }
      }
      if(this.optionalLocation.length < this.multipleSelection.length){
        this.$message({
          message: '此样本盒位置不足！',
          type: 'warning'
        });
      }else if(this.optionalLocation.length == this.multipleSelection.length){
          this.activeList = this.optionalLocation
      }else{
        let index = this.optionalLocation.findIndex((item)=>{
            return JSON.stringify(item) == JSON.stringify([row,col])
         })
         let n = -1
         for(let i=0; i<this.multipleSelection.length; i++){         
           let num = index+i
           if( num > this.optionalLocation.length-1){
             n++
             num = n
           }
           this.activeList.push(this.optionalLocation[num])
         }
      }
      for(let i=0; i<this.activeList.length; i++){
         var ref = ''
         var tier = ''
         var drawer = ''
         var box = ''
         var activeStr = this.showTable(this.activeList[i][0],this.activeList[i][1])
         this.labOption.forEach((item)=>{
           if(this.labValue == item.value){
            //  console.log(item.label)
             ref = item.label
           }
         })
        this.labRowOption.forEach((item)=>{
          if(this.labRow == item.value){
            // console.log(item.label)
            tier = item.label
          }
        })
        this.labDrawerOption.forEach((item)=>{
          if(this.labDrawer == item.value){
            // console.log(item.label)
            drawer = item.label
          }
        })
        this.sampleBoxOption.forEach((item)=>{
          if(this.sampleBoxValue == item.value){
            // console.log(item.label)
            box = item.label
          }
        })
        // for(let j=0; j< this.multipleSelection.length; j++){
          console.log(this.multipleSelection[i].num)
         this.locationList[this.multipleSelection[i].num] = ref+'-'+tier+'-'+drawer+'-'+box+'-'+activeStr
        // }
        //  this.locationList.push(ref+'-'+tier+'-'+drawer+'-'+box+'-'+activeStr)
         console.log(this.locationList)
      }
    },
    showSampleStatus(row,col){
      let activeArr = [row, col]
      for(let i=0; i<this.activeList.length; i++){
        if(JSON.stringify(this.activeList[i]) == JSON.stringify(activeArr)){
          //console.log(JSON.stringify(this.activeList[i]) == JSON.stringify(activeArr))
          return 'activeColor'
        }
      }
      for(let i=0; i<this.loanSampleArr.length; i++){
        if(JSON.stringify(this.loanSampleArr[i]) == JSON.stringify(activeArr)){
          console.log(JSON.stringify(this.loanSampleArr[i]) == JSON.stringify(activeArr))
          return 'loanColor'
        }
      }
      for(let i=0; i<this.normalSampleArr.length; i++){
        if(JSON.stringify(this.normalSampleArr[i]) == JSON.stringify(activeArr)){
           return 'normalColor'
        }
      }
    },
    showTable (row,col) {
      let res = ''
      if(this.showModel == 1){
        res = row+'/'+col
      }else if(this.showModel == 2){
        res = row+'/'+String.fromCharCode(64 + col)
      }else if(this.showModel == 3){
        res = String.fromCharCode(64 + row)+'/'+col
      }else if(this.showModel == 4){
        res = String.fromCharCode(64 + row) +'/'+ String.fromCharCode(64 + col)
      }else{
        res = (row-1)*this.colValue+col
      }
      return res
    },
  },
  computed: {}
}
</script>
<style scoped lang='less'>
/deep/.el-table .bgColorOne{
  background: #ddd;
}
/deep/.el-table .bgColorTwo{
  background: #00c9ff;
}
/deep/.el-table__body tr:hover>td {
		background-color:transparent !important;
}
.transfer-wrap {
  display: flex;
  justify-content: space-evenly;

  padding-top: 40px;
}
.normalColor{
  background: #00c9ff
}
.loanColor{
  background: #FCFD01;
}
.activeColor{
  background: #86D647
}
.row{
  display: flex;
  align-items: center;
  margin-top: 20px;
}
.map {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 60px;
  height: 120px;
  cursor: pointer;
  white-space: nowrap;
  font-size: 14px;
  margin-left: 15px;
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px 3px;
    color: #333;
    border-radius: 3px;
    font-size: 14px;
  }
}
.table {
  border-spacing: 0;
  border: 2px solid #999;
  border-collapse: collapse;
  td {
    border: 1px solid #999;
    text-align: center;
    font-size: 12px;
    padding: 5px;
    cursor: pointer;
  }
}
.left-box {
  width: 60%;
  padding: 0 20px;

  // background-color: #888;
}

.right-box {
  width: 50%;
  // background-color: #999;
  h1{
    margin-bottom: 15px;
  }
}
.input-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  span {
    padding: 0 10px;
    //   width: 6em;
    width: 4rem;
    text-align-last: justify;

    white-space: nowrap;
  }
}
.btn {
  position: absolute;
  bottom: 0;

  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  left: 0;
  right: 0;

  height: 60px;

  button {
    width: 6.25rem;
    height: 1.875rem;
    margin-right: 20px;
    cursor: pointer;
    transition: all 0.1s;

    color: #01c8ff;
    border: 0;
    border: 1px #01c8ff solid;
    border-radius: 5px;
    outline: none;
    background-color: #fff;

    font-size: 14px;

    &:hover {
      color: #fff;
      background-color: #01c8ff;
    }
  }
}
</style>
