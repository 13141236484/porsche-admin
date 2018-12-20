<template>
  <div class="box">
    <el-row>
      <el-button size="medium" @click="linkTo">返回</el-button>
    </el-row>
    <el-row class="avatar">
      <img :src="avatar" alt="">
   </el-row>
    <el-row>
      <el-col :span="12"><div >昵称</div></el-col>
      <el-col :span="12"><div >{{nickname}}</div></el-col>
   </el-row>
   <el-row>
      <el-col :span="12"><div >姓名</div></el-col>
    <el-col :span="12"><div >{{username}}</div></el-col>
   </el-row>
    <el-row>
      <el-col :span="12"><div >性别</div></el-col>
      <el-col :span="12"><div >{{gender}}</div></el-col>
   </el-row>
    <el-row>
      <el-col :span="12"><div >地址</div></el-col>
      <el-col :span="12"><div >{{address}}</div></el-col>
   </el-row>
    <el-row>
      <el-col :span="12"><div >邮箱</div></el-col>
      <el-col :span="12"><div >{{email}}</div></el-col>
   </el-row>
    <el-row>
      <el-col :span="12"><div >手机</div></el-col>
      <el-col :span="12"><div >{{tel}}</div></el-col>
   </el-row>
    <el-row>
      <el-col :span="12"><div >城市</div></el-col>
      <el-col :span="12"><div >{{city}}</div></el-col>
   </el-row>
    <el-row>
      <el-col :span="12"><div >是否愿意买车</div></el-col>
      <el-col :span="12"><div >{{purchase_willing}}</div></el-col>
   </el-row>
    <el-row>
      <el-col :span="12"><div >意向购买车型</div></el-col>
      <el-col :span="12"><div >{{car_name}}</div></el-col>
   </el-row>
    <el-row>
      <el-col :span="12"><div >是否有车</div></el-col>
      <el-col :span="12"><div >{{have_car}}</div></el-col>
   </el-row>
    <el-row>
      <el-col :span="12"><div >来源</div></el-col>
      <el-col :span="12"><div >{{referral}}</div></el-col>
   </el-row>
    <el-row>
      <el-col :span="12"><div >注册时间</div></el-col>
      <el-col :span="12"><div >{{created_time}}</div></el-col>
   </el-row>
  </div>
</template>
<style>
.box {
  border: 1px solid #ccc;
}
.box .el-row {
  border-bottom: 1px solid #ccc;
  text-align: left;
  font-size: 15px;
  height: 50px;
  line-height: 50px;
}
.box .el-col {
  text-indent: 20px;
}
</style>
  <script>
import { post } from "../../common/post";
import { PORSCHE_HOST } from "../../common/host";
import { timestampToDate } from "../../common/utils";
export default {
  data() {
    return {
      host: "",
      avatar: "",
      nickname: "",
      username: "",
      gender: "",
      tel: "",
      address: "",
      email: "",
      tel: "",
      city: "",
      purchase_willing: "",
      car_name: "",
      have_car: "",
      referral: "",
      created_time: ""
    };
  },
  mounted() {
    //do something after mounting vue instance
    this.host = PORSCHE_HOST;
  },
  methods: {
    linkTo() {
      this.$router.push({
        path: "/dealer/trail/drive/list"
      })
    }
  },

  created: function() {
    let _this = this;
    let member_id = _this.$route.query.member_id;
    console.log(111, member_id);
    let result = post("/manager/dealer/drive/user/detail", {
      member_id: member_id
    });
    result.then(res => {
      console.log(res.data);
      let data = res.data.data;
      _this.avatar = _this.host + data.avatar;
      _this.nickname = data.nickname;
      _this.username = data.username;
      _this.gender = data.gender;
      _this.tel = data.tel;
      _this.address =
        data.province + data.city + data.district + data.detail_address;
      _this.email = data.email;
      _this.tel = data.tel;
      _this.city = data.province + "/" + data.city + "/" + data.district;
      if (data.purchase_willing === "Y") _this.purchase_willing = "是";
      else if (data.purchase_willing === "N") _this.purchase_willing = "否";
      _this.car_name = data.car_name;
      if (data.have_car === "Y") _this.have_car = "是";
      else if (data.have_car === "N") _this.have_car = "否";
      _this.referral = data.referral;
      _this.created_time = timestampToDate(data.created_time);
    });
  }
};
</script>
<style scoped>
.avatar {
  width: 100%;
  height: 220px;
  padding: 10px;
}
.avatar img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
