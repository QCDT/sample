<template>
  <div class="zhuanyun-wrap">
    <!-- 两个快 一个返回按钮 -->

    <div class="in-box">
      <!-- 转入 -->
      <router-link :to="{name:'zhuanchu'}"  style="color:#333">
        <div class="out pic">
          <img src="@/assets/img/out.png" alt>
          <span >样本转出</span>
        </div>
      </router-link>
      <!-- 转出 -->
      <router-link :to="{name:'zhuanru'}" style="color:#333">
        <div class="join pic">
          <img src="@/assets/img/join.png" alt>
          <span>样本转入</span>
        </div>
      </router-link>
      <!-- 返回按钮 -->
    </div>
    <div class="bottom">
      <button @click="$router.go(-1)">返回</button>
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  components: {},
  data () {
    return {}
  },
  methods: {},
  computed: {}
}
</script>
<style scoped lang='less'>
.zhuanyun-wrap {
  display: flex;
  flex-direction: column;
}

.in-box {
  display: flex;
  justify-content: center;

  padding-top: 100px;

  border-radius: 10px;

  .pic {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    width: 14.375rem;
    height: 15.625rem;
    margin: 0 100px;

    // border: 1px #ccc solid;
    border-radius: 10px;
  }

  img {
    width: 150px;
    height: 150px;
  }
}

.bottom {
  position: absolute;
  bottom: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 150px;

  button {
    width: 6.25rem;
    height: 1.875rem;

    cursor: pointer;
    transition: all 0.1s;

    color: #01c8ff;
    border: 0;
    border: 1px #01c8ff solid;
    border-radius: 5px;
    outline: none;
    background-color: #fff;

    font-size: 14px;

    &:hover {
      color: #fff;
      background-color: #01c8ff;
    }
  }
}
</style>
