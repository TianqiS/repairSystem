<template>
    <div>
        <div class="lon_top">
            <router-link to="/myInfo" class="left"><img src="static/images/left.png"></router-link>
            <span>我的设备</span>
            <router-link to="/myInfo" class="cha"><img src="static/images/cha.png"></router-link>
        </div>
        <div class="content myDev">
            <div class="myDev_search">
                <input type="text"><i class="fa fa-search"></i>
            </div>
            <div class="myDev_add">
                <router-link to="/addDev">添加新设备</router-link>
            </div>
            <div class="myDev_list">
                <ul>
                    <li v-for="device in devicesInfo">
                        <router-link :to="{path: '/devDetail', query: {deviceId: device.id}}">
                            <h2><label>设备编号</label><span>{{device.id}}</span><em :class="computeClass(device.status)">{{device.status === 1? '良好' : '故障'}}</em></h2>
                            <p><label>使用单位</label><span>{{device.useUnit}}</span></p>
                            <p><label>使用地址</label><span>{{device.location}}</span></p>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
  //well 良好 alarm故障 over过保
  export default {
    created() {
      this.getDevicesInfo();
    },
    computed: {
      computeClass() {
        return function (status) {
          return status === 1 ? 'well' : 'alarm';
        }
      }
    },
    data() {
      return {
        devicesInfo: [],
      }
    },
    methods: {
      getDevicesInfo() {
        this.$api.get('/user/devicesInfo', "", data => {
          console.log(data)
          this.devicesInfo = data.devicesInfo;
          console.log(this.devicesInfo)
        })
      }
    }
  }
</script>