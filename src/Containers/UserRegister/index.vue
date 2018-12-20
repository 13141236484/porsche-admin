<template>
<div>
  <div class="mianbao">
    用户管理/注册用户
  </div>
  <el-row style="text-align:left" class="input-container">
    <el-col :span="6">
      <el-input v-model="nickname" placeholder="输入昵称搜索" style="width:100%"></el-input>
    </el-col>
    <el-col :span="6">
      <el-input v-model="tel" placeholder="输入手机号搜索" style="width:100%"></el-input>
    </el-col>
    <el-col :span="6">
      <el-select v-model="complete" clearable placeholder="信息是否完整" style="width:100%">
        <el-option v-for="item in YN" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="6">
      <el-select v-model="car_id" clearable placeholder="选择车型" style="width:100%">
        <el-option v-for="item in car_type" :key="item.car_id" :label="item.car_name" :value="item.car_id">
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="6">
      <el-select v-model="purchase_willing" clearable placeholder="购车意愿" style="width:100%">
        <el-option v-for="item in YN" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="6">
      <el-date-picker style="width:100%" v-model="willing_change_start_time" type="datetime" placeholder="修改意向开始时间">
      </el-date-picker>
    </el-col>
    <el-col :span="6">
      <el-date-picker style="width:100%" v-model="willing_change_end_time" type="datetime" placeholder="修改意向结束时间">
      </el-date-picker>
    </el-col>
       <el-col :span="6">
      <el-select v-model="interest_id" clearable placeholder="选择爱好" style="width:100%">
        <el-option v-for="item in interest_type" :key="item.interest_id" :label="item.content" :value="item.interest_id">
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="6">
      <el-button type="primary" icon="search" @click="search()">搜索</el-button>
      <el-button type="primary" icon="search" @click="exportExcel()">导出</el-button>
    </el-col>



  </el-row>
  <el-row class="register-content-header">
    <el-col :span="2">头像</el-col>
    <el-col :span="2">昵称</el-col>
    <el-col :span="1">名</el-col>
    <el-col :span="1">姓</el-col>
    <el-col :span="1">性别</el-col>
    <el-col :span="2">手机</el-col>
    <el-col :span="2">城市</el-col>
    <el-col :span="2">来源</el-col>
    <el-col :span="2">注册时间</el-col>
    <el-col :span="2">登陆次数</el-col>
    <el-col :span="2">礼物</el-col>
    <el-col :span="5">操作</el-col>
  </el-row>

  <el-row class="register-content-row" v-for="(item,index) in tableData" :key="item.uuid">
    <el-col :span="2">
      <div class="avatar">
        <img :src="item.avatar?host+item.avatar:'-'" alt="">
      </div>
    </el-col>
    <el-col :span="2">{{item.nickname?item.nickname:'-'}}</el-col>
    <el-col :span="1">{{item.firstname?item.firstname:'-'}}</el-col>
    <el-col :span="1">{{item.surname?item.surname:'-'}}</el-col>
    <el-col :span="1">{{item.gender ==='MALE'?'男':'女'}}</el-col>
    <el-col :span="2">{{item.tel?item.tel:'-'}}</el-col>
    <el-col :span="2">{{item.city?item.city:'-'}}</el-col>
    <el-col :span="2">{{item.referral?item.referral:'-'}}</el-col>
    <el-col :span="2">{{item.created_time?item.created_time:'-'}}</el-col>
    <el-col :span="2">{{item.login_time?item.login_time:'-'}}</el-col>
    <el-col :span="2">{{item.is_received_present==='Y'?'已领':'未领'}}</el-col>
    <el-col :span="5">
      <el-button size="small" @click="userInfo(index, item)">用户信息</el-button>
      <el-button size="small" @click="notificationPush(index, item)">推送消息</el-button>
      <el-button v-if ="item.is_received_present =='N'" size="small" @click="present(index, item)">礼物领取</el-button>
    </el-col>
  </el-row>

  <div class="block">
    <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="count" layout="total, prev, pager, next" :total="total">
    </el-pagination>
  </div>
</div>
</template>

  <script>
