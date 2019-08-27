module.exports.state = {
  loanOrderId :'',//全局变量，获取选中借出表单ID
  OnOpen (devicetypeValue, OpentypeValue, comBaudRateValue, comFrameStructureValue, comPortValue, netIpAddress, netPort) {
    // alert(comFrameStructureValue)
    let nret = -1
    if (OpentypeValue === 'COM') {
      alert(1)
      nret = MyActiveX1.RDR_OpenPort(devicetypeValue, comPortValue, comBaudRateValue, comFrameStructureValue)
    } else if (OpentypeValue === 'USB') {
      alert(2)
      nret = MyActiveX1.RDR_OpenUSB(devicetypeValue, 0, '')
    } else {
      nret = MyActiveX1.RDR_OpenNet(devicetypeValue, netIpAddress, netPort)
    }
    alert(nret)
    return nret
  }
}
