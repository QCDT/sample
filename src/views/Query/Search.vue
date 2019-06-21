<template>
  <div class="query-wrap">
    <div class="top">
      <div class="data">
        <div class="row row-spall">
          <tmpinput>
            样式名称
            <el-input slot="elUI" v-model="input" clearable size="small" style="width:100%"></el-input>
          </tmpinput>
          <tmpinput>
            借出人
            <el-input slot="elUI" v-model="input1" clearable size="small" style="width:100%"></el-input>
          </tmpinput>
          <tmpinput>
            &nbsp;&nbsp;&nbsp;&nbsp;录入人
            <el-input slot="elUI" v-model="input2" clearable size="small" style="width:100%"></el-input>
          </tmpinput>
          <tmpinput>
            试管类别
            <el-select
              slot="elUI"
              size="small"
              clearable
              v-model="value"
              filterable
              placeholder="请选择"
              style="width:100%"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </tmpinput>
        </div>
        <div class="row row-spall">
          <tmpinput>
            样本来源
            <el-select
              slot="elUI"
              size="small"
              clearable
              v-model="value"
              filterable
              placeholder="请选择"
              style="width:100%"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </tmpinput>
          <tmpinput>
            &nbsp;&nbsp;状&nbsp;&nbsp;态
            <el-select
              slot="elUI"
              size="small"
              clearable
              v-model="value"
              filterable
              placeholder="请选择"
              style="width:100%"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </tmpinput>
          <tmpinput>
            样本类别
            <el-select
              slot="elUI"
              size="small"
              clearable
              v-model="value"
              filterable
              placeholder="请选择"
              style="width:100%"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </tmpinput>
          <tmpinput>
            项目类别
            <el-select
              slot="elUI"
              size="small"
              clearable
              v-model="value"
              filterable
              placeholder="请选择"
              style="width:100%"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </tmpinput>
        </div>
      </div>
      <div class="search">
        <!-- 搜索按钮 -->
        <div class="in">
          <i class="icon icon-sousuo"></i>
          <span>搜索</span>
        </div>
      </div>
    </div>
    <div class="gaoji" :style="{height:height}">
      <div class="row">
        <tmpinput>
          借出日期
          <el-date-picker
            slot="elUI"
            size="small"
            clearable
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </tmpinput>
        <tmpinput>
          过期日期
          <el-date-picker
            slot="elUI"
            size="small"
            clearable
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </tmpinput>
      </div>
      <div class="row">
        <tmpinput>
          采样日期
          <el-date-picker
            slot="elUI"
            size="small"
            clearable
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </tmpinput>
        <tmpinput>
          录入日期
          <el-date-picker
            slot="elUI"
            size="small"
            clearable
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </tmpinput>
      </div>
      <div class="row" style="width:58%">
        <h2 style="white-space: nowrap;margin-right:22px">位置信息:</h2>
        <tmpinput>
          冰箱
          <el-select
            slot="elUI"
            size="small"
            clearable
            v-model="value"
            filterable
            placeholder="请选择"
            style="width:100%"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </tmpinput>
        <tmpinput>
          层数
          <el-select
            slot="elUI"
            size="small"
            clearable
            v-model="value"
            filterable
            placeholder="请选择"
            style="width:100%"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </tmpinput>
        <tmpinput>
          抽屉
          <el-select
            slot="elUI"
            size="small"
            clearable
            v-model="value"
            filterable
            placeholder="请选择"
            style="width:100%"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </tmpinput>
        <tmpinput>
          样式盒
          <el-select
            slot="elUI"
            size="small"
            clearable
            v-model="value"
            filterable
            placeholder="请选择"
            style="width:100%"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </tmpinput>
      </div>
    </div>
    <div class="gaoji-search">
      <div class="in" @click="showGaoJi">
        <i class="icon" :class="[height ==0 ?  'icon-xia' : 'icon-shang' ]"></i>
        <h1>{{height ==0 ? '高级搜索' : '简化搜索' }}</h1>
      </div>
    </div>
  </div>
</template>
<script>
import tmpinput from '@/components/tmp/zhanglan/tmp-empty-input'
export default {
  components: { tmpinput },
  data () {
    return {
      //   高级搜索的展示与隐藏
      height: 0,
      //
      input: '',
      input1: '',
      input2: '',
      input3: '',
      value1: '',
      //   试管类别
      options: [
        {
          value: '选项1',
          label: '苹果'
        },
        {
          value: '选项5',
          label: '香蕉'
        }
      ],
      value: ''
    }
  },
  methods: {
    showGaoJi () {
      console.log('111111: ', 111111)
      this.height = this.height == 0 ? '160px' : 0
    }
  },
  computed: {}
}
</script>
<style scoped lang='less'>
.query-wrap {
  position: relative;

  width: 1270px;
  margin: 0 auto;
  margin-top: 0.875rem;
  padding: 50px 30px 0;

  background-color: #fdfdfd;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.4);
}

.row {
  display: flex;
  align-items: center;

  margin-bottom: 20px;
}

.td {
  display: flex;
  align-items: center;

  margin-right: 20px;

  font-size: 16px;

  span {
    margin-right: 0.5em;
  }
}

.gaoji-search {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 1270px;
  margin-top: 10px;
  padding-bottom: 10px;

  .in {
    display: flex;
    align-items: center;

    padding: 2px 4px;

    cursor: pointer;
    transition: all 0.3s;

    border: 1px solid transparent;
    border-radius: 3px;

    &:hover {
      border: 1px solid #3cd7ff;
    }

    i {
      padding: 0 0.8em 0 0;

      font-weight: 800;
    }
  }

  h1 {
    color: #333;

    font-size: 16px;
    font-weight: 500;
  }
}

// 高级搜索
.gaoji {
  overflow: hidden;

  width: 100%;
  height: 0;

  transition: all 0.3s;
}

.top {
  display: flex;
  justify-content: space-between;

  .data {
    width: 80%;
  }

  .search {
    width: 100px;
    margin-right: 30px;

    .in {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;

      padding-top: 10px;

      cursor: pointer;

      color: #fff;
      border-radius: 3px;
      background-color: #3cd7ff;

      i {
        margin-bottom: 3px;

        font-size: 50px;
      }

      span {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
