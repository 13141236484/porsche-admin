<template>
<div >
  <div class="bg-img">
    <img :src="require('./img/bg.jpg')" alt="">
  </div>
  <div class="login">
    <div class="login-container">
      <el-row class="line-height">
        <el-col :span="4" style="color:white;font-Weight:bold">
          账号
        </el-col>
        <el-col :span="20">
          <el-input placeholder="请输入用户名" v-model="account" class="account">
          </el-input>
        </el-col>
      </el-row>
      <el-row class="line-height margin-top">
        <el-col :span="4" style="color:white;font-Weight:bold">
          密码
        </el-col>
        <el-col :span="20">
          <el-input placeholder="请输入密码" type="password" v-model="password" class="password">
          </el-input>
        </el-col>
      </el-row>
      <el-row class="line-height margin-top">

        <el-col :span="20" :offset="4" class="login-btn">
          <el-button type="success" class="btn" @click="checkLoin">登录</el-button>
        </el-col>
      </el-row>
      <el-row class="line-height margin-top" v-if="showAlert">
        <el-col :span="20" :offset="4">
          <el-alert :title="text" :type="status==='wrong'?'error':'success'">
          </el-alert>
        </el-col>
      </el-row>
    </div>
  </div>
</div>
</template>
<script>
import {
  post
} from '../../common/post';
import {PORSCHE_API_TOKEN,PORSCHE_USER_NAME} from '../../common/LocalstorageKey';
import LocalStore from '../../common/localStore';

export default {
  name: "",
  data: () => ({
    showAlert:false,
    status: "wrong",
    text: "",
    account:"",
    password:""
  }),
  methods:{
    checkLoin(){
      if(this.account==="" || this.password===""){
        this.showAlert=true;
        this.status = 'wrong';
        this.text = "用户名密码不能为空";
        return;
      }else{
        let result = post('/manager/signin',{
          account:this.account,
          password:this.password
        });
        result.then((res) => {
          console.log(res);
          this.showAlert=true;
          if (res.data.code === '1002') {
            this.status = 'wrong';
            this.text = "账号或密码错误，请重试";
          } else if(res.data.code ==='1005'){
            this.status = 'wrong';
            this.text = "该账户不存在";
          } else if(res.data.code ==='1008'){
            this.status = 'wrong';
            this.text = "密码错误";
          }else if(res.data.code ==='1001'){
            this.status = 'success';
            this.text = "验证成功，欢迎登陆";
            //保存token到local
            LocalStore.setItem(PORSCHE_API_TOKEN,res.data.data.token);
            LocalStore.setItem(PORSCHE_USER_NAME,this.account);
            setTimeout(()=>{
              this.$emit('login-success')
            },1000)
          }else{
            this.status = 'wrong';
            this.text = "登录失败，请重试";
          }
        })
      }


    }
  }
}
</script>
<style lang="" scoped>
.login {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-container {
  width: 400px;
  height: 300px;
  border-radius: 10px;
}

.line-height {
  height: 40px;
  line-height: 40px;
}

.login-btn {
  text-align: center;
}

.btn {
  width: 100%
}

.margin-top {
  margin-top: 20px;
}
.bg-img{
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
.bg-img img{
  width: 100%;
  height: 100%;
  object-fit:cover;
}
</style>
