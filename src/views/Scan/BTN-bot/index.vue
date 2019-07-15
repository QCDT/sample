<template>
  <!-- 底部按钮 -->
  <div>
    <!-- 底部的按钮(一) -->
    <div class="bot-group" v-show="!switchSaoMiao&&!switchGuanLi">
      <div class="item" v-for="(number,index) in 4" :key="index">
        <router-link :to="{name:botGroupPic[index].link}">
          <img :src="botGroupPic[index].pic" alt :title="botGroupPic[index].title">
        </router-link>
      </div>
      <div class="item">
        <img :src="botGroupPic[4].pic" title="转运"  @click="zhuanyunClick">
      </div>
    </div>
    <!-- 底部的按钮(二) -->
    <div class="bot-group" v-show="switchSaoMiao">
      <div class="item">
        <router-link :to="{name:botGroupPic[3].link}">
          <img :src="botGroupPic[3].pic" alt title="标签">
        </router-link>
      </div>
      <div class="item">
        <!-- <router-link :to="{name:botGroupPic[4].link}"> -->
          <img :src="botGroupPic[4].pic" alt title="转运"  @click="zhuanyunClick">
        <!-- </router-link> -->
      </div>
      <div class="item">
        <router-link :to="{name:botGroupPic[2].link}">
          <img :src="botGroupPic[2].pic" alt title="销毁">
        </router-link>
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
        <router-link :to="{name:botGroupPic[4].link}">
          <img :src="botGroupPic[4].pic" alt title="转运" @click="zhuanyunClick">
        </router-link>
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
  props: { switchSaoMiao: { type: Boolean, default: false }, switchGuanLi: { type: Boolean, default: false } },
  components: {},
  data () {
    return {
      // 底部按钮组的 图片
      botGroupPic: [ { pic: require('@/assets/img/scan_bot_out.png'), link: 'loan', title: '借出' }, { pic: require('@/assets/img/scan_bot_in.png'), link: 'guihuan', title: '归还' }, { pic: require('@/assets/img/scan_bot_laji.png'), link: 'laji', title: '销毁' }, { pic: require('@/assets/img/scan_bot_tie.png'), link: 'biaoqian', title: '标签' }, { pic: require('@/assets/img/scan_bot_zhuanyi.png'), title: '转移' } ]
    }
  },
  methods: {
    zhuanyunClick () {
      this.$message('转运')
      this.$emit('zhuanyun')
    }
  },
  computed: {}
}
</script>
<style scoped lang='less'>
.bot-group {
  width: 100%;

  position: fixed;
  height: 100px;

  bottom: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  .item {
    margin: 0 20px;
    cursor: pointer;
    > img {
      height: 50px;
    }
  }
}
</style>
