module.exports.state = {
  loanOrderId: '', // 全局变量，获取选中借出表单ID
  loanSearchStatus: false, // 借出查询状态切换
  returnBackCodeing: [],
  OnOpen (MyActive, devicetypeValue, OpentypeValue, comBaudRateValue, comFrameStructureValue, comPortValue, netIpAddress, netPort) {
    let nret = -1
    console.log(MyActive)
    if (OpentypeValue === 'COM') {
      console.log(devicetypeValue, comBaudRateValue, comFrameStructureValue, comPortValue)
      nret = MyActive.RDR_OpenPort(devicetypeValue, comBaudRateValue, comFrameStructureValue, comPortValue)
    } else if (OpentypeValue === 'USB') {
      nret = MyActive.RDR_OpenUSB(devicetypeValue, 0, '')
    } else {
      nret = MyActive.RDR_OpenNet(devicetypeValue, netIpAddress, netPort)
    }
    return nret
  }
}
