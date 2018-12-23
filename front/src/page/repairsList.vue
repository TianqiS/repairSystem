<template>
  <div>
    <div class="lon_top">
      <router-link to="/myInfo" class="left"><img src="static/images/left.png"></router-link>
      <span>报修记录</span>
      <router-link to="" class="cha"><img src="static/images/cha.png"></router-link>
    </div>
    <div class="content devDetailJL">
      <ul>
        <li v-for="repairlog in repairlogList">
          <router-link :to="{path: '/repairsDetail', query: {logId: repairlog.log_id}}">
            <div class="devDetailJL_left fl">
              <p><span class="lon_mr10">{{repairlog.device_type}}</span><span class="lon_mr10">{{repairlog.device_id}}</span><span>报修</span></p>
              <p>{{repairlog.repair_time}}</p>
            </div>
            <div class="devDetailJL_right fl">
              <span>{{repairlog.log_status === 1? '已完成' : '处理中'}}</span>
              <i class="fa fa-angle-right"></i>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    created() {
      this.getRepairList();
    },
    data() {
      return {
        activeName: 'first',
        repairlogList: [],
        formLabelAlign: {
          code: 'k123123',
          type: "UPS",
          maker: "UPS制造",
          number: "3345465456523",
          addr: "科园南二路2号"
        },
        tableData: [{
          code: '1',
          name: '输入电压',
          value: '227.70V'
        }, {
          code: '2',
          name: '输出电压',
          value: '0V'
        }]

      }
    },
    methods: {
      getRepairList() {
        this.$api.get('/user/repairmanRepairLog', {}, response => {
          this.repairlogList = response.repairlogList;
        })
      }
    }
  }
</script>
