<template>
  <div id="">
    <div class="mianbao">
      首页
    </div>
     <el-row class="pannel">
      <el-col :span="8" :offset="2" class="pannel-col">
        <div class="">
          <i class="iconfont icon-yuangongzongrenshu"></i>
        </div>
        <div class="">
          注册用户人数
        </div>
        <div class="num">
          {{registerCount}}
        </div>
      </el-col>
      <el-col :span="8" :offset="2" class="pannel-col">
        <div class="">
          <i class="iconfont icon-ziliao"></i>
        </div>
        <div class="">
          完善资料人数
        </div>
        <div class="num">
          {{completeCount}}
        </div>
      </el-col>
    </el-row>
  </div>

</template>
<script>
import { post } from "../../common/post";
import { PORSCHE_HOST } from "../../common/host";
export default {
  data: () => {
    return {
      host: "",
      registerCount: "",
      completeCount: ""
    };
  },
  mounted() {
    //do something after mounting vue instance
    this.host = PORSCHE_HOST;
  },
  created() {
    let _this = this;
    let result = post("/manager/user/count");
    result.then(function(res) {
      console.log(res.data);
      _this.registerCount = res.data.data.registercount;
      _this.completeCount = res.data.data.completecount;
    });
  }
};
</script>
<style lang="" scoped>
.pannel-col {
  background: #eee;
  height: 170px;
  border-radius: 10px;
}
.icon-yuangongzongrenshu,
.icon-ziliao {
  font-size: 50px;
}
.num {
  font-size: 40px;
  font-weight: bold;
}
</style>
