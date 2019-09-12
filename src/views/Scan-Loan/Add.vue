<template>

  <!-- 表单 -->
  <div class="form" v-if="showDingdan">
    <div class="in">
      <h1>添加借出订单</h1>
      <el-form
        :model="ruleForm"
        :rules="rules"
        size="mini"
        ref="ruleForm"
        status-icon
        label-width="110px"
        label-position="left"
        class="demo-ruleForm"
      >
        <el-form-item label="订单名称" prop="name" required>
          <el-input v-model="ruleForm.name" ></el-input>
        </el-form-item>
        <el-form-item label="取走人" prop="takes" required>
          <el-input v-model="ruleForm.takes"></el-input>
        </el-form-item>
        <el-form-item label="所属项目" prop="projectValue" required>
            <el-select v-model="ruleForm.projectValue" placeholder="请选择">
              <el-option
                v-for="item in projectOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="预计归还时间" required>
          <el-col :span="7">
            <el-form-item prop="date">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd HH:MM:SS"
                :picker-options="pickerOptions"
                v-model="ruleForm.date"
              ></el-date-picker>
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
            :rows="4"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="clearAdd('ruleForm')">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  props: { showDingdan: Boolean , projectOption: Array},
  inject:['reload'],
  components: {},
  data () {
    let orderName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入订单名称'));
        } else {
          if( value.length > 50){
            callback(new Error('名称长度为1-50个字符'));
          }else {
            this.$axios({
              method:'post',
              url:'sampleGuide/scan/existLoanOrderName',
              data:({
                name: value,// 当前订单ID
              })
            })
            .then(({data})=>{
              console.log(data)
              if(data.data == 0){
                callback();
                // this.$message({ type: 'info', message:data.data })
              }else{
                callback(new Error("该名称已重复"));
              }
            })
          }
        }
      };
    let  verificationTakes = (rule, value, callback) =>{
      if(value === ''){
        callback(new Error('请输入取走人姓名'))
      }else{
        let reg = /^[\u4e00-\u9fa5]{2,4}$/
        if(!reg.test(value)){
           callback(new Error('姓名格式不正确'))
        }
        callback();
      }
    }
    return {
      // projectValue:'',
      ruleForm: {
        name: '',
        takes:'',
        date: '',
        delivery: false,
        projectValue:'',
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
          { validator: orderName, trigger: 'blur' }
        ],
        takes:[
          { validator: verificationTakes, trigger: 'blur' }
        ],
        projectValue: [
            { required: true, message: '请选择所属项目', trigger: 'blur' }
          ],
        date: [
          {
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    clearAdd () {
      this.$emit('clearAdd')
    },
    submitForm (formName) {
      console.log(formName);
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios({
            method:'post',
            url:'sampleGuide/scan/addLoanOrder',
            data:({
              name:this.ruleForm.name,//借出订单名称
              projectId: this.ruleForm.projectValue,
              takeleave:this.ruleForm.takes,//取走人
              expectedreturndate:this.ruleForm.date,//预计归还时间
              loanremarks:this.ruleForm.desc,//备注
            })
          }).then((data)=>{
            console.log(data);
            if(data.data.code==200){
              this.$message({ type: 'success', message:'创建借出订单成功' })
              this.reload();
            }
          })
          console.log(this.ruleForm.name,this.ruleForm.takes,this.ruleForm.date,this.ruleForm.desc);
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
  z-index: 20;
  top: 80px;
  right: 0;
  bottom: 0;
  left: 0;

  background-color: #eee;
  .in {
    width: 60%;
    padding: 0 50px;
    background-color: #fff;
    margin: 30px auto 0;
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
