<template>
  <div id="app">
    <router-view name="navbar"/>
    <router-view/>
  </div>
</template>
<script>
export default {
  provide () {
    return {
      reload: this.reload
    }
  },
  methods:{
      reload () {
        this.isRouterAlive = false
        this.$nextTick(function () {
          this.isRouterAlive = true
        })
    }
  }
}
</script>

<style lang="less">
</style>
