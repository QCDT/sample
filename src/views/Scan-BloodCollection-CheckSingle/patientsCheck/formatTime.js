class FormatTime {
  constructor () {
    this.newDate = new Date()
    this.timer = null
    this.time = this.newDate.getTime()
    this.test = { hour12: false, year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }
    this.day = ['天', '一', '二', '三', '四', '五', '六']
  }
  format (test) {
    this.newDate.setTime(this.time += 1000)
    let t = this.newDate.toLocaleString('chinese', this.test)
    let d = `星期${this.day[this.newDate.getUTCDay()]}`
    console.log(t + d)
    test = t + d
  };
  run (test) {
    this.format(test)
    this.timer = setInterval(_ => { this.format(test) }, 1000)
  };
  clearTimer () {
    clearInterval(this.timer)
  };
}
module.exports.FormatTime = FormatTime
