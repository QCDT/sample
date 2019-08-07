<template>
  <!-- 转出样本盒 -->
  <div>
    <div class="title">
      <h1>
        <i class="icon icon-sousuo"></i>
        转出样本盒
      </h1>
    </div>
    <div class="form-table-box">
      <div class="row">
        <div class="left">
          <span>共有: 0个样本盒</span>
        </div>
        <div class="right">
          <button @click="addSampleBox">
            <i class="icon icon-sousuo">添加样本盒</i>
          </button>
        </div>
      </div>
      <div class="form-table">
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
        >
          <el-table-column type="index" label="序号" width="70"></el-table-column>
          <el-table-column prop="name" label="项目名称" width="120"></el-table-column>
          <el-table-column prop="fangan" label="方案号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="shenban" label="申办方"></el-table-column>
          <el-table-column prop="persorn" label="负责人" show-overflow-tooltip></el-table-column>
          <el-table-column prop="yaowu" label="药物名称" show-overflow-tooltip></el-table-column>
        </el-table>
      </div>
    </div>
    <transition name="el-fade-in-linear">
      <masking :rgba="0" v-if="ifAddSampleBox">
        <addSampleBox @close="ifAddSampleBox=false" @save='save'></addSampleBox>
      </masking>
    </transition>
  </div>
</template>
<script>
import masking from '@/components/tmp/zhanglan/maskTran'
import addSampleBox from './addSampleBox/index'
export default {
  props: {},
  components: { masking, addSampleBox },
  data () {
    return {
      ifAddSampleBox: false,
      tableData: [
        {
          id: '1',
          name: '替格瑞洛', // 项目名称
          fangan: 'SN-YQ-2018005/V 1.0', // 方案号
          shenban: '石药集团中奇制药技术', // 申办方
          persorn: '李四', // 负责人
          yaowu: 'CSPCHA115胶囊' // 药物名称
        }
      ],
      multipleSelection: []
    }
  },
  methods: {
    save () {
      this.ifAddSampleBox = false
      this.$message('save')
    },
    getRowClass ({ rowIndex }) {
      /*  设置表头样式 */
      return rowIndex == 0 ? this.$store.getters.formTheme : ''
    },
    addSampleBox () {
      this.$message('添加样本盒')
      this.ifAddSampleBox = true
    }
  },
  computed: {}
}
</script>
<style scoped lang='less'>
.title {
  display: flex;
  justify-content: center;
  color: #3cd7ff;

  h1 {
    font-size: 22px;
    font-weight: 400;
    .icon {
      font-size: 22px;
    }
  }
}
.form-table-box {
  .row {
    display: flex;
    justify-content: space-between;
  }
}
</style>