import { post } from "../../common/post";
import { PORSCHE_HOST } from "../../common/host";
import { timestampToDate } from "../../common/utils";
export default {
  data() {
    return {
      nickname: "",
      tel: "",
      complete: "",
      purchase_willing: "",
      car_id: "",
      willing_change_start_time: "",
      willing_change_end_time: "",
      offset: 0,
      count: 10,
      total: 100,
      currentPage: 1,
      tableData: [],
      host: "",
      car_type: [],
      interest_id: "",
      interest_type: [],
      YN: [
        {
          value: "Y",
          label: "是"
        },
        {
          value: "N",
          label: "否"
        }
      ]
    };
  },
  mounted() {
    //do something after mounting vue instance
    this.host = PORSCHE_HOST;
  },
  created: function() {
    let _this = this;
    let userCar = post("/manager/user/car");
    userCar.then(function(res) {
      _this.car_type = res.data.data;
    });
    let userInterest = post("/manager/user/interest");
    userInterest.then(function(res) {
      _this.interest_type = res.data.data;
    });
    _this.handleCurrentChange(1);
  },
  methods: {
    handleCurrentChange(val) {
      console.log(444, this.interest_id);
      var _this = this;
        _this.currentPage = val;
      _this.offset = (parseInt(val) - 1) * _this.count;
      console.log(`当前页: ${val}`);
      console.log(111, _this.complete, _this.willing_change_start_time);
      let result = post("/manager/user/registeruser/list", {
        nickname: _this.nickname,
        tel: _this.tel,
        complete: _this.complete,
        purchase_willing: _this.purchase_willing,
        car_id: _this.car_id,
        interest_id: _this.interest_id,
        willing_change_start_time: _this.willing_change_start_time
          ? new Date(_this.willing_change_start_time).getTime().toString()
          : "",
        willing_change_end_time: _this.willing_change_end_time
          ? new Date(_this.willing_change_end_time).getTime().toString()
          : "",
        offset: _this.offset,
        count: _this.count
      });
      result.then(res => {
        console.log(res.data);
        console.log(res.data.data);
        let rows = res.data.data.rows;
        for (let i = 0; i < rows.length; i++) {
          rows[i].created_time = timestampToDate(rows[i].created_time);
          if (rows[i].gender === "male") rows[i].gender = "男";
          else if (rows[i].gender === "female") rows[i].gender = "女";
        }
        _this.tableData = rows;

        _this.total = res.data.data.count;
      });
    },
    userInfo(index, row) {
      this.$router.push({
        path: "/user/register/detail",
        query: {
          member_id: row.uuid
        }
      });
    },
    notificationPush(index, row) {
      this.$router.push({
        path: "/user/register/notification",
        query: {
          member_id: row.uuid,
          username: row.username
        }
      });
    },
    present(index, row) {
      console.log(111, row);
      let _this = this;
      let result = post("/manager/user/present", {
        member_id: row.uuid
      });
      result.then(function(res) {
        console.log(res.data);
        if (res.data.code === "1001") {
          _this.$message({
            message: res.data.message,
            type: "success"
          });
          _this.handleCurrentChange(1);
        }
      });
    },
    search() {
      var _this = this;
      _this.handleCurrentChange(1);
    },
    exportExcel() {
      let str = "?1=1";
      let _this = this;
      if (_this.nickname) str += "&nickname=" + _this.nickname;
      if (_this.tel) str += "&tel=" + _this.tel;
      if (_this.complete) str += "&complete=" + _this.complete;
      if (_this.purchase_willing)
        str += "&purchase_willing=" + _this.purchase_willing;
      if (_this.car_id) str += "&car_id=" + _this.car_id;
      if (_this.willing_change_start_time)
        str +=
          "&willing_change_start_time=" +
          new Date(_this.willing_change_start_time).getTime().toString();
      if (_this.willing_change_end_time)
        str +=
          "&willing_change_end_time=" +
          new Date(_this.willing_change_end_time).getTime().toString();
      if (_this.interest_id) str += "&interest_id=" + _this.interest_id;
      console.log(str)
      window.location.href = PORSCHE_HOST + "/user/list/export" + str;
    }
  }
};
</script>

<style scoped="">
.register-content-row {
  height: 100px;
  border-bottom: 1px solid #ccc;
  font-size: 14px;
}

.register-content-row .el-col {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.register-content-header {
  border-bottom: 1px solid #ccc;
  background-color: #eee;
  margin-top: 20px;
  height: 40px;
  line-height: 40px;
  font-weight: bold;
}

.input-container .el-col {
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 20px;
}

.block {
  margin-top: 20px;
}

.avatar {
  width: 60px;
  height: 60px;
  margin-left: 20px;
}
.avatar img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
  overflow: hidden;
  object-fit: cover;
}
</style>
