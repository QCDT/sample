module.exports.state = {
  /* 表头样式 */
  formTheme: {
    background: '#fff',
    padding: '0px 0',
    height: '30px',
    lineHeight: '1.875rem',
    fontWeight: '900',
    fontSize: '1rem',
    color: '#fff',
    textAlign: 'center'
  },
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
