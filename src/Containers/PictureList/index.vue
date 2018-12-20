<template>
<div>
  <div class="mianbao">
    图片管理/图片列表
  </div>
  <el-row class="register-content-header">
    <el-col :span="3">PC端主页图片</el-col>
    <el-col :span="2">图片顺序</el-col>
    <el-col :span="3">类型</el-col>
    <el-col :span="3">状态</el-col>
    <el-col :span="3">APP端主页图片</el-col>
    <el-col :span="4">内容</el-col>
    <el-col :span="6">操作</el-col>
  </el-row>
  <el-row class="register-content-row" v-for="(item,index) in tableData" :key="item.id">
     
    <el-col :span="3">
      <img  class = "picture" width="70px" height="45px" :src="host+item.picture_path" alt="">
    </el-col>
    <el-col :span="2">{{item.picture_order}}</el-col>
    <el-col :span="3">{{item.type?item.type:'-'}}</el-col>
    <el-col :span="3">{{item.status}}</el-col>
     <el-col :span="3">
      <img width="70px" height="45px" :src="item.picture_path_app != null ?host+item.picture_path_app:host+'/no_image.jpg'" alt="">
    </el-col>
    <el-col :span="4">{{item.content?item.content:'-'}}</el-col>
    <el-col :span="6">
      <el-button size="small" @click="pictureEdit(index, item)">编辑</el-button>
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
    var _this = this;
    _this.handleCurrentChange(1);
  },
  methods: {
    handleCurrentChange(val) {
      var _this = this;
      _this.offset = (parseInt(val) - 1) * _this.count;
      console.log(`当前页: ${val}`);
      let result = post("/manager/picture/list", {
        offset: _this.offset,
        count: _this.count
      });
      result.then(res => {
        let rows = res.data.data.rows;
        console.log(333, rows);
        _this.tableData = rows;
        _this.total = res.data.data.count;
      });
    },
    pictureEdit(index, row) {
      console.log(111, row);
      this.$router.push({
        path: "/picture/update",
        query: {
          id: row.id,
          type: row.type
        }
      });
    }
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
.picture {
  background: #000;
}
</style>
