
<template>
  <div>
    <div class="checkWrap">
      <div class="checkLeft">
        <div class="L_title">
          <span>系统登记状态</span>
          <p  v-for="(item, index) in colorData" :key="index">
            <em :style="{backgroundColor: item.color}"></em>
            <span>{{item.text}}</span>
          </p>
        </div>
        <div class="L_sampleTable">
            <table border>
              <tr class="row" v-for="(item,rowIndex) in 10" :key="rowIndex">
                <td
                  v-for="(item,columnIndex) in 10"
                  :key="columnIndex"
                >{{rowIndex*10+columnIndex+1}}</td>
              </tr>
            </table>
        </div>
      </div>
      <div class="checkContent">
          <div class="checkTitle">     <!--盘点标题-->
              <div class="checkTitleL" :class="{active: check}" @click="direct"><span>直接盘点</span></div>
              <div class="checkTitleR" :class="{active: check == false}" @click="choice"><span>选择盘点</span></div>
          </div>
              <!--直接盘点内容区-->
          <div class="direct" v-show="check">
            <div class="scanBtn">
              <img src="@/assets/img/saomiao.gif">
            </div>
            <p><span>请将样本盒放在读卡器上，点击按钮开始盘点</span></p>
            <p class="notice">
              <i class="el-icon-warning-outline"></i>
              <span>错误范围标记在红色区域，请及时处理</span>
            </p>
          </div>
            <!--选择盘点内容区-->
          <div class="choice" v-show="!check">
            <div class="choiceItem">
              <span>选择冰箱</span>
              <el-select v-model="value" placeholder="请选择" size="mini">
                  <el-option>
                  </el-option>
              </el-select>
            </div>
            <div class="choiceItem">
              <span>选择层</span>
              <el-select v-model="value" placeholder="请选择" size="mini">
                  <el-option>
                  </el-option>
              </el-select>
            </div>
            <div class="choiceItem">
              <span>选择抽屉</span>
              <el-select v-model="value" placeholder="请选择" size="mini">
                  <el-option value="">

                  </el-option>
              </el-select>
            </div>
            <div class="choiceItem">
              <span>选择样本盒</span>
              <el-select v-model="value" placeholder="请选择" size="mini">
                  <el-option>
                  </el-option>
              </el-select>
            </div>
            <div class="notice">
              <i class="el-icon-warning-outline"></i>
              <span>错误范围标记在红色区域，请及时处理</span>
            </div>
            <el-button type="primary" size="mini" class="choiceBtn">开始盘点</el-button>
          </div>
      </div>
      <div class="checkRight">
        <div class="R_title">
          <span>实际盘点状态</span>
          <p  v-for="(item, index) in colorDataB" :key="index">
            <em :style="{backgroundColor: item.color}"></em>
            <span>{{item.text}}</span>
          </p>
        </div>
        <div class="R_sampleTable">
            <table border>
              <tr class="row" v-for="(item,rowIndex) in 10" :key="rowIndex">
                <td
                  v-for="(item,columnIndex) in 10"
                  :key="columnIndex"
                >{{rowIndex*10+columnIndex+1}}</td>
              </tr>
            </table>
        </div>
      </div>
    </div>  
    <!--盘点记录按钮-->
    <div class="checkRecord" @click="checkRecord">
        <div><img src="@/assets/img/sample-receive.png"></div>
        <div><span>盘点记录</span></div>
    </div>
    <div class="checkInfo" >
      <div class="checkLeft">
        <p><span>样本盒信息</span></p>
        <p><span>盘点日期</span></p>
        <p><span>扫描到的样本</span></p>
        <p><span>空标签数量</span></p>
        <p><span>应有正常样本数量</span></p>
        <p><span>不属于该样本盒样本数量</span></p>
        <p><span>扫描到的借出样本数量</span></p>
        <p><span>缺失的样本数量</span></p>
        <p><span>结果</span></p>
      </div>
      <div class="checkRight">
        <p><span>样本盒信息</span></p>
        <p><span>盘点日期</span></p>
        <p><span>扫描到的样本</span></p>
        <p><span>空标签数量</span></p>
        <p><span>应有正常样本数量</span></p>
        <p><span>不属于该样本盒样本数量</span></p>
        <p><span>扫描到的借出样本数量</span></p>
        <p><span>缺失的样本数量</span></p>
        <p><span>结果</span></p>
      </div>
    </div>
    <div class="checkDetails">
        <p><span>详细异常描述</span></p>
        <div class="checkDetailsContent">
          <div class="checkLeft">
            <p><span>异常详情</span></p>
          </div>
          <div>
            <p><span>样本名称(位置信息)</span></p>
          </div>
        </div>
    </div>
    <el-dialog
      title="历史盘点记录"
      :visible.sync="DialogVisible"
      width="80%"
      center>
      <div class="recordTitle">
        <div>
          <span class="recordType">表单名称:</span>
          <el-input v-model="input" placeholder="请输入内容" size="mini"></el-input>
          <span class="recordType">样本名称:</span>
          <el-input v-model="input" placeholder="请输入内容" size="mini"></el-input>
        </div>
        <div>
          <span class="recordTime">盘点时间</span>
          <el-date-picker
            v-model="value1"
            type="daterange"
            size="mini"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
          <el-button type="primary"  size="mini">搜索</el-button>
        </div>
      </div>
      <div class="formNum">
        <div><span>表单数量:</span><span></span></div>
        <div>
          <img src="@/assets/img/receive-excel.png">
          <img src="@/assets/img/receivePDF.png">
        </div>
      </div>
      <div class="formContent">
          <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 50% ; float:left"
                :row-style="{height:'32px',textAlign: 'center',padding:'0px',}"
                :cell-style="{padding:'0px',textAlign: 'center'}"
                :header-cell-style ="{height:'30px',textAlign:'center',padding:'0px', background:'#00c9ff',color:'white'}"
                border
                >
                <el-table-column
                type="selection"
                >
                </el-table-column>
                <el-table-column
                type="index"
                
                label="序号"
                class="DataTable"
                >
                </el-table-column>
                <el-table-column
                prop="data"
                label="表单名称"
                class="DataTable"
                >
                <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column
                prop="username"
                label="操作(盘点)人"
                class="DataTable"
                >
                </el-table-column>
                <el-table-column
                prop="filename"
                label="盘点日期"
                class="DataTable"
                >
                </el-table-column>
          </el-table>
          <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 50%; float:right"
                :row-style="{height:'32px',textAlign: 'center',padding:'0px',}"
                :cell-style="{padding:'0px',textAlign: 'center'}"
                :header-cell-style ="{height:'30px',textAlign:'center',padding:'0px', background:'#00c9ff',color:'white'}"
                border
                >
                <el-table-column
                type="index"               
                label="序号"
                class="DataTable"
                >
                </el-table-column>
                <el-table-column
                prop="data"
                label="样本名称"
                class="DataTable"
                >
                <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column
                prop="username"
                label="样本类别"
                class="DataTable"
                >
                </el-table-column>
                <el-table-column
                prop="filename"
                label="受试者编号"
                class="DataTable"
                >
                </el-table-column>
                <el-table-column
                prop="filename"
                label="已盘点次数"
                class="DataTable"
                >
                </el-table-column>
          </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="DialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="DialogVisible = false" size="mini">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {},
  components: {},
  data () { 
    return {
      check: true,
      value: '',
      DialogVisible: false,
      input: '',
      value1: '',
      value:[],
      tableData:[],
      colorData:[
        {
          color:'#c5c8c7',
          text: '已使用'
        },
        {
          color: 'white',
          text: '未使用'
        },
        {
          color: '#f8ffb2',
          text: '借用'
        }
      ],
      colorDataB:[
          {
            color: 'red',
            text: '错误'
          },
          {
            color: '#c5c8c7',
            text: '已使用'
          },
          {
            color: 'white',
            text:'未使用'
          },
          {
            color:'#f8ffb2',
            text: '借用'
          }
      ]
    }
  },
  methods: {
    checkRecord(){
      this.DialogVisible = true;
    },
    direct () {
      this.check = true;
    },
    choice () {
      this.check = false;
    }
  },
  computed: {}
}
</script>
<style lang="less" scoped>
.checkWrap{
    display: flex;
    justify-content: space-around;
    align-items: center;
    .checkLeft{
      width: 350px;
      margin-top: 25px;
      .L_title{
        display: flex;
        align-items: center;
        justify-content: space-around;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        height: 44px;
        background: #00c9ff;
        p{
          display: flex;
          align-items: center;
        }
        em{
          width: 14px;
          height: 14px;
          margin-right: 5px;
        }
      }
      .L_sampleTable{
        background: #f9f9f9;
        padding:  45px 0px;
        text-align:-webkit-center;
        table{
          border-spacing: 0;
          border-collapse: collapse;
          border: 1px solid rgb(121, 119, 119);
          text-align: center;
          td{
              width: 23px;
              height: 20px;
              border: 1px solid rgb(121, 119, 119);
              background-color: white;
          }
        }
      }
    }
    .checkRight{
      width: 350px;
      margin-top: 25px;
      .R_title{
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        padding-left: 10px;
        height: 44px;
        background: #00c9ff;
        p{
          display: flex;
          align-items: center;
        }
        em{
          width: 14px;
          height: 14px;
          margin-right: 5px;
        }
      }
      .R_sampleTable{
        background: #f9f9f9;
        padding:  45px 0px;
        text-align:-webkit-center;
        table{
          border-spacing: 0;
          border-collapse: collapse;
          border: 1px solid rgb(121, 119, 119);
          text-align: center;
          td{
              width: 23px;
              height: 20px;
              border: 1px solid rgb(121, 119, 119);
              background-color: white;
          }
        }
      }
    }
    .checkContent{
      width: 350px;
      margin-top: 25px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
      text-align: center;
      // 盘点标题
      .checkTitle{
          height: 45px;
          border-bottom: 1px solid #999;
          line-height: 45px;
          justify-content: space-around;
          align-items: center;
          .checkTitleL{
              float: left;
              width:50%;
              text-align: center;
              box-sizing: border-box;
              cursor: pointer;
              span{
                  border-right: 1px solid #999;
                  display: inline-block;
                  width: 100%;
                  line-height: 20px;
              }
          }
          .checkTitleR{
              float: left;
              width: 50%;
              text-align: center;
              cursor: pointer;
          }
      }
      // 直接盘点
      .direct{
          padding-bottom: 70px;
          .scanBtn{
              margin: 30px 0;
          }
          p:first-of-type{
              color: #00c9ff;
              font-weight: 600;
              // margin-bottom: 10px;
          }
          img{
              width: 96px;
              height: 96px;
              cursor: pointer;
          }
      }
      // 选择盘点
      .choice{
          width: 80%;
          margin: 0 auto;
          text-align: center;
          .choiceItem{
              display: flex;
              align-items: center;
              margin-top: 15px;
              >span{
                width: 30%;
                text-align: left;
              }
              >input{
                  width:60%;
              }
          }
          .choiceBtn{
              margin-top: 20px;
              margin-bottom: 20px;
          }
      }
      .active{
          color: #00c9ff;
      }
    }
  } 
  .checkDetails{
     text-align: center;
     margin: 20px 0;
     .checkDetailsContent{
       display: flex;
       justify-content: center;
       align-items: center;
       margin-top: 10px;
       p{
         border: 1px solid #ccc;
         width: 45vw;
       }
       .checkLeft{
         p{
           border-right: none;
         }
       }
     }
  }
  .checkInfo{
    display: flex;
    justify-content:center;
    align-items: center;
    width: 100%;
    margin-top: 20px;
    p{
      border: 1px solid #ccc;
      width: 45vw;
      text-align: center;
    }
    .checkLeft{
      p{
        border-right: none;
        // span{
        //   display: block;
        //   width: 30%;
        //   margin: 0 auto;
        // }
      }
    }
  }

</style>
