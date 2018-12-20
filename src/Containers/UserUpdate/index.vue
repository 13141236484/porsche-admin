<template>
<div>
  <div class="mianbao">
    用户管理/更新信息记录
  </div>
  <el-row style="text-align:left" class="input-container">
    <el-col :span="6">
      <el-input v-model="nickname" placeholder="输入昵称搜索" style="width:100%"></el-input>
    </el-col>
    <el-col :span="6">
      <el-input v-model="tel" placeholder="输入手机号搜索" style="width:100%"></el-input>
    </el-col>
    <el-col :span="6">
      <el-button type="primary" icon="search" @click="search()">搜索</el-button>
    </el-col>
  </el-row>
  <el-row class="register-content-header">
    <el-col :span="4">用户名称</el-col>
    <el-col :span="10">用户ID</el-col>
    <el-col :span="4">手机号</el-col>
    <el-col :span="3">更新时间</el-col>
    <el-col :span="3">操作</el-col>
  </el-row>

  <el-row class="register-content-row" v-for="(item,index) in tableData" :key="item.id">
    <el-col :span="4">{{item.nickname?item.nickname:'-'}}</el-col>
    <el-col :span="10">{{item.member_id?item.member_id:'-'}}</el-col>
    <el-col :span="4">{{item.tel?item.tel:'-'}}</el-col>
    <el-col :span="3">{{item.created_time?item.created_time:'-'}}</el-col>
    <el-col :span="3">
      <el-button size="small" @click="userInfo(index, item)">详细</el-button>
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
      offset: 0,
      count: 5,
      total: 100,
      currentPage: 1,
      tableData: [],
      host: "",
      YN: [
        {
          value: "Y",
          label: "是"
        },
        {
          value: "N",
          label: "否"
        }
      ],
      value: "",
      value1: ""
    };
  },
  mounted() {
    //do something after mounting vue instance
    this.host = PORSCHE_HOST;
  },
  created: function() {
    let _this = this;
    _this.handleCurrentChange(1);
  },
  methods: {
    handleCurrentChange(val) {
      var _this = this;
        _this.currentPage = val;
      _this.offset = (parseInt(val) - 1) * _this.count;
      console.log(`当前页: ${val}`);
      let result = post("/manager/user/update/list", {
        nickname: _this.nickname,
        tel: _this.tel,
        offset: _this.offset,
        count: _this.count
      });
      result.then(res => {
        console.log(res.data);
        console.log(res.data.data);
        let rows = res.data.data.rows;
        for (let i = 0; i < rows.length; i++) {
          rows[i].created_time = timestampToDate(rows[i].created_time);
        }
        _this.tableData = rows;
        _this.total = res.data.data.count;
      });
    },
    userInfo(index, row) {
      this.$router.push({
        path: "/user/update/detail",
        query: {
          id: row.id
        }
      });
    },
    search() {
      var _this = this;
      _this.handleCurrentChange(1);
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
