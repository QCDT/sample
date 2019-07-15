<template>

  <!-- 表单 -->
  <div class="form" v-if="showDingdan">
    <div class="in">
      <h1>添加借出订单</h1>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="110px"
        label-position="left"
        class="demo-ruleForm"
      >
        <el-form-item label="订单名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="预计归还时间" required>
          <el-col :span="7">
            <el-form-item prop="date1">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions"
                v-model="ruleForm.date1"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col class="line" :span="1" style="width: 2%;margin-left:1%">-</el-col>
          <el-col :span="7">
            <el-form-item prop="date2">
              <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item label="备注" prop="desc">
          <el-input
            type="textarea"
            v-model="ruleForm.desc"
            maxlength="1000"
            show-word-limit
            placeholder="请输入内容"
            :rows="7"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="clearAdd('ruleForm')">返回</el-button>
          <!-- <el-button @click="resetForm('ruleForm')">返回</el-button> -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  props: { showDingdan: Boolean },
  components: {},
  data () {
    return {
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      // 禁止选择 今天之前的时间
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 8.64e7 // 如果没有后面的-8.64e7就是不可以选择今天的
        }
      },
      //
      rules: {
        name: [
          { required: true, message: '请输入订单名称', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ],
        date2: [
          {
            type: 'date',
            required: true,
            message: '请选择时间',
            trigger: 'change'
          }
        ],
        type: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一个活动性质',
            trigger: 'change'
          }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [{ required: true, message: '请填写活动形式', trigger: 'blur' }]
      }
    }
  },
  methods: {
    clearAdd () {
      this.$emit('clearAdd')
    },
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit('submitForm', JSON.parse(JSON.stringify(this.ruleForm)))
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  computed: {}
}
</script>
<style scoped lang='less'>
// form 表单
.form {
  position: fixed;
  z-index: 90;
  top: 87px;
  right: 0;
  bottom: 0;
  left: 0;

  background-color: #eee;
  .in {
    width: 1000px;
    padding: 0 100px;

    background-color: #fff;
    margin: 50px auto 0;
    border: 1px solid #aaa;

    h1 {
      font-size: 20px;
      padding: 20px 0;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
