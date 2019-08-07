<template>
  <div class="project-setting-page project-wrap">
    <newProject
      v-if="dialogVisible"
      :MASK_name="MASK_name"
      :MASK_items="MASK_items"
      @closeProject="closeProject"
      @maskProject="maskProject"
      :MASK_btn="MASK_btn"
      :dialogVisible="dialogVisible"
    ></newProject>
    <!-- 表格名称 -->
    <div class="top">
      <fromName>项目列表</fromName>
    </div>
    <div class="cent">
      <item-sum name="项目总数:" :number="tableData.length"></item-sum>
      <button @click="openProject">新建项目</button>
    </div>

    <div class="form center">
      <el-table
        :row-style="{height:'32px',textAlign: 'center',padding:'0px',}"
        :cell-style="{padding:'0px',textAlign: 'center'}"
        border
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        :style="{width: '1296px',margin:'0 auto'}"
        :header-cell-style="getRowClass"
      >
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
          prop="name"
          label="项目名称"
        >
        </el-table-column>
        <el-table-column
          prop="fangan"
          label="方案号"
        >
        </el-table-column>
        <el-table-column
          prop="shenban"
          label="申办方"
        >
        </el-table-column>
        <el-table-column
          prop="persorn"
          label="负责人"
          width="100">
        </el-table-column>
        <el-table-column
          prop="yaowu"
          label="负责人"
        >
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
               <el-tooltip effect="dark" content="修改" placement="bottom-start">
                  <i class="el-icon-edit btn" @click="changeProject(scope.$index, scope.row)"></i>
               </el-tooltip>
               <el-tooltip effect="dark" content="删除" placement="bottom-start">
                  <i class="el-icon-delete btn" @click="delProject(scope.$index, scope.row)"></i>
               </el-tooltip>
            </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="bot">
      <el-button type="primary" size="mini" @click="$router.go(-1)">返回</el-button>
    </div>
  </div>
</template>
<script>
import itemSum from '@/components/tmp/zhanglan/item-sum'
import goBack from '@/components/tmp/zhanglan/go-1'
import fromName from '@/components/tmp/zhanglan/fromName'
import newProject from './newProject/index'
export default {
  inject:['reload'],
  components: { itemSum, goBack, fromName, newProject },
  data () {
    return {
      // 新建项目
      MASK_items: {
          'id': '',
          'name':'',
          'fangan':'',
          'shenban':'',
          'persorn':'',
          'yaowu':''
      },
      // 返回按钮
      dialogVisible: false,
      // 删除按钮 确认框
      MASK_name: '新建项目',
      MASK_btn: '创建',
      MASK_event: true, // true创建项目 false 为修改项目
      // MASK_cha_index: -1, // 修改的哪一行
      //   MASK_del_index: -1, //删除的哪一行

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
  created(){
    this.$axios.get("/sampleGuide/guest/selectProjectAll")
    .then(({data})=>{
      console.log(data)
       data.forEach((item)=>{
          this.tableData.push({
              id:item.id,
              name: item.name,
              fangan:item.protocol_number,
              shenban:item.sponsor,
              persorn: item.responsible_person,
              yanwu: item.drug_name
          })
       })
    })
    .catch((error)=>{
      console.log(error)
    })
  },
  methods: {
    /* 设置表头样式 */
    getRowClass ({ rowIndex }) {
      return rowIndex == 0 ? this.$store.state.formTheme : ''
    },
    // 修改项目
    changeProject (index,row) {
      // row 当前行的数据,index 当前行的索引
      this.MASK_name = '修改项目'
      this.MASK_btn = '修 改'
      this.MASK_event = false // true 为创建 false 为修改
      // this.MASK_cha_index = index // 修改的哪一行
      console.log(row)
      this.MASK_items = { 
          'id': row.id,
          'name': row.name,
          'fangan': row.fangan,
          'shenban': row.shenban,
          'persorn': row.persorn,
          'yaowu': row.yaowu
        }
      this.dialogVisible = true
    },

    // 显示蒙版-->新建项目的点击按钮
    openProject () {
      this.MASK_items = {
          'id': '',
          'name':'',
          'fangan':'',
          'shenban':'',
          'persorn':'',
          'yaowu':''
      }
      this.MASK_name = '新建项目'
      this.MASK_btn = '创 建'
      this.MASK_event = true // true 为创建 false 为修改
      this.dialogVisible = true
    },
    // ↓    触发蒙版里的事件:修改,创建
    maskProject (val) {
      /* 修改 OR 创建 */ this.MASK_event
        ? this.addProject(val)
        : this.putProject(val)
    },
    addProject (val) { // 创建
      console.log(val)
      this.$axios({
        method: 'post',
        url: '/sampleGuide/guest/insertProject',
        data:({
          name: val[name],
          protocol_number: val[fangan],
          sponsor: val[shenban],
          responsible_person: val[persorn],
          drug_name: val[yanwu]
        })
      })
      .then(({data})=>{
        console.log(data)
        this.$message({ message: '添加成功', type: 'success' })
        this.reload()
      })
      .catch(({error})=>{
        console.log(error)
      })
      this.closeProject()
    },
    putProject (val) {  /*  修改 */    
      this.$axios({
        method: 'post',
        url: '/sampleGuide/guest/updateProject',
        data:({
          id: val[id],
          name: val[name],
          protocol_number: val[fangan],
          sponsor: val[shenban],
          responsible_person: val[persorn],
          drug_name: val[yanwu]
        })
      })
      .then(({data})=>{
        console.log(data)
        this.$message({ message: '修改成功', type: 'success' })
        this.reload();
      })
      .catch(({error})=>{
        console.log(error)
      })
      this.closeProject()
    },
    clearProject (row, index) { // 删除 
      this.$axios({
        method: 'post',
        url:'/sampleGuide/guest/deleteProject',
        data:({
            id: row.id
        })
      })
      .then((data)=>{
          console.log(data)
          this.$message({ type: 'success', message: '删除成功!' })
      })
    },
    delProject () { /*  删除确认 */
      this.$confirm(
        '此操作将永久删除该文件, 是否继续?',
        '提示',
        { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }
      )
        .then(() => {
          this.clearProject()
        })
        .catch(() => {
          this.$message({ type: 'info', message: '已取消删除' })
        })
    },
    closeProject () {
      /* 取消 | 关闭创建项目的窗口 */ this.dialogVisible = false
    }
  }
}
</script>
<style scoped lang='less'>
.cent {
  button {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    margin-right: 15px;
    padding: 2px 15px;

    color: #fff;
    border: 1px solid #3cd7ff;
    border-radius: 3px;
    outline: none;
    background: #3cd7ff;

    font-size: 15px;
  }
}

.project-wrap {
  position: relative;

  width: 1226px;
  margin: 0 auto;
  padding-top: 10px;
  .cent {
    display: flex;
    justify-content: space-between;
    width: 1226px;
    // padding: 0 35px;
    margin: 0 auto;
    margin-bottom: 8px;
  }

  .center {
    background-color: #fff;
    .btn{
      font-size: 18px;
      margin-right: 10px;
      cursor: pointer;
      outline: none;
    }
  }

  .bot {
    background-color: #fff;
    width: 100%;
    height: 150px;
    text-align: center;
    line-height: 150px;
  }
}

.flex {
  display: flex;
}
</style>
