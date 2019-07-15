<template>
  <!-- 修改样本 -->
  <div>
    <h1 class="top-title" v-if="title">{{title}}</h1>
    <div class="sample-box">
      <div class="left">
        <h1 class="sample-old">
          <tmpButton style="padding:5px 10px;">当前信息</tmpButton>
        </h1>
        <ul class="sample-old">
          <li class="item" v-for="(item,index) in sample" :key="index">
            <span>{{item.key}}:</span>
            <i>{{item.value}}</i>
          </li>
        </ul>
        <div class="bot">
          <div class="matrix">
            <matrix9x9 tdWidth="10px" tdHeight="10px"></matrix9x9>
          </div>
          <div class="mark">
            <h1>备注</h1>
            <el-input
              type="textarea"
              :rows="5"
              style="width:280px"
              placeholder="请输入内容"
              v-model="textarea"
            ></el-input>
          </div>
        </div>
      </div>
      <div class="right">
        <h1 class="sample-old">
          <tmpButton style="padding:5px 10px;">修改信息</tmpButton>
        </h1>
        <ul class="sample-old">
          <li class="item">
            <span>RFID编号:</span>
            <el-input v-model="input" size="small" style="width:150px"></el-input>
            <i class="icon icon-kaiguan" style="fontSize:18px"></i>
          </li>
          <li class="item">
            <span>样本名称:</span>
            <el-input v-model="input" size="small" style="width:150px"></el-input>
          </li>
          <li class="item">
            <span>样本来源:</span>

            <el-select size="small" style="width:100px" v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-input v-model="input" size="small" style="width:150px"></el-input>

            <i class="icon icon-tianjia"></i>
          </li>
          <li class="item">
            <span>样本类别:</span>

            <el-select size="small" style="width:100px" v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-input v-model="input" size="small" style="width:150px"></el-input>

            <i class="icon icon-tianjia"></i>
          </li>

          <li class="item">
            <span>采样日期:</span>
            <el-input v-model="input" size="small" style="width:150px"></el-input>
            <i class="icon icon-shanchu" style="fontSize:20px"></i>
          </li>
          <li class="item">
            <span>有效日期:</span>
            <el-input v-model="input" size="small" style="width:150px"></el-input>
            <i class="icon icon-shanchu" style="fontSize:20px"></i>
          </li>
          <li class="item">
            <span>提前报警天数:</span>
            <el-input v-model="input" size="small" style="width:150px"></el-input>天
          </li>
          <h1>位置信息</h1>
          <li class="item location-info-change">
            <i>冰箱:</i>
            <el-select size="small" style="width:100px" v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <i>层数:</i>
            <el-select size="small" style="width:100px" v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <i>抽屉:</i>
            <el-select size="small" style="width:100px" v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <i>样本盒:</i>
            <el-select size="small" style="width:100px" v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </li>
        </ul>
        <div class="bot">
          <div class="matrix">
            <matrix9x9 tdWidth="10px" tdHeight="10px"></matrix9x9>
          </div>
          <div class="mark">
            <h1>备注</h1>
            <el-input
              type="textarea"
              :rows="5"
              style="width:280px"
              placeholder="请输入内容"
              v-model="textarea"
            ></el-input>
          </div>
        </div>
      </div>
    </div>
    <div class="bot-btn">
      <tmpButton @click="$emit('goBack')">返回</tmpButton>
      <tmpButton @click="changeSave">确认</tmpButton>
    </div>
  </div>
</template>
<script>
import tmpButton from '@/components/tmp/zhanglan/tmpButton'
import matrix9x9 from '@/components/tmp/zhanglan/matrix-9x9'
export default {
  props: { title: String },
  components: { tmpButton, matrix9x9 },
  data () {
    return {
      options: [
        {
          value: '西瓜',
          label: '西瓜'
        }
      ],
      value: '',
      input: '',
      textarea: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      sample: [
        { key: 'RFID编号', value: 'obj105f47g1a4' },
        { key: '样本名称', value: '样本1号' },
        { key: '样本来源', value: '血样' },
        { key: '样本类别', value: '血样' },
        { key: '采样日期', value: '2018-10-22 10:10:10' },
        { key: '有效日期', value: ' 2018-10-22 10:10:10' },
        { key: '提前报警天数', value: '20天' },
        { key: '位置信息', value: ['2号冰箱', '1-2-样本盒A'] }
      ]
    }
  },
  methods: {
    changeSave () {
      this.$emit('changeSave')
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
.bot-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 30px;
  &/deep/ {
    button {
      margin: 0 20px;
    }
  }
}
.sample-box {
  display: flex;
}
.left {
  flex: 1;

  border-right: 1px solid #999;
  .item {
    margin-bottom: 10px;

    font-size: 17px;
    span {
      display: inline-block;

      margin-bottom: 10.8px;
      width: 7.5rem;
    }
  }
}
.right {
  flex: 1;
}
.sample-old {
  padding: 10px 50px;
  .item {
    margin-bottom: 10px;
    font-size: 15px;
    span {
      display: inline-block;
      width: 7.5rem;
    }
  }
}
.bot {
  display: flex;
  justify-content: space-around;
}
.mark {
  padding-top: 20px;
  h1 {
    margin-bottom: 5px;
  }
}

.right {
  .item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
}
.location-info-change {
  padding-top: 5px;
  padding-left: 0.5rem;
  i {
    display: inline-block;
    white-space: nowrap;
    margin: 0 3px 0 7px;
  }
}
</style>
