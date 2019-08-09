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
}
