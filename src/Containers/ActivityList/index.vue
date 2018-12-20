<template>
<div>
  <div class="mianbao">
    活动管理/活动列表
  </div>
  <el-row style="text-align:left" class="input-container">
    <el-col :span="6">
      <el-select v-model="first_type" clearable placeholder="活动大类" @change="secondTypeSelect()" style="width:100%">
        <el-option v-for="item in activityFirstType" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="6">
      <el-select v-model="second_type" clearable placeholder="活动小类" style="width:100%">
        <el-option v-for="item in activitySecondType" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="6">
      <el-input v-model="title" placeholder="标题" style="width:100%"></el-input>
    </el-col>
    <el-col :span="6">
      <el-input v-model="city" placeholder="城市" style="width:100%"></el-input>
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
      <el-select v-model="stay_at_top" clearable placeholder="是否置顶" style="width:100%">
        <el-option v-for="item in isTop" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="6">
      <el-select v-model="is_show" clearable placeholder="是否隐藏" style="width:100%">
        <el-option v-for="item in YN" :key="item.value" :label="item.label" :value="item.value">
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
    <el-col :span="2">活动大类</el-col>
    <el-col :span="2">活动小类</el-col>
    <el-col :span="2">标题</el-col>
    <el-col :span="2">活动时间</el-col>
    <el-col :span="2">城市</el-col>
    <el-col :span="1">地址</el-col>
    <el-col :span="1">参加数</el-col>
    <el-col :span="1">浏览数</el-col>
    <el-col :span="2">感兴趣数</el-col>
    <el-col :span="2">创建时间</el-col>
    <el-col :span="7">操作 </el-col>
  </el-row>
  <el-row class="register-content-row" v-for="(item,index) in tableData" :key="item.id">
    <el-col :span="2">{{item.first_type?item.first_type:'-'}}</el-col>
    <el-col :span="2">{{item.second_type?item.second_type:'-'}}</el-col>
    <el-col :span="2">{{item.title?item.title:'-'}}</el-col>
    <el-col :span="2">{{item.start_time+' 至 '+item.end_time}}</el-col>
    <el-col :span="2">{{item.city?item.city:'-'}}</el-col>
    <el-col :span="1">{{item.address?item.address:'-'}}</el-col>
    <el-col :span="1">{{item.join_count}}</el-col>
    <el-col :span="1">{{item.visit_count}}</el-col>
    <el-col :span="2">{{item.upvote_count}}</el-col>
    <el-col :span="2">{{item.created_time?item.created_time:'-'}}</el-col>
    <el-col :span="7">
      <el-button size="small" @click="activityUserList(index, item)">参加人员</el-button>
      <el-button size="small" @click="actvityCommentList(index, item)">查看评论</el-button>
      <el-button size="small" @click="activityEdit(index, item)">编辑</el-button>
      <el-button size="small" v-if="item.first_type=='FM'"  @click="stayAtTop(index, item)">置顶/取消</el-button>
      <el-button size="small" @click="activityConceal(index, item)">显示/隐藏</el-button>
      <el-button size="small" @click="activityDelete(index, item)">删除</el-button>
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
        first_type:"",
        second_type:"",
        title:"",
        city:"",
        start_time: "",
        end_time: "",
        stay_at_top:"",
        is_show:"",
        isTop: [
            {
                value: "1",
                label: "是"
            },
            {
                value: "0",
                label: "否"
            }
        ],
        YN: [
            {
                value: "0",
                label: "是"
            },
            {
                value: "1",
                label: "否"
            }
        ],

        activityFirstType: [
            {
                value: "FM",
                label: "FM"
            },
            {
                value: "OFFLINE",
                label: "精彩活动"
            }
        ],
        activitySecondType: [
            {
                value: "CONTENT",
                label: "资讯详情"
            },{
                value: "OFFLINESELF",
                label: "线下活动自费"
            },{
                value: "OFFLINENONEED",
                label: "线下活动免费(无需0B Call)"
            },{
                value: "OFFLINENEED",
                label: "线下活动免费(需要0B Call)"
            },{
                value: "ONLINE",
                label: "线上活动"
            },{
                value: "SPLENDID",
                label: "精彩集锦"
            }
        ],
    };
  },
  mounted() {
    //do something after mounting vue instance
    this.host = PORSCHE_HOST;
  },
  created: function() {
    let _this = this;
    _this.handleCurrentChange(1);
    /*let result = post("/manager/activity/list", {
      offset: _this.offset,
      count: _this.count
    });
    result.then(res => {
      let rows = res.data.data.rows;
      for (let i = 0; i < rows.length; i++) {
        rows[i].created_time = timestampToDate(rows[i].created_time);
        if (rows[i].start_time)
          rows[i].start_time = timestampToDate(rows[i].start_time);
        else rows[i].start_time = "-";
        if (rows[i].end_time)
          rows[i].end_time = timestampToDate(rows[i].end_time);
        else rows[i].end_time = "-";
        if (rows[i].first_type === "FM") {
          rows[i].first_type = "FM";
          if ((rows[i].second_type = "CONTENT")) {
            rows[i].second_type = "文章详情";
          } else if ((rows[i].second_type = "REVIEW")) {
            rows[i].second_type = "活动回顾";
          } else if ((rows[i].second_type = "ACTIVITY")) {
            rows[i].second_type = "活动参与";
          }
        } else if (rows[i].first_type === "OFFLINE") {
            rows[i].first_type = "精彩活动";
          if(rows[i].second_type === "OFFLINESELF"){
              rows[i].second_type = "活动招募";
          }else if(rows[i].second_type === "OFFLINENONEED"){
                rows[i].second_type = "活动招募";
            }else if(rows[i].second_type === "OFFLINENEED"){
                rows[i].second_type = "活动招募";
            }else if(rows[i].second_type === "ONLINE"){
                rows[i].second_type = "活动招募";
            }else if(rows[i].second_type === "SPLENDID"){
                rows[i].second_type = "精彩集锦";
            }
          //rows[i].second_type = "线下活动";
        }
        if (rows[i].title.length > 12)
          rows[i].title = rows[i].title.slice(0, 12) + "...";
      }
      _this.tableData = rows;
      _this.total = res.data.data.count;
    });*/
  },
  methods: {
      secondTypeSelect() {
          var _this = this;
          _this.second_type = "";
          if (_this.first_type === "FM") {
              _this.activitySecondType = [
                  {
                      value: "CONTENT",
                      label: "资讯详情"
                  }
              ];
          } else if (_this.first_type === "OFFLINE") {
              _this.activitySecondType = [
                  {
                      value: "OFFLINESELF",
                      label: "线下活动自费"
                  },{
                      value: "OFFLINENONEED",
                      label: "线下活动免费(无需0B Call)"
                  },{
                      value: "OFFLINENEED",
                      label: "线下活动免费(需要0B Call)"
                  },{
                      value: "ONLINE",
                      label: "线上活动"
                  },{
                      value: "SPLENDID",
                      label: "精彩集锦"
                  }
              ];
          }else{
              _this.activitySecondType = [
                  {
                      value: "CONTENT",
                      label: "资讯详情"
                  },{
                      value: "OFFLINESELF",
                      label: "线下活动自费"
                  },{
                      value: "OFFLINENONEED",
                      label: "线下活动免费(无需0B Call)"
                  },{
                      value: "OFFLINENEED",
                      label: "线下活动免费(需要0B Call)"
                  },{
                      value: "ONLINE",
                      label: "线上活动"
                  },{
                      value: "SPLENDID",
                      label: "精彩集锦"
                  }
              ];
          }
      },
    handleCurrentChange(val) {
      var _this = this;
      _this.currentPage = val;
      _this.offset = (parseInt(val) - 1) * _this.count;
      console.log(`当前页: ${val}`);
      let result = post("/manager/activity/list", {
        first_type: _this.first_type,
        second_type: _this.second_type,
        title: _this.title,
        city: _this.city,
        start_time: _this.start_time ? new Date(_this.start_time).getTime().toString() : "",
        end_time: _this.end_time ? new Date(_this.end_time).getTime().toString() : "",
        stay_at_top: _this.stay_at_top,
        is_show: _this.is_show,
        offset: _this.offset,
        count: _this.count
      });
      result.then(res => {

        let rows = res.data.data.rows;
        for (let i = 0; i < rows.length; i++) {
          rows[i].created_time = timestampToDate(rows[i].created_time);
          if (rows[i].start_time)
            rows[i].start_time = timestampToDate(rows[i].start_time);
          else rows[i].start_time = "-";
          if (rows[i].end_time)
            rows[i].end_time = timestampToDate(rows[i].end_time);
          else rows[i].end_time = "-";
          if (rows[i].first_type === "FM") {
            rows[i].first_type = "FM";
            if ((rows[i].second_type == "CONTENT")) {
              rows[i].second_type = "资讯详情";
            } else if ((rows[i].second_type == "REVIEW")) {
              rows[i].second_type = "活动回顾";
            } else if ((rows[i].second_type == "ACTIVITY")) {
              rows[i].second_type = "活动参与";
            }
          } else if (rows[i].first_type === "OFFLINE") {
            rows[i].first_type = "精彩活动";
            /*rows[i].second_type = "线下活动";*/
              if(rows[i].second_type === "OFFLINESELF"){
                  rows[i].second_type = "线下活动自费";
              }else if(rows[i].second_type === "OFFLINENONEED"){
                  rows[i].second_type = "线下活动免费(无需0B Call)";
              }else if(rows[i].second_type === "OFFLINENEED"){
                  rows[i].second_type = "线下活动免费(需要0B Call)";
              }else if(rows[i].second_type === "ONLINE"){
                  rows[i].second_type = "线上活动";
              }else if(rows[i].second_type === "OFFLINE"){
                rows[i].second_type = "线下活动自费";
              }else if(rows[i].second_type === "SPLENDID"){
                  rows[i].second_type = "精彩集锦";
              }
          }


          if (rows[i].title.length > 12)
            rows[i].title = rows[i].title.slice(0, 12) + " ...";
        }
        _this.tableData = rows;
        _this.total = res.data.data.count;
      });
    },
    activityUserList(index, row) {
      console.log(index, 111, row);
      this.$router.push({
        path: "/activity/user/list",
        query: {
          article_id: row.uuid
        }
      });
    },
    actvityCommentList(index, row) {
      this.$router.push({
        path: "/activity/comment/list",
        query: {
          article_id: row.uuid
        }
      });
    },
    activityEdit(index, row) {
      this.$router.push({
        path: "/activity/edit",
        query: {
          article_id: row.uuid
        }
      });
    },
    stayAtTop(index, row) {
        var _this = this;
        let result = post("/manager/activity/fm/fmlisttop", {
            uuid: row.uuid,
            type:row.first_type,
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


    activityConceal(index, row){
        var _this = this;
        let result = post("/manager/activity/show_hide", {
            article_id: row.uuid,
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
    activityDelete(index, row) {
      console.log(2222, row);
      var _this = this;
      _this
        .$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          let result = post("/manager/activity/delete", {
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
      //搜索
      search(){
          var _this = this;
          _this.handleCurrentChange(1);
      },
      // 重置
      reset() {
          var _this = this;
          _this.first_type = "";
          _this.second_type = "";
          _this.title = "";
          _this.city = "";
          _this.start_time = "";
          _this.end_time  = "";
          _this.stay_at_top = "";
          _this.is_show = "";
          _this.handleCurrentChange(1);
      },
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
</style>
