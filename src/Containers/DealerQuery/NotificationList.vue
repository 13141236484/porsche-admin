<template>
  <div>
    <el-row>
      给{{username}}推送消息
    </el-row>
    <el-row class="notification-content-header">
      <el-col :span="3">推送员</el-col>
      <el-col :span="15">内容</el-col>
      <el-col :span="2">是否已读</el-col>
      <el-col :span="4">推送时间</el-col>
 </el-row>
  <el-row class="notification-content" v-for="(item,index) in tableData" :key="item.id">
    <el-col :span="3">{{item.author?item.author:'-'}}</el-col>
    <el-col :span="15" v-html="item.content?item.content:'-'"></el-col>
    <el-col :span="2">{{item.is_read?item.is_read:'-'}}</el-col>
    <el-col :span="4">{{item.created_time?item.created_time:'-'}}</el-col>
  </el-row>
    <div class="block">
    <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="count" layout="total, prev, pager, next" :total="total">
    </el-pagination>
  </div>
    <el-row style="text-align:center;margin-top:20px">
      <el-col :span="14" :offset="5">
        <editor @article-change="articleChange"></editor>
      </el-col>
    </el-row>

    <el-row style="text-align:center;margin-top:0px">
      <el-button type="primary" @click="submit()">提交</el-button>
    </el-row>
  </div>
</template>

  <script>
import { post } from "../../common/post";
import { PORSCHE_HOST } from "../../common/host";
import { timestampToDate } from "../../common/utils";
import Editor from "../../components/Editor/editor.vue";
export default {
  components: {
    Editor
  },
  data() {
    return {
      host: "",
      member_id: "",
      username: "",
      content: "",
      offset: 0,
      count: 5,
      total: 100,
      currentPage: 1,
      tableData: []
    };
  },
  mounted() {
    //do something after mounting vue instance
    this.host = PORSCHE_HOST;
  },
  created: function() {
    let _this = this;
    _this.member_id = _this.$route.query.member_id;
    _this.username = _this.$route.query.username;
    _this.handleCurrentChange(1);
  },
  methods: {
    articleChange(content) {
      this.content = this.escape2Html(content);
      console.log(3333, content);
    },
    escape2Html(str) {
      var arrEntities = {
        lt: "<",
        gt: ">",
        nbsp: " ",
        amp: "&",
        quot: '"'
      };
      return str.replace(/&(lt|gt|nbsp|amp|quot);/gi, function(all, t) {
        return arrEntities[t];
      });
    },
    handleCurrentChange(val) {
      var _this = this;
      _this.offset = (parseInt(val) - 1) * _this.count;
      console.log(`当前页: ${val}`);
      let result = post("/manager/dealer/query/notification/list", {
        member_id: _this.member_id,
        offset: _this.offset,
        count: _this.count
      });
      result.then(res => {
        console.log(res.data);
        let rows = res.data.data.rows;
        for (let i = 0; i < rows.length; i++) {
          rows[i].created_time = timestampToDate(rows[i].created_time);
          if (rows[i].is_read === "Y") rows[i].is_read = "是";
          else if (rows[i].is_read === "N") rows[i].is_read = "否";
        }
        _this.tableData = rows;
        _this.total = res.data.data.count;
      });
    },
    submit() {
      let _this = this;
      let result = post("/manager/user/notification/push", {
        member_id: _this.member_id,
        content: _this.content
      });
      result.then(function(res) {
        if (res.data.code === "1001") {
          _this.$message({
            message: res.data.message,
            type: "success"
          });
          console.log(123);
          _this.$router.push("/dealer/query/list");
          console.log(12355);
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
  }
};
</script>
<style scoped>
.notification-content-header {
  border-bottom: 1px solid #ccc;
  background-color: #eee;
  margin-top: 20px;
  height: 40px;
  line-height: 40px;
  font-weight: bold;
}
.notification-content {
  height: 100px;
  border-bottom: 1px solid #ccc;
  font-size: 14px;
}
.block {
  margin-top: 20px;
}

.notification-content .el-col {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
