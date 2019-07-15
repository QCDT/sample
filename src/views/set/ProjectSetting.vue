<template>
  <div class="project-setting-page project-wrap">
    <!-- <div class="masking"></div> -->
    <masking v-if="showMaskF">
      <div class="test">
        <!-- 表单内容 -->
        <form @submit.prevent="maskProject()">
          <div class="form-in">
            <div class="title">{{MASK_name}}</div>
            <div class="content">
              <p v-for="(item,index) in MASK_items" :key="index">
                <span>{{item.text}}:</span>
                <input type="text" v-model="MASK_value[item.key]">
              </p>
            </div>
            <div class="bot-btn">
              <button type="button" @click="clearFromBack">返回</button>
              <button type="submit">{{MASK_btn}}</button>
            </div>
          </div>
        </form>
        <!-- 表单内容 ↑ -->
      </div>
    </masking>
    <!-- 表格名称 -->
    <!-- <div class="top"> -->
    <fromName>项目列表</fromName>
    <!-- <h1>项目列表</h1> -->
    <!-- </div> -->
    <div class="cent">
      <item-sum name="项目总数:" :number="tableData.length"></item-sum>
      <button @click="newProject">新建项目</button>
    </div>

    <div class="form center">
      <el-table
        :row-style="{height:'32px',textAlign: 'center',padding:'0px',}"
        :cell-style="{padding:'0px',textAlign: 'center'}"
        border
        stripe
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        :style="{width: '1296px',margin:'0 auto',}"
        :header-cell-style="getRowClass"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="index" label="序号" width="70"></el-table-column>
        <el-table-column prop="name" label="项目名称" width="120"></el-table-column>
        <el-table-column prop="fangan" label="方案号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="shenban" label="申办方"></el-table-column>
        <el-table-column prop="persorn" label="负责人" show-overflow-tooltip></el-table-column>
        <el-table-column prop="yaowu" label="药物名称" show-overflow-tooltip></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <div class="flex">
              <el-button @click="changProject(scope.row,scope.$index)" type="text" size="small">修改</el-button>
              <el-button type="text" @click="open">删除</el-button>
            </div>

            <!-- <el-button @click="clearProject(scope.row,scope.$index)" type="text" size="small">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <!-- <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button> -->
        <!-- <el-button @click="toggleSelection()">取消选择</el-button> -->
      </div>
    </div>
    <div class="bot">
      <goBack></goBack>
    </div>
  </div>
