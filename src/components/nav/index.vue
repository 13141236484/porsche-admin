<template>
<div class="nav">
  <el-menu default-active="0" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#404040" text-color="rgba(237, 237, 237, 0.67)" active-text-color="rgb(255, 237, 0)" :collapse="collapse" :router="true">
    <el-menu-item index="0" route="/home">
      <i class="iconfont icon-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-submenu index="1">
      <template slot="title">
      <i class="iconfont icon-jingxiaoshang"></i>
      <span slot="title">用户管理</span>
    </template>
      <el-menu-item-group>
        <el-menu-item index="1-1" route="/user/register/list">
          <i class="iconfont icon-shape01"></i>
          <span>注册用户</span>
        </el-menu-item>
        <el-menu-item index="1-2" route="/user/all/list">
          <i class="iconfont icon-ic_alluser"></i>
          <span>全部用户</span>
        </el-menu-item>
        <el-menu-item index="1-3" route="/user/invite">
          <i class="iconfont icon-ic_alluser"></i>
          <span>邀请用户</span>
        </el-menu-item>
        <el-menu-item index="1-4" route="/user/update/list">
          <i class="iconfont icon-update"></i>
          <span>更新信息记录</span>
        </el-menu-item>
      </el-menu-item-group>

    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="iconfont icon-activity1"></i>
        <span slot="title">活动管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="2-1" route="/activity/create">
          <i class="iconfont icon-create"></i>
          <span>创建新活动</span>
        </el-menu-item>
        <el-menu-item index="2-2" route="/activity/list">
          <i class="iconfont icon-list"></i>
          <span>活动列表</span>
        </el-menu-item>
      </el-menu-item-group>

    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="iconfont icon-jingxiaoshang"></i>
        <span slot="title">经销商查询</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="3-1" route="/dealer/query/list" >
          <i class="iconfont icon-jingxiaoshangfuwu"></i>
          <span>经销商查询</span>
        </el-menu-item>
        <el-menu-item index="3-2" route ="/dealer/trail/drive/list">
          <i class="iconfont icon-shichengshijia"></i>
          <span>申请试驾</span>
        </el-menu-item>
      </el-menu-item-group>

    </el-submenu>
    <el-submenu index="4">
      <template slot="title">
      <i class="iconfont icon-xiaoxi1"></i>
      <span slot="title">消息中心</span>
    </template>
      <el-menu-item-group>
        <el-menu-item index="4-1" route="/notification/push">
          <i class="iconfont icon-xiaoxituisong"></i>
          <span>消息推送</span>
        </el-menu-item>
        <el-menu-item index="4-2" route="/notification/feedback/list">
          <i class="iconfont icon-xiaoxiyidu"></i>
          <span>消息反馈</span>
        </el-menu-item>
      </el-menu-item-group>

    </el-submenu>

    <el-submenu index="5">
      <template slot="title">
      <i class="iconfont icon-icon-test"></i>
      <span slot="title">审核管理</span>
    </template>
      <el-menu-item-group>
        <el-menu-item index="5-1" route="/review/show/list">
          <i class="iconfont icon-xiaoxituisong"></i>
          <span>挚享者说</span>
        </el-menu-item>
      </el-menu-item-group>
         <el-menu-item-group>
        <el-menu-item index="5-2" route="/review/driver/list">
          <i class="iconfont icon-xiaoxituisong"></i>
          <span>驾客审核</span>
        </el-menu-item>
      </el-menu-item-group>
         <el-menu-item-group>
        <el-menu-item index="5-3" route="/review/driver/add">
          <i class="iconfont icon-xiaoxituisong"></i>
          <span>驾客添加</span>
        </el-menu-item>
      </el-menu-item-group>

    </el-submenu>

    <el-submenu index="6">
      <template slot="title">
      <i class="iconfont icon-icon-test"></i>
      <span slot="title">图片管理</span>
    </template>
      <el-menu-item-group>
        <el-menu-item index="6-1" route="/picture/list">
          <i class="iconfont icon-xiaoxituisong"></i>
          <span>图片列表</span>
        </el-menu-item>
      </el-menu-item-group>
         <el-menu-item-group>
        <el-menu-item index="6-2" route="/picture/add">
          <i class="iconfont icon-xiaoxituisong"></i>
          <span>图片添加</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>



  </el-menu>
</div>
</template>
<script>
export default {
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({}),
  methods: {
    toRoutePage(route) {
      this.$router.push({
        path: route
      });
    },
    handleOpen(key, keyPath) {
      //console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      //console.log(key, keyPath);
    }
  }
};
</script>
<style lang="" scoped>
.nav {
  background-color: #232035;
  z-index: 1111;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 226px;
  min-height: 900px;
}

.el-submenu {
  text-align: left;
}

.el-menu-item {
  text-align: left;
}

.iconfont {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.67);
}
</style>
