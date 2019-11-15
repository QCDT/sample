<template>
  <!-- 修改转运样本盒 -->
  <div class="eidt-box">
    <div class="row top">
      <div class="matrix">
        <div class="matrix-in-col">
          <div class="gray">
            <h1>样本盒名称:</h1>
            <h1>
              样本盒位置:
              <span>15号冰箱-2-5-1</span>
            </h1>
            <div class="flex">
              <div class="item">
                <i>1</i>
                <span>已使用</span>
              </div>
              <div class="item">
                <i>1</i>
                <span>已使用</span>
              </div>
              <div class="item">
                <i>1</i>
                <span>已使用</span>
              </div>
            </div>
          </div>
          <matrixTable borderWidth="1px" border-color="#333"></matrixTable>
        </div>
      </div>
      <div class="form-select">
        <div class="top">
          <span>样本添加方式</span>
          <el-select v-model="addWay" placeholder="请选择" size="mini">
            <el-option
              v-for="item in addWayOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="top" v-show="addWay === 1">
          <span>单个样本添加途径</span>
          <el-select v-model="addSample" placeholder="请选择" size="mini">
            <el-option
              v-for="item in addSampleOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div  class="top" v-show="addWay === 2">
          <span>批量添加</span>
          <img src="@/assets/img/saomiao.gif">
        </div>
        <div class="searchSample" v-show="addSample === 1 && addWay === 1">
          <p>
            <span>样本名称:</span>
            <el-input class="input" v-model="sampleName" size="mini"></el-input>
            <span>样本来源</span>
            <el-select class="input" v-model="addSample" placeholder="请选择" size="mini">
              <el-option
                v-for="item in addSampleOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <span>样本类别</span>
            <el-select class="input" v-model="addSample" placeholder="请选择" size="mini">
              <el-option
                v-for="item in addSampleOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </p>
          <p>
            <span>选择冰箱</span>
            <el-select class="input" v-model="addSample" placeholder="请选择" size="mini">
              <el-option
                v-for="item in addSampleOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <span>选择层</span>
            <el-select class="input" v-model="addSample" placeholder="请选择" size="mini">
              <el-option
                v-for="item in addSampleOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <span>选择抽屉</span>
            <el-select class="input" v-model="addSample" placeholder="请选择" size="mini">
              <el-option
                v-for="item in addSampleOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </p>
          <p>
            <span>选择样本盒</span>
            <el-select class="input" v-model="addSample" placeholder="请选择" size="mini">
              <el-option
                v-for="item in addSampleOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-button class="btn" size="mini" type="primary" icon="el-icon-search">搜索</el-button>
          </p>
        </div>
        <div class="top" v-show="addSample === 2 && addWay === 1">
          <img src="@/assets/img/saomiao.gif">
        </div>
        <div class="form">
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
            <el-table-column type="selection" show-overflow-tooltip></el-table-column>
            <el-table-column label="序号" show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.coding }}</template>
            </el-table-column>
            <el-table-column prop="enterName" label="录入人" show-overflow-tooltip></el-table-column>
            <el-table-column prop="loanPerson" label="借出人" show-overflow-tooltip></el-table-column>
            <el-table-column prop="loanTime" label="借出日期" show-overflow-tooltip></el-table-column>
          </el-table>
          <tmpButton>确认添加</tmpButton>
        </div>
      </div>
    </div>
    <div class="row bot-form">
      <h1>详细样本信息</h1>
      <div class="form">
        <el-table
          :row-style="{height:'32px',textAlign: 'center',padding:'0px',}"
          :cell-style="{padding:'0px',textAlign: 'center'}"
          border
          stripe
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          :style="{width: '100%',margin:'0 auto',}"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" show-overflow-tooltip></el-table-column>
          <el-table-column label="序号" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.coding }}</template>
          </el-table-column>
          <el-table-column prop="enterName" label="录入人" show-overflow-tooltip></el-table-column>
          <el-table-column prop="loanPerson" label="借出人" show-overflow-tooltip></el-table-column>
          <el-table-column prop="loanTime" label="借出日期" show-overflow-tooltip></el-table-column>
          <el-table-column fixed="right" label="日志信息" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row,scope.$index)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import matrixTable from '@/components/tmp/zhanglan/matrixTable'
import tmpButton from '@/components/tmp/zhanglan/tmpButton'
export default {
  props: {},
  components: { matrixTable, tmpButton },
  data () {
    return {
      addWay:'',
      addSample:'',
      addWayOption:[
        {
          label:'单个添加',
          value:1
        },
        {
          label:'批量添加',
          value:2
        }
      ],
      addSampleOption:[
        {
          label:'选择已有样本',
          value:1
        },
        {
          label:'扫描已有样本',
          value:2
        }
      ],
      options: [
        {
          value: '橘子',
          label: '橘子'
        }
      ],
      value: '',
      tableData: [
        {
          coding: '123', // 序号编码
          color: 'Mark', // 管帽颜色
          sample: '海尔冰箱3-1-101海尔冰箱', // 样本信息
          enterName: '录入人', // 录入人
          enterTime: '录入日期', // 录入日期
          sampl: '采样信息', // 采样信息
          source: '样本来源', // 样本来源
          pastTime: '过期日期', // 过期日期
          location: '位置信息', // 位置信息
          status: '状态', // 状态
          classify: '类别', // 类别
          loanPerson: '借出人', // 借出人
          loanTime: '2019' // 借出日期
        }
      ],
      multipleSelection: []
      //   ↑ 表单
    }
  },
  methods: {
    handleClick (row, index) {
      console.log(row, index)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    }
  },
  computed: {}
}
</script>
<style scoped lang='less'>
.eidt-box {
  padding: 20px;
  .top {
    display: flex;
    .matrix {
      padding: 10px 50px;

      width: 38%;
      margin: 0 auto;
    }
    .form-select {
      width: 62%;
      padding: 10px;
      background-color: #fff;
      .top{
        align-items: center;
        margin-bottom: 10px;
        img{
          width: 60px;
          cursor: pointer;
        }
        >span{
          display: flex;
          width: 9vw;
        }
      }
      .searchSample{
        p{
          margin-bottom: 10px;
          >span{
            display: inline-block;
            width: 6vw;
          }
          .btn{
            border: 1px solid #00c9ff;
            background: #00c9ff;
          }
        }
        .input{
          width:20%;
          margin-right: 10px;
        }
      }
    }
  }
  .bot-form {
    padding: 20px;
    border-radius: 10px;
  }
}
.matrix-in-col {
  // display: flex;
  // justify-content: center;
  // flex-direction: column;
  // align-items: center;
  .gray {
    background-color: #ededed;
    width: 50%;
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 10px;
  }
}
</style>
