<template>
  <!-- 修改样本 -->
  <div class="change-wrap">
    <!-- 左边 -->
    <div class="left-box">
      <div class="input-item">
        <span>RFID编号</span>
        <el-input size="mini" v-model="input" placeholder></el-input>
      </div>
      <div class="input-item">
        <span>*样本名称</span>
        <el-input size="mini" v-model="input" placeholder></el-input>
      </div>

      <div class="input-item">
        <span>*样本类别</span>
        <el-select size="mini" v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input size="mini" v-model="input" placeholder></el-input>
        <i class="icon icon-tianjia"></i>
      </div>
      <div class="input-item">
        <span>*样本来源</span>
        <el-select size="mini" v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input size="mini" v-model="input" placeholder></el-input>
        <i class="icon icon-tianjia"></i>
      </div>

      <div class="input-item">
        <span>采样日期</span>
        <el-date-picker
          size="mini"
          v-model="value"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="timestamp"
        ></el-date-picker>
      </div>

      <div class="input-item">
        <span>有效日期</span>
        <el-date-picker
          size="mini"
          v-model="value"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="timestamp"
        ></el-date-picker>
      </div>

      <div class="input-item">
        <span>管帽颜色</span>
        <el-input size="mini" v-model="input" placeholder></el-input>
      </div>
      <div class="input-item">
        <span>提前报警天数</span>
        <el-input size="mini" v-model="input" placeholder></el-input>
      </div>
      <div class="input-item">
        <span>项目编号</span>
        <el-input size="mini" v-model="input" placeholder></el-input>
      </div>
      <div class="input-item">
        <span>方案编号</span>
        <el-input size="mini" v-model="input" placeholder></el-input>
      </div>
      <div class="input-item">
        <span>剂量组</span>
        <el-input size="mini" v-model="input" placeholder></el-input>
      </div>
      <div class="input-item">
        <span>受试者号</span>
        <el-input size="mini" v-model="input" placeholder></el-input>
      </div>
      <div class="input-item">
        <span>实验采血日期</span>
        <el-input size="mini" v-model="input" placeholder></el-input>
      </div>
      <div class="input-item">
        <span>基质描述</span>
        <el-input size="mini" v-model="input" placeholder></el-input>
      </div>
    </div>
    <!-- 右边 -->
    <div class="right-box">
      <h1>*位置信息</h1>
      <div class="input-item">
        <span>冰箱</span>
        <el-select size="mini" v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <span>冰箱</span>
        <el-select size="mini" v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <span>冰箱</span>
        <el-select size="mini" v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <span>冰箱</span>
        <el-select size="mini" v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="row">
        <div class="map">
          <span>已使用</span>
          <span>借用</span>
          <span>当前位置</span>
          <span>未使用</span>
        </div>
        <div class="mark">
          <h1>备注</h1>
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            maxlength="1000"
            show-word-limit
            v-model="mark"
          ></el-input>
        </div>
      </div>
    </div>
    <goBack></goBack>
  </div>
</template>
<script>
import goBack from "@/components/tmp/zhanglan/go-1";
export default {
  props: {},
  components: { goBack },
  data() {
    return {
      input: "",
      mark: "",
      options: [
        {
          value: "血浆",
          label: "血浆"
        }
      ],
      value: ""
    };
  },
  methods: {},
  computed: {}
};
</script>
<style scoped lang='less'>
.change-wrap {
  display: flex;
  justify-content: space-evenly;
}

.left-box {
  //   flex: 1;
  width: 30%;
  //   padding: 0 150px;
}

.right-box {
  //   flex: 1;
  width: 45%;
  // padding: 0 150px;
}

.input-item {
  display: flex;
  align-items: center;

  margin-bottom: 10px;

  span {
    padding: 0 10px;
    //   width: 6em;
    //   text-align-last: justify;

    white-space: nowrap;
  }
}

.mark {
  padding-top: 30px;

  h1 {
    margin-bottom: 12px;
  }
}

.map {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  width: 60px;
  height: 150px;

  cursor: pointer;
  white-space: nowrap;

  font-size: 13px;

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    padding: 2px 3px;

    color: #333;
    border-radius: 3px;
    background-color: #f99;
  }
}
</style>