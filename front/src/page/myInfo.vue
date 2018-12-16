<template>
    <div>
        <div class="myInfo_top">
            <div class="img"><img src="static/images/icon-touxiang.png"></div>
            <div class="text fl">
                <h2>{{repairmanInfo.name}}</h2>
                <router-link to="/editMyInfo">编辑</router-link>
            </div>
        </div>
        <div class="content myInfo">
            <ul>
                <li>
                    <router-link to="myDev">
                        <i class="fa fa-folder-o myInfol"></i>
                        <i class="fa fa-angle-right myInfor"></i>
                        <span>我的设备</span>
                        <em class="fr">{{repairmanInfo.devicesCount}}</em>
                    </router-link>
                </li>
                <li>
                    <router-link to="/repairsList">
                        <i class="fa fa-calendar-minus-o myInfol"></i>
                        <i class="fa fa-angle-right myInfor"></i>
                        <span>报修记录</span>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

export default {
  created () {
    this.getRepairmanInfo();
 },
 data() {
  	return {
       repairmanInfo: {
         name: "",
         devicesCount: 0,
       },
  	}
  },
  methods:{
      getRepairmanInfo() {
        this.$api.get('/user/repairmanInfo', "", data => {
          this.repairmanInfo = data.repairmanInfo;
        }, () => {
          this.$router.push('login');
        })
      }
  }
}
</script>