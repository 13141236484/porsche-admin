<template>
<div>
  <el-row style="text-align:left" class="input-container">
    <el-col :span="6">
      <el-date-picker style="width:100%" v-model="start_time" type="datetime" placeholder="用户反馈开始时间">
      </el-date-picker>
    </el-col>
    <el-col :span="6">
      <el-date-picker style="width:100%" v-model="end_time" type="datetime" placeholder="用户反馈结束时间">
      </el-date-picker>
    </el-col>
    <el-col :span="6">
      <el-button type="primary" icon="search" @click="search()">搜索</el-button>
    </el-col>
  </el-row>
  <el-row class="register-content-header">
    <el-col :span="6">反馈者</el-col>
    <el-col :span="6">内容</el-col>
    <el-col :span="6">反馈时间</el-col>
    <el-col :span="6">操作</el-col>
  </el-row>

  <el-row class="register-content-row" v-for="(item,index) in tableData" :key="item.id">
    <el-col :span="6">{{item.nickname?item.nickname:'-'}}</el-col>
    <el-col :span="6">{{item.content?item.content:'-'}}</el-col>
    <el-col :span="6">{{item.created_time?item.created_time:'-'}}</el-col>
    <el-col :span="6">
      <el-button size="small" @click="replyMsg(index, item)">回复消息</el-button>
      <el-button size="small" @click="userInfo(index, item)">用户信息</el-button>
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
      start_time: "",
      end_time: "",
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
    this.handleCurrentChange(1);
  },
  methods: {
    handleCurrentChange(val) {
      var _this = this;
        _this.currentPage = val;
      _this.offset = (parseInt(val) - 1) * _this.count;
      console.log(`当前页: ${val}`);
      let result = post("/manager/notification/feedback/list", {
        start_time: _this.start_time
          ? new Date(_this.start_time).getTime().toString()
          : "",
        end_time: _this.end_time
          ? new Date(_this.end_time).getTime().toString()
          : "",
        offset: _this.offset,
        count: _this.count
      });
      result.then(res => {
        console.log(1111, res.data.data);
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
        path: "/notification/feedback/user/detail",
        query: {
          member_id: row.member_id
        }
      });
    },
    replyMsg(index, row) {
      console.log(3333,row);
      this.$router.push({
        path: "/notification/feedback/reply",
        query: {
          member_id: row.member_id,
          username:row.nickname
        }
      });
    },
    search() {
      this.handleCurrentChange(1);
    }
  }
};
</script>

<style scoped="">
.register-content-row {
  height: 100px;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
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
