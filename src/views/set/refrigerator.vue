<template>
  <div class="SettingWrap">
      <div class="SettingContent">
        <div class="SettingTitle"> <!-- 冰箱设置的header -->
            <span class="DataInfo">冰箱概况</span>
            <div>
                <el-button type="primary" size="mini">添加</el-button>
            </div>
            <el-dialog
                title="贮藏设备信息"
                :visible.sync="DialogVisible"
                width="40%"
                class="refrigeratorBox"
                center
                >
                <div class="addContent">
                    <div class="addCentrifuge">
                        <span class="addA">贮藏设备名称</span>
                        <el-input v-model="equipmentName" placeholder="请输入内容" size="mini" class="addB"></el-input>
                    </div>
                    <div class="addCentrifuge">
                        <span class="addA">贮藏设备品牌</span>
                        <el-input v-model="trademark" placeholder="请输入内容" size="mini" class="addB"></el-input>
                    </div>
                    <div class="addCentrifuge">
                        <span class="addA">贮藏设备型号</span>
                        <el-input v-model="modelNub" placeholder="请输入内容" size="mini" class="addB"></el-input>
                    </div>
                    <div class="addCentrifuge">
                        <span class="addA">贮藏设备温度</span>
                        <el-input v-model="temperature" placeholder="请输入内容" size="mini" class="addB"></el-input>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="DialogVisible = false">保存</el-button>
                    <el-button type="primary" @click="DialogVisible = false">返回</el-button>
                </span>
            </el-dialog>
        </div>
        <div class="CentrifugeTable"> 
            <!-- 表格结构 样式中 :cell-style 单元格样式 :row-style 行样式 :header-cell-style 表头单元格样式 -->
            <el-table 
                ref="multipleTable"
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
                        <i  class="el-icon-edit edit" @click="addrefrigerator(scope.$index, scope.row)" />
                        <i class="el-icon-delete edit" @click="handleDelete(scope.$index, scope.row)"/>
                    </template>
                </el-table-column>
            </el-table>
        </div>
      </div>
  </div>
</template>
<script>
export default {
    data () {
        return{
            DialogVisible: false,
            equipmentName: '',
            trademark: '',
            temperature: '',
            modelNub: '',
            tableData: [ // 冰箱信息数据
                {
                  laboratory: 'I期临床试验室验室',
                  equipmentName: '检测样本冰箱',
                  trademark: 'MDF-U53V-519L',
                  temperature: '-85'
                },
                {
                 laboratory: 'I期临床试验室验室',
                  equipmentName: '检测样本冰箱',
                  trademark: 'MDF-U53V-519L',
                  temperature: '-85'
                }
            ]
        }
    },
    methods:{
        addrefrigerator (index , row) {
            console.log(index, row);
            this.DialogVisible = true;
        }
    }
}
</script>
