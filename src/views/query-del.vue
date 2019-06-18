<template>
  <div class="div">
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
    <!-- 表单 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ -->
    <div class="bot-form">
      <div class="table-box">
        <div class="selection-box">
          <div class="sum">
            <div class="item">
              <span>共有:</span>
              <span>{{tableData.length}}</span>
              <span style="margin:0 0.3em">条数据</span>
            </div>
            <div class="item">
              <span>打印样式:</span>
              <span>{{tableData.length}}</span>
              <span style="margin:0 0.3em">条数据</span>
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
            <div class="item">
              <i class="icon icon-zhuanyi"></i>
              <small>转移</small>
            </div>
            <div class="item">
              <i class="icon icon-weizhi"></i>
              <small>打印位置信息</small>
            </div>
            <div class="item">
              <i class="icon icon-yemianxiugai"></i>
              <small>修改</small>
            </div>
            <div class="item">
              <!-- color:#A33639 -->
              <i class="icon icon-pdf" style="color:#A33639"></i>
              <small>导出PDF</small>
            </div>
            <div class="item">
              <i class="icon icon-excel" style="color:#217346"></i>
              <small>导出Excel</small>
            </div>
          </div>
        </div>
        <el-table
          :row-style="{height:'32px',textAlign: 'center',padding:'0px',}"
          :cell-style="{padding:'0px',textAlign: 'center'}"
          border
          stripe
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          :style="{width: '100%',margin:'0 auto',}"
          :header-cell-style="getRowClass"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="序号" width="50">
            <template slot-scope="scope">{{ scope.row.coding }}</template>
          </el-table-column>
          <el-table-column prop="name" label="管帽颜色" width="80"></el-table-column>
          <el-table-column prop="address" label="样本信息" show-overflow-tooltip></el-table-column>
          <el-table-column prop="status" label="录入人" show-overflow-tooltip></el-table-column>
          <el-table-column prop="info" label="录入日期" show-overflow-tooltip></el-table-column>
          <el-table-column prop="info" label="采样信息" show-overflow-tooltip></el-table-column>
          <el-table-column prop="info" label="样本来源" show-overflow-tooltip></el-table-column>
          <el-table-column prop="info" label="过期日期" show-overflow-tooltip></el-table-column>
          <el-table-column prop="info" label="位置信息" show-overflow-tooltip></el-table-column>
          <el-table-column prop="info" label="状态" width="50"></el-table-column>
          <el-table-column prop="info" label="类别" width="50"></el-table-column>
          <el-table-column prop="info" label="借出人" show-overflow-tooltip></el-table-column>
          <el-table-column prop="info" label="借出日期" show-overflow-tooltip></el-table-column>
          <el-table-column fixed="right" label="日志信息" width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 表单 ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ -->
  </div>
</template>
<script>
import tmpinput from "@/views/query/input";
export default {
  props: {},
  components: { tmpinput },
  data() {
    return {
      //   高级搜索的展示与隐藏
      height: 0,
      //
      input: "",
      input1: "",
      input2: "",
      input3: "",
      value1: "",
      //   试管类别
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
      value: "",
      // 试管类别 ↑↑↑↑↑↑
      // El UI
      // 开关的值
      value0: false,

      value1: false,
      value2: false,
      value3: "",
      value4: "",

      tableData: [
        {
          coding: "123", // 序号编码
          name: "Mark", // 样本名称
          address: "海尔冰箱3-1-101海尔冰箱", // 位置信息
          status: "正常", // 状态
          info: "详细", // 详细信息
          caozuo: "操作" // 操作
        }
      ],
      multipleSelection: []
      //   ↑ 表单
    };
  },
  methods: {
    showGaoJi() {
      console.log("111111: ", 111111);
      this.height = this.height == 0 ? "160px" : 0;
    },
    // El UI ...
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    /**
     * @description: 设置表头样式
     * @param {type}
     * @return:
     */
    getRowClass({ rowIndex }) {
      if (rowIndex == 0) {
        return {
          background: "#3cd7ff",
          padding: "0px 0",
          height: "30px",
          lineHeight: "1.875rem",
          fontWeight: "900",
          fontSize: "1rem",
          color: "#fff",
          textAlign: "center"
        };
      } else {
        return "";
      }
    },
    // 操作事件
    handleClick(row) {
      console.log(row);
    }
    //  ↑
  },
  computed: {}
};
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

// 表单
.table-box {
  width: 100%;
  width: 1330px;
  margin: 0 auto;
  padding-top: 20px;

  img {
    width: 30px;
    height: 30px;
  }

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
}
//  ↑
</style>