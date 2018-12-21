<template>
    <div>
        <div class="lon_top">
            <router-link :to="{path: '/devDetail', query: {deviceId: logDetail.device_id}}" class="left"><img src="static/images/left.png"></router-link>
            <span>报修详情</span>
            <router-link to="" class="cha"><img src="static/images/cha.png"></router-link>
        </div>
        <div class="content lon_pt20">
            <el-form label-width="90px" :model="logDetail" class="repairsDetail devDetail">
                <el-form-item label="报修时间">
                    <el-input v-model="logDetail.repair_time"></el-input>
                </el-form-item>
                <el-form-item label="工单状态">
                    <el-input v-model="logDetail.log_status"></el-input>
                </el-form-item>
                <el-form-item label="维护工程师">
                    <el-input v-model="logDetail.repairman_name"></el-input>
                </el-form-item>
                <el-form-item label="处理时间">
                    <el-input v-model="logDetail.finish_time"></el-input>
                </el-form-item>
                <el-form-item label="故障描述">
                    <el-input type="textarea" v-model="logDetail.detail"></el-input>
                </el-form-item>
                <el-form-item label="故障图片">
                    <i class="el-icon-picture" style="font-size:90px;"></i>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
  export default {
    created() {
      this.getLogDetail();
    },
    data() {

      return {
        logId: '',
        logDetail: {
          repair_time: "",
          log_status: "",
          repairman_name: "",
          finish_time: "",
          detail: "",
          device_id: "",
        }
      }
    },
    methods: {
      getLogDetail: function () {
        const logId = this.$route.query.logId;
        this.logId = logId;
        this.$api.get('/user/specialRepairLog', {logId}, data => {
          const logDetail = data.logDetail;
          logDetail.log_status = logDetail.log_status === 1? '已完成' : '处理中';
          this.logDetail = logDetail;
        })
      }
    }
  }
</script>