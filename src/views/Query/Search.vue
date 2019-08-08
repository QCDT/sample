<template>
  <div class="query-wrap">
    <!-- {{sampleSearch}} -->
    <div class="top">
      <div class="data">
        <div class="row row-spall">
          <tmpinput>
            样式名称
            <el-input
              slot="elUI"
              size="small"
              v-model="sampleSearch.name"
              clearable
            ></el-input>
          </tmpinput>
          <tmpinput>
            借出人
            <el-input
              slot="elUI"
              size="small"
              v-model="sampleSearch.lender"
              clearable
            ></el-input>
          </tmpinput>
          <tmpinput>
            录入人
            <el-input
              slot="elUI"
              size="small"
              v-model="sampleSearch.enterClerk"
              clearable
            ></el-input>
          </tmpinput>
          <tmpinput>
            试管类别
            <el-select
              slot="elUI"
              size="small"
              clearable
              v-model="sampleSearch.testTubeCategory"
              placeholder="请选择"
            >
              <el-option
                v-for="item in testTubeCategory"
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
              v-model="sampleSearch.source"
              placeholder="请选择"
            >
              <el-option
                v-for="item in source"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </tmpinput>
          <tmpinput>
           状态
            <el-select
              slot="elUI"
              size="small"
              clearable
              v-model="sampleSearch.status"
              placeholder="请选择"
            >
              <el-option
                v-for="item in status"
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
              v-model="sampleSearch.sampleClass"
              placeholder="请选择"
            >
              <el-option
                v-for="item in sampleClass"
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
              v-model="sampleSearch.itemClass"
              placeholder="请选择"
            >
              <el-option
                v-for="item in itemClass"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </tmpinput>
        </div>
      </div>
      <!-- 搜索按钮 -->
      <blueSearch @click="startSearch "></blueSearch>
    </div>
    <!-- 高级搜索 -->
    <div class="advanced-search" :style="{height:asHeight}">
      <div v-show="showAdvancedSearch">
        <div class="row">
          <tmpinput>
            借出日期
            <el-date-picker
              slot="elUI"
              clearable
              size="small"
              v-model="sampleSearch.outDate"
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
              v-model="sampleSearch.pastDate"
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
              v-model="sampleSearch.samplingDate"
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
              v-model="sampleSearch.enterData"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </tmpinput>
        </div>
        <div class="row">
          <h2 style="white-space: nowrap;margin-right:22px">位置信息:</h2>
          <tmpinput>
            冰箱
            <el-select
              slot="elUI"
              size="small"
              clearable
              v-model="sampleSearch.refrigerator"
              placeholder="请选择"
              style="width:100%"
            >
              <el-option
                v-for="item in refrigerator"
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
              clearable
              size="small"
              v-model="sampleSearch.layer"
              placeholder="请选择"
              style="width:100%"
            >
              <el-option
                v-for="item in layer"
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
              v-model="sampleSearch.chouTi"
              placeholder="请选择"
              style="width:100%"
            >
              <el-option
                v-for="item in chouTi"
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
              v-model="sampleSearch.styleBox"
              placeholder="请选择"
              style="width:100%"
            >
              <el-option
                v-for="item in styleBox"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </tmpinput>
        </div>
      </div>
    </div>

    <div class="gaoji-search">
      <div class="in" @click="toggleAdvancedSearch">
        <i class="icon" :class="[asHeight ==0 ?  'icon-xia' : 'icon-shang' ]"></i>
        <h1>{{asHeight ==0 ? '高级搜索' : '简化搜索' }}</h1>
      </div>
    </div>
  </div>
</template>
<script>
import tmpinput from '@/components/tmp/zhanglan/tmp-empty-input'
import blueSearch from '@/components/tmp/zhanglan/blueSearch'
export default {
  components: { tmpinput, blueSearch },

  data () {
    return {
      /* 是否高级搜索 */
      showAdvancedSearch: false,
      asHeight: 0,
      /* 搜索参数 */
      sampleSearch: {
        /**
         * [样本名称:name] [借出人:lender] [录入人:enterClerk] [试管类别:testTubeCategory]
         * [样本来源:source] [状态:status] [样本类别:sampleClass] [项目类别:itemClass]
         * -- 高级搜索 --
         * [借出日期:outDate] [过期日期:pastDate]
         * [采样日期:samplingDate] [录入日期:enterData]
         * (位置信息) [冰箱:refrigerator] [层数:layer] [抽屉:chouTi] [样式盒:styleBox]
         */
      },

      /* 下拉选择 */
      /* 试管类别 testTubeCategory */
      testTubeCategory: [
        { value: 'A类别', label: 'A类别' },
        { value: 'B类别', label: 'B类别' }
      ],
      /* 来源 source */
      source: [
        { value: 'A来源', label: 'A来源' },
        { value: 'B来源', label: 'B来源' }
      ],
      /* 状态 status */
      status: [
        { value: '状态A', label: '状态A' },
        { value: '状态B', label: '状态B' }
      ],
      /* 样本类别 sampleClass */
      sampleClass: [
        { value: '样本类别A', label: '样本类别A' },
        { value: '样本类别B', label: '样本类别B' }
      ],
      /* 项目类别 itemClass */
      itemClass: [
        { value: '项目类别a', label: '项目类别a' },
        { value: '项目类别b', label: '项目类别b' }
      ],
      /* 冰箱 refrigerator */
      refrigerator: [
        { value: 'refrigeratorA', label: 'refrigeratorA' },
        { value: 'refrigeratorB', label: 'refrigeratorB' }
      ],
      /* 层数 layer */
      layer: [
        { value: 'layer1', label: 'layer1' },
        { value: 'layer2', label: 'layer2' }
      ],
      /* 抽屉 chouTi */
      chouTi: [
        { value: 'chouTi1', label: 'chouTi1' },
        { value: 'chouTi2', label: 'chouTi2' }
      ],
      /* 样式盒 styleBox */
      styleBox: [
        { value: 'styleBox1', label: 'styleBox1' },
        { value: 'styleBox2', label: 'styleBox2' }
      ]
    }
  },

  methods: {
    toggleAdvancedSearch () {
      /* 切换高级搜索 */
      if (this.asHeight) {
        this.asHeight = 0
        this.showAdvancedSearch = false
      } else {
        this.showAdvancedSearch = true
        this.asHeight = '170px'
      }
    },
    startSearch () {
      /* 开始搜索 */
      this.$emit('startSearch', JSON.stringify(this.sampleSearch))
    }
  }
}
</script>
<style scoped lang='less'>
.query-wrap {
  position: relative;
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

  width: 93%;
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

      // font-weight: 800;
    }
  }

  h1 {
    color: #333;

    font-size: 16px;
    // font-weight: 500;
  }
}

/* 高级搜索 */
.advanced-search {
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
