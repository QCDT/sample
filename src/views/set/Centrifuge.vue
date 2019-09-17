<template>
  <div class="project-setting-page project-wrap">
    <!-- <div class="masking"></div> -->
    <masking v-if="showMaskF">
      <div class="test">
        <!-- 表单内容 -->
        <form >
          <div class="form-in">
            <div class="title">{{MASK_name}}</div>
            <div class="content">
              <h1 style="margin-bottom:10px">实验室</h1>
              <tmpinput style="margin-bottom:15px">
                选择实验室
                <el-select
                  slot="elUI"
                  size="mini"
                  clearable
                  v-model="labValue"
                  filterable
                  placeholder="请选择"
                  style="width:170px"
                >
                  <el-option
                    v-for="item in labOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </tmpinput>
              <h1  style="margin-bottom:10px">离心机信息</h1>
              <tmpinput style="margin-bottom:20px">
                设备编号
                <el-input
                  slot="elUI"
                  v-model="eqNumber"
                  clearable
                  size="mini"
                  style="width:170px"
                ></el-input>
              </tmpinput>
              <tmpinput style="margin-bottom:15px">
                设备名称
                <el-input
                  slot="elUI"
                  v-model="eqName"
                  clearable
                  size="mini"
                  style="width:170px" 
                ></el-input>
              </tmpinput>
              <tmpinput style="margin-bottom:15px">
                设备品牌
                <el-select
                  slot="elUI"
                  size="mini"
                  clearable
                  v-model="brandValue"
                  filterable
                  placeholder="请选择"
                  style="width:170px"
                  @change="changeType"
                >
                  <el-option
                    v-for="item in brandOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </tmpinput>
              <tmpinput style="margin-bottom:15px">
                设备型号
                <el-select
                  slot="elUI"
                  size="mini"
                  clearable
                  v-model="typeValue"
                  filterable
                  placeholder="请选择"
                  style="width:170px"
                >
                  <el-option
                    v-for="item in typeOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </tmpinput>
              <tmpinput style="margin-bottom:15px">               
                离心时间
                <el-input
                  slot="elUI"
                  v-model="time"
                  clearable
                  size="mini"
                  style="width:170px"
                ></el-input>
                <span slot="unit">min</span>
              </tmpinput>
              <tmpinput style="margin-bottom:15px">
                设备转速
                <el-input
                  slot="elUI"
                  v-model="revSpeed"
                  clearable
                  size="mini"
                  style="width:170px"
                ></el-input>
                <el-select  style="width: 90px; margin-left:10px" v-model="unitValue" clearable placeholder="请选择" size="mini" slot="unit">
                    <el-option
                      v-for="item in unitOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                </el-select>
              </tmpinput>
              <tmpinput style="margin-bottom:20px">
                设备温度
                <el-input
                  slot="elUI"
                  v-model="temp"
                  clearable
                  size="mini"
                  style="width:170px"
                ></el-input>
                <span slot="unit">℃</span>
              </tmpinput>
            </div>
            <div class="bot-btn">             
              <button @click="maskProject()">{{MASK_btn}}</button>
              <button  @click="showMaskF = false">返回</button>
            </div>
          </div>
        </form>
        <!-- 表单内容 ↑ -->
      </div>
    </masking>
    <div class="cent">
      <fromName>离心机概况</fromName>
      <button @click="newProject">添加离心机</button>
    </div>
    <div class="form center">
      <el-table
        :row-style="{height:'32px',textAlign: 'center',padding:'0px'}"
        :cell-style="{padding:'0px',textAlign: 'center'}"
        border
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        :style="{width: '100%'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="index" label="序号" width="70"></el-table-column>
        <el-table-column prop="laboratory" label="实验室"></el-table-column>
        <el-table-column prop="eqNumber" label="设备编号" ></el-table-column>
        <el-table-column prop="eqName" label="设备名称"></el-table-column>
        <el-table-column prop="brand" label="品牌" show-overflow-tooltip></el-table-column>
        <el-table-column prop="type" label="型号"></el-table-column>
        <el-table-column prop="time" label="时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="revSpeed" label="转速" show-overflow-tooltip></el-table-column>
        <el-table-column prop="temp" label="温度" show-overflow-tooltip></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
              <el-tooltip effect="dark" content="修改" placement="bottom-start">
                  <i class="el-icon-edit btn" @click="changeCentrifuge(scope.$index, scope.row)"></i>
              </el-tooltip>
              <el-tooltip effect="dark" content="删除" placement="bottom-start">
                  <i class="el-icon-delete btn" @click="delCentrifuge(scope.$index, scope.row)"></i>
              </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

    </div>
    <div class="bot">
      <goBack></goBack>
    </div>
  </div>
