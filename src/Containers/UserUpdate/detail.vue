<template>
  <div class="box">
    <el-row>
      <el-button size="medium" @click="linkTo">返回</el-button>
    </el-row>
    <el-row>
      <el-col :span="12"><div >昵称</div></el-col>
      <el-col :span="12"><div >{{origin.name||origin.nickname}}->{{updated.name||updated.nickname}}</div></el-col>
   </el-row>
   <el-row>
      <el-col :span="12"><div >姓名</div></el-col>
    <el-col :span="12"><div >{{origin.surname+origin.firstname||origin.username}}->{{updated.surname+updated.firstname||updated.username}}</div></el-col>
   </el-row>
    <el-row>
      <el-col :span="12"><div >性别</div></el-col>
      <el-col :span="12"><div >{{origin.gender}}->{{updated.gender}}</div></el-col>
   </el-row>
    <el-row>
      <el-col :span="12"><div >地址</div></el-col>
      <el-col :span="12"><div >{{origin.address}}->{{updated.address}}</div></el-col>
   </el-row>
    <el-row>
      <el-col :span="12"><div >邮箱</div></el-col>
      <el-col :span="12"><div >{{origin.email}}->{{updated.email}}</div></el-col>
   </el-row>
    <el-row>
      <el-col :span="12"><div >手机</div></el-col>
      <el-col :span="12"><div >{{origin.tel}}->{{updated.tel}}</div></el-col>
   </el-row>
    <el-row>
      <el-col :span="12"><div >城市</div></el-col>
      <el-col :span="12"><div >{{origin.province+'/'+origin.city+'/'+origin.district}}->{{updated.province+'/'+updated.city+'/'+updated.district}}</div></el-col>
   </el-row>
    <el-row>
      <el-col :span="12"><div >是否愿意买车</div></el-col>
      <el-col :span="12"><div >{{origin.purchaseWilling||origin.purchase_willing}}->{{updated.purchaseWilling||updated.purchase_willing}}</div></el-col>
   </el-row>
    <el-row>
      <el-col :span="12"><div >意向购买车型</div></el-col>
      <el-col :span="12"><div >{{origin.car||origin.car_name}}->{{updated.car||updated.car_name}}</div></el-col>
   </el-row>
    <el-row>
      <el-col :span="12"><div >是否有车</div></el-col>
      <el-col :span="12"><div >{{origin.have_car}}->{{updated.have_car}}</div></el-col>
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
     origin:"",
     updated:""
    };
  },
  mounted() {
    //do something after mounting vue instance
    this.host = PORSCHE_HOST;
  },
  methods: {
    linkTo() {
      this.$router.push({
        path: "/user/update/list"
      })
    }
  },

  created: function() {
    let _this = this;
    let id = _this.$route.query.id;
    console.log(111, id);
    let result = post("/manager/user/update/detail", {
      id: id
    });
    result.then(res => {
      console.log(res.data);
      let origin_data = JSON.parse(res.data.data.origin_data);
      let updated_data = JSON.parse(res.data.data.updated_data);
      console.log(origin_data);
      _this.origin = origin_data;
      console.log(4444, _this.origin)
      _this.updated = updated_data;
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
