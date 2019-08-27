<template>
  <div>
    <cardfile></cardfile>
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
          <div class='parameterItem'> <el-button size="small" type="primary" class="btn" @click="cardReaderTest">测试</el-button> </div>
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
        <el-button type="primary" size="small" class="btn" @click="saveCardReader">保存</el-button>
        <el-button type="primary" size="small" class="btn" @click="$router.go(-1)">返回</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import cardfile from '@/components/cardfile'
export default {
  components:{
      cardfile
  },
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
      // alert(MyActiveX1.RDR_Close())
      let n = this.$store.state.OnOpen(this.devicetypeValue,this.OpentypeValue,this.comPortValue,this.comBaudRateValue,this.comFrameStructureValue,this.netIpAddress,this.netPort)
      if (n!=0) {
        this.$alert('设备未识别到，请检查设备连接或设备类型', '提示', {
          confirmButtonText: '确定',
          type: 'error'
        });
		    return false;
      }else{
        this.$alert( '连接成功！请点击保存', '提示', {
          confirmButtonText: '确定',
          type:'success'
        });
      }
      MyActiveX1.RDR_Close();
    },
    saveCardReader(){
      // MyActiveX1.RDR_Close();
      this.$cookies.set('readerType', this.devicetypeValue, '1y')
      this.$cookies.set('portType', this.OpentypeValue, '1y') 
      this.$cookies.set('comPortNo',this.comPortValue, '1y')
      this.$cookies.set('comBaudRate',this.comBaudRateValue, '1y')
      this.$cookies.set('comFrameStructure', this.comFrameStructureValue, '1y')
      this.$cookies.set('netIpAddress', this.netIpAddress, '1y')
      this.$cookies.set('netPortNo', this.netPort, '1y')
      this.$alert( '保存成功!', '提示', {
          confirmButtonText: '确定',
          type:'success'
      });
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
            background: #00c9ff;
            border: 1px solid #00c9ff;
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
                background: #00c9ff;
                border: 1px solid #00c9ff;
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
