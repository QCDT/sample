<template>
  <!-- 转移 -->
  <div class="transfer-wrap">
    <!-- 左边 -->

    <div class="left-box">
      <div class="table-box">
        <!-- <formTopContent :count="tableData.length" :switchSaoMiao="switchSaoMiao">
          <el-switch v-model="switchSaoMiao" slot="saomiao"></el-switch>
          <el-switch v-model="switchGuanLi" slot="guanli"></el-switch>
        </formTopContent>-->
        <!-- row-style  cell-style 表格样式 -->
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
          <el-table-column type="index" width="70" label="序号" ></el-table-column>
          <el-table-column label="RFID编号" show-overflow-tooltip>>
            <template slot-scope="scope">{{ scope.row.coding }}</template>
          </el-table-column>
          <el-table-column prop="name" label="样本名称"></el-table-column>
          <el-table-column prop="address" label="原位置" show-overflow-tooltip></el-table-column>
          <el-table-column prop="" label="现位置" show-overflow-tooltip></el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 右边 -->
    <div class="right-box">
      <h1>选择修改位置</h1>
      <div class="input-item">
        <span>*冰箱名称</span>
        <el-select size="mini" v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <span>*层数</span>
        <el-select size="mini" v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="input-item">
        <span>*抽屉</span>
        <el-select size="mini" v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <span>*样本盒</span>
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
        <matrix9x9></matrix9x9>
      </div>
    </div>

    <goBack></goBack>
  </div>
</template>
<script>
import goBack from '@/components/tmp/zhanglan/go-1'
import htTbody from './tbody'
import matrix9x9 from '@/components/tmp/zhanglan/matrix-9x9'
export default {
  props: {},
  components: { goBack, htTbody, matrix9x9 },
  data () {
    return {
      tableData: [
        // {
        //   coding: '123', // 序号编码
        //   name: 'Mark', // 样本名称
        //   address: '海尔冰箱3-1-101海尔冰箱', // 位置信息
        // }
      ],
      multipleSelection: [],
      options: [
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: ''
    }
  },
  created(){
    this.$axios({
      method:'post',
      url:'sampleGuide/query/selectSampleBack',
      data:({
        listId:this.$route.params.id.split(',')
      })
    })
      .then(({data})=>{
        console.log(data)
        data.data.forEach((item)=>{
          this.tableData.push({
            coding:item.rfidCode,
            name:item.name,
            address:item.sampleStru.detailLocation
          })
        })
      })
  },
  methods: {
    getRowClass ({ rowIndex }) {
      return rowIndex == 0 ? this.$store.getters.formTheme : ''
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    }
  },
  computed: {}
}
</script>
<style scoped lang='less'>
.transfer-wrap {
  display: flex;
  justify-content: space-evenly;

  padding-top: 40px;
}

.left-box {
  width: 60%;
  padding: 0 20px;

  // background-color: #888;
}

.right-box {
  width: 50%;

  // background-color: #999;
}
.input-item {
  display: flex;
  align-items: center;

  margin-bottom: 10px;

  span {
    padding: 0 10px;
    //   width: 6em;
    width: 4rem;
    text-align-last: justify;

    white-space: nowrap;
  }
}
</style>
