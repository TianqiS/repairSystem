<template>
    <div>
        <div :class="computeTop(deviceInfo.status)">
            <div class="devDetail_topbox">
                <i class="el-icon-circle-check-outline"></i><span class="lon_ml20">{{deviceInfo.status === 1? '设备良好' : '设备故障'}}</span>
            </div>
            <div class="devDetail_topinfo">信息更新：{{deviceInfo.update_time}}</div>
        </div>
        <el-tabs v-model="activeName" class="devDetail">
            <el-tab-pane label="基础信息" name="first">
                <div class="content">
                    <el-form label-width="90px" :model="deviceInfo">
                        <el-form-item label="设备编号：">
                            <el-input readonly="true" v-model="deviceInfo.id"></el-input>
                        </el-form-item>
                        <el-form-item label="设备类型：">
                            <el-input readonly="true" v-model="deviceInfo.device_type"></el-input>
                        </el-form-item>
                        <el-form-item label="制造商：">
                            <el-input readonly="true" v-model="deviceInfo.producer"></el-input>
                        </el-form-item>
                        <el-form-item label="序列号：">
                            <el-input readonly="true" v-model="deviceInfo.serial_number"></el-input>
                        </el-form-item>
                        <el-form-item label="安装地址：">
                            <el-input readonly="true" v-model="deviceInfo.location"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </el-tab-pane>
            <el-tab-pane label="实时数据" name="second">
                <div class="content">
                    <el-table
                            :data="tableData"
                            style="width: 100%">
                        <el-table-column
                                prop="code"
                                label="#"
                                width="80">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="数据名称">
                        </el-table-column>
                        <el-table-column
                                prop="value"
                                label="数据值">
                        </el-table-column>
                    </el-table>
                </div>
            </el-tab-pane>
            <el-tab-pane label="报修记录" name="third">
                <div class="content devDetailJL">
                    <ul>
                        <li v-for="deviceLog in repairLogs">
                            <router-link :to="{path: '/repairsDetail', query: {logId: deviceLog.id}}">
                                <div class="devDetailJL_left fl">
                                    <p><span class="lon_mr10">{{deviceLog.device_type}}</span><span
                                            class="lon_mr10">{{deviceLog.deviceId}}</span><span>报修</span></p>
                                    <p>{{deviceLog.repairTime}}</p>
                                </div>
                                <div class="devDetailJL_right fl">
                                    <span>{{deviceLog.log_status === 1? '已完成' : '处理中'}}</span>
                                    <i class="fa fa-angle-right"></i>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
  export default {
    created() {
      this.getSpecialDeviceInfo();
    },
    computed: {
      computeTop() {
        return function (status) {
          return status === 1 ? 'devDetail_top' : 'devDetail_top_error';
        }
      }
    },
    data() {

      return {
        activeName: 'first',
        deviceInfo: {
          id: "",
          device_type: "",
          useUnit: "",
          producer: "",
          serial_number: "",
          location: "",
          status: "",
          update_time: "",
        },
        repairLogs: [],
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
      getSpecialDeviceInfo() {
        const deviceId = this.$route.query.deviceId;
        this.$api.get('/user/specialDevice', { deviceId }, data => {
          this.deviceInfo = data.deviceInfo;
        })
        this.$api.get('/user/deviceRepairLog', { deviceId }, data => {
          this.repairLogs = data.repairLogs;
        })
      }
    }
  }
</script>