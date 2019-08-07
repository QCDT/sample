<template>
  <!-- 扫描->分组核验->查询和添加计划 -->
  <div>
    <div class="f-top-btn">
      <button @click="dialogVisible = true">查询</button>
      <button @click="showCheckClick">创建编组核验</button>
    </div>
    <!-- 查询弹出 -->
    <el-dialog title="查询" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <div class="al-item">
        <span>编组订单名称:</span>
        <el-input size="small" v-model="input" placeholder="请输入内容"></el-input>
      </div>
      <div class="al-item">
        <span>录入人员:</span>
        <el-input size="small" v-model="input" placeholder="请输入内容"></el-input>
      </div>
      <div class="al-item">
        <span>录入日期:</span>
        <el-date-picker
          v-model="value"
          size="small"
          type="daterange"
          style="width:100%"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']"
        ></el-date-picker>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureClick">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 创建编组核验 -->
    <transition name="el-fade-in-linear">
      <maskTran v-if="alertCheck" :rgba='0' title="当前正在进行编组核验" bgc='#eee' >
        <createCheck @goBack='alertCheck=false'></createCheck>
      </maskTran>
    </transition>
  </div>
</template>
<script>
import fromName from '@/components/tmp/zhanglan/fromName'
import maskTran from '@/components/tmp/zhanglan/maskTran'
import createCheck from './alert-createCheck/index'
export default {
  props: {},
  components: { fromName, maskTran, createCheck },
  data () {
    return {
      alertCheck: false, // 创建编组核验
      input: '',
      value: '',
      dialogVisible: false,
      dialogVisible2: false,
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        }
      ],
      value: '',
      //   显示方式
      displayModeOptions: [
        { value: '1', label: '数字*数字' },
        { value: '2', label: '数字*字母' },
        { value: '3', label: '字母*数字' }
      ],
      displayMode: '1'
    }
  },
  methods: {
    sureClick () {
      /* 查询里边的确定按钮 */
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    handleClose2 (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    showCheckClick () {
      /* 创建编组核验 */
      this.alertCheck = true
      this.$message('创建编组核验')
    }
  },
  computed: {}
}
</script>
<style scoped lang='less'>
.f-top-btn {
  display: flex;
  justify-content: center;

  button {
    width: 264px;
    height: 32px;
    margin: 0 58px;

    cursor: pointer;
    text-align: center;

    color: #fff;
    border: 0;
    border-radius: 5px;
    outline: 0;
    background-color: #3cd7ff;

    font-size: 15px;
    line-height: 32px;
    margin-bottom: 25px;
  }
}
.al-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  span {
    white-space: nowrap;
    width: 10rem;
    text-align-last: justify;
    padding-right: 10px;
  }
}
.al-content-box {
  height: 50vh;
  overflow: auto;
}
</style>
