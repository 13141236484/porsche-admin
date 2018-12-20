<template>
  <div>
    <div class="mianbao">
      用户管理/邀请用户
    </div>
       <el-row class="row-box">
         <el-col :span="10">
           <el-form ref="user" :model="user" label-width="50px" width="400">
              <el-form-item label="姓名" prop="username">
                 <el-input v-model="user.username"></el-input>
              </el-form-item>
              <el-form-item label="手机" prop="tel">
                 <el-input v-model="user.tel"></el-input>
              </el-form-item>
               <el-form-item label="来源" prop="referral">
                 <el-input v-model="user.referral"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="submit" type="primary" @click="add()">提交</el-button>
              </el-form-item>
           </el-form>
         </el-col>
         <el-col :span="10" :offset="2" class="excel-upload-box">
           <i class="iconfont icon-excel"></i>
           <input type="file"  accept=".xls,.xlsx"  class="excel-file-input" @change="uploadExcel">
         </el-col>
       </el-row>
  </div>
</template>
<script>
import { PORSCHE_API_TOKEN } from "../../common/LocalstorageKey";
import LocalStore from "../../common/localStore";
import { post } from "../../common/post";
import { PORSCHE_HOST } from "../../common/host";
export default {
  data() {
    return {
      user: {
        username: "",
        tel: "",
        referral: ""
      }
    };
  },
  methods: {
    add() {
      let _this = this;
      let result = post("/manager/user/invited/add", {
        username: _this.user.username,
        tel: _this.user.tel,
        referral: _this.user.referral
      });
      result.then(res => {
        var _this = this;
        if (res.data.code === "1001") {
          _this.user.username = "";
          _this.user.tel = "";
          _this.user.referral = "";
          _this.$message({
            message: res.data.message,
            type: "success"
          });
        } else if (res.data.code === "1003") {
          _this.$message({
            message: res.data.message,
            type: "warning"
          });
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    uploadExcel(e) {
      self = this;
      let file = e.target.files[0];
      let formData = new FormData();
      formData.append("file", file);
      let result = self.axios({
        method: "post",
        url: PORSCHE_HOST + "/manager/user/invited/exceladd",
        data: formData,
        contentType: false,
        processData: false,
        headers: {
          AccessToken: LocalStore.getItem(PORSCHE_API_TOKEN)
        }
      });
      result.then(function(res) {
        console.log(res);
        if (res.data.code === "1001") {
          self.$message({
            message: res.data.message,
            type: "success"
          });
        } else {
          self.$message.error(res.data.message);
        }
      });
    }
  }
};
</script>
<style scoped>
.row-box {
  position: relative;
}
.excel-upload-box {
  position: relative;
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #eee;
}
.excel-upload-box:hover {
  background: #ddd;
  cursor: pointer;
}

.icon-excel {
  font-size: 100px;
}

.excel-file-input {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
}
</style>
