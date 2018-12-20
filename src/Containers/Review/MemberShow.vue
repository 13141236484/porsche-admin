<template>
<div>
  <div class="mianbao">
    审核管理/挚享者说
  </div>
  <el-row style="text-align:left" class="input-container">
    <el-col :span="6">
      <el-select v-model="second_type" clearable placeholder="类型" style="width:100%">
        <el-option v-for="item in model_kind" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="6">
      <el-input v-model="nickname" placeholder="昵称" style="width:100%"></el-input>
    </el-col>
    <el-col :span="6">
      <el-input v-model="title" placeholder="标题" style="width:100%"></el-input>
    </el-col>
    <el-col :span="6">
      <el-select v-model="stay_at_top" clearable placeholder="是否置顶" style="width:100%">
        <el-option v-for="item in YN" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="6">
      <el-date-picker style="width:100%" v-model="start_time" type="datetime" placeholder="创建时间开始时间">
      </el-date-picker>
    </el-col>
    <el-col :span="6">
      <el-date-picker style="width:100%" v-model="end_time" type="datetime" placeholder="创建时间结束时间">
      </el-date-picker>
    </el-col>

    <el-col :span="6">
      <el-select v-model="status" clearable placeholder="状态" style="width:100%">
        <el-option v-for="item in s_state_type" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-col>
  </el-row>
<el-row style="text-align:left" class="input-container">
  <el-col :span="6">
    <el-button type="primary" icon="search" @click="search()">搜索</el-button>
    <el-button type="primary" icon="search" @click="reset()">重置</el-button>
  </el-col>
