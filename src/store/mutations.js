module.exports.mutations = {
  loanOrderFun (state, loanOrderId ) {
    state.loanOrderId = loanOrderId
  },
  loanSearchStatus (state, name) {
    state.loanSearchStatus = name
  },
  changeReturnBack (state, value) {
    state.returnBackCodeing = value
  }
}
