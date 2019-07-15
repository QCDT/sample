<template>
    <div>
        <div class="equipmentConstruction">
            <div class="constructionTitle">
                <span>结构设置</span>
            </div>
            <div class="constructionMiddle">
                <div>
                    <div><span>层结构:</span></div>
                    <div>
                        <span>分层结构:</span>
                        <el-input v-model="equipmentName" placeholder="请输入内容" size="mini"></el-input>
                    </div>
                    <div>
                        <span>每层结构:</span>
                        <el-input v-model="equipmentName" placeholder="请输入内容" size="mini"></el-input>
                        <span>行</span>
                        <el-input v-model="equipmentName" placeholder="请输入内容" size="mini"></el-input>
                        <span>列</span>
                    </div>
                </div>
                <div>
                    <div><span>抽屉结构:</span></div>
                    <div>
                        <span>抽屉存放样本盒数量:</span>
                        <el-input v-model="equipmentName" placeholder="请输入内容" size="mini"></el-input>
                    </div>
                    <div>
                        <span>每个抽屉样本盒数量均为:</span>
                        <el-input v-model="equipmentName" placeholder="请输入内容" size="mini"></el-input>
                    </div>
                </div>
            </div>
            <div class="footerBtn">
                <el-button type="primary"  size="mini">保存</el-button>
                <el-button type="primary"  size="mini">返回</el-button>
            </div>
            <el-button type="primary" class="prevBtn" @click="prevEquipment">上一步</el-button>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      equipmentName: ''
    }
  },
  methods: {
    prevEquipment () {
      this.$router.push('/set/refrigerator/equipmentInfo')
    }
  }
}
</script>
<style lang="less" scoped>
.equipmentConstruction{
        width: 30%;
        margin: 0 auto;
        position: relative;
    .constructionTitle{
        text-align: center;
        margin-top: 20px;
        font-weight: bold;
        font-size: 20px;
    }
    .constructionMiddle{
        text-align: center;
        .el-input{
            width: 30%;
            margin-left: 5px;
            margin-right: 5px;
        }
        >div{
            margin-top: 30px;
            text-align: left;
            >div{
                margin-top: 10px;
            }
        }
    }
    .footerBtn{
        text-align: center;
        margin-top: 30px;
    }
    .prevBtn{
        position: absolute;
        left: -50%;
        top:45%;
    }
}
</style>
