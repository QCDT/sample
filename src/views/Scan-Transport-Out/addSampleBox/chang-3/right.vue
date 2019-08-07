<template>
  <div>
      3
    <sampleBoxSpecification @change="change"></sampleBoxSpecification>
  </div>
</template>
<script>
import sampleBoxSpecification from '@/components/tmp/zhanglan/sampleBoxSpecification'
export default {
  props: {},
  components: { sampleBoxSpecification },
  data () {
    return {}
  },
  methods: {
    change (v, s) {
      console.log('v: ', v)
    }
  },
  computed: {}
}
</script>
<style scoped lang='scss'>
</style>
