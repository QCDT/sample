<template>
  <div class="search" @click="$emit('click')">
    <!-- 搜索按钮 -->
    <div class="in">
      <i class="icon icon-sousuo"></i>
      <span>{{name}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    name: { type: String, default: '搜索' }
  },
  components: {},
  data () {
    return {}
  },
  methods: {},
  computed: {}
}
</script>
<style scoped lang='less'>
.search {
    overflow: hidden;

    width: 100px;
    margin-right: 30px;

    user-select: none;

    border-radius: 3px;

    .in {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;

        padding-top: 10px;

        cursor: pointer;

        color: #fff;

        background-color: #3cd7ff;
        i {
            margin-bottom: 3px;

            font-size: 50px;
        }

        span {
            margin-bottom: 10px;
        }
    }
}

</style>
