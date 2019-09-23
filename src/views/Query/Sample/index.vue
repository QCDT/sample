<template>
  <div class="yangben-wrap">
    <!-- 样本信息 -->
    <div class="left">
      <h1>样本流程</h1>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!--  -->
        <el-tab-pane label="详细日志" name="first">
          <div class="sampleSign" v-for="(activity, index) in activities">
            <span>{{opeSign[activity.content]}}</span>
            <span class="admin">操作人：{{activity.person}}</span>
            <p>操作时间：{{activity.timestamp}}</p>
          </div>
        </el-tab-pane>
        <!--  -->
        <el-tab-pane label="重要日志" name="second">
          <el-timeline>

            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :timestamp="activity.timestamp"
              placement="top"
            >
              <el-card>
                <h4 >{{opeSign[activity.content]}}</h4>
              </el-card>
            </el-timeline-item>

          </el-timeline>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="center">
      <span
        class="item"
        v-for="(item,index) in centerData"
        :key="index"
      >{{item.key}}: {{item.value}}</span>
    </div>
    <div class="right">
      <h1>位置信息</h1>
      <h1>{{location}}</h1>
      <div class="matrix-box">
        <div class="matrix">
          <table class="table">
            <tr v-for="row in rowValue" :key="row">
              <!-- <template v-for="item in loanSampleArr"> -->
              <td
                v-for="col in colValue"
                :key="col"
                :class="showSampleStatus(row, col)"
              >{{showTable(row,col)}}
              </td>
              <!-- </template> -->
            </tr>
          </table>
        </div>
        <div class="map">
          <span>已使用</span>
          <span>借用</span>
          <span>当前位置</span>
          <span>未使用</span>
        </div>
      </div>
      <div class="mark">
        <h1>备注</h1>
        <el-input
          type="textarea"
          :rows="4"
          maxlength="1000"
          show-word-limit
          v-model="mark"
          disabled="disabled"
        ></el-input>
      </div>
    </div>
    <goBack></goBack>
  </div>
</template>
<script>
  import goBack from '@/components/tmp/zhanglan/go-1'

  export default {
    props: {},
    components: {goBack},
    data() {
      return {
        // 备注
        mark: '',
        // 点阵数据
        location: '',//位置信息
        locationNow: [],//位置信息
        rowValue:'',
        colValue:'',
        showModel:'',//样本盒显示模式
        loanSampleArr:[],//样本盒中借出样本集合
        normalSampleArr:[],//样本盒中正常样本集合
        activeName: 'second',
        centerData: [
          {key: 'RFID编号', value: '', type: 'text'},
          {key: '*样本名称', value: '', type: 'text'},
          {key: '样本类别', value: '', type: 'text'},
          {key: '样本来源', value: ' ', type: 'text'},
          {key: '采样日期', value: ' ', type: 'text'},
          {key: '录入日期', value: '', type: 'text'},
          {key: '过期日期', value: ' ', type: 'text'},
          {key: '提前报警天数', value: ' ', type: 'text'},
          {key: '管帽色', value: ' ', type: 'text'},
          {key: '项目编号', value: ' ', type: 'text'},
          {key: '方案编号', value: '', type: 'text'},
          {key: '剂量组', value: '', type: 'text'},
          {key: '受试者编号', value: '', type: 'text'},
          {key: '实验采血日期', value: '', type: 'text'},
          {key: '基质描述', value: '', type: 'text'}
        ],
        activities: [
        ],
        opeSign:[
          '销毁',
          '借出',
          '归还',
          '新建',
          '转移',
          '更新',
          '转出',
          '转入',
          '核验',
          '验还原',
          '采血',
          '血还原',
          '离心机',
          '离心完成',
          '接收',
          '从离心机取出',
          '开始离心'
        ]
      }
    },
    created() {
      this.$axios({
        method: 'post',
        url: 'sampleGuide/scan/findDetailById',
        data: ({
          id: this.$route.params.id
        })
      }).then(({data}) => {
        console.log(data)
        //样本信息展示
        this.centerData[0].value = data.data.rfidSample.rfidCode
        this.centerData[1].value = data.data.rfidSample.name
        this.centerData[2].value = data.data.rfidSample.sampleCategoryDict.name
        this.centerData[3].value = data.data.rfidSample.sampleSource
        this.centerData[4].value = data.data.rfidSample.samplingDate
        this.centerData[5].value = data.data.rfidSample.inputTime
        this.centerData[6].value = data.data.rfidSample.expireDate
        this.centerData[7].value = data.data.rfidSample.warningDays
        this.centerData[8].value = data.data.rfidSample.capColor
        this.centerData[9].value = data.data.rfidSample.project == null ? '' : data.data.rfidSample.project.id
        this.centerData[10].value = data.data.rfidSample.sampleStudy
        this.centerData[11].value = data.data.rfidSample.sampleTreatment
        this.centerData[12].value = data.data.rfidSample.sampleSubject
        this.centerData[13].value = data.data.rfidSample.sampleTime
        this.centerData[14].value = data.data.rfidSample.sampleMatrix
        this.location = data.data.rfidSample.sampleStru.detailLocation
        this.rowValue = data.data.rfidSample.sampleStru.sampleBoxStru.structureRow
        this.colValue = data.data.rfidSample.sampleStru.sampleBoxStru.structureCol
        this.showModel = data.data.rfidSample.sampleStru.sampleBoxStru.structureSpec
        this.mark = data.data.rfidSample.remarks == null ? '' : data.data.rfidSample.remarks
        this.locationNow.push([data.data.rfidSample.sampleStru.row,data.data.rfidSample.sampleStru.col])
        data.data.sampleStruList.forEach((item)=>{
          if(item.sampleStatus == 2){
            this.loanSampleArr.push([item.row,item.col])
          }
          if(item.sampleStatus == 1){
            this.normalSampleArr.push([item.row,item.col])
          }
        })
        //样本日志信息展示
        data.data.sampleOperateLogs.forEach((item)=>{
          this.activities.push({
            content:item.sign,
            timestamp:item.operateTime,
            person:item.userName
          })
        })
      })
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event)
      },
      showSampleStatus(row,col){
        // console.log(row,col)
        let activeArr = [row, col]
        // console.log(activeArr)
        if(JSON.stringify(this.locationNow[0]) == JSON.stringify(activeArr)){
          return 'nowColor'
        }
        for(let i=0; i<this.loanSampleArr.length; i++){

          if(JSON.stringify(this.loanSampleArr[i]) == JSON.stringify(activeArr)){
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
      }
    },
    computed: {}
  }
