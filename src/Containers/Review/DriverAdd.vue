<template>
<div>
  <div class="mianbao">
    审核管理/驾客添加
  </div>
    <el-row class="row-box">
    <el-col :span="2">
      手机号码
    </el-col>
    <el-col :span="20">
      <el-input v-model="tel"></el-input>
    </el-col>
  </el-row>
  <el-row class="row-box">
    <el-col :span="2">
      简介
    </el-col>
    <el-col :span="20">
      <el-input v-model="title"></el-input>
    </el-col>
  </el-row>
  <el-row class="row-box">
    <el-col :span="2">
      封面图片
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
      详细介绍
    </el-col>
    <el-col :span="14" :offset="5">
      <editor @article-change="articleChange"></editor>
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
      action: "",
      host: "",
      fileList2: [],
      tel: "",
      title: "",
      picture_path: "",
      content: ""
    };
  },
  mounted() {
    //do something after mounting vue instance
    this.host = PORSCHE_HOST;
    this.action = this.host + "/fileupload";
    console.log(2222, this.action);
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
      let result = post("/manager/review/driver/add", {
        tel: _this.tel,
        title: _this.title,
        picture_path: _this.picture_path,
        content: _this.content,
        picture_path: _this.picture_path,
        content: _this.content
      });
      result.then(res => {
        if (res.data.code === "1001") {
          _this.$message({
            message: res.data.message,
            type: "success"
          });
        } else if (
          res.data.code === "1003" ||
          res.data.code === "1005" ||
          res.data.code === "1010"
        ) {
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
