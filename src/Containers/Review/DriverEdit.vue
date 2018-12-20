<template>
<div>
  <div class="mianbao">
    审核管理/驾客编辑
  </div>
    <el-row class="row-box">
    <el-col :span="2">
     驾客昵称
    </el-col>
    <el-col :span="20">
      <el-input v-model="nickname" disabled="true"></el-input>
    </el-col>
  </el-row>
  <el-row class="row-box">
    <el-col :span="2">
      驾客简介
    </el-col>
    <el-col :span="20">
      <el-input v-model="title"></el-input>
    </el-col>
  </el-row>
  <el-row class="row-box">
    <el-col :span="2">
      驾客图片
    </el-col>
    <el-col :span="1" class="img-upload-row">
      <el-upload
        class="upload-demo"
        :action="action"
        :on-success="handleChange"
        :file-list="fileList2"
        list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </el-col>
  </el-row>
  <el-row class="row-box">
    <el-col :span="2">
      驾客详情
    </el-col>
    <el-col :span="14" :offset="5">
      <editor @article-change="articleChange" :content="content" v-if="showEditor"></editor>
    </el-col>
  </el-row>
     <el-row class="row-box">
    <el-col :span="2">
      驾客状态
    </el-col>
    <el-col :span="6">
      <el-select v-model="status" clearable placeholder="状态" style="width:100%">
        <el-option v-for="item in status_array" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-col>
  </el-row>
  <el-row style="margin-top:20px">
    <el-button type="primary" @click="add()">提交</el-button>
  </el-row>
</div>
</template>
<script>
import { post } from "../../common/post";
import { PORSCHE_HOST } from "../../common/host";
import Editor from "../../components/Editor/editor.vue";
export default {
  components: {
    Editor
  },
  data() {
    return {
      showEditor: false,
      action: "",
      host: "",
      fileList2: [],
      nickname:"",
      article_id: "",
      title: "",
      picture_path: "",
      content: "",
      status: "",
      status_array: [
        {
          value: "ENABLED",
          label: "通过"
        },
        {
          value: "REVIEW",
          label: "审核中"
        }
      ]
    };
  },
  created() {
    var _this = this;
    _this.article_id = _this.$route.query.article_id;

    console.log(11111);
    let result = post("/manager/review/driver/detail", {
      article_id: _this.article_id
    });
    result.then(function(res) {
      console.log(3333, res.data);
      let row = res.data.data;
      _this.title = row.title;
      _this.picture_path = row.picture_path;
      _this.content = row.content;
      _this.showEditor = true;
      _this.status = row.status;
      _this.nickname = row.nickname;
      _this.fileList2.push({
        name: "test",
        url: _this.host + row.picture_path
      });
    });
  },
  mounted() {
    //do something after mounting vue instance
    this.host = PORSCHE_HOST;
    this.action = this.host + "/fileupload";
  },
  methods: {
    articleChange(content) {
      this.content = this.escape2Html(content);
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
    add() {
      let _this = this;
      let result = post("/manager/review/driver/edit", {
        article_id: _this.article_id,
        title: _this.title,
        picture_path: _this.picture_path,
        content: _this.content,
        status: _this.status
      });
      result.then(res => {
        console.log(111, res.data);
        if (res.data.code === "1001") {
          _this.$message({
            message: res.data.message,
            type: "success"
          });
          _this.$router.push({
            path: "/review/driver/list"
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
    handleChange(response, file, fileList) {
      this.picture_path = file.response.data.picture_path;
      this.fileList2 = fileList.slice(-1);
    }
  }
};
</script>
<style scoped>
.row-box {
  margin-top: 10px;
}

.select-row {
  width: 100%;
}
</style>
