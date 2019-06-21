<template>
  <div class="SettingWrap">
      <div class="SettingContent">
        <div class="SettingTitle"> <!-- 离心机设置的header -->
            <span class="DataInfo">离心机概况</span>
            <div>
                <el-button type="primary" size="mini" @click="addbackups">添加</el-button>
            </div> <!-- 添加的弹窗 -->
            <el-dialog
                title="添加离心机"
                :visible.sync="DialogVisible"
                width="40%"
                class="addBox"
                center
                >
                <div class="addContent">
                    <div>
                        <div><span>实验室</span></div>
                        <div class="addCentrifuge">
                            <span class="addA">选择实验室</span>
                            <el-select v-model="value" placeholder="请选择" size="mini">
                                    <!-- <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option> -->
                            </el-select>
                        </div>
                    </div>
                    <div>
                        <div><span>离心机信息</span></div>
                        <div>
                            <div class="addCentrifuge">
                                <span class="addA">设备编号</span>
                                <el-input v-model="input" placeholder="请输入内容" size="mini" class="addB"></el-input>
                            </div>
                            <div class="addCentrifuge">
                                <span class="addA">设备名称</span>
                                <el-input v-model="input" placeholder="请输入内容" size="mini" class="addB"></el-input>
                            </div>
                            <div class="addCentrifuge">
                                <span class="addA">设备品牌</span>
                                <el-input v-model="input" placeholder="请输入内容" size="mini" class="addB"></el-input>
                            </div>
                            <div class="addCentrifuge">
                                <span class="addA">设备型号</span>
                                <el-input v-model="input" placeholder="请输入内容" size="mini" class="addB"></el-input>
                            </div>
                            <div class="addCentrifuge">
                                <span class="addA">离心时间</span>
                                <el-input v-model="input" placeholder="请输入内容" size="mini" class="addB"></el-input>
                            </div>
                            <div class="addCentrifuge">
                                <span class="addA">设备转速</span>
                                <div>
                                    <el-input  placeholder="请输入内容" size="mini" class="addB"></el-input>
                                    <el-select v-model="value" placeholder="请选择" size="mini" class="addC">
                                            <el-option>r/min</el-option>
                                            <el-option>g</el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div class="addCentrifuge">
                                <span class="addA">设备温度</span>
                                <el-input v-model="input" placeholder="请输入内容" size="mini" class="addB"></el-input>
                                <span>℃</span>
                            </div>
                        </div>
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
                prop="equipmentNub"
                label="设备编号"
                >
                </el-table-column>
                <el-table-column
                prop="equipmentName"
                label="设备名称"
                >
                </el-table-column>
                <el-table-column
                prop="trademark"
                label="品牌"
                >
                </el-table-column>
                <el-table-column
                prop="ModelNub"
                label="型号"
                >
                </el-table-column>
                <el-table-column
                prop="equipmentTime"
                label="时间"
                >
                </el-table-column>
                <el-table-column
                prop="rotateSpeed"
                label="转速"
                >
                </el-table-column>
                <el-table-column
                prop="temperature"
                label="温度"
                width="90"
                >
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <i  class="el-icon-edit edit" @click="handleEdit(scope.$index, scope.row)" />
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
        return {
            DialogVisible: false, // 添加按钮的弹窗显示与隐藏            
            tableData: [ // 离心机信息数据
                {
                  laboratory: 'I期临床试验室验室',
                  equipmentNub: '',
                  equipmentName: '离心机3-18K',
                  trademark: '西格玛(Sigma)',
                  ModelNub: '3-18K',
                  equipmentTime: '10min',
                  rotateSpeed: '2000g',
                  temperature: '4℃'
                },
                {
                  laboratory: 'I期临床试验室验室',
                  equipmentNub: '',
                  equipmentName: '离心机3-18K',
                  trademark: '西格玛(Sigma)',
                  ModelNub: '3-18K',
                  equipmentTime: '10min',
                  rotateSpeed: '2000g',
                  temperature: '4℃'
                }
            ]
        }
    },
    methods:{
        addbackups () {
            this.DialogVisible = true;
        },
        handleEdit (index, row) {
            console.log(index,row);
            this.DialogVisible = true;
        },
        handleDelete (index, row) {
            console.log(index, row);
        }
    }
}
</script>

