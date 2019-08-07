<template>
    <div>
        <div class="sampleBoxWrap">
            <div class="sampleBoxTitle">
                <img src="@/assets/img/saomiao.gif">
                <p>
                    <i class="el-icon-warning-outline"></i>
                    <span>请将样本盒放置在读卡器上，然后点击上方按钮开始扫描</span>
                </p>
            </div>
            <p><span>扫描总数:<span class="sampleNum">{{tableData.length}}</span></span></p>
            <div class="sampleBoxTable">
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    :row-style="{height:'32px',textAlign: 'center',padding:'0px',}"
                    :cell-style="{padding:'0px',textAlign: 'center'}"
                    :header-cell-style ="{height:'30px',textAlign:'center',padding:'0px', background:'#cbcbcb', color:'black'}"
                    border
                    >
                    <el-table-column
                    type="selection"
                    width="50">
                    </el-table-column>
                    <el-table-column
                    type="index"
                    width="70"
                    label="序号"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="data"
                    label="RFID编号"
                    >
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                    </el-table-column>
                    <el-table-column
                    prop="username"
                    label="样本盒名称"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="filename"
                    label="位置信息"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="filename"
                    label="详细信息"
                    >
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <i  class="el-icon-edit edit" @click="addrefrigerator(scope.$index, scope.row)" />
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
      tableData: [
        {

        }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
.sampleBoxWrap{
    width: 90%;
    margin: 0 auto;
    .sampleBoxTitle{
        margin: 25px 0;
        text-align: center;
        p{
            color: #00c9ff;
            i{
                margin-right: 5px;
            }
        }
        img{
            width: 128px;
            height: 128px;
            cursor: pointer;
        }
    }
    p{
      .sampleNum{
          margin-left: 10px;
      }
    }
    .sampleBoxTable{
        text-align: center;
        widows: 100%;
        margin-top: 10px;
        .edit{
            margin-left: 20px;
            font-size: 18px;
            cursor: pointer;
        }
    }
}
</style>
