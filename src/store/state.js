module.exports.state = {
  OnOpen (devicetypeValue, OpentypeValue, comBaudRateValue, comFrameStructureValue, comPortValue, netIpAddress, netPort) {
    let nret = -1
    if (OpentypeValue === 'COM') {
      nret = MyActiveX1.RDR_OpenPort(devicetypeValue, comPortValue, comBaudRateValue, comFrameStructureValue)
    } else if (OpentypeValue === 'USB') {
      nret = MyActiveX1.RDR_OpenUSB(devicetypeValue, 0, '')
    } else {
      nret = MyActiveX1.RDR_OpenNet(devicetypeValue, netIpAddress, netPort)
    }
    return nret
  }
  // readRfid () {
  //   let nret = 0
  //   let recordCnt = ''
  //   let arrRfidCode = []
  //   nret = MyActiveX1.RDR_Inventory(0, '')
  //   if (nret !== 0) {
  //     this.$alert('读取标签失败，请检查设备连接以及参数设置！', '提示', {
  //       confirmButtonText: '确定',
  //       type: 'error'
  //     })
  //     MyActiveX1.RDR_FinishInventory()
  //     return
  //   }
  //   recordCnt = MyActiveX1.RDR_GetRecordCnt()
  //   console.log(recordCnt)
  //   // recordCnt.forEach((item, index) => {
  //   // })
  // }
}
