<template>
  <div class="verificationWrap">
    <div class="verificationContent" v-for="(item,index) in verificationList" :key="index">
      <router-link 
        :to="item.singleLink" 
        v-show="item.activeVerification" 
        @mouseover.native="singleEnter(index)"
        @mouseout.native="singleOut(index)"
        >
        <img :src='item.singleA' v-show="!item.hoverSingle">
        <img :src='item.singleB' v-show='item.hoverSingle'/>
      </router-link>
      <div class="verificationMiddle" @click="showVerification(index)">
        <img :src='item.mainContentA' v-show="!item.activeVerification">
        <img :src='item.mainContentB' v-show="item.activeVerification">
        <span>{{item.title}}</span>
      </div>
      <router-link 
        :to='item.multiplayerLink' 
        v-show="item.activeVerification"
        @mouseover.native="multiplayerEnter(index)"
        @mouseout.native="multiplayerOut(index)"
      >
        <img :src='item.multiplayerA' v-show="!item.hoverMultiplayer">
        <img :src='item.multiplayerB' v-show="item.hoverMultiplayer">
      </router-link>
    </div>
    <goBack></goBack>
  </div>
</template>
<script>
import tmptaggle from './caixue/tmptaggle'
import goBack from '@/components/tmp/zhanglan/go-1'
export default {
  props: {},
  components: { tmptaggle, goBack },
  data () {
    return {
      verificationList:[
        {
          singleA: require("@/assets/img/caixue_onepeople.png"),
          singleB: require("@/assets/img/caixue_onepeople1.png"),
          singleLink: '/scan/caixue/singleVerification',
          mainContentA: require("@/assets/img/caixue_huanzhe1.png"),
          mainContentB: require("@/assets/img/caixue_huanzhe1.jpg"),
          hoverSingle:false,
          hoverMultiplayer: false,
          activeVerification: false,
          multiplayerA: require("@/assets/img/caixue_morepeople.png"),
          multiplayerB: require("@/assets/img/caixue_morepeople1.png"),
          multiplayerLink: '/',
          title: '开始核验'
        },
        {
          singleA: require("@/assets/img/caixue_addonepatient.png"),
          singleB: require("@/assets/img/caixue_addonepatient1.png"),
          singleLink: '/',
          mainContentA: require("@/assets/img/caixue_addPatient.png"),
          mainContentB: require("@/assets/img/caixue_addPatient.jpg"),
          hoverSingle:false,
          hoverMultiplayer: false,
          activeVerification: false,
          multiplayerA: require("@/assets/img/caixue_addmorepatient.png"),
          multiplayerB: require("@/assets/img/caixue_addmorepatient1.png"),
          multiplayerLink: '/',
          title: '创建核验表单'
        }
      ]
    }
  },
  methods: {
    showVerification (index) {
      this.verificationList[index].activeVerification = !this.verificationList[index].activeVerification
    },
    singleEnter (index) {
      this.verificationList[index].hoverSingle = true
    },
    singleOut (index) {
      this.verificationList[index].hoverSingle= false
    },
    multiplayerEnter (index) {
       this.verificationList[index].hoverMultiplayer = true
    },
    multiplayerOut (index) {
       this.verificationList[index].hoverMultiplayer = false
    }
  },
  computed: {}
}
</script>
<style scoped lang='less'>
.verificationWrap{
  width:100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .verificationContent{
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 80px;
    width: 143px;
    img{
      width: 100px;
      height: 100px;
      cursor: pointer;
    }
    .verificationMiddle{
      text-align: center;
      margin: 0 15px;
      img{
        width: 200px;
        height: 200px;
      }
      span{
        display: block;
        color: #00c9ff;
      }
    }

  }
}
</style>
