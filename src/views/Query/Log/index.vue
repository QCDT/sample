<template>
  <!-- /查询/查看 -->
  <!-- 表格的日志信息 -->
  <div class="log-index">
    <FormTopMenu :title="title"
    :count="tableData.length"
    :multipleSelection="multipleSelection"
    ></FormTopMenu>
    <!-- ↓  表单 -->
    <div class="bot-form">
      <div class="table-box">
        <el-table
          :row-style="{height:'32px',textAlign: 'center',padding:'0px',}"
          :cell-style="{padding:'0px',textAlign: 'center'}"
          border
          ref="multipleTable"
          max-height="340"
          :data="tableData"
          tooltip-effect="dark"
          :style="{width: '100%',margin:'0 auto',}"
          :header-cell-style="getRowClass"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" show-overflow-tooltip></el-table-column>
          <el-table-column type="index" width="70" label="序号" show-overflow-tooltip>
          </el-table-column>
          <el-table-column  label="RFID编码	" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.coding }}</template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">{{ opeSign[scope.row.ope] }}</template>
          </el-table-column>
          <el-table-column prop="opePerson" label="操作人" show-overflow-tooltip></el-table-column>
          <el-table-column prop="opeTime" label="操作时间" show-overflow-tooltip></el-table-column>
          <el-table-column prop="person" label="取走人/归还人" show-overflow-tooltip></el-table-column>
          <el-table-column prop="expTime" label="预计归还日期" show-overflow-tooltip></el-table-column>
          <el-table-column prop="location" label="样本位置" show-overflow-tooltip></el-table-column>
          <el-table-column prop="mark" label="备注" show-overflow-tooltip></el-table-column>
        </el-table>
      </div>
    </div>
    <!-- ↑  表单 -->
    <goBack></goBack>
  </div>
</template>
<script>
import goBack from '@/components/tmp/zhanglan/go-1'
import FormTopMenu from './FormTopMenu'
export default {
  props: {},
  components: { goBack, FormTopMenu },
  data () {
    return {
      // ↓   表单
      title:'',
      tableData: [
        // {
        //   coding: '123', // 序号编码
        //   RFID: 'RFID编码', // RFID编码
        //   ope: '操作', // 操作
        //   opePerson: '操作人', // 操作人
        //   opeTime: '操作时间', // 操作时间人
        //   person: '去走人/归还人', // 取走人/归还人
        //   expTime: '预期归还日期', // 预期归还日期
        //   location: '样本位置', // 样本位置
        //   mark: '备注',
        //
        // }
      ],
      multipleSelection: [],
      //   ↑ 表单
      opeSign:[
        '销毁',
       '借出',
        '归还',
        '新建',
        '转移',
        '更新',
        '转出',
        '转入',
        '核验',
        '核验还原',
        '采血',
        '采血还原',
        '放入离心机',
        '离心完成',
        '接收',
        '从离心机取出',
        '开始离心'
      ]



    }
  },
  created(){
    this.$axios({
      method:'post',
      url:'sampleGuide/query/guest/findOpateratorLogByRfidSampleId',
      data:({
        id:this.$route.params.id
      })
    }).then(({data})=>{
      console.log(data)
      this.title=data.data[0].sampleName + '使用记录'
      data.data.forEach((item)=>{
        this.tableData.push({
          id:item.id,
          coding:item.rfidCode,
          ope:item.sign,
          opePerson:item.userName,
          opeTime:item.operateTime,
          person:item.borrower,
          expTime:item.predictTime,
          location:item.detailLocation,
          mark:item.remarks
        })

      })
    })
  },
  methods: {
    // El UI ...
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    //  表头样式
    getRowClass ({ rowIndex }) {
      if (rowIndex == 0) {
        return {
          background: '#3cd7ff',
          padding: '0px 0px',
          height: '30px',

          fontWeight: '600',

          color: '#fff',
          textAlign: 'center'
        }
      }
    }
  },
  computed: {}
}
</script>
<style scoped lang='less'>
.log-index {
  padding: 0 20px;
}
</style>
