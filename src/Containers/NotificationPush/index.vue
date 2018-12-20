<template>
  <div v-loading="loading">
    <el-row>
      给所有人推送消息
    </el-row>

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
      content: "",
      offset: 0,
      count: 5,
      total: 100,
      currentPage: 1,
      tableData: [],
        loading: false,
    };
  },
  mounted() {
    //do something after mounting vue instance
    this.host = PORSCHE_HOST;
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
    submit() {
      let _this = this;
      _this.loading = true
      let result = post("/manager/notification/push", {
        content: _this.content
      });
      result.then(function(res) {
        if (res.data.code === "1001") {
            _this.loading = false
          _this.$message({
            message: res.data.message,
            type: "success"
          });
        } else if (res.data.code === "1003") {
            _this.loading = false
          _this.$message({
            message: res.data.message,
            type: "warning"
          });
        } else {
            _this.loading = false
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
