<template>
<div>
  <div class="mianbao">
    审核管理/挚享者说内容
  </div>
  <div v-if="first_type === 'MEMBERSHOW' && second_type === 'PROJECTION'">
    <el-row class="row-box">
      <el-col :span="3">
        昵称
      </el-col>
      <el-col :span="20">
        <el-input v-model="nickname" disabled></el-input>
      </el-col>
    </el-row>
    <el-row class="row-box">
      <el-col :span="3">
        挚享者说标题
      </el-col>
      <el-col :span="20">
        <el-input v-model="title"></el-input>
      </el-col>
    </el-row>
    <el-row class="row-box" v-if="picture_path !=''">
      <el-col :span="3">
        挚享者说封面
      </el-col>
      <el-col :span="20">
        <div style="text-align: left;margin-bottom:5px;">
          <img width="50%"  height="50%" :src="host+picture_path" alt="">
        </div>
      </el-col>
    </el-row>
    <el-row class="row-box">
      <el-col :span="3">
        挚享者说详情
      </el-col>
      <el-col :span="20">
        <div v-for="list in content" :key="list.id" style="text-align: left;margin-bottom:5px;">
          <img width="50%"  height="50%" :src="host+list.imgpic" alt="">
        </div>
      </el-col>
      <!-- <el-col :span="14" v-for="list in content">
       <el-input v-model="list.content"></el-input>
      </el-col> -->
    </el-row>
    <el-row class="row-box">
      <el-col :span="3">
        挚享者说正文
      </el-col>
      <el-col :span="20">
        <textarea  v-model="body_text"  style="width:100%;height:100px" cols="100" rows="20"></textarea>
      </el-col>
    </el-row>
    <el-row class="row-box">
      <el-col :span="3">
        挚享者说状态
      </el-col>
      <el-col :span="6">
        <el-select v-model="status" clearable placeholder="状态" @change="typeSelect()" style="width:100%">
          <el-option v-for="item in status_array" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
  </div>
  <div v-else>
    <el-row class="row-box">
      <el-col :span="3">
        昵称
      </el-col>
      <el-col :span="20">
        <el-input v-model="nickname" disabled></el-input>
      </el-col>
    </el-row>
    <el-row class="row-box">
      <el-col :span="3">
        挚享者说标题
      </el-col>
      <el-col :span="20">
        <el-input v-model="title"></el-input>
      </el-col>
    </el-row>
    <el-row class="row-box" v-if="picture_path !=''">
      <el-col :span="3">
        挚享者说封面
      </el-col>
      <el-col :span="20">
        <div style="text-align: left;margin-bottom:5px;">
          <img width="50%"  height="50%" :src="host+picture_path" alt="">
        </div>
      </el-col>
    </el-row>
    <el-row class="row-box">
      <el-col :span="3">
        挚享者说详情
      </el-col>
      <el-col :span="20">
        <div v-for="list in content" :key="list.id" style="text-align: left;">
          <textarea name="list.id" v-model="list.content"  id="list.id" style="width:100%;height:100px" cols="100" rows="20"></textarea>
          <img width="50%"  height="50%" :src="host+list.imgpic" alt="">
        </div>
      </el-col>
      <!-- <el-col :span="14" v-for="list in content">
       <el-input v-model="list.content"></el-input>
      </el-col> -->
    </el-row>
    <el-row class="row-box">
      <el-col :span="3">
        挚享者说状态
      </el-col>
      <el-col :span="6">
        <el-select v-model="status" clearable placeholder="状态" @change="typeSelect()" style="width:100%">
          <el-option v-for="item in status_array" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
  </div>
  <el-row style="margin-top:20px">
    <el-button type="primary" @click="update()">提交</el-button>
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
      nickname: "",
      article_id: "",
      title: "",
        picture_path:"",
      content: "",
      status: "",
      first_type: '',
      second_type: '',
      body_text: '',
        articleId:'',
      status_array: [
        {
            value: "REVIEW",
            label: "审核中"
        },
        {
          value: "ENABLED",
          label: "通过"
        },
        {
            value: "DISABLE",
            label:"驳回"
        }
      ]
    };
  },
  created() {
    var _this = this;
    _this.article_id = _this.$route.query.article_id;
    let result = post("/manager/review/show/detail", {
      article_id: _this.article_id
    });


    result.then(function(res) {
      let row = res.data.data;
      _this.title = row.title;
      _this.content = JSON.parse(row.content);
      _this.status = row.status;
      _this.nickname = row.nickname;
      _this.first_type = row.first_type
      _this.second_type = row.second_type
      _this.body_text = row.body_text
        _this.picture_path = row.picture_path
        _this.articleId = row.uuid
    });
  },
  mounted() {
    //do something after mounting vue instance
    this.host = PORSCHE_HOST;
    this.action = this.host + "/fileupload";
  },
  methods: {
      typeSelect(){
        let _this = this;
        if(_this.status == 'DISABLE'){
          this.$prompt('请输入驳回原因', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              inputPattern: /\s{0,}[\S]{1,}[\s\S]{0,}/,
              inputErrorMessage: '内容不能为空'
          }).then(({ value }) => {
              let result = post("/manager/review/show/no_pass", {
                  article_id: _this.articleId,
                  content:value,
              });
              result.then(function(res){
                  if(res.data.code === "1001") {
                      _this.$message({
                          type: 'success',
                          message: res.data.message
                      });
                  }
              })
          }).catch(() => {
              this.$message({
                  type: 'info',
                  message: '已取消驳回审核!'
              });
          });
        }
      },
    update() {
      let _this = this;
      console.log(111,_this.content);
      let result = post("/manager/review/show/edit", {
        article_id: _this.article_id,
        title: _this.title,
        content: JSON.stringify(_this.content),
        status: _this.status
      });
      result.then(res => {
        if (res.data.code === "1001") {
          _this.$message({
            message: res.data.message,
            type: "success"
          });
          _this.$router.push({
            path: "/review/show/list"
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
