<template>
  <!-- 查询和添加计划 -->
  <div>
    <fromName>创建样本检测计划表单</fromName>
    <div class="f-top-btn">
      <button @click="dialogVisible = true">查询</button>

      <button @click="addPlan">添加检测计划</button>
    </div>
    <el-dialog title="查询" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <div class="al-item">
        <span>项目名称:</span>
        <el-input size="small" v-model="input" placeholder="请输入内容"></el-input>
      </div>
      <div class="al-item">
        <span>分析批名称:</span>
        <el-input size="small" v-model="input" placeholder="请输入内容"></el-input>
      </div>
      <div class="al-item">
        <span>创建日期:</span>
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
      <div class="al-item">
        <span>创建人:</span>
        <el-input size="small" v-model="input" placeholder="请输入内容"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <transition name="el-fade-in-linear">
      <maskTran :rgba="0" bgc="#fff" v-if="ifAddPlan">
        <addPlan @close="ifAddPlan=false"></addPlan>
      </maskTran>
    </transition>
  </div>
</template>
<script>
import fromName from '@/components/tmp/zhanglan/fromName'
import htTable from '@/views/Scan-Detection/table'
import maskTran from '@/components/tmp/zhanglan/maskTran'
import addPlan from '@/views/Scan-Detection/addPlan'
export default {
  props: {},
  components: { fromName, htTable, maskTran, addPlan },
  data () {
    return {
      ifAddPlan: false,
      input: '',
      value: '',
      dialogVisible: false,

      options: [
        {
          value: '选项1',
          label: '黄金糕'
        }
      ],
      value: '',

      displayMode: '1'
    }
  },
  methods: {
    addPlan () {
      this.ifAddPlan = true
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
    width: 7rem;
    text-align-last: justify;
    padding-right: 10px;
  }
}
.al-content-box {
  height: 50vh;
  overflow: auto;
}
</style>
