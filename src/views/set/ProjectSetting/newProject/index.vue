<template>
  <div>
    <el-dialog title :visible.sync="dialogVisible" width="90%" :before-close="handleClose">
      <div class="test">
        <form @submit.prevent="maskProject()">
          <div class="form-in">
            <div class="title">{{MASK_name}}</div>
            <div class="content">
              <p v-for="(item,index) in MASK_items" :key="index">
                <span>{{item.text}}:</span>
                <input type="text" v-model="MASK_value[item.key]">
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
import masking from "@/views/set/ProjectSetting/masking";
export default {
  props: {
    MASK_btn: String,
    dialogVisible: Boolean,
    MASK_name: String,
    MASK_items: { type: Array, default: () => [] }
  },
  components: { masking },
  data() {
    return {
      MASK_value: {
        name: "替格瑞洛", // 项目名称
        fangan: "SN-YQ-2018005/V 1.0", // 方案号
        shenban: "石药集团中奇制药技术", // 申办方
        persorn: "李四", // 负责人
        yaowu: "CSPCHA115胶囊" // 药物名称
      }
    };
  },
  methods: {
    clearFromBack() {
      console.log(": ", "返回事件");
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.$emit("closeProject");
          //   done();
        })
        .catch(_ => {});
    },
    // 项目:创建,修改
    maskProject() {
      this.$emit("maskProject", JSON.parse(JSON.stringify(this.MASK_value)));
      //   this.$emit("maskProject", this.MASK_value);
      this.MASK_value = {};
      console.log("111111111111111111111: ", 111111111111111111111);
    }
  },
  computed: {}
};
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