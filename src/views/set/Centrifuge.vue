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
              <h1 style="margin-bottom:10px">实验室</h1>
              <tmpinput style="margin-bottom:10px">
                选择实验室
                <el-select
                  slot="elUI"
                  size="mini"
                  clearable
                  v-model="MASK_value.laboratory"
                  filterable
                  placeholder="请选择"
                  style="width:170px"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </tmpinput>
              <h1  style="margin-bottom:10px">离心机信息</h1>
              <tmpinput style="margin-bottom:15px">
                设备编号
                <el-input
                  slot="elUI"
                  v-model="MASK_value.eqNumber"
                  clearable
                  size="mini"
                  style="width:170px"
                ></el-input>
              </tmpinput>
              <tmpinput style="margin-bottom:10px">
                设备名称
                <el-input
                  slot="elUI"
                  v-model="MASK_value.eqName"
                  clearable
                  size="mini"
                  style="width:170px"
                ></el-input>
              </tmpinput>
              <tmpinput style="margin-bottom:10px">
                设备品牌
                <el-select
                  slot="elUI"
                  size="mini"
                  clearable
                  v-model="MASK_value.laboratory"
                  filterable
                  placeholder="请选择"
                  style="width:170px"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </tmpinput>
              <tmpinput style="margin-bottom:10px">
                设备型号
                <el-select
                  slot="elUI"
                  size="mini"
                  clearable
                  v-model="MASK_value.laboratory"
                  filterable
                  placeholder="请选择"
                  style="width:170px"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </tmpinput>
              <tmpinput style="margin-bottom:10px">
                离心时间
                <el-input
                  slot="elUI"
                  v-model="MASK_value.time"
                  clearable
                  size="mini"
                  style="width:170px"
                ></el-input>
              </tmpinput>
              <tmpinput style="margin-bottom:10px">
                设备转速
                <el-input
                  slot="elUI"
                  v-model="MASK_value.revSpeed"
                  clearable
                  size="mini"
                  style="width:170px"
                ></el-input>
              </tmpinput>
              <tmpinput style="margin-bottom:10px">
                设备温度
                <el-input
                  slot="elUI"
                  v-model="MASK_value.temp"
                  clearable
                  size="mini"
                  style="width:170px"
                ></el-input>
              </tmpinput>
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
    <div class="cent">
      <fromName>离心机概况</fromName>
      <!-- <item-sum name="项目总数:" :number="tableData.length"></item-sum> -->
      <button @click="newProject">添加离心机</button>
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
        :style="{width: '100%',margin:'0 auto',}"
        :header-cell-style="getRowClass"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="index" label="序号" width="70"></el-table-column>
        <el-table-column prop="laboratory" label="实验室" width="220"></el-table-column>
        <el-table-column prop="eqNumber" label="设备编号" width="120"></el-table-column>
        <el-table-column prop="eqName" label="设备名称" width="120"></el-table-column>
        <el-table-column prop="brand" label="品牌" show-overflow-tooltip></el-table-column>
        <el-table-column prop="type" label="型号"></el-table-column>
        <el-table-column prop="time" label="时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="revSpeed" label="转速" show-overflow-tooltip></el-table-column>
        <el-table-column prop="temp" label="温度" show-overflow-tooltip></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <div class="flex">
              <el-button @click="changProject(scope.row,scope.$index)" type="text" size="mini">修改</el-button>
              <el-button type="text" @click="open">删除</el-button>
            </div>
            <!-- <el-button @click="clearProject(scope.row,scope.$index)" type="text" size="mini">删除</el-button> -->
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
import tmpinput from '@/components/tmp/zhanglan/tmp-empty-input'
export default {
  components: { itemSum, goBack, masking, fromName, tmpinput },
  data () {
    return {
      //   试管类别
      options: [
        {
          value: '苹果', // js拿到的数据
          label: '苹果' // 下拉菜单里展示的字
        },
        {
          value: '香蕉',
          label: '香蕉'
        }
      ],
      value123: '',
      // 试管类别 ↑↑↑↑↑↑
      // 删除按钮 确认框
      dialogVisible: false,
      test: '',
      // 蒙版的开关
      showMaskF: false,
      // 蒙版的表单数据
      MASK_name: '添加离心机',
      MASK_btn: '保存',
      MASK_event: true, // true创建项目 false 为修改项目
      MASK_cha_index: -1, // 修改的哪一行
      //   MASK_del_index: -1, //删除的哪一行
      MASK_items: [
        {
          text: '选择实验室',
          name: '实验室',
          key: 'laboratory',
          value: '1',
          type: 'select'
        },
        {
          text: '设备编号',
          fangan: '设备编号',
          key: 'eqNumber',
          value: '2',
          type: 'input'
        },
        {
          text: '设备名称',
          shenban: '设备名称',
          key: 'eqName',
          value: '3',
          type: 'input'
        },
        {
          text: '设备品牌',
          persorn: '品牌',
          key: 'brand',
          value: '4',
          type: 'select'
        },
        {
          text: '设备型号',
          persorn: '型号',
          key: 'type',
          value: '5',
          type: 'input'
        },
        {
          text: '离心时间',
          persorn: '时间',
          key: 'time',
          value: '6',
          type: 'input'
        },
        {
          text: '设备转速',
          persorn: '转速',
          key: 'revSpeed',
          value: '7',
          type: 'input'
        },
        {
          text: '设备温度',
          persorn: '温度',
          key: 'temp',
          value: '8',
          type: 'input'
        }
      ],
      MASK_value: {
        laboratory: 'I期临床实验室', // 实验室
        eqNumber: '001', // 设备编号
        eqName: '设备名称', // 设备名称
        brand: '品牌', // 品牌
        type: '型号', // 型号
        time: '时间', // 时间
        revSpeed: '转速', // 转速
        temp: '温度' // 温度
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
          id: '1', // ???
          laboratory: 'I期临床实验室', // 实验室
          eqNumber: '001', // 设备编号
          eqName: '设备名称', // 设备名称
          brand: '品牌', // 品牌
          type: '型号', // 型号
          time: '时间', // 时间
          revSpeed: '转速', // 转速
          temp: '温度' // 温度
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
    // 显示蒙版-->添加离心机的点击按钮
    newProject () {
      this.MASK_name = '添加离心机'
      this.MASK_btn = '保存'
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
    height: 530px;
    padding-top: 50px;

    background-color: #fff;

    .form-in {
      position: relative;

      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;

      //   width: 1000px;
      width: 80%;
      margin: 0 auto;
      height: 80%;
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
        height: 300px;
        > div {
          display: flex;

          align-items: flex-end;

          height: 20px;
        //   span {
        //     display: block;
        //     width: 77px;
        //     text-align-last: justify;
        //     margin-right: 10px;
        //     white-space: nowrap;
        //     font-size: 16px;
        //   }
        //   input {
        //     height: 20px;
        //     padding-top: 20px;

        //     border: 0;
        //     border-bottom: 1px solid #333;

        //     font-size: 16px;
        //     line-height: 20px;
        //   }
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