</template>
<script>
import itemSum from '@/components/tmp/zhanglan/item-sum'
import goBack from '@/components/tmp/zhanglan/go-1'
import masking from '@/components/tmp/zhanglan/masking'
import fromName from '@/components/tmp/zhanglan/fromName'
import tmpinput from '@/components/tmp/zhanglan/tmp-empty-input'
export default {
  components: { itemSum, goBack, masking, fromName, tmpinput },
  inject:['reload'],
  data () {
    return {
      // 实验室集合
      labOption:[

      ],
      // 设备品牌集合
      brandOption:[

      ],
      typeOption:[

      ],
      // 设备转速单位集合
      unitOption:[
        {
          value: 'g',
          label: 'g'   
        },
        {
          value: 'r/min',
          label: 'r/min'
        }
      ],
      unitValue: '',
      labValue: '',
      brandValue: '',
      typeValue:'',
      time: '', 
      revSpeed: '',
      temp:'',
      eqNumber: '',
      eqName:'',
      centrifugeId: '',
      // 试管类别 ↑↑↑↑↑↑
      // 删除按钮 确认框
      dialogVisible: false,
      // 蒙版的开关
      showMaskF: false,
      // 蒙版的表单数据
      MASK_name: '添加离心机',
      MASK_btn: '保存',
      MASK_event: true, // true创建项目 false 为修改项目
     // MASK_cha_index: -1, // 修改的哪一行
      //   MASK_del_index: -1, //删除的哪一行
      MASK_value: {
        // laboratory: 'I期临床实验室', // 实验室
        // eqNumber: '001', // 设备编号
        // eqName: '设备名称', // 设备名称
        // brand: '品牌', // 品牌
        // type: '型号', // 型号
        // time: '时间', // 时间
        // revSpeed: '转速', // 转速
        // temp: '温度' // 温度
      },
      // El UI
      // 开关的值
      // value: false,

      // value1: false,
      // value2: false,
      // value3: '',
      // value4: '',

      tableData: [
        // {
        //   id: '1', // ???
        //   laboratory: 'I期临床实验室', // 实验室
        //   eqNumber: '001', // 设备编号
        //   eqName: '设备名称', // 设备名称
        //   brand: '品牌', // 品牌
        //   type: '型号', // 型号
        //   time: '时间', // 时间
        //   revSpeed: '转速', // 转速
        //   temp: '温度' // 温度
        // }
      ],
      multipleSelection: []
    }
  },
  created(){
     this.$axios({
          method: 'get',
          url: 'sampleGuide/centrifuge/findAllCentrifuge',
      })
      .then(({data})=>{
          console.log(data)
          data.data.centrifugeList.forEach((item)=>{
            this.tableData.push({
              id: item.id,
              laboratory: item.laboratoryDict.name,
              laboratoryid: item.laboratoryDict.id,
              eqNumber:item.centrifugeNumber,
              eqName: item.name,
              brand: item.brandModel.brand,
              type: item.brandModel.modelNumber,
              typeId:item.brandModel.id,
              time: item.time,
              revSpeed: item.rotationRate,
              temp: item.temperate
            })
          })
          data.data.laboratoryDicts.forEach((item)=>{
            this.labOption.push({
              value: item.id,
              label: item.name
            })
          })
          data.data.brandModelList.forEach((item)=>{
              this.brandOption.push({
                value: item,
                label: item
              })
          })
      })
  },
  methods: {
    // El UI ...
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // EL UI操作事件
    changeCentrifuge (index, row) {
      console.log(row.type)
      // row 当前行的数据,index 当前行的索引
      this.MASK_name = '修改项目'
      this.MASK_btn = '修改'
      this.MASK_event = false // true 为创建 false 为修改
     // this.MASK_cha_index = index // 修改的哪一行
      this.labValue = row.laboratoryid
      this.brandValue= row.brand
      // this.typeOption = [{value: row.typeId, label:row.type}]
      // this.typeValue = row.typeId
      this.time = parseFloat(row.time)
      this.unitValue = row.revSpeed.replace(/[\d]+/ig,"")
      this.revSpeed = parseFloat(row.revSpeed)
      this.temp = parseFloat(row.temp)
      this.eqName = row.eqName
      this.eqNumber = row.eqNumber
      this.centrifugeId = row.id
      this.$axios({
        method: 'post',
        url: 'sampleGuide/centrifuge/findModelNumberByBrand',
        data:({
          'brand': row.brand
        })
      })
      .then(({data})=>{
        console.log(data)
        this.typeOption = []
        // this.typeValue = ''
        data.data.forEach((item)=>{
          this.typeOption.push({
            value: item.id,
            label:item.modelNumber
          })
        })
        this.typeValue = row.typeId
      })
      .catch(({error})=>{
          console.log(error)
      })
      this.showMaskF = true
    },
    // 显示蒙版-->添加离心机的点击按钮
    newProject () {
      this.MASK_name = '添加离心机'
      this.MASK_btn = '保存'
      this.MASK_event = true // true 为创建 false 为修改
      this.showMaskF = true
      this.labValue = ''
      this.eqNumber = ''
      this.eqName = ''
      this.brandValue = ''
      this.typeValue = ''
      this.time = ''
      this.revSpeed = ''
      this.unitValue = ''
      this.temp = ''
    },
    // 蒙版里的事件
    maskProject () {
      // 蒙版事件: 修改 OR 创建
      this.MASK_event ? this.addProject() : this.putProject()
    },
    //  添加离心机
    addProject () {
      // this.tableData.push(JSON.parse(JSON.stringify(this.MASK_value)))
      this.$axios({
        method:'post',
        url: 'sampleGuide/centrifuge/insertCentrifuge',
        data:({
          name: this.eqName, // 离心机名称
          time: this.time+'min', // 离心时间
          rotationRate: this.revSpeed + this.unitValue, //转速
          temperate:this.temp+'℃',//温度
          laboratoryDictId: this.labValue, // 实验室id
          centrifugeNumber: this.eqNumber, //离心机编号
          modelNumberId: this.typeValue   // 离心机型号id
        })
      })
      .then(({data})=>{
         this.$message({
          message: '添加离心机成功!',
          type: 'success'
        });
        this.reload()
      })
      .catch((error)=>{
            this.$message.error('添加失败！请重试');
      })
      // alert('添加成功')
      this.MASK_value = {}
      this.showMaskF = false
      // this.clearFromBack()
    },
    // 修改离心机信息
    putProject () {
      console.log(this.typeValue)
      this.$axios({
        method: 'post',
        url:'sampleGuide/centrifuge/updateCentrifuge',
        data:({
          id: this.centrifugeId,
          name: this.eqName, // 离心机名称
          time: this.time+'min', // 离心时间
          rotationRate:this.revSpeed + this.unitValue, //转速
          temperate:this.temp+'℃',//温度
          laboratoryDictId: this.labValue, // 实验室id
          centrifugeNumber: this.MASK_value.eqNumber, //离心机编号
          modelNumberId: this.typeValue  
        })
      })
      .then(({data})=>{
          this.$message({
            message: '修改离心机成功!',
            type: 'success'
          });
        this.labValue = ''
        this.brandValue= ''
        this.typeValue = ''
        this.time = ''
        this.revSpeed = ''
        this.temp = ''
        this.eqName = ''
        this.eqNumber = ''
        this.reload()
      })
      .catch((error)=>{
        console.log(error)
          this.$message.error('修改失败！请重试');
      })
      this.MASK_value = {}
      this.showMaskF = false
    },
    // 删除离心机
    delCentrifuge (index, row) {
      this.$confirm('确认删除该离心机吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // this.clearProject() // 执行删除事件
          this.$axios({
            method: 'post',
            url: 'sampleGuide/centrifuge/deleteCentrifugeById',
            data:({
               id: row.id
            })
          })
          .then((data)=>{
            console.log(data)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.reload();
          })
          .catch((error)=>{
              console.log(error)
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 根据设备品牌查询设备型号
    changeType(){
      this.$axios({
        method: 'post',
        url: 'sampleGuide/centrifuge/findModelNumberByBrand',
        data:({
          'brand': this.brandValue
        })
      })
      .then(({data})=>{
        console.log(data)
        this.typeOption = []
        this.typeValue = ''
        data.data.forEach((item)=>{
          this.typeOption.push({
            value: item.id,
            label:item.modelNumber
          })
        })
      })
      .catch(({error})=>{
          console.log(error)
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

  width: 95%;
  margin: 0 auto;
  padding-top: 10px;
  .cent {
    display: flex;
    justify-content: space-between;
    width: 100%;
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
.btn{
  font-size: 18px;
  margin-right: 10px;
  cursor: pointer;
  outline: none;
}
.test {
  width: 100%;
  height: 100%;
  form {
    width: 80%;
    // height: 450px;
    padding:30px;
    padding-top: 40px;
    background-color: #fff;
    margin: 0 auto;
    margin-top: 40px;
    .form-in {
      position: relative;

      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      padding-top: 30px;

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
        > div {
          display: flex;

          align-items:center;

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
// .flex {
//   display: flex;
// }
</style>