</script>
<style scoped lang='less'>
  .yangben-wrap {
    display: flex;

    height: 70vh;
    padding: 0 150px;
    padding-top: 3vh;
    padding-bottom: 3vh;

    background-color: #eee;

    .left {
      overflow: auto;
      flex: 1;

      padding: 0 20px;

      border-right: 1px solid #bbb;
      background-color: #fff;

      .admin{
        display: inline-block;
        /*margin-right: -100px;*/
        width: 120px;
        float: right;
      }
      .sampleSign{
        width: 100%;
        padding-bottom: 10px;
        padding-top: 5px;
        border-bottom: 2px solid #e4e7ed;
      }
    }

    .center {
      flex: 1;

      padding: 0 20px;

      border-right: 1px solid #bbb;
    }

    .right {
      flex: 1;

      padding: 0 20px;
    }
  }

  .center {
    display: flex;
    flex-direction: column;

    //   align-items:center;
    justify-content: space-around;

    .item {
      margin-bottom: 10px;

      font-size: 16px;
    }
  }

  // right
  .right {
    h1 {
      margin-bottom: 10px;

      font-size: 15.5px;
      font-weight: 500;
    }
  }

  .matrix-box {
    display: flex;
    justify-content: space-between;

    /*.matrix{*/
        /*border: 1px solid #333;*/
      /*}*/

    .table {
      border-spacing: 0;
      border: 2px solid #ccc;
      border-collapse: collapse;
      background-color: #fff;
      td {
        border: 1px solid #ccc;
        text-align: center;
        font-size: 12px;
        padding: 5px;
      }
    }
  }

  .mark {
    padding-top: 30px;

    h1 {
      margin-bottom: 12px;
    }
  }

  .map {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    width: 60px;
    height: 150px;

    cursor: pointer;
    white-space: nowrap;

    font-size: 13px;

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2px 3px;
      font-size: 13px;
      color: #333;
      border-radius: 3px;
      margin-bottom: 10px;
    }
    span:nth-child(1) {
      background-color: #00c9ff;
    }
    span:nth-child(2) {
      background-color: #fffd30;
    }
    span:nth-child(3) {
      background-color: #15ff13;
    }
    span:nth-child(4){
      background-color: #fff;
    }
  }
  .normalColor{
    background: #00c9ff;
  }
  .loanColor{
    background: #fffd30;
  }
  .nowColor{
    background: #15ff13;
  }

</style>
