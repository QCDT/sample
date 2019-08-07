<template>
    <div class="labWrap">
        <div class="labTitle"><span>选择实验室</span></div>
        <div class="operationlab">
             <el-button type="primary" size="mini">添加实验室</el-button>
             <el-button type="primary" size="mini">删除实验室</el-button>
        </div>
        <ul class="labList">
            <li v-for="(item,index) in list" :key="index" :class="{active:activeClass == index}"  @click="chooselab(index)">
                <img src="@/assets/img/lab.png">
                <div @dblclick="editLabName(index)" class="labName">
                    <span v-show="!item.editing">{{item.laboratoryName}}</span>
                    <el-input v-show="item.editing" v-model="laboratoryName" placeholder="请输入内容" size="mini"></el-input>
                </div>
            </li>
        </ul>
        <div class="labBtn">
             <el-button type="primary" size="mini">保存</el-button>
             <el-button type="primary" size="mini">返回</el-button>
        </div>
        <el-button type="primary" size="mini" class="labNext" @click="equipmentInfo">下一步</el-button>
    </div>
</template>
<script>
export default {
  data () {
    return {
      laboratoryName: '',
      activeClass: -1,
      list: [
        {
          id: Date.now(),
          laboratoryName: '实验室',
          editing: false
        },
        {
          id: Date.now(),
          laboratoryName: '实验室',
          editing: false
        }
      ]
    }
  },
  mounted () {
    // document.onclick = function(){
    //     this.list.map((item)=>{
    //        return  item.editing = false;
    //     })
    // }
  },
  methods: {
    chooselab (index) {
      console.log(index)
      this.activeClass = index
      // this.active = true
    },
    editLabName (index) {
      this.list[index].editing = true
    },
    equipmentInfo () {
      this.$router.push('/set/refrigerator/equipmentInfo')
    }
  }
}
</script>
<style lang="less" scoped>
.labWrap{
    position: relative;
    .labTitle{
        text-align: center;
        margin-top: 30px;
        font-size: 18px;
    }
    .operationlab{
        width: 90%;
        text-align: right;
        margin-top: 20px;
    }
    .labList{
        display: flex;
        justify-content: space-around;
        text-align: center;
        margin-top: 30px;
        li{
            border: 1px solid transparent;
            padding: 15px;
            .labName{
                span{
                    margin-top: 10px;
                    display: inline-block;
                    font-size: 14px;
                }
            }
        }
        img{
            width: 250px;
            height: 200px;
            cursor: pointer;
        }
        .active{
            border: 1px solid #00c9ff;
        }
    }
    .labBtn{
        text-align: center;
        margin-top: 30px;
    }
    .labNext{
        position: absolute;
        top:50%;
        right:5%;
    }
}
</style>
