<template>
<div class="hello">
  <div class="hello" v-if="isLogin">
    <el-container>
      <el-header>
        <h-header @change-collapse="changeCollapse" @logout="logout"></h-header>
      </el-header>
      <el-container>
        <el-aside>
          <n-nav :collapse="collapse"></n-nav>
        </el-aside>
        <el-main>
          <c-content>

          </c-content>
        </el-main>
      </el-container>
    </el-container>
  </div>
  <div class="login-page" v-else>
    <login-page @login-success="loginSuccess"></login-page>
  </div>
</div>
</template>
<script>
import HHeader from '../components/header/index.vue';
import CContent from '../components/content/index';
import NNav from '../components/nav/index';
import FFooter from '../components/footer/index';
import LoginPage from './LoginPage/index.vue';
import {
  post
} from '../common/post';
export default {
  name: 'HelloWorld',
  components: {
    HHeader,
    NNav,
    CContent,
    FFooter,
    LoginPage
  },
  data() {
    return {
      collapse: false,
      isLogin:false
    }
  },
  methods: {
    changeCollapse(collapse) {
      this.collapse = collapse;
    },
    loginSuccess(){
      this.isLogin=true;
    },
    logout(){
      this.isLogin=false;
    }
  },
  mounted() {
    //检查登录状态
    let result = post('/manager/token');
    result.then((res) => {
      if (res.data.code === '1004') {
        this.isLogin = false
      } else {
        this.isLogin=true
      }
    })
  }
}
</script>
<style >
.hello {
  width: 100%;
  min-height: 100%;
}

.el-header {
  padding: 0;
  background: rgb(55, 55, 55)
}

.el-aside {
  width: auto !important;
}

.el-aside {
  overflow: visible;
  min-height: 900px;
  background-color: #404040;
}

.el-menu {
  border-right: 1px solid #404040;
}
.login-page{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  background: white;
  color: black;
}
.img-upload-row .el-upload__input{
  opacity: 0 !important;
  position: absolute;
}

.mianbao{
  position: relative;
  text-align: left;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid #eee;
  text-indent: 10px;
  margin-bottom: 10px;
  padding-bottom: 5px;
}
</style>
