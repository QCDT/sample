<template>
  <div class="zhuanyunbot-index">
    <h1 class="title">
      位置信息:
      <span style="color:red">*</span>
    </h1>
    <div>
      <div class="item">
        <span>冰箱:</span>
        <el-select size="small" v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <span>层数:</span>
        <el-select size="small" v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="item">
        <span>抽屉:</span>
        <el-select size="small" v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <span>样本盒:</span>
        <el-select size="small" v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="x">
      <matrix9x9 border-color="#000" tdWidth="20px" tdHeight="23px" :tableData="matrixData"></matrix9x9>
    </div>
    <div class="bot-btn">
      <tmpButton @click="save">保存</tmpButton>
      <tmpButton @click="$emit('goBack')">返回</tmpButton>
    </div>
  </div>
</template>
<script>
import matrix9x9 from '@/components/tmp/zhanglan/matrix-9x9'
import tmpButton from '@/components/tmp/zhanglan/tmpButton'
export default {
  props: {},
  components: { matrix9x9, tmpButton },
  data () {
    return {
      options: [
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: '',
      input: '',
      matrixData: [
        [
          { bgc: '#fff' },
          { bgc: '#fff' },
          { bgc: '#fff' },
          { bgc: '#fff' },
          { bgc: '#fff' },
          { bgc: '#fff' }
        ],
        [
          { bgc: '#fff' },
          { bgc: '#fff' },
          { bgc: '#fff' },
          { bgc: '#fff' },
          { bgc: '#fff' },
          { bgc: '#fff' }
        ],
        [
          { bgc: '#fff' },
          { bgc: '#fff' },
          { bgc: '#fff' },
          { bgc: '#fff' },
          { bgc: '#fff' },
          { bgc: '#fff' }
        ],
        [
          { bgc: '#fff' },
          { bgc: '#fff' },
          { bgc: '#fff' },
          { bgc: '#fff' },
          { bgc: '#fff' },
          { bgc: '#fff' }
        ],
        [
          { bgc: '#fff' },
          { bgc: '#fff' },
          { bgc: '#fff' },
          { bgc: '#fff' },
          { bgc: '#fff' },
          { bgc: '#fff' }
        ],
        [
          { bgc: '#fff' },
          { bgc: '#fff' },
          { bgc: '#fff' },
          { bgc: '#fff' },
          { bgc: '#fff' },
          { bgc: '#fff' }
        ]
      ]
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
.zhuanyunbot-index {
  padding: 0 20px;
  .title {
    font-weight: 500;
    font-size: 17px;
    margin-bottom: 10px;
  }
}
.item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  span {
    white-space: nowrap;
    padding: 0 2px 0 10px;
  }
}
.bot-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 30px;
  &/deep/ button {
    margin: 0 30px;
  }
}
</style>
