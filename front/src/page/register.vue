<template>
    <div>
        <div class="lon_top">
            <router-link to="/login" class="left"><img src="static/images/left.png"></router-link>
            <span>账号注册</span>
            <router-link to="" class="cha"><img src="static/images/cha.png"></router-link>
        </div>
        <div class="content loginInfo">
            <h2>账号注册</h2>
            <ul>
                <li><input type="text" placeholder="手机号" v-model="registerInfo.phoneNum"></li>
                <li><input type="password" placeholder="密码" v-model="registerInfo.password"></li>
                <li><input type="text" placeholder="姓名" v-model="registerInfo.name"></li>
                <li><input type="text" placeholder="单位信息" v-model="registerInfo.unitInfo"></li>
                <li><input type="text" placeholder="联系地址" v-model="registerInfo.workAddress"></li>
                <li><input type="text" placeholder="工号" v-model="registerInfo.staffId"></li>
            </ul>
            <div class="loginInfo_bottom">
                <router-link to="" class="register">注册</router-link>
                <span>已查看并同意注册条款</span>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    created() {

    },
    data() {

      return {
        registerInfo: {
          phoneNum: "",
          password: "",
          name: "",
          unitInfo: "",
          workAddress: "",
          staffId: "",
        }
      }
    },
    methods: {}
  }
</script>