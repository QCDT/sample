<template>
  <!-- 共有多少条数据...销毁..打印标签..转移..导出... -->
  <div class="selection-box">
    <div class="sum">
      <div class="item">
        <span>共有:</span>
        <span>{{count}}</span>
        <span style="margin:0 0.3em">条数据</span>
      </div>
      <div class="item">
        <tmpinput>
          打印样式设置
          <el-select
            slot="elUI"
            size="mini"
            clearable
            v-model="value"
            filterable
            placeholder="请选择"
            style="width:60%"
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
    <div class="right">
      <div class="item">
        <i class="icon icon-shanchu"></i>
        <small>销毁</small>
      </div>
      <div class="item">
        <i class="icon icon-print"></i>
        <small>打印标签</small>
      </div>
      <router-link :to="{name:'transfer'}" style="color:#000">
        <div class="item">
          <i class="icon icon-zhuanyi"></i>
          <small>转移</small>
        </div>
      </router-link>
      <div class="item">
        <i class="icon icon-weizhi"></i>
        <small>打印位置信息</small>
      </div>
      <router-link :to="{name:'changsample'}" style="color:#000">
        <div class="item">
          <i class="icon icon-yemianxiugai"></i>
          <small>修改</small>
        </div>
      </router-link>
      <div class="item">
        <i class="icon icon-pdf" style="color:#A33639"></i>
        <small>导出PDF</small>
      </div>
      <div class="item">
        <download-excel
          class="export-excel-wrapper"
          :data="multipleSelection"
          :fields="json_fields"
          name="Excle名称.xls"
        >
          <div @click="isEmpty" class="item">
            <i class="icon icon-excel" style="color:#217346"></i>
            <small>导出Excel</small>
          </div>
        </download-excel>
      </div>
    </div>
  </div>
</template>
<script>
import tmpinput from "@/components/tmp/zhanglan/tmp-empty-input";
export default {
  props: {
    count: Number,
    multipleSelection: { type: Array, default: () => [] }
  },
  components: { tmpinput },
  data() {
    return {
      //   ↓  导出
      /**
       * json_fields: key:表头 val:行数据[值];[常规字段 | 支持嵌套(obj) | 支持回调 ]
       * json_data:将要导出的表格数据
       */
      json_fields: {
        序号: "coding",
        管帽颜色: "color",
        样本信息: "sample",
        录入人: "enterName",
        录入日期: "enterTime",
        采样信息: "sampl",
        样本来源: "source",
        过期日期: "pastTime",
        位置信息: "location",
        状态: "status",
        类别: "classify",
        借出人: "loanPerson",
        借出日期: "loanTime"
      },
      json_data: [
        { name: "张三", sex: "男", phone: { mobile: "13333333333" } },
        { name: "张四", sex: "男", phone: { mobile: "15555555555" } }
      ],
      json_meta: [[{ " key ": " charset ", " value ": " utf- 8 " }]],
      //   ↑  导出
      //  ↓   打印样式设置
      options: [
        {
          value: "选项1",
          label: "苹果"
        },
        {
          value: "选项5",
          label: "香蕉"
        }
      ],
      value: ""
      //   ↑
    };
  },
  methods: {
    isEmpty() {
      console.log("999123: ");
      this.multipleSelection.length == 0
        ? this.$message("请选择要导出的数据")
        : 0;
    }
  },
  computed: {}
};
</script>
<style scoped lang='less'>
.selection-box {
  display: flex;
  justify-content: space-between;

  //   扫描总数...那一排的

  width: 100%;
  margin: 0 auto;
  margin-bottom: 10px;
  white-space: nowrap;
  .sum {
    display: flex;
    // background-color: #333;
    align-items: center;
    .item {
      margin-right: 30px;
    }
  }
  span {
    font-size: 16px;
  }

  span:nth-child(2) {
    padding-left: 0.5em;

    background-color: #fff;
  }

  .right {
    display: flex;

    .item {
      //   background-color: #333;
      margin: 0 10px;
      padding: 0 5px;
      cursor: pointer;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      i {
        font-size: 22px;
        margin-bottom: 1px;
      }
      small {
        font-size: 10px;
      }
    }
  }
}
</style>