<template>
  <div class="labWrap">
    <div class="labTitle">
      <span>选择实验室</span>
    </div>
    <div class="operationlab">
      <el-button type="primary" @click="addEl" size="small">添加实验室</el-button>
      <el-button type="primary" @click="delEl" size="small">删除实验室</el-button>
    </div>
    <div class="labListWrap">
      <ul class="labList" :style="{'left':calleft + 'px'}">
        <li
          v-for="(item,index) in list"
          :key="index"
          :class="{active:activeClass == index}"
          @click="chooselab(index)"
        >
          <img src="@/assets/img/lab.png">
          <div @dblclick="editLabName(index)" class="labName">
            <span v-show="!item.editing">{{item.laboratoryName}}</span>
            <el-input
              size="small"
              v-show="item.editing"
              v-model="item.laboratoryName"
              placeholder="请输入内容"
              @blur="blur(index)"
            ></el-input>
          </div>
        </li>
      </ul>
    </div>
    <img @click="youhua" src="@/assets/img/arrowLeft.png" class="arrowL arrow" v-show="list.length > 3 && calleft < 0">
    <img @click="zuohua" src="@/assets/img/arrowRight.png" class="arrowR arrow" v-show="list.length  > 3 && calleft > -(list.length - 3) * 232">
    <div class="labBtn">
      <el-button type="primary" size="small">保存</el-button>
      <el-button type="primary" @click="returnup()" size="small">返回</el-button>

    </div>
    <img type="primary" size="small" class="labNext" @click="equipmentInfo" src="@/assets/img/arrowRight2.png">
  </div>
</template>
<script>
// import { setTimeout } from "timers";
export default {
  inject:['reload'],
  data() {
    return {
      laboratoryName: "",
      calleft: 0,
      activeClass: -1,
      addLab:false,
      list: [
        // {
        //   id: Date.now(),
        //   laboratoryName: "实验室1",
        //   editing: false
        // },
        // {
        //   id: Date.now(),
        //   laboratoryName: "实验室2",
        //   editing: false
        // }
      ]
    };
  },
  created(){
    this.$axios({
      method:'get',
      url:'sampleGuide/laboratoryDict/findAllLabora',
    })
    .then(({data})=>{
      console.log(data)
      data.data.forEach((item)=>{
        this.list.push({
          id:item.id,
          laboratoryName: item.name,
          editing:false
        })
      })
    })
  },
  methods: {
    chooselab(index) {
      console.log(index);
      // this.delIndex = index;
      this.activeClass = index;
    },
    returnup(){
        this.$router.push('/set/refrigerator')
    },
    editLabName(index) {
      this.list[index].editing = true;
    },
    equipmentInfo () {
      if(this.activeClass == -1){
        this.$message({
          message: '请选择需要添加冰箱的实验室',
          type: 'warning'
        });
      }else{
        this.$router.push('/set/refrigerator/equipmentInfo')
      }
    },
    blur(index) {
      console.log(this.list[index].laboratoryName)
        if (this.list[index].laboratoryName == "") {
          this.$message({
            message: '请输入实验室名称！',
            type: 'warning'
          });
          return;
        }else{
          this.$axios({
            method:'post',
            url:'sampleGuide/laboratoryDict/checkLaboraNameReset',
            data:({
              name:this.list[index].laboratoryName
            })
          })
          .then(({data})=>{
            if(data.data == 0){
              this.$message({
                message: '实验室名称已存在！',
                type: 'warning'
              })
              return;
            }else{
              this.list[index].editing = false;
              if(this.addLab){
                this.$axios({
                  method:'post',
                  url:'sampleGuide/laboratoryDict/insertLaboratoryDict',
                  data:({
                    name:this.list[index].laboratoryName
                  })
                })
                .then(({data})=>{
                    console.log(data)
                    if(data.code == 200){
                      this.reload();
                    }
                })
              }else{

              }
            }
            console.log(data)
          })
        };
    },
    addEl() {
      if(this.calleft == 0 && this.list.length < 3){
        this.calleft = 0
      } else if(this.calleft == 0 && this.list.length >= 3){
        this.calleft -= this.list.length * 232
      }else if(this.calleft < 0 && this.list.length >= 3){
        this.calleft -= this.calleft + this.list.length * 232;
      }
      this.list.push({
        id: Date.now(),
        laboratoryName: "",
        editing: true
      });
      this.addLab = true
    },
    delEl() {
      if (this.activeClass == -1) {
        this.$alert("请选择要删除实验室", "提示", {
          confirmButtonText: "确定"
        });
      } else {
        this.$confirm("确定删除该实验室吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          this.$axios({
            method:'post',
            url:'sampleGuide/laboratoryDict/deleteLaboratoryDictByName',
            data:({
              name: this.list[this.activeClass].laboratoryName
            })
          })
          .then(({data})=>{
              console.log(data)
              if(data.code == 200){
                this.$message({
                  type: "success",
                  message: "删除成功"
                });
                this.reload()
              }
          })
          // this.list.splice(this.delIndex, 1);
          // this.delIndex = -1;
          // this.$message({
          //   type: "success",
          //   message: "删除成功!"
          // });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
      }
      console.log(this.delIndex);
    },
    //点击按钮左移
    zuohua() {
      this.calleft -= 232;
      if (this.calleft < -((this.list.length - 3) * 232)) {
        this.calleft = -(this.list.length - 3) * 232;
      }
    },
    //点击按钮右移
    youhua() {
      this.calleft += 232;
      if (this.calleft > 0) {
        this.calleft = 0;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.labWrap{
    position: relative;
    width: 100%;
    .labTitle{
        text-align: center;
        margin-top: 30px;
        font-size: 18px;
    }
    .operationlab{
        width: 90%;
        text-align: right;
        margin: 20px 0;
    }
    .labListWrap{
      width: 696PX;
      margin: 0 auto;
      overflow: hidden;
      position: relative;
      height: 250px;
      /*display:table-cell;*/
      /*vertical-align:middle;*/
      /*text-align: center;*/
      /*&:hover .arrow{*/
        /*opacity: 1;*/
      /*}*/
    }
    .labList{
        width: 50000px;
        height: 230px;
        position: absolute;
        // display: flex;
        // justify-content: center;
        text-align: center;
        left: 0px;
        /*top: 50%;*/
        transition: 1s;
        /*display: inline-block;*/
        /*transform: translateY(-50%);*/
        // margin-top: 30px;
        li{
            width: 200PX;
            border: 1PX solid transparent;
            padding: 15PX;
            float: left;
            .labName{
                span{
                    margin-top: 10px;
                    display: inline-block;
                    // font-size: 14px;
                }
            }
        }
        img{
            width: 200PX;
            // height: 200px;
            cursor: pointer;
        }
        .active{
            border: 1PX solid #00c9ff;
        }
    }
    .labBtn{
        text-align: center;
        margin-top: 30px;
    }
    .labNext{
        position: absolute;
        top:55%;
        right:5%;
        cursor: pointer;
    }
}
.arrow{
    position: absolute;
    top: 50%;
    cursor: pointer;
    opacity: 1;
    transition: 3s;
}
.arrowL{
  left:15%;
}
.arrowR{
  right: 15%;
}
</style>
