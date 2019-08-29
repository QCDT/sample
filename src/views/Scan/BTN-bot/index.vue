<template>
  <!-- 底部按钮 -->
  <div>
    <!-- 底部的按钮(一) -->
    <div class="bot-group" v-show="!switchSaoMiao&&!switchGuanLi">
      <div class="item">
        <router-link :to="{name:botGroupPic[0].link}">
          <el-tooltip class="item" effect="dark" content="借出" >
            <img :src="botGroupPic[0].pic">
          </el-tooltip>
        </router-link>
      </div>
      <div class="item">
        <!--<router-link :to="{name:botGroupPic[1].link}">-->
          <el-tooltip class="item" effect="dark" content="归还">
            <img :src="botGroupPic[1].pic" @click="returnBack">
          </el-tooltip>
        <!--</router-link>-->
      </div>
      <div class="item">
        <el-tooltip class="item" effect="dark" content="销毁">
          <img :src="botGroupPic[2].pic"   @click="delitem">
        </el-tooltip>
      </div>
      <div class="item">
        <el-tooltip class="item" effect="dark" content="标签">
          <img :src="botGroupPic[3].pic"   @click="printitem">
        </el-tooltip>
      </div>
      <div class="item">
        <el-tooltip class="item" effect="dark" content="转运">
          <img :src="botGroupPic[4].pic"   @click="zhuanyunClick">
        </el-tooltip>
      </div>
    </div>
    <!-- 底部的按钮(二) -->
    <div class="bot-group" v-show="switchSaoMiao">
      <div class="item">
        <!-- <router-link :to="{name:botGroupPic[3].link}"> -->
          <el-tooltip class="item" effect="dark" content="标签" >
            <img :src="botGroupPic[3].pic" alt  @click="printitemBox">
          </el-tooltip>
        <!-- </router-link> -->
      </div>
      <div class="item">
        <!-- <router-link :to="{name:botGroupPic[4].link}"> -->
          <el-tooltip class="item" effect="dark" content="转移">
            <img :src="botGroupPic[4].pic"   @click="zhuanyunClickBox">
          </el-tooltip>
        <!-- </router-link> -->
      </div>
      <div class="item">
        <!-- <router-link :to="{name:botGroupPic[2].link}"> -->
          <el-tooltip class="item" effect="dark" content="销毁">
            <img :src="botGroupPic[2].pic"  @click="delitemBox">
          </el-tooltip>
        <!-- </router-link> -->
      </div>
    </div>
    <!-- 底部的按钮(三) -->
    <div class="bot-group" v-show="!switchSaoMiao&&switchGuanLi">
      <div class="item">
        <router-link :to="{name:'batchEntry'}">
          <img src="@/assets/img/scan_batch.png" alt title="批量录入">
        </router-link>
      </div>
      <div class="item">
        <!-- <router-link :to="{name:botGroupPic[4].link}"> -->
          <img :src="botGroupPic[4].pic" alt title="转运" @click="zhuanyunClick">
        <!-- </router-link> -->
      </div>
      <div class="item">
        <router-link :to="{name:'bulkEditing'}">
          <img src="@/assets/img/scan_xiugai.png" alt title="批量修改">
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  inject:['reload'],
  props: {
    switchSaoMiao: { type: Boolean, default: false },
    switchGuanLi: { type: Boolean, default: false },
    checkedlist: { type: Array, default: [] },
    checkedBoxlist:{type:Array,default:[]}
  },
  components: {},
  data () {
    return {
      // 底部按钮组的 图片
      botGroupPic: [
        {
          pic: require('@/assets/img/scan_bot_out.png'),
          link: 'loan', title: '借出'
        },
        {
          pic: require('@/assets/img/scan_bot_in.png'),
          link: 'guihuan',
          title: '归还'
        },
        {
          pic: require('@/assets/img/scan_bot_laji.png'),
          title: '销毁'
        },
        {
          pic: require('@/assets/img/scan_bot_tie.png'),
          title: '标签'
        },
        {
          pic: require('@/assets/img/scan_bot_zhuanyi.png'),
          title: '转移'
        } ]
    }
  },
  methods: {
    zhuanyunClick () {
      if(this.checkedlist.length == 0){
         this.$message({
          message: '请选择要转移的样本',
          type: 'warning'
        });
      }else if(this.checkedlist.length > 1){
        this.$message({
          message: '样本只能单个转移哟',
          type: 'warning'
        });
      }else{
        this.$message('转运')
        this.$emit('zhuanyun')
      }
    },
    returnBack(){
      if(this.checkedlist.length==0){
        this.$message({
          message: '请选择需要归还的样本',
          type: 'warning'
        })
      }else{
        let boxInfo = this.checkedlist.every((item)=>{
          return item.status == "借出"
        })
        if(boxInfo){
            this.$router.push({ name: 'guihuan'})
        }else{
          this.$message({
            message: '只有借出状态的样本才允许归还',
            type: 'warning'
          })
        }
      }
    },
    zhuanyunClickBox(){
      if(this.checkedBoxlist.length == 0){
         this.$message({
          message: '请选择需要转移的样本盒',
          type: 'warning'
        });
      }else if(this.checkedBoxlist.length > 1){
        this.$message({
          message: '只能对一个样本盒进行转移操作',
          type: 'warning'
        });
      }else{
        let boxInfo = this.checkedBoxlist.every((item)=>{
            return item.address
        })
        if(boxInfo){
          this.$axios({
            method:'post',
            url:'/sampleGuide/set/isCanBeUpdateSampleBox',
            data:({
              id: this.checkedBoxlist[0].id
            })
          })
          .then(({data})=>{
            console.log(data)
            if(data.data==0){
              this.$message({
                message: '该样本盒中存在非正常状态样本，不可转移！',
                type: 'warning'
              });
            }else{
              this.$emit('zhuanyun')
            }
          })
        }else{
          this.$alert('存在空样本，请移除后重试', '提示', {
            confirmButtonText: '确定',
            type:'warning'
          })
        }
      }
    },
    delitem(){
      if(this.checkedlist.length == 0){
         this.$message({
          message: '请先选择要销毁的样本',
          type: 'warning'
        });
      }else{
        this.$confirm('已选中'+this.checkedlist.length+'条数据，确定销毁样本吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
    delitemBox(){
      if(this.checkedBoxlist.length == 0){
        this.$message({
          message: '请先选择要销毁的样本盒',
          type: 'warning'
        });
      }else{
        let boxInfo = this.checkedBoxlist.every((item)=>{
            return item.address
        })
        if(boxInfo){
          this.$confirm('已选中'+this.checkedBoxlist.length+'条数据，确定销毁样本盒吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$axios({
              method:'post',
              url:'/sampleGuide/set/destroySampleBox',
              data:({
                list: this.checkedBoxlist.map((item)=>{return item.id})
              })
            })
            .then(({data})=>{
              console.log(data)
              if(data.data == 0){
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.reload()
              }else{
                this.$message({
                  type: 'warning',
                  message: data.data
                });
              }

            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }else{
          this.$alert('存在空样本，请移除后重试', '提示', {
            confirmButtonText: '确定',
            type:'warning'
          })
        }
      }
    },
    printitem(){
      if(this.checkedlist.length == 0){
         this.$message({
          message: '请先选择要打印的样本',
          type: 'warning'
        });
      }else{
        this.$confirm('已选中'+this.checkedlist.length+'条数据，确定打印样本吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '打印成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消打印'
          });
        });
      }
    },
    printitemBox(){
      if(this.checkedBoxlist.length == 0){
         this.$message({
          message: '请先选择要打印的样本',
          type: 'warning'
        });
      }else{
        let boxInfo = this.checkedBoxlist.every((item)=>{
            return item.address
        })
        if(boxInfo){
          this.$confirm('已选中'+this.checkedBoxlist.length+'条数据，确定打印该标签吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$axios({
              method: 'post',
              url:'/sampleGuide/set/selectSampleBoxDetailInfo',
              data:({
                id: this.checkedBoxlist[0].id
              })
            })
            .then(({data})=>{
              console.log(data)
              try{
                var myobject = new ActiveXObject("GoDEXATL.Function");
                myobject.openport("6");
                myobject.setup(20, 19, 4, 0, 3,0);
                myobject.sendcommand("^L\r\n");
								myobject.ecTextOut(260, 20, 17, "Arial", "SampleName: "+data.data[0].name+"");
								myobject.ecTextOut(260, 50, 17, "Arial", "Period: "+data.data[0].sampleBoxStru.detailLocation+"");
								myobject.sendcommand("E\r\n");
              }catch(e){
                alert("打印故障，请检查打印机是否连接！");
              }finally{
                myobject.closeport();
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消打印'
            });
          });
        }else{
          this.$alert('存在空样本，请移除后重试', '提示', {
            confirmButtonText: '确定',
            type:'warning'
          })
        }
      }
    }
  },
  computed: {}
}
</script>
<style scoped lang='less'>
.bot-group {

  width: 100%;

  // position: absolute;
  height: 100px;

  // bottom: 20px;

  display: flex;
  align-items: flex-end;
  justify-content: center;
  .item {
    margin: 0 20px;
    cursor: pointer;
  }
}
</style>
