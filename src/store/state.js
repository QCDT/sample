module.exports.state = {
  OnOpen (devicetypeValue, OpentypeValue, comBaudRateValue, comFrameStructureValue, comPortValue, netIpAddress, netPort) {    // alert(comFrameStructureValue)
    let nret = -1
    if (OpentypeValue === 'COM') {
      console.log(devicetypeValue, comBaudRateValue, comFrameStructureValue, comPortValue)
      nret = MyActiveX1.RDR_OpenPort(devicetypeValue, comBaudRateValue, comFrameStructureValue, comPortValue)
    } else if (OpentypeValue === 'USB') {
      nret = MyActiveX1.RDR_OpenUSB(devicetypeValue, 0, '')
    } else {
      nret = MyActiveX1.RDR_OpenNet(devicetypeValue, netIpAddress, netPort)
    }
    return nret
  }
}
