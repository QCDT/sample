<template>
    <div>
        <div class="equipmentstructure">
            <div class="structureTitle">
                <span>结构设置</span>
            </div>
            <div class="structureMiddle">
                <div class="structureLeft">
                    <div>
                        <div><span>贮藏设备层数设置:</span></div>
                        <div>
                            <span>贮藏设备层数:</span>
                            <el-input v-model="TierNum" placeholder="请输入内容" size="mini"></el-input>
                        </div>
                        <div>
                            <span>贮藏设备层高比例:</span>
                            <el-select v-model="setTier" placeholder="请选择" size="mini">
                                <el-option
                                    v-for="item in setTierOption"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="setEach" v-show="setTier == 2 && TierNum">
                            <span>总高度为100%,请按百分比设置每一层的高度</span>
                            <div>
                                <p v-for="item in Number(TierNum)" :key="item">
                                    <span>第{{item}}层:</span>
                                    <el-input v-model= TierEach[item-1]  placeholder="请输入内容" size="mini"></el-input>
                                    <span>%</span>
                                </p>
                            </div>
                            <span>剩余空间{{residue}}%</span>
                        </div>
                    </div>
                    <div>
                        <div><span>层结构:</span></div>
                        <div>
                            <span>分层结构:</span>
                            <el-select v-model="hierarchy" placeholder="请选择" size="mini">
                                <el-option
                                    v-for="item in hierarchyOption"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="setEach" v-show="hierarchy == 2 && TierNum">
                            <span>设置每一层的行数和列数</span>
                            <div>
                                <p v-for="item in Number(TierNum)" :key="item">
                                    <span>第{{item}}层:</span>
                                    <el-select v-model="rowNub[item-1]" placeholder="请选择" size="mini">
                                        <el-option
                                            v-for="item in 20"
                                            :key="item"
                                            :label="item"
                                            :value="item">
                                        </el-option>
                                    </el-select>
                                    <span>行</span>
                                    <el-select v-model="colNub[item-1]" placeholder="请选择" size="mini">
                                        <el-option
                                            v-for="item in 20"
                                            :key="item"
                                            :label="item"
                                            :value="item">
                                        </el-option>
                                    </el-select>
                                    <span>列</span>
                                </p>
                            </div>
                        </div>
                        <div v-show="hierarchy == 1">
                            <span>每层结构:</span>
                            <el-select v-model="row" placeholder="请选择" size="mini">
                                <el-option
                                    v-for="item in 10"
                                    :key="item"
                                    :label="item"
                                    :value="item">
                                </el-option>
                            </el-select>
                            <span>行</span>
                            <el-select v-model="col" placeholder="请选择" size="mini">
                                <el-option
                                    v-for="item in 10"
                                    :key="item"
                                    :label="item"
                                    :value="item">
                                </el-option>
                            </el-select>
                            <span>列</span>
                        </div>
                    </div>
                    <div>
                        <div><span>抽屉结构:</span></div>
                        <div>
                            <span>抽屉存放样本盒数量:</span>
                            <el-select v-model="sampleBoxWayValue" placeholder="请选择" size="mini">
                                <el-option
                                    v-for="item in sampleBoxWay"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="setEach" v-show="sampleBoxWayValue == 2 && TierNum">
                            <span>设置每个抽屉可摆放样本盒数量</span>
                            <div v-if ="row">
                                <p  v-for="item in Number(row*col*TierNum)" :key="item">
                                    <span>第{{item}}抽屉:</span>
                                    <el-select v-model="drawerNub[item-1]" placeholder="请选择" size="mini">
                                        <el-option
                                            v-for="item in sampleBoxNumOption"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </p>
                            </div>
                            <div v-if ="rowNub.length">
                                <p  v-for="item in sum" :key="item">
                                    <span>第{{item}}抽屉:</span>
                                    <el-select v-model="drawerNub[item-1]" placeholder="请选择" size="mini">
                                        <el-option
                                            v-for="item in sampleBoxNumOption"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </p>
                            </div>
                        </div>
                        <div v-show="sampleBoxWayValue == 1">
                            <span>每个抽屉样本盒数量均为:</span>
                            <el-select v-model="sampleBoxNum" placeholder="请选择" size="mini">
                                <el-option
                                    v-for="item in sampleBoxNumOption"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="showEquipment" v-show='TierEach.length>0' >
                        <div>
                            <div class="showTierTitle" v-for="item in Number(TierNum)" :key="item" v-show="TierNum">
                                <span>第{{item}}层</span>
                            </div>
                        </div>
                        <div class="tier" v-show="TierNum">
                            <div v-for="(item,index) in TierEach" :key="index" :style="'height:'+item+'%'">
                                <table  class="table">
                                    <tr v-for="(item,index) in row" :key="index">
                                        <td v-for="(item,ind) in col" :key="ind">{{(index)*col+ind+1}}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="showEquipment" style="height:40vw" v-show='TierEach.length==0'>
                        <div>
                            <div class="showTierTitle" v-for="item in Number(TierNum)" :key="item" v-show="TierNum">
                                <span>第{{item}}层</span>
                            </div>
                        </div>
                        <div class="tier" v-show="TierNum">
                            <div v-for="(item,index) in Number(TierNum)" :key="index">
                                <table  class="table">
                                    <tr v-for="(item,index) in row" :key="index">
                                        <td v-for="(item,ind) in col" :key="ind">{{(index)*col+ind+1}}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footerBtn">
                <el-button type="primary"  size="mini" @click="save">保存</el-button>
                <el-button type="primary"  size="mini">返回</el-button>
            </div>
            <img src="@/assets/img/arrowLeft2.png" class="prevBtn" @click="prevEquipment">
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      equipmentName: '',
      TierNum: '', //层数设置
      TierEach:[],//每层高度
      setTier:'',//贮藏设备层高比例选择
      hierarchy:1, // 选择分层方式
      row:'',
      col: '',
      rowNub:[],//设置每一层几行
      colNub: [],//设置每一层几列
      sampleBoxWayValue:1,//设置每个抽屉可存放样本盒数量方式
      sampleBoxNum:'', //统一设置每个抽屉可存放样本盒数量
      drawerNub:[],//设置每个抽屉可以存放样本盒数量
      setTierOption:[
        {
          label: '平局分层',
          value:1
        },
        {
          label: '自定义分层',
          value: 2
        }
      ],
      hierarchyOption:[
        {
          label:'统一规格',
          value:1
        },
        {
          label: '自定义规格',
          value: 2,
        }
      ],
      sampleBoxWay:[
        {
          label:'统一规格',
          value:1
        },
        {
          label: '自定义规格',
          value: 2,
        }
      ],
      sampleBoxNumOption:[ //统一设置样本盒数量
          {
            label:1,
            value:1
          },
          {
            label:2,
            value:2
          },
          {
            label:3,
            value:3
          },
          {
            label:4,
            value:4
          },
          {
            label:5,
            value:5
          },
          {
            label:6,
            value:6
          },
          {
            label:20,
            value:20
          },
          {
            label:50,
            value:50
          },
          {
            label:100,
            value:100
          },
          {
            label:150,
            value:150
          },
          {
            label:200,
            value:200
          }
      ]
    }
  },
  methods: {
    prevEquipment () {
      this.$router.push('/set/refrigerator/equipmentInfo')
    },
    save(){
        // this.$axios({
        //     method:'post',
        //     url:'sampleGuide/refrigeratorStru/insertRefrigeratorStru',
        //     data:({

        //     })
        // })
    }
  },
  watch:{
      TierNum(){
          if(this.TierNum == ''){
              this.rowNub = []
              this.colNub = []
          }
      },
      hierarchy(){
          if(this.hierarchy == 1){
              this.rowNub = []
              this.colNub = []
          }else{
              this.row = ''
              this.col = ''
          }
      },
      setTier(){
          this.rowNub = []
          this.colNub = []
          this.row = ''
          this.col = ''
      }
  },
  computed:{
    residue(){
        let newTierEach =this.TierEach.filter((item,index)=>{
            return item !== ''
        })
        if(newTierEach.length == 0){
            return 100
        }
       let residuceNum = 100 - newTierEach.reduce((n1,n2)=>{
            return parseFloat(n1)+parseFloat(n2)
        })
        return residuceNum
    },
    sum(){
        let nub = 0
        console.log(this.rowNub, this.colNub)
        for(let i=0; i<this.rowNub.length; i++){
            for(let j=0; j<this.colNub.length; j++){
                if(i==j){
                    nub+= this.rowNub[i]*this.colNub[j]
                }
            }
        }
        console.log(nub)
        return nub
    }
  }
}
</script>
<style lang="less" scoped>
.equipmentstructure{
        width: 80%;
        margin: 0 auto;
        position: relative;
    .structureTitle{
        text-align: center;
        margin-top: 20px;
        font-weight: bold;
        font-size: 20px;
    }
    .structureMiddle{
        text-align: center;
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-bottom: 20px;
        .structureLeft{
            text-align: left;
            .setEach{
                height: 230px;
                width: 60%;
                border: 1px solid #ccc;
                margin-top: 10px;
                overflow: auto;
                .el-input{
                    width: 50%;
                }
                p{
                    margin: 10px 0px;
                }
                span{
                    font-size: 12px;
                    color: #00c9ff;
                }
            }
        }
        // .showEquipmentWrap{
        //     height:25vw;
        // }
        .showEquipment{
            width:30%;
            // height: 45vw;
            // margin-top: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .showTierTitle{
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: space-around;
                height: 100%;
                // width:20%;
            }
            .tier{
                border: 1px solid #00c9ff;
                margin-left: 30px;
                height: 100%;
            //     width: 100%;
            //     display: flex;
            //     justify-content:left;
            //     align-items: center;
            //     span{
            //         // margin-left: 30px;
            //     }
                >div{
                    margin-top: 0;
                }
                .table {
                    border-spacing: 0;
                    border: 1px solid #ccc;
                    border-collapse: collapse;
                    background-color: #fff;
                    width: 100%;
                    height: 100%;
                    td {
                        border: 1px solid #ccc;
                        text-align: center;
                        font-size: 12px;
                        // width: 20px;
                        // height: 20px;
                        padding: 5px;
                    }
                }
            }
        }
        .el-input{
            width: 25%;
        }
        .el-select{
            width: 30%;
        }
        >div{
            >div{
                margin-top: 20px;
                >div{
                    margin-top: 10px;
                    span{
                        padding: 0 10px;
                    }
                }
            }
        }
    }
    .footerBtn{
        text-align: center;
        margin-top: 30px;
    }
    .prevBtn{
        position: absolute;
        left: -7%;
        top:40%;
    }
}
</style>
