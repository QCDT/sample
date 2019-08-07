<template>
  <div>
    <object id="MyActiveX1" width=0 height=0
        classid="clsid:38BEF3F4-E284-4548-8E7B-FE20AE443AD8">
        <param name="_Version" value="65536"/>
        <param name="_ExtentX" value="2646"/>
        <param name="_ExtentY" value="1323"/>
        <param name="_StockProps" value="0"/>
    </object>
    <div class="cardWrap">
      <div class="parameterWrap">
        <strong>设备参数</strong>
        <div class="parameter">
          <div class="parameterItem">
            <span class="type">设备类型:</span>
            <el-select v-model="devicetypeValue" filterable>
                <el-option
                v-for="item in devicetype"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
          </div>
          <div class='parameterItem'>
            <span class='type'>端口类型:</span>
            <el-select v-model="OpentypeValue" filterable>
                <el-option
                v-for="item in Opentype"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
          </div>
          <div class='parameterItem'> <el-button type="primary" class="btn" @click="cardReaderTest">测试</el-button> </div>
        </div>
      </div>
      <div class="parameterWrap">
        <strong>串口参数</strong>
        <div class="parameter">
          <div class="parameterItem">
            <span class="type">串口号:</span>
            <el-select v-model="comPortValue" filterable :disabled='comdisabled'>
                <el-option
                v-for=" item in comPort"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
          </div>
          <div class="parameterItem">
            <span class='type'>波特率:</span>
            <el-select v-model="comBaudRateValue" filterable :disabled='comdisabled'>
                <el-option
                v-for="item in comBaudRate"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
          </div>
          <div class="parameterItem">
            <span class='type'>帧结构:</span>
            <el-select v-model="comFrameStructureValue" filterable :disabled='comdisabled'>
                <el-option
                v-for="item in comFrameStructure"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="parameterWrap">
        <strong>网络参数</strong>
        <div class="parameter">
          <div class="parameterItem">
            <span class="type">IP地址:</span>
            <el-input v-model="netIpAddress" :disabled='netdisabled'></el-input>
          </div>
          <div class="parameterItem">
            <span class='type'>端口号:</span>
            <el-input v-model="netPort" :disabled='netdisabled'></el-input>
          </div>
        </div>
      </div>
      <div class="btns">
        <el-button type="primary" class="btn" @click="saveCardReader">保存</el-button>
        <el-button type="primary" class="btn" @click="$router.go(-1)">返回</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return ({
      devicetypeValue: 'M201',
      OpentypeValue: 'COM',
      comBaudRateValue: '38400',
      comFrameStructureValue: '8E1',
      comPortValue: 'COM10',
      netIpAddress: '192.168.1.22',
      netPort: '9099',
      comdisabled: false,
      netdisabled: true,
      comPort: [
        {
          value: 'COM1',
          label: 'COM1'
        },
        {
          value: 'COM2',
          label: 'COM2'
        },
        {
          value: 'COM3',
          label: 'COM3'
        },
        {
          value: 'COM4',
          label: 'COM4'
        },
        {
          value: 'COM5',
          label: 'COM5'
        },
        {
          value: 'COM6',
          label: 'COM6'
        },
        {
          value: 'COM7',
          label: 'COM7'
        },
        {
          value: 'COM8',
          label: 'COM8'
        },
        {
          value: 'COM9',
          label: 'COM9'
        },
        {
          value: 'COM10',
          label: 'COM10'
        },
        {
          value: 'COM11',
          label: 'COM11'
        },
        {
          value: 'COM12',
          label: 'COM12'
        },
        {
          value: 'COM13',
          label: 'COM13'
        },
        {
          value: 'COM14',
          label: 'COM14'
        },
        {
          value: 'COM15',
          label: 'COM15'
        },
        {
          value: 'COM16',
          label: 'COM16'
        },
        {
          value: 'COM17',
          label: 'COM17'
        },
        {
          value: 'COM18',
          label: 'COM18'
        },
        {
          value: 'COM19',
          label: 'COM19'
        },
        {
          value: 'COM20',
          label: 'COM20'
        }
      ],
      comFrameStructure: [
        {
          value: '8E1',
          label: '8E1'
        },
        {
          value: '8N1',
          label: '8N1'
        },
        {
          value: '8O1',
          label: '8O1'
        }
      ],
      comBaudRate: [
        {
          value: '9600',
          label: '9600'
        },
        {
          value: '38400',
          label: '38400'
        },
        {
          value: '115200',
          label: '115200'
        }
      ],
      devicetype: [
        {
          value: 'M201',
          label: '大读卡器'
        },
        {
          value: 'RL8000',
          label: '小读卡器'
        },
        {
          value: 'RD242',
          label: '3D读卡器'
        }
      ],
      Opentype: [
        {
          value: 'COM',
          label: 'COM'
        },
        {
          value: 'USB',
          label: 'USB'
        },
        {
          value: 'NET',
          label: 'NET'
        }
      ]
    })
  },
  watch:{
    devicetypeValue(){
      if(this.devicetypeValue == 'M201'){
        this.OpentypeValue = 'COM'
      }else if(this.devicetypeValue == 'RL8000'){
        this.OpentypeValue = 'USB'
      }else{
        this.OpentypeValue = 'COM'
      }
    },
    OpentypeValue(){
      if(this.OpentypeValue == 'COM'){
        this.comdisabled = false
        this.netdisabled = true
      }else if(this.OpentypeValue == 'NET'){
        this.comdisabled = true
        this.netdisabled = false
      }else{
        this.comdisabled = true
        this.netdisabled = true
      }
    }
  },
  methods: {
    cardReaderTest(){
      console.log(this.$cookies.keys())
      // MyActiveX1.RDR_Close();
      // let n = this.$store.state.OnOpen(this.devicetypeValue,this.OpentypeValue,this.comBaudRateValue,this.comFrameStructureValue,this.comPortValue,this.netIpAddress,this.netPort)
      // if (n!=0) {
      //   this.$alert('设备未识别到，请检查设备连接或设备类型', '', {
      //     confirmButtonText: '确定',
      //     type: 'error'
      //   });
		  //   return false;
      // }else{
      //   this.$alert( '连接成功！请点击保存', '提示', {
      //     confirmButtonText: '确定',
      //     type:'success'
      //   });
      // }
      // let nret=0;
		  // //盘点标签时，使能15693协议。返回，成功：0 ；失败：非0 （查看错误代码表）。
      // nret = MyActiveX1.RDR_Enable15693(0,0x00,0);
      // nret = MyActiveX1.RDR_Enable14443A();
      // if(nret!=0){
      //   this.$alert('连接读卡器失败', '提示', {
      //     confirmButtonText: '确定',
      //     type: 'error'
      //   });
      //   //结束标签盘点操作，释放内存空间。
      //   MyActiveX1.RDR_FinishInventory();
      //   return;
      // }
    },
    saveCardReader(){
      // this.$cookies.set('readerType', this.devicetypeValue) 
      this.$axios({
          method: 'post',
          url: 'sampleGuide/cardReader/saveCardReaderCookies',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          },
          credentials:"include",
          data:({
             readerType: this.devicetypeValue,
             portType: this.OpentypeValue,
             comPortNo: this.comPortValue,
             comBaudRate: this.comBaudRateValue,
             comFrameStructure: this.comFrameStructureValue,
             netIpAddress: this.netIpAddress,
             netPortNo: this.netPort
          })
      })
      .then((data)=>{
         console.log(data)
      })
      .catch(error=>{
        console.log(error)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.cardWrap {
    width: 100%;

    .btns {
        width: 100%;
        text-align: center;
        margin-top: 25px;

        .btn {
            width: 120px;
            // background-color: #00c9ff;
        }
    }

    .parameterWrap {
        width: 950px;
        height: 80px;
        border: 1px solid rgba(153, 153, 153, 1);
        position: relative;
        margin: 0 auto;
        margin-top: 35px;
        display: flex;
        justify-content: space-around;

        .parameter {
            font-size: 14px;
            display: flex;
            justify-content: space-around;
            align-items: center;

            .parameterItem {
                display: flex;
                justify-content: space-around;
                align-items: center;
            }

            .type {
                font-size: 14px;
                width: 70px;
                margin-left: 15px;
            }

            .btn {
                margin-left: 15px;
                // background-color: #00c9ff
            }
        }

        strong {
            position: absolute;
            font-size: 16px;
            top: -15px;
            left: 42%;
            background: white;
            display: inline-block;
            line-height: 20px;
            padding: 0px 10px;
            width: 100px;
            margin: 0 auto;
            text-align: center;
        }
    }
}
</style>
