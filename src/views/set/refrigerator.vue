<template>
  <div class="SettingWrap">
      <div class="SettingContent">
        <div class="SettingTitle"> <!-- 冰箱设置的header -->
            <span class="DataInfo">冰箱概况</span>
            <div>
                <el-button type="primary" size="mini" @click="addrefrigerator">添加</el-button>
            </div>
        </div>
        <div class="CentrifugeTable">
            <!-- 表格结构 样式中 :cell-style 单元格样式 :row-style 行样式 :header-cell-style 表头单元格样式 -->
            <el-table
                ref="multipleTable"
                max-height="300"
                :data="tableData"
                style="width: 100%"
                size = 'mini'
                :row-style="{textAlign: 'center',padding:'0px',}"
                :cell-style="{textAlign: 'center'}"
                :header-cell-style ="{textAlign:'center', background:'#00c9ff',color:'white'}"
                border
                >
                <el-table-column
                prop="laboratory"
                label="实验室"
                >
                </el-table-column>
                <el-table-column
                prop="equipmentName"
                label="冰箱名称"
                >
                </el-table-column>
                <el-table-column
                prop="temperature"
                label="冰箱温度"
                width="100"
                >
                </el-table-column>
                <el-table-column
                prop="trademark"
                label="品牌"
                >
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <i  class="el-icon-edit edit" @click="amendrefrigerator(scope.$index, scope.row)" />
                        <i class="el-icon-delete edit" @click="handleDelete(scope.$index, scope.row)"/>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog
            title="贮藏设备信息"
            :visible.sync="DialogVisible"
            width="40%"
            center
            >
            <div class="refrigeratorBox">
                <div class="addCentrifuge">
                    <span class="addA">贮藏设备名称</span>
                    <el-input v-model="equipmentName" placeholder="请输入内容" size="mini" class="addB"></el-input>
                </div>
                <div class="addCentrifuge">
                    <span class="addA">贮藏设备品牌</span>
                    <el-select v-model="trademark" placeholder="请输入内容" size="mini" class="addB">
                        <el-option
                          v-for="item in trademarkOption"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </div>
                <div class="addCentrifuge">
                    <span class="addA">贮藏设备型号</span>
                    <el-select v-model="modelNub" placeholder="请输入内容" size="mini" class="addB">
                      <el-option
                          v-for="item in modelNubOption"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                      >
                      </el-option>
                    </el-select>
                </div>
                <div class="addCentrifuge">
                    <span class="addA">贮藏设备温度</span>
                    <el-input v-model="temperature" placeholder="请输入内容" size="mini" class="addB"></el-input>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="DialogVisible = false" size="mini">保存</el-button>
                <el-button type="primary" @click="DialogVisible = false" size="mini">返回</el-button>
            </span>
        </el-dialog>
      </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      DialogVisible: false,
      equipmentName: '',
      trademark: '',
      temperature: '',
      modelNub: '',
      trademarkOption: [

      ],
      modelNubOption: [],
      tableData: [ // 冰箱信息数据
        // {
        //   laboratory: 'I期临床试验室验室',
        //   equipmentName: '检测样本冰箱',
        //   trademark: 'MDF-U53V-519L',
        //   temperature: '-85'
        // },
        // {
        //   laboratory: 'I期临床试验室验室',
        //   equipmentName: '检测样本冰箱',
        //   trademark: 'MDF-U53V-519L',
        //   temperature: '-85'
        // }
      ]
    }
  },
  created(){
    this.$axios({
      method: 'get',
      url:'sampleGuide/refrigeratorStru/findAllRefrigeratorList'
    })
    .then(({data})=>{
      data.data.forEach((item)=>{
        this.tableData.push({
          id:item.id,
          laboratory: item.laboratoryDict.name,
          equipmentName: item.name,
          trademark:item.refrigeratorBrandTypeDict.name,
          temperature: item.temperature
        })
      })
      console.log(data)
    })
  },
  methods: {
    amendrefrigerator (index, row) {
      console.log(index, row)
      this.equipmentName = row.equipmentName
      this.temperature = row.temperature
      this.DialogVisible = true
    },
    handleDelete(index,row){
        this.$confirm(`确认删除该冰箱吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios({
            method:'post',
            url: 'sampleGuide/refrigeratorStru/deleteCheckSampleStru',
            data:({
              id:row.id
            })
          })
          .then(({data})=>{
            console.log(data)
            if(data.data > 0){
                this.$message({
                  type: 'info',
                  message: '当前冰箱中存在样本盒，不可删除!'
                });
            }else{
              this.$axios({
                method: 'post',
                url:'sampleGuide/refrigeratorStru/deleteRefrigeratorStruById',
                data:({
                  id:row.id
                })
              })
              .then(({data})=>{
                console.log(data)
                if(data.code == 200){
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                }
              })
            }
          })        
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    addrefrigerator () {
      this.$router.push('/set/refrigerator/choicelaboratory')
    }
  }
}
</script>
<style lang="less" scoped>

.SettingWrap{
    width: 100%;
    margin-top: 20px;
    font-size: 16px;
    .SettingContent{
        margin: 0 auto;
        width: 95%;
        .SettingTitle{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            .DataInfo{
                border-left: 2px solid #00c9ff;
                padding-left: 5px;
                font-size: 16px;
            }
        }
        .edit{
          margin-right: 15px;
          font-size: 18px;
          cursor: pointer;
        }
    }
    .refrigeratorBox{
      width:80%;
      margin: 0 auto;
      .addCentrifuge{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
        .addA{
          width: 28%;
        }
        .addB{
          width: 50%;
        }
      }
    }
}
</style>
