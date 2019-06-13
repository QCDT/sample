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
        <strong class="">设备参数</strong>
        <div class="parameter">
          <div>
            <span class="type">设备类型:</span>
            <el-select v-model="devicetypeValue" filterable placeholder="请选择" size="small">
                <el-option
                v-for="item in devicetype"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
          </div>
          <div>
            <span class='type'>端口类型:</span>
            <el-select v-model="OpentypeValue" filterable placeholder="请选择" size="small">
                <el-option
                v-for="item in Opentype"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
          </div>
          <div> <el-button type="primary" size="small" class="btn">测试</el-button> </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return ({
      devicetypeValue: '',
      OpentypeValue: '',
      devicetype: [{
        value: '选项1',
        label: '大读卡器'
      },
      {
        value: '选项2',
        label: '小读卡器'
      },
      {
        value: '选项3',
        label: '3D读卡器'
      }],
      Opentype: [{
        value: '选项1',
        label: 'COM'
      },
      {
        value: '选项2',
        label: 'USB'
      },
      {
        value: '选项3',
        label: 'NET'
      }]
    })
  }
}
</script>
