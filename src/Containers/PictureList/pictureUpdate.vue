<template>
<div>
  <div class="mianbao">
    图片修改
  </div>
  <el-row class="row-box">
    <el-col :span="2">
      PC端主页图片
    </el-col>
     <el-col :span="1" class="img-upload-row">
      <el-upload
        class="upload-demo"
        :action="action"
        :on-success="handleChange"
        :file-list="fileList"
        list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
</el-upload>
    </el-col>
  </el-row>
  <el-row class="row-box">
    <el-col :span="2">
     图片顺序
    </el-col>
    <el-col :span="20">
      <el-input v-model="picture_order"></el-input>
    </el-col>
  </el-row>
    <el-row class="row-box">
    <el-col :span="2">
      图片类型
    </el-col>
    <el-col :span="6">
      <el-select v-model="type" clearable placeholder="图片类型" style="width:100%">
        <el-option v-for="item in picture_type_array" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-col>
  </el-row>
  <el-row class="row-box">
    <el-col :span="2">
      图片状态
    </el-col>
    <!-- <el-col :span="20">
      <el-input v-model="status"></el-input>
    </el-col> -->
    <el-col :span="6">
         <el-select v-model="status" clearable placeholder="图片状态" style="width:100%">
        <el-option v-for="item in picture_status_array" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-col>
  </el-row>
  <el-row class="row-box">
    <el-col :span="2">
      APP端主页图片
    </el-col>
     <el-col :span="1" class="img-upload-row">
      <el-upload
        class="upload-demo"
        :action="action"
        :on-success="handleChange2"
        :file-list="fileList2"
        list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
       </el-upload>
    </el-col>
  </el-row>
  <el-row class="row-box">
    <el-col :span="2">
      图片内容
    </el-col>
    <el-col :span="20">
      <el-input v-model="content"></el-input>
    </el-col>
  </el-row>


  <el-row style="margin-top:20px">
    <el-button type="primary" @click="pictureUpdate()">提交</el-button>
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
      fileList: [],
      fileList2: [],
      id: "",
      picture_path: "",
      picture_order: "",
      type: "",
      status: "",
      picture_path_app: "",
      content: "",
      picture_type_array: [
        {
          value: "WELCOME",
          label: "欢迎页"
        },
        {
          value: "HOME",
          label: "首页"
        },
        {
          value: "INTEREST",
          label: "兴趣爱好"
        },
        {
          value: "PRESENT",
          label: "礼物"
        }
      ],
      picture_status_array: [
        {
          value: "Y",
          label: "可以使用"
        },
        {
          value: "N",
          label: "不可使用"
        }
      ]
    };
  },
  mounted() {
    //do something after mounting vue instance
    this.host = PORSCHE_HOST;
    this.action = this.host + "/fileupload";
  },
  created: function() {
    var _this = this;
    _this.type = _this.$route.query.type;
    let result = post("/manager/picture/detail", {
      id: _this.$route.query.id
    });
    result.then(function(res) {
      if (res.data.code === "1001") {
        console.log(res.data);
        let row = res.data.data;
        _this.id = row.id;
        _this.picture_path = row.picture_path;
        _this.picture_order = row.picture_order;
        _this.type = row.type;
        _this.status = row.status;
        _this.picture_path_app = row.picture_path_app;
        _this.content = row.content;
        _this.fileList.push({
          name: "test1",
          url: _this.host + row.picture_path
        });
        if (row.picture_path_app) {
          _this.fileList2.push({
            name: "test",
            url: _this.host + row.picture_path_app
          });
        }

        console.log(_this.fileList, 123);
      }
    });
  },

  methods: {
    pictureUpdate() {
      let _this = this;
      let result = post("/manager/picture/update", {
        id: _this.id,
        picture_path: _this.picture_path,
        picture_order: _this.picture_order,
        type: _this.type,
        status: _this.status,
        picture_path_app: _this.picture_path_app,
        content: _this.content
      });
      result.then(res => {
        if (res.data.code === "1001") {
          console.log(res.data.message);
          _this.$message({
            message: res.data.message,
            type: "success"
          });
          _this.$router.push("/picture/list");
        }
      });
    },

    handleChange(response, file, fileList) {
      console.log(111, file.response);
      this.picture_path = file.response.data.picture_path;
      this.fileList = fileList.slice(-1);
    },
    handleChange2(response, file, fileList) {
      console.log(111, file.response);
      this.picture_path_app = file.response.data.picture_path;
      this.fileList2 = fileList.slice(-1);
    }

    // handleRemove(file, fileList) {
    //   console.log(file, fileList);
    // },
    // handlePreview(file) {
    //   console.log(file);
    // },
    // handleExceed(files, fileList) {
    //   this.$message.warning(
    //     `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length +
    //       fileList.length} 个文件`
    //   );
    // }
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
.img-upload-row {
  margin-left: 20px;
}
.el-col-2 {
  margin-right: 20px;
}
.hs-background {
  background: #000;
}
.el-upload-list--picture .el-upload-list__item {
  background-color: #000;
}
</style>
