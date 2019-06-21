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
            <el-select v-model="devicetypeValue" filterable @change="changeCutDown">
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
          <div class='parameterItem'> <el-button type="primary" class="btn">测试</el-button> </div>
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
        <el-button type="primary" class="btn">保存</el-button>
        <el-button type="primary" class="btn" >返回</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return ({
      devicetypeValue: '大读卡器',
      OpentypeValue: 'COM',
      comBaudRateValue: '38400',
      comFrameStructureValue: '8E1',
      comPortValue: 'COM10',
      netIpAddress: '192.168.1.22',
      netPort: '9099',
      comdisabled: false,
      netdisabled: false,
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
          value: '大读卡器',
          label: '大读卡器'
        },
        {
          value: '小读卡器',
          label: '小读卡器'
        },
        {
          value: '3D读卡器',
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
  methods: {
    changeCutDown () {
      // if(this.devicetypeValue == '大读卡器'){
      //   this.OpentypeValue = ''
      // }
    }
  }
}
</script>
