<template>
  <div class="div">
    <div class="group left" :style="{ transform:  `translateX(-${L_Chang>96?96:L_Chang}%)` }">
      <ul>
        <li v-for="(item,index) in L_Pic" :key="index">
          <router-link :to="{name:item.linkName}">
            <img :src="item.pic" alt>
          </router-link>
        </li>
      </ul>
      <!-- L_toggle 拉条的显示与隐藏 -->
      <div class="btn" @click="L_toggle">
        <i class="icon" :class="[L_FangXiang? 'icon-icon-left':'icon-icon-right']"></i>
      </div>
    </div>
    <!-- right -->
    <div
      class="group right"
      :style="{ transform:  `translateX(${R_Chang>83?82.8:R_Chang}%)`,
         transition:'all 0.3s ease-in-out'
         }"
    >
      <div class="btn" @click="R_toggle" style="width:20%">
        <i class="icon" :class="[R_FangXiang? 'icon-icon-left':'icon-icon-right']"></i>
      </div>
      <ul>
        <li v-for="(item,index) in R_Pic" :key="index">
          <router-link :to="{name:item.linkName}">
            <img :src="item.pic" alt>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      //  左边导航: 长度 方向 图片
      L_Chang: 96,
      L_FangXiang: false,
      L_Pic: [
        //   转运 分组合演 患者采血 自动录入 离心机
        { pic: require('@/assets/img/zhuangyun1.png'), linkName: 'zhuanyun' },
        { pic: require('@/assets/img/fenzuheyan1.png'), linkName: 'fenzu' },
        { pic: require('@/assets/img/huanzhecaixue.png'), linkName: 'caixue' },
        { pic: require('@/assets/img/zidongluru.png'), linkName: 'zidong' },
        { pic: require('@/assets/img/lixinji1.png'), linkName: 'lixin' }
      ],
      //   右边
      R_Chang: 96,
      R_FangXiang: true,
      R_Pic: [
        //   转运 分组合演 患者采血 自动录入 离心机
        { pic: require('@/assets/img/yangpinjiance.png'), linkName: 'detection' }
      ]
    }
  },
  methods: {
    //   左边导航栏
    L_toggle () {
      if (this.L_FangXiang) {
        this.L_Chang = 100
        this.L_FangXiang = false
      } else {
        this.L_Chang = 0
        this.L_FangXiang = true
      }
    },
    R_toggle () {
      if (this.R_FangXiang) {
        this.R_Chang = 0
        this.R_FangXiang = false
      } else {
        this.R_Chang = 100
        this.R_FangXiang = true
      }
    }
  }
}
</script>
<style scoped lang='less'>
// 布局[左右不同之处]
.left {
  position: absolute;
  top: 35px;
  left: 0;
  .btn {
    border-radius: 0 0.625rem 0.625rem 0;
  }
}
.right {
  position: absolute;
  top: 35px;
  right: 0px;
  .btn {
    border-radius: 0.625rem 0 0 0.625rem;
  }
}
//  左边导航栏
.group {
  display: flex;
  overflow: hidden;

  transition: all 0.9s ease-in-out;

  border-radius: 0 0.625rem 0.625rem 0;

  ul {
    display: flex;

    border: 1px solid #eee;

    li {
      margin: 10px 5px;
      padding: 5px 5px; // 修改大小记得修改 data里的数据

      cursor: pointer;
      img {
        width: 80px; // 修改大小记得修改 data里的数据  height: 80px; // 修改大小记得修改 data里的数据  border: 0;
      }
    }
  }

  // 箭头按钮的样式
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 5%;

    cursor: pointer;

    border: 1px solid #eee;
    border-color: #0ddfff;
    border-left: none;

    background-color: #0ddfff;

    > i {
      color: #e2e2e2;

      font-size: 20px;
      font-weight: 100;
    }
  }
}
</style>
