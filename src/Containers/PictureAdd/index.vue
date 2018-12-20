<template>
<div>
  <div class="mianbao">
    图片管理/图片添加
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
        :file-list="fileList1"
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
    <!-- <el-col :span="20">
      <el-input v-model="type"></el-input>
    </el-col> -->
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
        @change="handleChange2()"
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
    <el-button type="primary" @click="pictureAdd()">提交</el-button>
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
      fileList1: [],
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
    console.log(666, this.action);
  },

  methods: {
    handleChange(response, file, fileList) {
      console.log(111, file.response);
      this.picture_path = file.response.data.picture_path;
      this.fileList = fileList.slice(-1);
    },
    handleChange2(response, file, fileList) {
      console.log(111, file.response);
      this.picture_path_app = file.response.data.picture_path;
      this.fileList2 = fileList.slice(-1);
    },
    pictureAdd() {
      let _this = this;
      let result = post("/manager/picture/add", {
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
