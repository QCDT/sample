<template>
  <div class="bottom">
    <!-- 这是一个返回按钮 它在页面的最底部 -->
    <button @click="$router.go(-1)">返回</button>
  </div>
  <!-- <button @click="$router.go(-1)">返回</button> -->
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
.bottom {
  position: absolute;
  bottom: 0;

  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  left: 0;
  right: 0;

  height: 60px;

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
// button {
//   width: 6.25rem;
//   height: 1.875rem;

//   cursor: pointer;
//   transition: all 0.1s;

//   color: #01c8ff;
//   border: 0;
//   border: 1px #01c8ff solid;
//   border-radius: 5px;
//   outline: none;
//   background-color: #fff;

//   font-size: 14px;

//   &:hover {
//     color: #fff;
//     background-color: #01c8ff;
//   }
// }
</style>
