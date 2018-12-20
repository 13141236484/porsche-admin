<template>
<div>
  <div class="mianbao">
    审核管理/审核列表
  </div>
  <el-row class="register-content-header">
    <el-col :span="2">活动大类</el-col>
    <el-col :span="2">活动小类</el-col>
    <el-col :span="5">标题</el-col>
    <el-col :span="2">浏览人数</el-col>
    <el-col :span="5">创建时间</el-col>
     <el-col :span="2">状态</el-col>
    <el-col :span="6">操作</el-col>
  </el-row>
  <el-row class="register-content-row" v-for="(item,index) in tableData" :key="item.id">
    <el-col :span="2">{{item.first_type?item.first_type:'-'}}</el-col>
    <el-col :span="2">{{item.second_type?item.second_type:'-'}}</el-col>
    <el-col :span="5">{{item.title?item.title:'-'}}</el-col>
    <el-col :span="2">{{item.visit_count?item.visit_count:'-'}}</el-col>
    <el-col :span="5">{{item.created_time?item.created_time:'-'}}</el-col>
    <el-col :span="2">{{item.status?item.status:'-'}}</el-col>
    <el-col :span="6">
      <el-button size="small" @click="articlePass(index, item)">通过</el-button>
      <!-- <el-button size="small" @click="articleCommentList(index, item)">评论</el-button> -->
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
    let _this = this;
    _this.handleCurrentChange(1);
  },
  methods: {
    handleCurrentChange(val) {
      var _this = this;
      _this.offset = (parseInt(val) - 1) * _this.count;
      console.log(`当前页: ${val}`);
      let result = post("/manager/review/article/list", {
        offset: _this.offset,
        count: _this.count
      });
      result.then(res => {
        console.log(res.data);
        let rows = res.data.data.rows;
        console.log(111,rows);
        for (let i = 0; i < rows.length; i++) {
          rows[i].created_time = timestampToDate(rows[i].created_time);
          rows[i].start_time = timestampToDate(rows[i].start_time);
          rows[i].end_time = timestampToDate(rows[i].end_time);
          console.log(222,rows[i].title,rows[i].title.length);
        }

        _this.tableData = rows;
        _this.total = res.data.data.count;
      });
    },
    articlePass(index, row) {
      console.log(222, row);
      var _this = this;
      let result = post("/manager/review/article", {
        article_id: row.uuid
      });
      result.then(function(res) {
        if (res.data.code === "1001") {
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
    }
    // articleCommentList(index, row) {
    //   this.$router.push({
    //     path: "/activity/comment/list",
    //     query: {
    //       article_id: row.uuid
    //     }
    //   });
    // }
  }
};
</script>

<style scoped="">
.register-content-row {
  height: 100px;
  border-bottom: 1px solid #ccc;
  font-size: 14px;
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
