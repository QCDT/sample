<template>
  <div>
    <ul class="setList"> <!-- 设置页 一级导航 -->
      <li
        @click="setCut(index)"
        v-for="(item,index) in setList"
        :key="index"
        :class="{current: active==index}"
      >
        <div class="setItem">
          <router-link :to="item.link">
            <img :src="item.imgUrl">
          </router-link>
          <p>{{item.setTitle}}</p>
          <p>{{item.setTitleE}}</p>
        </div>
      </li>
    </ul>
    <ul class="secondMenu" v-show="active === 0"> <!-- 设置页 硬件设置的二级导航 -->
      <li v-for="(item,index) in setListItemA" :key="index">
        <div class="setItem">
          <router-link :to="item.link">
            <img :src="item.imgUrl">
          </router-link>
          <p>{{item.setTitle}}</p>
          <p>{{item.setTitleE}}</p>
        </div>
      </li>
    </ul>
    <ul class="secondMenu" v-show="active === 1"> <!-- 设置页 贮藏设备设置的二级导航 -->
      <li v-for="(item,index) in setListItemB" :key="index">
        <div class="setItem">
          <router-link :to="item.link">
            <img :src="item.imgUrl">
          </router-link>
          <p>{{item.setTitle}}</p>
          <p>{{item.setTitleE}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {},
  components: {},
  data () {
    return {
      active: -1,
      setList: [ //设置一级导航的数据
        {
          imgUrl: require('@/assets/img/computer.png'),
          setTitle: '硬件设置',
          setTitleE: 'Hardware setup',
          link: ''
        },
        {
          imgUrl: require('@/assets/img/storage.png'),
          setTitle: '贮藏设备设置',
          setTitleE: 'Storage device setting',
          link: ''
        },
        {
          imgUrl: require('@/assets/img/data_setting.png'),
          setTitle: '数据设置',
          setTitleE: 'Data setting',
          link: 'set/DataSetting'
        },
        {
          imgUrl: require('@/assets/img/project_setting.png'),
          setTitle: '项目设置',
          setTitleE: 'Project setting',
          link: 'set/ProjectSetting'
        },
        {
          imgUrl: require('@/assets/img/Setuser.png'),
          setTitle: '用户设置',
          setTitleE: 'User configuration',
          link: 'set/UserConfiguration'
        }
      ],
      setListItemA: [// 硬件设置的数据
        {
          imgUrl: require('@/assets/img/card_setting.png'),
          setTitle: '读卡器设置',
          setTitleE: 'Card setting',
          link: 'set/cardReader'
        },
        {
          imgUrl: require('@/assets/img/printer_setting.png'),
          setTitle: '打印机设置',
          setTitleE: 'Printer  setting',
          link: 'set/Printer'
        },
        {
          imgUrl: require('@/assets/img/Centrifuge_setting.png'),
          setTitle: '离心设置',
          setTitleE: 'Centrifuge setting',
          link: 'set/Centrifuge'
        }
      ],
      setListItemB: [ // 贮藏设置的数据
        {
          imgUrl: require('@/assets/img/card_setting.png'),
          setTitle: '冰箱设置',
          setTitleE: 'refrigerator setting',
          link: 'set/refrigerator'
        }
      ]
    }
  },
  methods: {
    setCut (index) { // 设置二级路由的显示与隐藏
      this.active = index
      console.log(this.active)
    }
  },
  computed: {}
}
</script>
