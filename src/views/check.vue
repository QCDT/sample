<template>
  <div>
    <div class="checkWrap">
        <div class="checkTitle">     <!--盘点标题-->
            <div class="checkTitleL" :class="{active: check}" @click="direct"><span>直接盘点</span></div>
            <div class="checkTitleR" :class="{active: check == false}" @click="choice"><span>选择盘点</span></div>
        </div>
            <!--直接盘点内容区-->
        <div class="direct" v-show="check">
          <div class="scanBtn">
            <img src="@/assets/img/saomiao.gif">
          </div>
          <p><span>请将样本盒放在读卡器上，点击按钮开始盘点</span></p>
          <p class="notice">
            <i class="el-icon-warning-outline"></i>
            <span>错误范围标记在红色区域，请及时处理</span>
          </p>
        </div>
          <!--选择盘点内容区-->
        <div class="choice" v-show="!check">
          <div class="choiceItem">
            <span>选择冰箱</span>
            <el-select v-model="value" placeholder="请选择" size="mini">
                <el-option>
                </el-option>
            </el-select>
          </div>
          <div class="choiceItem">
            <span>选择层</span>
            <el-select v-model="value" placeholder="请选择" size="mini">
                <el-option>
                </el-option>
            </el-select>
          </div>
          <div class="choiceItem">
            <span>选择抽屉</span>
            <el-select v-model="value" placeholder="请选择" size="mini">
                <el-option value="">

                </el-option>
            </el-select>
          </div>
          <div class="choiceItem">
            <span>选择样本盒</span>
            <el-select v-model="value" placeholder="请选择" size="mini">
                <el-option>
                </el-option>
            </el-select>
          </div>
          <div class="notice">
            <i class="el-icon-warning-outline"></i>
            <span>错误范围标记在红色区域，请及时处理</span>
          </div>
          <el-button type="primary" size="mini" class="choiceBtn">开始盘点</el-button>
        </div>
    </div>
    <div class="checkRecord" @click="checkRecord">
      <div><img src="@/assets/img/sample-receive.png"></div>
      <div><span>盘点记录</span></div>
    </div>
    <el-dialog
      title="历史盘点记录"
      :visible.sync="DialogVisible"
      width="80%"
      center>
      <div class="recordTitle">
        <div>
          <span class="recordType">表单名称:</span>
          <el-input v-model="input" placeholder="请输入内容" size="mini"></el-input>
          <span class="recordType">样本名称:</span>
          <el-input v-model="input" placeholder="请输入内容" size="mini"></el-input>
        </div>
        <div>
          <span class="recordTime">盘点时间</span>
          <el-date-picker
            v-model="value1"
            type="daterange"
            size="mini"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
          <el-button type="primary"  size="mini">搜索</el-button>
        </div>
      </div>
      <div class="fromNum">
        <div><span>表单数量:</span></div>
        <div>
          <img src="@/assets/img/receive-excel.png">
          <img src="@/assets/img/receive-pdf.png">
        </div>
      </div>
      <div class="fromContent">
          <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 55%"
                :row-style="{height:'32px',textAlign: 'center',padding:'0px',}"
                :cell-style="{padding:'0px',textAlign: 'center'}"
                :header-cell-style ="{height:'30px',textAlign:'center',padding:'0px', background:'#00c9ff',color:'white'}"
                border
                >
                <el-table-column
                type="selection"
                >
                </el-table-column>
                <el-table-column
                type="index"
                
                label="序号"
                class="DataTable"
                >
                </el-table-column>
                <el-table-column
                prop="data"
                label="表单名称"
                class="DataTable"
                >
                <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column
                prop="username"
                label="操作(盘点)人"
                class="DataTable"
                >
                </el-table-column>
                <el-table-column
                prop="filename"
                label="盘点日期"
                class="DataTable"
                >
                </el-table-column>
          </el-table>
          <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 40%"
                :row-style="{height:'32px',textAlign: 'center',padding:'0px',}"
                :cell-style="{padding:'0px',textAlign: 'center'}"
                :header-cell-style ="{height:'30px',textAlign:'center',padding:'0px', background:'#00c9ff',color:'white'}"
                border
                >
                <el-table-column
                type="index"
                
                label="序号"
                class="DataTable"
                >
                </el-table-column>
                <el-table-column
                prop="data"
                label="样本名称"
                class="DataTable"
                >
                <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column
                prop="username"
                label="样本类别"
                class="DataTable"
                >
                </el-table-column>
                <el-table-column
                prop="filename"
                label="受试者编号"
                class="DataTable"
                >
                </el-table-column>
                <el-table-column
                prop="filename"
                label="已盘点次数"
                class="DataTable"
                >
                </el-table-column>
          </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
      <el-button @click="DialogVisible = false" size="mini">取 消</el-button>
      <el-button type="primary" @click="DialogVisible = false" size="mini">确 定</el-button>
    </span>
</el-dialog>
  </div>
</template>
<script>
export default {
  props: {},
  components: {},
  data () { 
    return {
      check: true,
      value: '',
      DialogVisible: false,
      input: '',
      value1: '',
      tableData:[]
    }
  },
  methods: {
    checkRecord(){
      this.DialogVisible = true;
    },
    direct () {
      this.check = true;
    },
    choice () {
      this.check = false;
    }
  },
  computed: {}
}
</script>
