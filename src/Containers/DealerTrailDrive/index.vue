<template>
<div>
  <el-row style="text-align:left" class="input-container">
   <el-col :span="6">
      <el-date-picker style="width:100%" v-model="start_time" type="datetime" placeholder="用户查询开始时间">
      </el-date-picker>
    </el-col>
    <el-col :span="6">
      <el-date-picker style="width:100%" v-model="end_time" type="datetime" placeholder="用户查询结束时间">
      </el-date-picker>
    </el-col>
     <el-col :span="6">
      <el-date-picker style="width:100%" v-model="trial_drive_start_time" type="datetime" placeholder="预约开始时间">
      </el-date-picker>
    </el-col>
    <el-col :span="6">
      <el-date-picker style="width:100%" v-model="trial_drive_end_time" type="datetime" placeholder="预约结束时间">
      </el-date-picker>
    </el-col>
 
    <el-col :span="6">
      <el-select v-model="province_id" clearable placeholder="请选择省份" @change="getPorscheCenter(province_id)" style="width:100%">
        <el-option v-for="item in province" :key="item.province_id" :label="item.name" :value="item.province_id">
        </el-option>
      </el-select>
    </el-col>
     <el-col :span="6">
      <el-select v-model="porsche_center_id" clearable placeholder="请选择保时捷中心" style="width:100%">
        <el-option v-for="item in porsche_center" :key="item.uuid" :label="item.cn_name" :value="item.uuid">
        </el-option>
      </el-select>
    </el-col>
 
    <el-col :span="6">
      <el-button type="primary" icon="search" @click="search()">搜索</el-button>
      <el-button type="primary" icon="search" @click="exportExcel()">导出</el-button>
    </el-col>



  </el-row>
    <div style="position:relative">
      <el-row class="register-content-header">
        <el-col :span="3">保时捷中心</el-col>
        <el-col :span="2">申请人</el-col>
        <el-col :span="2">性别</el-col>
        <el-col :span="4">手机</el-col>
        <el-col :span="3">预约时间</el-col>
        <el-col :span="3">申请时间</el-col>
        <el-col :span="6">操作</el-col>
      </el-row>

      <el-row class="register-content-row" v-for="(item,index) in tableData" :key="item.id">
        <el-col :span="3">{{item.porsche_center_name?item.porsche_center_name:'-'}}</el-col>
        <el-col :span="2">{{item.member?item.member:'-'}}</el-col>
        <el-col :span="2">{{item.gender?item.gender:'-'}}</el-col>
        <el-col :span="4">{{item.tel?item.tel:'-'}}</el-col>
        <el-col :span="3">{{item.trial_drive_time?item.trial_drive_time:'-'}}</el-col>
        <el-col :span="3">{{item.created_time?item.created_time:'-'}}</el-col>
        <el-col :span="6">
        <el-button size="small" @click="userInfo(index, item)">用户信息</el-button>
        <el-button size="small" @click="notificationPush(index, item)">推送消息</el-button>
      </el-col>
    </el-row>
    <Loading v-if="loading"/>
</div>
  
  <div class="block" v-if="bar1">
    <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="count" layout="total, prev, pager, next" :total="total">
    </el-pagination>
  </div>
</div>
</template>

  <script>
import { post } from "../../common/post";
import { PORSCHE_HOST } from "../../common/host";
import { timestampToDate } from "../../common/utils";
import Loading from "../../components/loading/index.vue";
export default {
  components: {
    Loading
  },
  data() {
    return {
      loading: true,
      bar1: false,
      start_time: "",
      end_time: "",
      trial_drive_start_time: "",
      trial_drive_end_time: "",
      province_id: "",
      porsche_center_id: "",
      offset: 0,
      count: 5,
      total: 100,
      currentPage: 1,
      tableData: [],
      host: "",
      province: [],
      porsche_center: []
    };
  },
  mounted() {
    //do something after mounting vue instance
    this.host = PORSCHE_HOST;
  },
  created: function() {
    let _this = this;
    let result = post("/manager/dealer/area");
    result.then(function(res) {
      console.log(1111, res.data.data);
      _this.province = res.data.data;
    });
    _this.handleCurrentChange(1);
  },
  methods: {
    handleCurrentChange(val) {
      var _this = this;
        _this.currentPage = val;
      _this.loading = true;
      _this.offset = (parseInt(val) - 1) * _this.count;
      console.log(`当前页: ${val}`);
      let result = post("/manager/dealer/drive/user/list", {
        start_time: _this.start_time
          ? new Date(_this.start_time).getTime().toString()
          : "",
        end_time: _this.end_time
          ? new Date(_this.end_time).getTime().toString()
          : "",
        trial_drive_start_time: _this.trial_drive_start_time
          ? new Date(_this.trial_drive_start_time).getTime().toString()
          : "",
        trial_drive_end_time: _this.trial_drive_end_time
          ? new Date(_this.trial_drive_end_time).getTime().toString()
          : "",
        porsche_center_id: _this.porsche_center_id,
        offset: _this.offset,
        count: _this.count
      });
      result.then(res => {
        this.loading = false;
        console.log(123, res.data);
        console.log(res.data.data);
        let rows = res.data.data.rows;
        console.log(rows);
        for (let i = 0; i < rows.length; i++) {
          rows[i].created_time = timestampToDate(rows[i].created_time);
          rows[i].trial_drive_time = timestampToDate(rows[i].trial_drive_time);
        }
        _this.tableData = rows;

        _this.total = res.data.data.count;
        _this.bar1 = true;
      });
    },
    getPorscheCenter(val) {
      console.log(999, val);
      var _this = this;
      let result = post("/manager/dealer/center", {
        province_id: val
      });
      result.then(function(res) {
        console.log(4444, res.data.data);
        _this.porsche_center = res.data.data;
      });
    },

    userInfo(index, row) {
      this.$router.push({
        path: "/dealer/trail/user/detail",
        query: {
          member_id: row.member_id
        }
      });
    },
    notificationPush(index, row) {
      this.$router.push({
        path: "/dealer/trail/notification/list",
        query: {
          member_id: row.member_id,
          username: row.member
        }
      });
    },
    search() {
      var _this = this;
      _this.handleCurrentChange(1);
    },
    exportExcel() {
      let str = "?1=1";
      let _this = this;
      if (_this.start_time)
        str += "&start_time=" + new Date(_this.start_time).getTime().toString();
      if (_this.end_time)
        str += "&end_time=" + new Date(_this.end_time).getTime().toString();
      if (_this.porsche_center_id)
        str += "&porsche_center_id=" + _this.porsche_center_id;
      window.location.href = PORSCHE_HOST + "/dealer/trial/list/export" + str;
    }
  }
};
</script>

<style scoped="">
.register-content-row {
  height: 100px;
  line-height: 100px;
  border-bottom: 1px solid #ccc;
  font-size: 14px;
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