</el-row>

  <el-row class="register-content-header">
    <el-col :span="2">类型</el-col>
    <el-col :span="2">昵称</el-col>
    <el-col :span="3">标题</el-col>
    <el-col :span="2">浏览人数</el-col>
    <el-col :span="2">创建时间</el-col>
     <el-col :span="2">状态</el-col>
      <el-col :span="1">置顶</el-col>
    <el-col :span="10">操作</el-col>
  </el-row>
  <el-row class="register-content-row" v-for="(item,index) in tableData" :key="item.id">
    <el-col :span="2">{{item.second_type?item.second_type:'-'}}</el-col>
    <el-col :span="2">{{item.nickname?item.nickname:'-'}}</el-col>
    <el-col :span="3">{{item.title?item.title:'-'}}</el-col>
    <el-col :span="2">{{item.visit_count}}</el-col>
    <el-col :span="2">{{item.created_time?item.created_time:'-'}}</el-col>
    <el-col :span="2">{{item.status?item.status:'-'}}</el-col>
     <el-col :span="1">{{item.stay_at_top?'是':'否'}}</el-col>
    <el-col :span="10">
      <el-button v-if ="item.status =='REVIEW'" size="small" @click="articlePass(index, item)">通过</el-button>
      <el-button v-if ="item.status =='REVIEW'" size="small" @click="articleNotPass(index, item)">驳回</el-button>
       <el-button v-if="item.second_type !=='光影视界' " size="small"  @click="stayAtTop(index, item)">置顶/取消</el-button>
        <el-button size="small" @click="showEdit(index, item)">查看内容</el-button>
        <el-button size="small" @click="deleteShow(index, item)">删除</el-button>
      <el-button size="small" @click="articleCommentList(index, item)">查看评论</el-button>
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
      host: "",
        second_type:"",
        nickname:"",
       title:"",
        stay_at_top:"",
        start_time:"",
        end_time:"",
        status:"",
        YN: [
            {
                value: "1",
                label: "是"
            },
            {
                value: "0",
                label: "否"
            }
        ],
        model_kind:[
            {
                value: "PROJECTION",
                label: "光影视界"
            },{
                value: "TRACK",
                label: "燃情驾驶"
            },{
                value: "MODELSTREET",
                label: "挚爱模型"
            },{
                value: "DREAMSAIL",
                label: "梦想起航"
            }
        ],
        s_state_type:[
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
      _this.currentPage = val;
      _this.offset = (parseInt(val) - 1) * _this.count;
      console.log(`当前页: ${val}`);
      let result = post("/manager/review/show/list", {
        second_type: _this.second_type,
        nickname:_this.nickname,
        title:_this.title,
        start_time: _this.start_time ? new Date(_this.start_time).getTime().toString() : "",
        end_time: _this.end_time ? new Date(_this.end_time).getTime().toString() : "",
        stay_at_top: _this.stay_at_top,
        status: _this.status,
        offset: _this.offset,
        count: _this.count,
      });
      result.then(res => {
        console.log(res.data);
        let rows = res.data.data.rows;
        for (let i = 0; i < rows.length; i++) {
            console.log(rows[i].second_type)
          if (rows[i].second_type === "PROJECTION") {
            rows[i].second_type = "光影视界";
          } else if (rows[i].second_type === "TRACK") {
            rows[i].second_type = "燃情驾驶";
          } else if (rows[i].second_type === "MODELSTREET") {
            rows[i].second_type = "挚爱模型";
          }else if (rows[i].second_type === "DREAMSAIL") {
              rows[i].second_type = "梦想起航";
          }
          rows[i].created_time = timestampToDate(rows[i].created_time);
          rows[i].start_time = timestampToDate(rows[i].start_time);
          rows[i].end_time = timestampToDate(rows[i].end_time);
          if (rows[i].title.length > 12)
            rows[i].title = rows[i].title.slice(0, 12) + " ...";
        }
        _this.tableData = rows;
        _this.total = res.data.data.count;
      });
    },
    articlePass(index, row) {
      console.log(222, row);
      var _this = this;
      let result = post("/manager/review/show/pass", {
        article_id: row.uuid
      });
      result.then(function(res) {
        if (res.data.code === "1001") {
          _this.$message({
            message: res.data.message,
            type: "success"
          });
          _this.handleCurrentChange(1);
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
    articleNotPass(index, row) {
      let _this = this;
      this.$prompt('请输入驳回原因', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /\s{0,}[\S]{1,}[\s\S]{0,}/,
          inputErrorMessage: '内容不能为空',
      }).then(({ value }) => {
          let result = post("/manager/review/show/no_pass", {
              article_id: row.uuid,
              content:value,
          });
           result.then(function(res){
               if(res.data.code === "1001") {
                   _this.$message({
                       type: 'success',
                       message: res.data.message
                   });
                   _this.handleCurrentChange(1);
               }
           })
      }).catch(() => {
          this.$message({
              type: 'info',
              message: '已取消驳回审核!'
          });
      });
    },

    stayAtTop(index, row) {
      var _this = this;
      let result = post("/manager/review/show/top", {
        article_id: row.uuid
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
    showEdit(index, row) {
      this.$router.push({
        path: "/review/show/edit",
        query: {
          article_id: row.uuid
        }
      });
    },
    deleteShow(index, row) {
      var _this = this;
      _this
        .$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          let result = post("/manager/review/show/delete", {
            article_id: row.uuid
          });
          result.then(function(res) {
            if (res.data.code === "1001") {
              _this.$message({
                type: "success",
                message: "删除成功!"
              });
              _this.handleCurrentChange(1);
            }
          });
        })
        .catch(() => {
          _this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    articleCommentList(index, row) {
      this.$router.push({
        path: "/review/show/comment/list",
        query: {
          article_id: row.uuid
        }
      });
    },
    //搜索
    search(){
        var _this = this;
        _this.handleCurrentChange(1);


    },
    // 重置
    reset() {
        var _this = this;
            _this.second_type = "";
            _this.nickname = "";
            _this.title = "";
            _this.start_time = "";
            _this.end_time = "";
            _this.stay_at_top = "";
            _this.status = "";
        _this.handleCurrentChange(1);
    },
  },

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
