<template>
  <div class="add-box">
    <el-tabs type="border-card">
      <el-tab-pane label="选择已有样本">
        <div class="one-box">
          <div class="left-twins">
            <div class="item" v-for="(item,index) in forTheSampleData" :key="index">
              <span>{{item.text}}</span>:
              <el-select v-model="value" placeholder="请选择" size="small" style="margin:0 10px">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div class="right-twins">
            <h1 class="sample-boxTit">系统保存的样本盒信息</h1>
            <div class="row">
              <div class="item">
                <b></b>
                <span>已使用</span>
              </div>
              <div class="item">
                <b></b>
                <span>未使用</span>
              </div>
            </div>
            <div class="matrixTable-box">
              <matrixTable :borderColor="`#333`" :borderWidth="`1px`"></matrixTable>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="新建样本盒">
        <div class="two-box">
          <div class="left-twins">
            <div class="row">
              <span>*RFID编号</span>
              <input type="text">
              <div class="pic">
                <img src="@/assets/img/saomiao.gif" alt>
              </div>
            </div>
            <div class="row">
              <span>*样本盒名称</span>
              <input type="text">
              <span>*</span>
            </div>
            <div class="mark-box">
              <span>备注</span>:
              <el-input
                type="textarea"
                placeholder="请输入内容"
                v-model="mark"
                maxlength="30"
                show-word-limit
              ></el-input>
              <span>*</span>
            </div>
          </div>
          <div class="right-twins">
            <div class="row-top">
              <span>样本盒规格</span>
              <el-select
                v-model="value"
                placeholder="行"
                size="small"
                style="margin:0 10px;width:70px"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <span>行</span>
              <el-select
                v-model="value"
                placeholder="列"
                size="small"
                style="margin:0 10px;width:70px"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <span>列</span>
              <el-select
                v-model="value"
                placeholder="(显示模式)*"
                size="small"
                style="margin:0 10px;width:130px"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <span>(显示模式)*</span>
            </div>
            <div class="matrixTable-box">
              <matrixTable :borderColor="`#333`" :borderWidth="`1px`"></matrixTable>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="扫描已有样本盒">
        <div class="three-box">
          <div class="left-twins">
            <div class="pic">
              <img src="@/assets/img/saomiao.gif" alt>
            </div>
            <h6>RFID编号:</h6>
            <h6>样本盒名称:</h6>
            <h6>位置信息:</h6>
          </div>
          <div class="right-twins">
            <div class="row">
              <div class="item">
                <b></b>
                <span>已使用</span>
              </div>
              <div class="item">
                <b></b>
                <span>未使用</span>
              </div>
            </div>

            <div class="matrixTable-box">
              <matrixTable :borderColor="`#333`" :borderWidth="`1px`"></matrixTable>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="bot-b">
      <button>保存</button>
      <button @click="goBack">返回</button>
    </div>
  </div>
</template>
<script>
import matrixTable from "@/components/tmp/zhanglan/matrixTable";
export default {
  props: {},
  components: { matrixTable },
  data() {
    return {
      forTheSampleData: [
        { text: "选择冰箱", key: "", val: "" },
        { text: "选择层", key: "", val: "" },
        { text: "选择抽屉", key: "", val: "" },
        { text: "选择样本盒", key: "", val: "" }
      ],
      options: [
        {
          value: "冰柜",
          label: "冰柜"
        }
      ],
      value: "",
      mark:"",
    };
  },
  methods: {
    goBack() {
      this.$emit("goBack");
    }
  },
  computed: {}
};
</script>
<style scoped lang='less'>
.add-box {
  height: 500px;
  margin: 50px;
  padding: 60px;

  background-color: #fff;
}

.one-box,
.two-box,
.three-box {
  display: flex;

  height: 400px;
  //   background-color: #333;
}

.left-twins,
.right-twins {
  display: flex;
  flex: 1;
  flex-direction: column;

  padding: 15px 30px;
}

.left-twins {
  border-right: 1.5px solid #3cd7ff;
}

.right-twins {
  display: flex;
  flex-direction: column;
}

// 选择已有样本
.one-box {
  .left-twins {
    .item {
      margin: 10px;

      span {
        display: inline-block;

        width: 5rem;

        text-align-last: justify;
      }
    }
  }

  .right-twins {
    .sample-boxTit {
      display: flex;
      align-items: center;
      justify-content: center;

      height: 40px;

      font-size: 18px;
      font-weight: 500;
    }

    .row {
      display: flex;
      display: flex;
      align-items: center;
      justify-content: center;

      margin-bottom: 10px;

      .item {
        display: flex;
        align-items: center;

        margin: 0 12px;

        b {
          display: inline-block;

          width: 20px;
          height: 20px;
          margin: 0 7px;

          background-color: gray;
        }
      }
    }
  }
}
.two-box {
  .left-twins {
    .row {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      span {
        width: 6rem;
        text-align-last: justify;
      }
      .pic {
        > img {
          width: 20px;
          height: 20px;
        }
      }
    }
    .mark-box {
      span {
        padding-top: 3px;
        margin-bottom: 7px;
        width: 5rem;
        text-align-last: justify;
        display: inline-block;
      }
    }
  }
  .right-twins {
    .row-top {
      margin-bottom: 30px;
    }
  }
}

.three-box {
  .left-twins {
    display: flex;
    flex-direction: column;
    .pic {
      margin: 20px 0;
      margin-bottom: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    h6 {
      font-weight: 500;
      font-size: 18px;
      margin-bottom: 10px;
      padding-left: 50px;
    }
  }
  .right-twins {
    .row {
      display: flex;
      display: flex;
      align-items: center;
      justify-content: center;

      margin-bottom: 10px;

      .item {
        display: flex;
        align-items: center;

        margin: 0 12px;

        b {
          display: inline-block;

          width: 20px;
          height: 20px;
          margin: 0 7px;

          background-color: gray;
        }
      }
    }

  }
}
.matrixTable-box {
   
  display: flex;
  justify-content: center;
}
</style>