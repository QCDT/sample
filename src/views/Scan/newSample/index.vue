<template>
  <!-- 新建样本:扫描页面的表单里的 新建按钮 -->

  <div class="change-wrap-1">
    <h1 class="top-title" v-if="title">{{title}}</h1>
      <div class="change-wrap">
        <!-- 左边 -->
        <div class="left-box">
          <div class="input-item-l">
            <span>RFID编号</span>
            <el-input size="mini" v-model="RFID" placeholder disabled></el-input>
          </div>
          <div class="input-item-l">
            <span><i>*</i>样本名称</span>
            <el-input size="mini" v-model="sampleName" placeholder></el-input>
          </div>
          <div class="input-item-l">
            <span><i>*</i>样本类别</span>
            <el-select  filterable allow-create size="mini" v-model="sampleType" placeholder="请选择" class="marg-l">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="input-item-l">
            <span><i>*</i>样本来源</span>
            <el-select size="mini" filterable allow-create  v-model="sampleSource" placeholder="请选择" class="marg-l">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="input-item-l">
            <span>采样日期</span>
            <el-date-picker
              size="mini"
              v-model="samplingDate"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="timestamp"
              style="width:100%"
            ></el-date-picker>
          </div>
          <div class="input-item-l">
            <span>有效日期</span>
            <el-date-picker
              size="mini"
              v-model="effective"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="timestamp"
              style="width:100%"
            ></el-date-picker>
          </div>
          <div class="input-item-l">
            <span>管帽颜色</span>
            <el-input size="mini" v-model="pipeCap" placeholder></el-input>
          </div>
          <div class="input-item-l">
            <span>提前报警天数</span>
            <el-input size="mini" v-model="earlyWarning" placeholder></el-input>
          </div>
          <div class="input-item-l">
            <span>项目编号</span>
            <el-input size="mini" v-model="project" placeholder></el-input>
          </div>
          <div class="input-item-l">
            <span>方案编号</span>
            <el-input size="mini" v-model="fangan" placeholder></el-input>
          </div>
          <div class="input-item-l">
            <span>剂量组</span>
            <el-input size="mini" v-model="jiliang" placeholder></el-input>
          </div>
          <div class="input-item-l">
            <span>受试者号</span>
            <el-input size="mini" v-model="patient" placeholder></el-input>
          </div>
          <div class="input-item-l">
            <span>实验采血日期</span>
            <el-input size="mini" v-model="bloodDate" placeholder></el-input>
          </div>
          <div class="input-item-l">
            <span>基质描述</span>
            <el-input size="mini" v-model="jizhi" placeholder></el-input>
          </div>
        </div>
        <!-- 右边 -->
        <div class="right-box">
          <h1 class="location-info">
            <span style="color:red">*</span>
            位置信息
          </h1>
          <div class="rightstyle"> 
            <div class="input-item-r">
            <span>冰箱</span>
            <el-select size="mini" v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <span>层数</span>
            <el-select size="mini" v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <span>抽屉</span>
            <el-select size="mini" v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <span>样本盒</span>
            <el-select size="mini" v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
          
          <div class="row">
            <matrix9x9 class="mapflex"></matrix9x9>
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
      </div>
      <div class="bot-btn">
        <tmpButton @click="$emit('goBack')">返回</tmpButton>
        <tmpButton @click="save">确认</tmpButton>
      </div>
    </div>
</template>
<script>
import tmpButton from '@/components/tmp/zhanglan/tmpButton'
import matrix9x9 from '@/components/tmp/zhanglan/matrix-9x9'
export default {
  props: { title: String , RFID: String},
  components: { tmpButton, matrix9x9 },
  data () {
    return {
      input: '',
      mark: '',
      sampleName:'', // 样本名称
      sampleType:'',// 样本类别
      sampleSource:'', // 样本来源
      samplingDate: '', // 采样日期
      effective: '', // 有效日期
      pipeCap:'', // 管帽颜色
      earlyWarning:'', // 提前报警天数
      project:'', //项目编号
      fangan: '', // 方案编号
      jiliang: '' ,//剂量组
      patient: '', // 受试者号
      bloodDate: '', //实验采血日期
      jizhi:'',// 基质描述
      options: [
        {
          value: '血浆',
          label: '血浆'
        }
      ],
      value: ''
    }
  },
  methods: {
    save () {
      this.$emit('save')
    }
  },
  computed: {}
}
</script>
<style scoped lang='less'>
.top-title {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7px 0;
  background-color: #e2e2e2;
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: 500;

}
.change-wrap-1 {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.change-wrap {
  display: flex;
  justify-content: space-around;
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

.input-item-l {
  display: flex;
  align-items: center;

  margin-bottom: 10px;

  span {
    padding: 0 10px;

    //   width: 6rem;
    white-space: nowrap;
    width: 30%;

    i{
      color: red;
      margin-left: -10px;
      margin-right: 6px;
    }
  }
}

.input-item-r {
  display: flex;
  align-items: center;
  span {
    padding: 0 10px;

    //   width: 6rem;
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

  //   width: 60px;

  width: 4rem;
  height: 150px;

  cursor: pointer;
  white-space: nowrap;

  font-size: 13px;

  span {
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 2px 3px;

    color: #333;
    border-radius: 3px;
    background-color: #f99;

    font-size: 13px;
  }
}

.bot-btn /deep/ button {
  margin: 0 20px;
}

.bot-btn {
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 30px 0;
  margin-left: -6%;
}

.location-info {
  margin-bottom: 10px;
  font-size: 17px;
  font-weight: 500;
}

.marg-l {
  width: 100%;
}
</style>