</template>
<script>
import itemSum from '@/components/tmp/zhanglan/item-sum'
import goBack from '@/components/tmp/zhanglan/go-1'
import masking from '@/views/set/ProjectSetting/masking'
import fromName from '@/components/tmp/zhanglan/fromName'
export default {
  components: { itemSum, goBack, masking, fromName },
  data () {
    return {
      // 删除按钮 确认框
      dialogVisible: false,
      test: '',
      // 蒙版的开关
      showMaskF: false,
      // 蒙版的表单数据
      MASK_name: '新建项目',
      MASK_btn: '创建',
      MASK_event: true, // true创建项目 false 为修改项目
      MASK_cha_index: -1, // 修改的哪一行
      //   MASK_del_index: -1, //删除的哪一行
      MASK_items: [
        { text: '项目名称', name: '项目名称', key: 'name', value: '1' },
        { text: '方案号', fangan: '方案号', key: 'fangan', value: '2' },
        { text: '申办方', shenban: '申办方', key: 'shenban', value: '3' },
        { text: '负责人', persorn: '负责人', key: 'persorn', value: '4' },
        { text: '药物名称', yaowu: '药物', key: 'yaowu', value: '5' }
      ],
      MASK_value: {
        name: '替格瑞洛', // 项目名称
        fangan: 'SN-YQ-2018005/V 1.0', // 方案号
        shenban: '石药集团中奇制药技术', // 申办方
        persorn: '李四', // 负责人
        yaowu: 'CSPCHA115胶囊' // 药物名称
      },
      /**
       * @description: groupChang:控制拉条的长度,它是一个
       *               groupFangXiang: 箭头方向,这是一个布尔值[false:不显示]
       * @param {type}
       * @return:
       */
      groupChang: 96,
      groupFangXiang: false,
      // El UI
      // 开关的值
      value: false,

      value1: false,
      value2: false,
      value3: '',
      value4: '',

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
    /**
     * @description: 设置表头样式
     * @param {type}
     * @return:
     */
    getRowClass ({ rowIndex }) {
      if (rowIndex == 0) {
        return {
          background: '#3cd7ff',
          padding: '0px 0',
          height: '30px',
          lineHeight: '1.875rem',
          fontWeight: '900',
          fontSize: '1rem',
          color: '#fff',
          textAlign: 'center'
        }
      } else {
        return ''
      }
    },
    // EL UI操作事件
    changProject (row, index) {
      // row 当前行的数据,index 当前行的索引
      this.MASK_name = '修改项目'
      this.MASK_btn = '修改'
      this.MASK_event = false // true 为创建 false 为修改
      this.MASK_cha_index = index // 修改的哪一行
      console.log('修改蒙版数据: ', '修改项目')

      this.MASK_value = this.tableData[index]
      this.showMaskF = true
    },
    clearProject (row, index) {
      this.tableData.splice(index, 1)
      this.dialogVisible = false
    },
    // 显示蒙版-->新建项目的点击按钮
    newProject () {
      this.MASK_name = '新建项目'
      this.MASK_btn = '创建'
      this.MASK_event = true // true 为创建 false 为修改
      this.showMaskF = true
    },
    // 蒙版里的事件
    maskProject () {
      // 蒙版事件: 修改 OR 创建
      this.MASK_event ? this.addProject() : this.putProject()
    },
    addProject () {
      console.log(': ', '创建项目')
      console.log('this.MASK_items: ', this.MASK_value)
      this.tableData.push(JSON.parse(JSON.stringify(this.MASK_value)))
      alert('添加成功')
      this.MASK_value = {}
      this.clearFromBack()
    },
    putProject () {
      console.log('修改数据: ')
      this.tableData[this.MASK_cha_index] = JSON.parse(
        JSON.stringify(this.MASK_value)
      )
      alert('修改成功')
      this.MASK_value = {}
      this.clearFromBack()
    },
    clearFromBack () {
      this.showMaskF = false
      console.log(': ', '返回事件')
    },

    open () {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.clearProject() // 执行删除事件
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>
<style scoped lang='less'>
.bot {
  background-color: #fff;
}

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
  }

  .bot {
    position: fixed;
    bottom: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 150px;
  }
}

.test {
  display: flex;

  width: 1150px;
  margin: 0 auto;
  padding-top: 68px;

  form {
    width: 100%;
    height: 450px;
    padding-top: 50px;

    background-color: #fff;

    .form-in {
      position: relative;

      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;

      width: 1000px;
      width: 80%;
      margin: 0 auto;
      margin: 0 auto;
      padding-top: 40px;

      border: 1px solid #ccc;

      // 表单标题
      .title {
        position: absolute;
        top: -13.5px;

        display: inline-block;

        padding: 0 15px;

        color: #3cd7ff;
        background-color: #fff;

        font-size: 18px;
      }

      // 内容
      .content {
        p {
          display: flex;

          align-items: flex-end;
        }

        span {
          display: block;
          width: 77px;
          text-align-last: justify;
          margin-right: 10px;
          white-space: nowrap;
          font-size: 16px;
        }

        input {
          height: 20px;
          padding-top: 20px;

          border: 0;
          border-bottom: 1px solid #333;

          font-size: 16px;
          line-height: 20px;
        }
      }

      //   底部按钮
      .bot-btn {
        display: flex;

        margin-bottom: 20px;
        padding-top: 20px;

        button {
          outline: none;
          margin: 15px;
          padding: 5px 25px;

          cursor: pointer;
          text-align: center;

          color: #3cd7ff;
          border: 1px solid #3cd7ff;
          border-radius: 3px;
          background: #fff;

          font-size: 16px;

          &:hover {
            color: #fff;
            background: #3cd7ff;
          }
        }
      }
    }
  }
}
.flex {
  display: flex;
}
</style>
