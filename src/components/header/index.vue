<template>
<div class="header">
  <img :src="require('./image/logo.png')" class="logo">
  <div class="collapse-btn" @click="changeCollapse">
    <i v-if="collapse" class="iconfont icon-collapse-"></i>
    <i else="collapse" class="iconfont icon-collapse-1"></i>
  </div>
  <div class="login">
    <span class="admin">
      <i class="iconfont icon-ic_alluser"></i>{{account}}
    </span>
    <span class="logout" @click="logout">
      <i class="iconfont icon-zhuxiao" ></i>注销
    </span>
  </div>
</div>
</template>
<script>
import {PORSCHE_API_TOKEN,PORSCHE_USER_NAME} from '../../common/LocalstorageKey';
import LocalStore from '../../common/localStore';
export default {
  name: "",
  data: () => ({
    collapse: false,
    account:"111"
  }),
  methods: {
    changeCollapse() {
      this.collapse = !this.collapse;
      this.$emit('change-collapse', this.collapse)
    },
    logout(){
      LocalStore.setItem(PORSCHE_API_TOKEN,"");
      LocalStore.setItem(PORSCHE_USER_NAME,"");
      setTimeout(()=>{
        this.$emit("logout")
      },200)
    }
  },
  mounted() {
    //do something after mounting vue instance
    let username = LocalStore.getItem(PORSCHE_USER_NAME);
    this.account = username
  }
}
</script>
<style  scoped>
.header {
  width: 100%;
  height: 100%;
}

.logo {
  height: 100%;
  position: relative;
  margin-left: 0;
  float: left
}

.collapse-btn {
  position: absolute;
  left: 0;
  top: 0;
  width: 60px;
  height: 60px;
  line-height: 60px;
  color: white;
  cursor: pointer;
}

.collapse-btn:hover {
  color: #aaa;
}

.collapse-btn i {
  font-size: 25px;
}

.login {
  position: absolute;
  width: 200px;
  height: 60px;
  line-height: 60px;
  right: 0;
  color: white;
}
.admin{
  font-weight: bold;
}

.admin:hover,.logout:hover{
  color: #aaa;
  cursor: pointer;
}
.logout{
  margin-left: 20px;
  font-weight: bold;
}
</style>
