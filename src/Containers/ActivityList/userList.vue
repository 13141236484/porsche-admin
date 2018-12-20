<template>
<div>
   <el-row style="text-align:left" class="input-container">
    <el-col :span="6">
      <el-input v-model="nickname" placeholder="输入昵称搜索" style="width:100%"></el-input>
    </el-col>
    <el-col :span="6">
      <el-input v-model="tel" placeholder="输入手机号搜索" style="width:100%"></el-input>
    </el-col>
    <el-col :span="6">
      <el-button type="primary" icon="search" @click="search()">搜索</el-button>
      <el-button type="primary" icon="search" @click="exportExcel()">导出参与人员</el-button>
    </el-col>
  </el-row>
  <el-row class="register-content-header">
    <el-col :span="6">姓名</el-col>
    <el-col :span="6">手机</el-col>
    <el-col :span="6">加入时间</el-col>
    <el-col :span="6">操作</el-col>
  </el-row>

  <el-row class="register-content-row" v-for="(item,index) in tableData" :key="item.id">
    <el-col :span="6">{{item.nickname?item.nickname:'-'}}</el-col>
    <el-col :span="6">{{item.tel?item.tel:'-'}}</el-col>
    <el-col :span="6">{{item.created_time}}</el-col>
    <el-col :span="6">
      <el-button size="small" @click="notificationPush(index, item)">推送消息</el-button>
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
      article_id: "",
      offset: 0,
      count: 5,
      total: 100,
      currentPage: 1,
      tableData: [],
      host: "",
      article_id: ""
    };
  },
  mounted() {
    //do something after mounting vue instance
    this.host = PORSCHE_HOST;
  },
  created: function() {
    var _this = this;
    _this.article_id = _this.$route.query.article_id;
    _this.handleCurrentChange(1);
  },
  methods: {
    handleCurrentChange(val) {
      var _this = this;

      _this.offset = (parseInt(val) - 1) * _this.count;
      console.log(`当前页: ${val}`);
      let result = post("/manager/activity/user/list", {
        article_id: _this.article_id,
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
    notificationPush(index, row) {
      this.$router.push({
        path: "/activity/notification/push",
        query: {
          member_id: row.member_id
        }
      });
    },
    search() {
      var _this = this;
      _this.handleCurrentChange(1);
    },
    exportExcel() {
      let _this = this;
      let article_id = _this.article_id;
      let str = "?1=1&article_id=" + article_id;
      window.location.href = PORSCHE_HOST + "/activity/user/export" + str;
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
