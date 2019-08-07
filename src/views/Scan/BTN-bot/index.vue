<template>
  <!-- 底部按钮 -->
  <div>
    <!-- 底部的按钮(一) -->
    <div class="bot-group" v-show="!switchSaoMiao&&!switchGuanLi">
      <div class="item">
        <router-link :to="{name:botGroupPic[0].link}">
          <img :src="botGroupPic[0].pic" title="借出">
        </router-link>
      </div>
      <div class="item">
        <router-link :to="{name:botGroupPic[1].link}">
          <img :src="botGroupPic[1].pic" title="归还">
        </router-link>
      </div>
      <div class="item">
        <img :src="botGroupPic[2].pic" title="销毁"  @click="delitem">
      </div>
      <div class="item">
        <img :src="botGroupPic[3].pic" title="标签"  @click="printitem">
      </div>
      <div class="item">
        <img :src="botGroupPic[4].pic" title="转运"  @click="zhuanyunClick">
      </div>
    </div>
    <!-- 底部的按钮(二) -->
    <div class="bot-group" v-show="switchSaoMiao">
      <div class="item">
        <!-- <router-link :to="{name:botGroupPic[3].link}"> -->
          <img :src="botGroupPic[3].pic" alt title="标签" @click="printitem">
        <!-- </router-link> -->
      </div>
      <div class="item">
        <!-- <router-link :to="{name:botGroupPic[4].link}"> -->
          <img :src="botGroupPic[4].pic" alt title="转运"  @click="zhuanyunClick">
        <!-- </router-link> -->
      </div>
      <div class="item">
        <!-- <router-link :to="{name:botGroupPic[2].link}"> -->
          <img :src="botGroupPic[2].pic" alt title="销毁" @click="delitem">
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
  props: { 
    switchSaoMiao: { type: Boolean, default: false }, 
    switchGuanLi: { type: Boolean, default: false },
    checkedlist: { type: Array, default: [] }
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
          message: '请选择要转运的样本',
          type: 'warning'
        });
      }else{
        this.$message('转运')
        this.$emit('zhuanyun')
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
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    }
  },
  computed: {}
}
</script>
<style scoped lang='less'>
.bot-group {

  width: 100%;

  //position: fixed;
  height: 120px;

  // bottom: 0;

  display: flex;
  align-items: flex-end;
  justify-content: center;
  .item {
    margin: 0 20px;
    cursor: pointer;
  }
}
</style>
