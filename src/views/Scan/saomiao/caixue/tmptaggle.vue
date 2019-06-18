<template>
  <div class="tmptaggle-wrap">
    <div class="main" @click="toggleLeft">
      <img :src="mainPic" alt>
    </div>
    <div class="l-small small" v-show="showL">
      <router-link to="/">
        <slot name="pic1"></slot>
      </router-link>
    </div>
    <div class="r-small small" v-show="showL">
      <router-link to="/">
        <slot name="pic2"></slot>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    mainPic: String,
    small_1: String,
    small_2: String,
    link_1: String,
    link_2: String
  },
  components: {},
  data() {
    return { showL: false };
  },
  methods: {
    toggleLeft() {
      this.showL = !this.showL;
    },
    toggleRight() {
      this.showR = !this.showR;
    }
  },
  computed: {}
};
</script>
<style scoped lang='less'>
.tmptaggle-wrap {
  position: relative;
  margin: 0 10px;
  width: 400px;
  display: flex;
  align-items: center;

  .main {
    background-color: #fff;
    width: 150px;
    height: 150px;
    margin: 0 auto;
    > img {
      width: 100%;
      height: 100%;
    }
  }
  .small {
    display: block;
    position: absolute;
    img {
      width: 100px;
    }
  }
}
.l-small {
  left: 0;
}

.r-small {
  right: 0;
}
</style>