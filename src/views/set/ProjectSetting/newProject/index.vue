<template>
  <div>
    <el-dialog title :visible.sync="dialogVisible" width="90%" :before-close="handleClose">
      <div class="test">
        <form @submit.prevent="maskProject()">
          <div class="form-in">
            <div class="title">{{MASK_name}}</div>
            <div class="content">
              <p v-for="(item,index) in MASK_text" :key="index">
                <span>{{item.text}}:</span>
                <input type="text" v-model="MASK_items[item.value]" maxlength="20">
              </p>
            </div>
            <div class="bot-btn">
              <span slot="footer" class="dialog-footer">
                <el-button @click="$emit('closeProject')">取 消</el-button>
                <el-button type="primary" @click="maskProject">{{MASK_btn}}</el-button>
              </span>
            </div>
          </div>
        </form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    MASK_btn: String,
    dialogVisible: Boolean,
    MASK_name: String,
    MASK_items: { type: Object, default: () => {} }
  },
  data () {
    return {
      MASK_text: [
        {
          text: '项目名称',
          value: 'name'
        },
        {
          text: '方案号',
          value: 'fangan'
        },
        {
          text: '申办方',
          value: 'shenban'
        },
        {
          text: '负责人',
          value: 'person'
        },
        {
          text: '药物名称',
          value:'yaowu'
        }
      ]
    }
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.$emit('closeProject')
          //   done();
        })
        .catch(_ => {})
    },
    // 项目:创建,修改
    maskProject () {
        this.$emit("maskProject", this.MASK_items);
    }
  },
  computed: {}
}
</script>
<style scoped lang='less'>
.test {
  display: flex;

  form {
    width: 100%;

    background-color: #fff;

    .form-in {
      position: relative;

      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;

      width: 80%;
      margin: 0 auto;

      padding-top: 40px;

      border: 1px solid #ccc;

      // 表单标题
      .title {
        position: absolute;
        top: -13.5px;

        display: inline-block;

        padding: 0 15px;

        color: #3cd7ff;
        background-color: #fff;

        font-size: 18px;
      }

      // 内容
      .content {
        p {
          display: flex;
          align-items: flex-end;
        }

        span {
          display: block;

          width: 77px;
          margin-right: 10px;

          text-align-last: justify;
          white-space: nowrap;

          font-size: 16px;
        }

        input {
          height: 20px;
          padding-top: 20px;

          border: 0;
          border-bottom: 1px solid #333;

          font-size: 16px;
          line-height: 20px;
        }
      }

      //   底部按钮
      .bot-btn {
        display: flex;

        margin-bottom: 20px;
        padding-top: 20px;

        button {
          margin: 15px;
          padding: 5px 25px;

          cursor: pointer;
          text-align: center;

          color: #3cd7ff;
          border: 1px solid #3cd7ff;
          border-radius: 3px;
          outline: none;
          background: #fff;

          font-size: 16px;

          &:hover {
            color: #fff;
            background: #3cd7ff;
          }
        }
      }
    }
  }
}
</style>
