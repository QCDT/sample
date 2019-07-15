<template>
  <div>
    <sampleBoxInformation
      :matrixData="matrixData"
      borderWidth="1px"
      width="20px"
      height="20px"
      border-color="#333"
    ></sampleBoxInformation>
  </div>
</template>
<script>
import sampleBoxSpecification from '@/components/tmp/zhanglan/sampleBoxSpecification'
import sampleBoxInformation from '@/components/tmp/zhanglan/sampleBoxInformation/index'
export default {
  props: {},
  components: { sampleBoxSpecification, sampleBoxInformation },
  data () {
    return {
      matrixData: [
        [{ bgc: '#fff' }, { bgc: '#fff' }],
        [{ bgc: '#fff' }, { bgc: '#fff' }]
      ]
    }
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
