<template>
  <div>
    <div class="centrifugeImg">
      <el-carousel type="card" height="261px"  :autoplay='autoplay' arrow='always'>
          <el-carousel-item v-for="(item,index) in centrifugeList" :key="index">
            <img src="@/assets/img/centrifugal.png" v-show="item.activeCentrifugal" ref="image">
            <img src="@/assets/img/activeCen.png" v-show="!item.activeCentrifugal">
          </el-carousel-item>
      </el-carousel>
    </div>
    <div class="centrifugeSet">
      <div class="centrifugeInfo">
          <div>
            <span>离心机名称</span>
            <span class="centrifugeItem">RL离心机</span>
          </div>
          <div>
            <span>时间</span>
            <span class="centrifugeItem">00:00:00</span>
          </div>
          <div>
            <span>转速</span>
            <span class="centrifugeItem">3500r/min</span>
          </div>
          <div>
            <span>温度</span>
            <span class="centrifugeItem">3℃</span>
          </div>
      </div>
      <div class="centrifugeOperation">
        <img src="@/assets/img/centrifugalSet.png" @click="centrifugalSet">
        <img src="@/assets/img/centrifugalAdd.png" @click="addSample">
        <img src="@/assets/img/centrifugalStart1.png" class="mainBtn">
        <img src="@/assets/img/orders.png" @click="exportOrders">
        <img src="@/assets/img/record.png" @click="Ordersdetail">
      </div>          
    </div>
    <el-dialog
      :visible.sync="dialogSet"
      width="50%"
      >
      <div class="dialogSet">
        <div class="setItem">
          <span>名称</span>
          <el-input
            placeholder="请输入内容"
            v-model="setName"
            :disabled="true"
            size="mini"
          >
          </el-input>
        </div>
        <div class="setItem">
          <span>品牌</span>
          <el-input
            placeholder="请输入内容"
            v-model="setName"
            :disabled="true"
            size="mini"
          >
          </el-input>
        </div>
        <div class="setItem">
          <span>型号</span>
          <el-input
            placeholder="请输入内容"
            v-model="setName"
            :disabled="true"
            size="mini"
          >
          </el-input>
        </div>
        <div class="setItem">
          <span>时间</span>
          <el-input
            placeholder="请输入内容"
            v-model="setName"
            size="mini"
          >
          </el-input>
        </div>
        <div class="setItem">
          <span>转速</span>
          <el-input
            placeholder="请输入内容"
            v-model="setName"
            size="mini"
          >
          </el-input>
            <el-select v-model="value" placeholder="请选择" size="mini">
              <el-option value="g">g</el-option>
              <el-option value="r/min">r/min</el-option>
            </el-select>
        </div>
        <div class="setItem">
          <span>转速</span>
          <el-input
            placeholder="请输入内容"
            v-model="setName"
            size="mini"
          >
          </el-input>
          <span>℃</span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="dialogSet = false">修改</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogSample"
      width="60%"
      >
      <div class="dialogSample">
        <div>
          <img src="@/assets/img/saomiao.gif">
        </div>
        <div class="sampleItem">
          <el-input
            placeholder="请输入内容"
            v-model="findValue"
            size="mini"
          >
          </el-input>
          <el-button size="mini" type="primary" class="findBtn">查询</el-button>
        </div>
        <el-table
            ref="multipleTable"
            :data="dialogSampleData"
            tooltip-effect="dark"
            style="width: 100%"
            height="150"
            :row-style="{height:'32px',textAlign: 'center',padding:'0px',}"
            :cell-style="{padding:'0px',textAlign: 'center'}"
            :header-cell-style ="{height:'30px',textAlign:'center',padding:'0px', background:'#00c9ff',color:'white'}"
            border
            >
            <el-table-column
            type="selection"
            width="50">
            </el-table-column>
            <el-table-column
            type="index"
            width="70"
            label="序号"
            class="DataTable"
            >
            </el-table-column>
            <el-table-column
            prop="sampleName"
            label="样本名称"
            class="DataTable"
            >
            <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column
            prop="projectName"
            label="项目名称"
            class="DataTable"
            >
            </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="dialogSample = false">添加到离心机</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="导出订单"
      :visible.sync="dialogExport"
      width="60%"
      center
      >
      <div class="dialogExport">   
        <div class="searchExport">
          <div class="searchName">
            <el-input v-model="exportName" placeholder="请输入订单名称" size="mini"></el-input>
            <el-button type="primary" size="mini" class="searchBtn">搜索</el-button>
          </div>
          <div class="block">
            <el-date-picker
              size="mini"
              v-model="value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
            <el-button type="primary" size="mini" class="searchBtn">搜索</el-button>
          </div>
        </div>
        <el-table
            ref="multipleTable"
            :data="dialogOrderData"
            tooltip-effect="dark"
            style="width: 100%"
            height="230"
            :row-style="{height:'32px',textAlign: 'center',padding:'0px',}"
            :cell-style="{padding:'0px',textAlign: 'center'}"
            :header-cell-style ="{height:'30px',textAlign:'center',padding:'0px', background:'#00c9ff',color:'white'}"
            border
            >
            <el-table-column
            type="index"
            width="70"
            label="序号"
            class="DataTable"
            >
            </el-table-column>
            <el-table-column
            prop="orderName"
            label="订单名称"
            class="DataTable"
            >
            </el-table-column>
            <el-table-column
              label="备注"
              prop="remarks"
              width="230"
            >
            </el-table-column>
          </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <img src="@/assets/img/pdf.png">
        <img src="@/assets/img/excel.png">
      </span>
    </el-dialog>
    <el-dialog
      title="订单详情"
      :visible.sync="dialogOrder"
      width="50%"
      center
      >
      <div class="dialogOrder">   
        <div class="orderNum">
          <p><span>样本容量:</span><span>{{sampleNum}}</span></p>
        </div>
        <el-table
            ref="multipleTable"
            :data="dialogOrderData"
            tooltip-effect="dark"
            style="width: 100%"
            height="230"
            :row-style="{height:'32px',textAlign: 'center',padding:'0px',}"
            :cell-style="{padding:'0px',textAlign: 'center'}"
            :header-cell-style ="{height:'30px',textAlign:'center',padding:'0px', background:'#00c9ff',color:'white'}"
            border
            >
            <el-table-column
            type="index"
            width="70"
            label="序号"
            class="DataTable"
            >
            </el-table-column>
            <el-table-column
            prop="orderName"
            label="名称"
            class="DataTable"
            >
            </el-table-column>
            <el-table-column
              label="操作"
              width="80"
            >
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, tableData)"
                  type="text"
                  size="small">
                  移除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {},
  components: {},
  data () { 
    return {
      autoplay: false,
      dialogSet: false,
      dialogSample: false,
      dialogExport: false,
      dialogOrder: false,
      exportName: '',
      sampleNum: 0,
      value1: '',
      value2: '',
      setName: '',
      findValue: '',
      value:'',
      bannerHeight: '',
      centrifugeList:[
        {
          centrifugeName: '',
          centrifugeTime:'',
          centrifugeSpeed: '',
          centrifugeTemperature : '',
          activeCentrifugal: true
        },
        {
          centrifugeName: '',
          centrifugeTime:'',
          centrifugeSpeed: '',
          centrifugeTemperature : '',
          activeCentrifugal: true        
        },
        {
          centrifugeName: '',
          centrifugeTime:'',
          centrifugeSpeed: '',
          centrifugeTemperature : '', 
          activeCentrifugal: true         
        },
      ],
      dialogSampleData: [ // 离心机添加样本数据
        // {
        //   id: Date.now(),
        //   sampleName: '111',
        //   projectName: 'sample',
        // },
        // {
        //   id: Date.now(),
        //   sampleName: '111',
        //   projectName: 'sample',
        // },
        // {
        //   id: Date.now(),
        //   sampleName: '111',
        //   projectName: 'sample',
        // }
      ],
      dialogOrderData: [ // 离心机订单数据
        // {
        //   id: Date.now(),
        //   orderName: '111111111111111111111111111111111111111',
        //   remarks:''
        // },
        // {
        //   id: Date.now(),
        //   orderName: '11111111111111111111111111111',
        //   remarks:''
        // },
        // {
        //   id: Date.now(),
        //   orderName: '1111111111111111111111111111111111111',
        //   remarks:''
        // }
      ],
    } 
  },
  mounted () { // element banner 高度自适应
    // this.imgLoad();
    this.$nextTick(function () {
      this.bannerHeight = this.$refs.image[0].height
      console.log(this.bannerHeight)
    })
    window.addEventListener('resize', () => {
      this.$nextTick(function () {
        this.bannerHeight = this.$refs.image[0].height
        console.log(this.bannerHeight)
      })
    })
  },
  methods: {
    centrifugalSet(){
      this.dialogSet = true;
    },
    addSample(){
      this.dialogSample = true;
    },
    exportOrders(){
      this.dialogExport = true;
    },
    Ordersdetail(){
      this.dialogOrder = true;
    }
  },
  computed: {}
}
</script>
<style  lang='less'>
.centrifugeImg{
  width: 60%;
  margin: 0 auto;
  img{
    width: 261px;
    height: 261px;
  }
  .el-carousel__item--card.is-in-stage{
    text-align: center;
  }
}
.centrifugeSet{
  width: 60%;
  margin: 0 auto;
  background:rgba(244,244,245,1);
  border: 1px solid rgba(238,236,236,1);
  border-radius: 4px;
  // height: 200px;
  .centrifugeInfo{
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
    span{
      display: block;
      width:128px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      font-size: 18px;
    }
    .centrifugeItem{
      border: 1px solid rgba(151,151,151,1);
      border-radius: 4px;
      color: rgba(208,2,27,1);
      font-weight: bold;
    }
  }
  .centrifugeOperation{
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 30px;
    img{
      width: 44px;
      height: 44px;
      cursor: pointer;
    }
    .mainBtn{
      width:110px;
      height: 110px;
    }
  }
}
.dialogSet{
  .setItem{
    margin-left: 25%;
    margin-top: 15px;
    width: 100%;
    >span{
      margin-right: 15px;
      font-size: 16px;
    }
  }
  .el-input{
    width: 40%;
  }
  .el-select{
    width: 50%;
    margin-left: 10px;
  }
}
.dialogSample{
  text-align: center;
  width:90%;
  margin: 0 auto;
  img{
    width:128px;
    height: 128px;
  }
  .el-input{
    width: 50%;
  }
  .sampleItem{
    margin: 10px 0;
    .findBtn{
      margin-left: 10px;
    }
  }
}
.dialogExport{
  .searchExport{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  .block{
    text-align: right;
  }
  .searchName{
      display: flex;
    }
  }
  img{
      width: 30px;
      height: 34px;
  }
  .el-range-editor--mini.el-input__inner{
    width: 70%;
  }
  .el-input{
    width: 60%;
  }
  .searchBtn{
    margin-left: 15px;
    margin-right: 10px;
  }
}
.el-dialog__footer{
  text-align: center;
  img{
    margin-right: 20px;
  }
}
.dialogOrder{
  .orderNum{
    margin-bottom: 10px;
  }
}
</style>
