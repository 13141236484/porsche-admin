<template>
<div>
   <div class="mianbao">
    审核管理/极致驾客/评论列表
  </div>
  <el-row class="register-content-sheader">
    <el-col :span="3">标题</el-col>
    <el-col :span="3">评论内容</el-col>
    <el-col :span="4">评论图片</el-col>
    <el-col :span="2">评论人</el-col>
    <el-col :span="4">管理员回复</el-col>
    <el-col :span="2">创建时间</el-col>
    <el-col :span="6">操作</el-col>
  </el-row>
  <el-row class="register-content-row" v-for="(item,index) in tableData" :key="item.id">
    <el-col :span="3">{{item.title?item.title:'-'}}</el-col>
    <el-col :span="3">{{item.content?item.content:'-'}}</el-col>
    <el-col :span="4"><img class="picture" :src="item.picture_path?host+item.picture_path:'-'" alt=""></el-col>
    <el-col :span="2">{{item.nickname?item.nickname:'-'}}</el-col>
    <el-col :span="4">{{item.manager_reply?item.manager_reply:'-'}}</el-col>
    <el-col :span="2">{{item.created_time?item.created_time:'-'}}</el-col>
    <el-col :span="6">
      <el-button size="small" @click="stayAtTop(index, item)">置顶/取消</el-button>
      <el-button size="small" @click="reply(index,item)">回复</el-button>
      <el-button size="small" @click="deleteComment(index, item)">删除</el-button>
      <el-button size="small" @click="deleteReply(index, item)">删除回复</el-button>
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
      article_id: "",
      to_comment_id: "",
      comment_id: "",
      type: "",
      offset: 0,
      count: 20,
      total: 100,
      currentPage: 1,
      tableData: [],
      host: ""
    };
  },
  mounted() {
    //do something after mounting vue instance
    this.host = PORSCHE_HOST;
    console.log(111, this.$route.query);
  },
  created: function() {
    let _this = this;
    _this.article_id = _this.$route.query.article_id;
    _this.handleCurrentChange(1);
  },
  methods: {
    handleCurrentChange(val) {
      var _this = this;
      _this.offset = (parseInt(val) - 1) * _this.count;
      console.log(`当前页: ${val}`);
      let result = post("/manager/review/driver/comment/list", {
        article_id: _this.article_id,
        offset: _this.offset,
        count: _this.count
      });
      result.then(res => {
        console.log(111, res.data);
        let rows = res.data.data.rows;
        for (let i = 0; i < rows.length; i++) {
          rows[i].created_time = timestampToDate(rows[i].created_time);
        }
        _this.tableData = rows;
        _this.total = res.data.data.count;
      });
    },
    reply(index, row) {
      console.log(row);
      var _this = this;
      _this.to_comment_id = row.uuid;
      _this.type = row.type;
      _this
        .$prompt("回复评论", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
          // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          // inputErrorMessage: "邮箱格式不正确"
        })
        .then(({ value }) => {
          let result = post("/manager/review/driver/comment/reply", {
            article_id: _this.article_id,
            to_comment_id: _this.to_comment_id,
            content: value,
            type: _this.type
          });
          result.then(function(res) {
            if (res.data.code === "1001") {
              _this.$message({
                type: "success",
                message: "回复成功"
              });
              _this.handleCurrentChange(1);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
      stayAtTop(index, row) {
          var _this = this;
          let result = post("/manager/review/driver/comment/top", {
              uuid: row.uuid,
              type:row.type,

          });
          result.then(function(res) {
              console.log(res.data);
              if (res.data.code === "1001") {
                  _this.$message({
                      message: res.data.message,
                      type: "success"
                  });
                  _this.handleCurrentChange(1);
              } else {
                  this.$message.error(res.data.message);
              }
          });
      },
    deleteComment(index, row) {
      console.log(2222, row);
      var _this = this;
      _this.comment_id = row.uuid;
      let result = post("/manager/review/driver/comment/delete", {
        comment_id: _this.comment_id
      });
      result.then(function(res) {
        if (res.data.code === "1001") {
          _this.$message({
            type: "success",
            message: "删除评论成功"
          });
          _this.handleCurrentChange(1);
        }
      });
    },
    deleteReply(index, row) {
      console.log(1111, row);
      var _this = this;
      _this.to_comment_id = row.uuid;
      let result = post("/manager/review/driver/comment/reply/delete", {
        to_comment_id: _this.to_comment_id
      });
      result.then(function(res) {
        if (res.data.code === "1001") {
          _this.$message({
            type: "success",
            message: "删除回复评论成功"
          });
          _this.handleCurrentChange(1);
        }
      });
    }
  }
};
</script>

<style scoped="">
.register-content-row {
  min-height: 100px;
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

.picture {
  width: 50px;
  height: 40px;
}
</style>
