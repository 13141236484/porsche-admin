<template>
<div>
  <div class="mianbao">
    用户管理/全部用户
  </div>
  <el-row style="text-align:left" class="input-container">
    <el-col :span="6">
      <el-input v-model="tel" placeholder="输入手机号搜索" style="width:100%"></el-input>
    </el-col>
    <el-col :span="6">
      <el-button type="primary" icon="search" @click="search()">搜索</el-button>
      <el-button type="primary" icon="search" @click="exportExcel()">导出</el-button>
    </el-col>
  </el-row>
  <el-row class="register-content-header">
    <el-col :span="6">姓名</el-col>
    <el-col :span="6">手机</el-col>
    <el-col :span="6">来源</el-col>
    <el-col :span="6">是否注册</el-col>
  </el-row>
  <el-row class="register-content-row" v-for="item in tableData" :key="item.id">
    <el-col :span="6">{{item.username?item.username:'-'}}</el-col>
    <el-col :span="6">{{item.tel?item.tel:'-'}}</el-col>
    <el-col :span="6">{{item.referral?item.referral:'-'}}</el-col>
    <el-col :span="6">{{item.status?item.status:'-'}}</el-col>
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
export default {
  data() {
    return {
      tel: "",
      offset: 0,
      count: 10,
      total: 100,
      currentPage: 1,
      tableData: [],
      host: ""
    };
  },
  mounted() {
    //do something after mounting vue instance
    this.host = PORSCHE_HOST;
  },
  created: function() {
    this.handleCurrentChange(1);

  },
  methods: {
    handleCurrentChange(val) {
      var _this = this;
        _this.currentPage = val;
      _this.offset = (parseInt(val) - 1) * _this.count;
      console.log(`当前页: ${val}`);
      let result = post("/manager/user/inviteduser/list", {
        tel: _this.tel,
        offset: _this.offset,
        count: _this.count
      });
      result.then(res => {
        console.log(res.data.data);
        let rows = res.data.data.rows;
        for (let i = 0; i < rows.length; i++) {
          if (rows[i].status === "REGISTERED") rows[i].status = "是";
          else if (rows[i].status === "UNREGISTERED") rows[i].status = "否";
        }
        _this.tableData = rows;
        _this.total = res.data.data.count;
      });
    },
    search() {
      this.handleCurrentChange(1);
    },
    exportExcel() {
      window.location.href = PORSCHE_HOST + "/user/all/list/export";
    }
  }
};
</script>

<style scoped="">
.register-content-row {
  height: 100px;
  line-height: 100px;
  border-bottom: 1px solid #ccc;
  font-size: 14px;
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
