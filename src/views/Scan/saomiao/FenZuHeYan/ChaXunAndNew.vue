<template>
  <!-- 查询和添加计划 -->
  <div>
    <fromName>创建样本检测计划表单</fromName>
    <div class="f-top-btn">
      <button @click="dialogVisible = true">查询</button>

      <button @click="dialogVisible2 = true">创建编组核验</button>
    </div>
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
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="创建样本检测计划（表单）"
      :visible.sync="dialogVisible2"
      width="50%"
      :before-close="handleClose2"
    >
      <div class="al-content-box">
        <div class="al-item">
          <span>所属项目:</span>
          <el-select v-model="value" placeholder="请选择" size="small">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="al-item">
          <span>分析批名称:</span>
          <el-input size="small" v-model="input" placeholder="请输入内容"></el-input>
        </div>
        <div class="al-item">
          <span>LC-MS-MS编号:</span>
          <el-input size="small" v-model="input" placeholder="请输入内容"></el-input>
        </div>
        <div class="al-item">
          <span>设置行数:</span>
          <el-select v-model="value" placeholder="请选择" size="mini">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <span>设置列数:</span>
          <el-select v-model="value" placeholder="请选择" size="mini">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="al-item">
          <span>显示方式:</span>
          <el-select v-model="displayMode" placeholder="请选择" size="mini">
            <el-option
              v-for="item in displayModeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="al-item"></div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import fromName from '@/components/tmp/zhanglan/fromName'

export default {
  props: {},
  components: { fromName },
  data () {
    return {
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
