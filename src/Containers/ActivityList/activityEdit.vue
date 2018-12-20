<template>
<div>
  <div class="mianbao">
    活动管理/编辑活动
  </div>
  <el-row class="row-box">
    <el-col :span="3">
      活动大类
    </el-col>
    <el-col :span="19">
      <el-select v-model="activity.first_type" clearable placeholder="请选择活动大类" @change="secondTypeSelect()"  class="select-row">
        <el-option  v-for="item in activityFirstType" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-col>
  </el-row>
    <el-row class="row-box">
    <el-col :span="3">
      活动小类
    </el-col>
    <el-col :span="19">
      <el-select v-model="activity.second_type" clearable placeholder="请选择活动小类" class="select-row">
        <el-option v-for="item in activitySecondType" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-col>
  </el-row>
  <el-row class="row-box">
    <el-col :span="3">
      活动标题
    </el-col>
    <el-col :span="19">
      <el-input v-model="activity.title" placeholder="请输入活动标题" clearable></el-input>
    </el-col>
  </el-row>
  <el-row class="row-box">
    <el-col :span="3">
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
    <el-col :span="3">
      活动信息
    </el-col>
    <el-col :span="14" :offset="3">
      <editor @article-change="articleChange" :content="activity.content" v-if="showEditor"></editor>
    </el-col>
  </el-row>
  <el-row class="row-box">
    <el-col :span="3">
      活动开始时间
    </el-col>
    <el-col :span="8">
      <el-date-picker
        class="select-row"
        v-model="activity.start_time"
        type="date"
        placeholder="选择日期">
      </el-date-picker>
    </el-col>
    <el-col :span="3">
      活动结束时间
    </el-col>
    <el-col :span="8">
      <el-date-picker
        class="select-row"
        v-model="activity.end_time"
        type="date"
        placeholder="选择日期">
      </el-date-picker>
    </el-col>
  </el-row>
  <p class="division" :class="{isDivision :isDivision }"></p>

  <div v-for="item in activity.AllUrbanData" :key="item.id">
    <el-row class="row-box">
      <el-col :span="3">
        城市
      </el-col>
      <el-col :span="8">
        <el-input v-model="item.city" placeholder="请输入城市" clearable></el-input>
      </el-col>
      <el-col :span="3">
        活动地点
      </el-col>
      <el-col :span="6">
        <el-input v-model="item.address" placeholder="请输入活动地点" clearable></el-input>
      </el-col>
      <el-col :span="2" v-show="item.id != 1">
        <el-button class="el-icon-close" @click="DelUrbanData(item.id)"></el-button>
      </el-col>
    </el-row>
    <el-row class="row-box">
      <el-col :span="3">
        当前开始时间
      </el-col>
      <el-col :span="8">
        <el-date-picker
          class="select-row"
          v-model="item.current_start_time"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-col>
      <el-col :span="3">
        当前结束时间
      </el-col>
      <el-col :span="8">
        <el-date-picker
          class="select-row"
          v-model="item.current_end_time"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-col>
    </el-row>
  </div>
  <el-row class="row-box">
    <el-col :span="3" :offset="1">
      <el-button class="el-icon-plus" type="primary" plain @click="addCity">新增城市/活动地点</el-button>
    </el-col>
  </el-row>
  <el-row class="row-box">
    <el-col :span="3">
      主办方
    </el-col>
    <el-col :span="19">
      <el-input v-model="activity.sponsor" placeholder="请输入主办方" clearable></el-input>
    </el-col>
  </el-row>
  <el-row class="row-box">
    <el-col :span="3">
      报名开始时间
    </el-col>
    <el-col :span="8">
      <el-date-picker
        class="select-row"
        v-model="activity.start_registration_time"
        type="date"
        placeholder="选择日期">
      </el-date-picker>
    </el-col>
    <el-col :span="3">
      报名结束时间
    </el-col>
    <el-col :span="8">
      <el-date-picker
        class="select-row"
        v-model="activity.end_registration_time"
        type="date"
        placeholder="选择日期">
      </el-date-picker>
    </el-col>
  </el-row>
  <el-row class="row-box">
    <el-col :span="3">
      报名人数上限
    </el-col>
    <el-col :span="19">
      <el-input v-model="activity.maximum" placeholder="请输入报名人数上限" clearable></el-input>
    </el-col>
  </el-row>
  <el-row class="row-box">
    <el-col :span="3">
      自定义已报名人数
    </el-col>
    <el-col :span="8">
      <el-input v-model="activity.set_join_count" placeholder="请输入自定义已报名人数" clearable></el-input>
    </el-col>
    <el-col :span="3">
      自定义报名上限人数
    </el-col>
    <el-col :span="8">
      <el-input v-model="activity.set_maximum" placeholder="请输入自定义报名上限人数" clearable></el-input>
    </el-col>
  </el-row>
  <el-row class="row-box">
    <el-col :span="3">
      活动名称
    </el-col>
    <el-col :span="19">
      <el-input v-model="activity.small_title" placeholder="请输入活动名称" clearable></el-input>
    </el-col>
  </el-row>
  <el-row class="row-box">
    <el-col :span="3">
      报名须知
    </el-col>
    <el-col :span="14" :offset="3">
      <editors @article-changes="articleChanges" :contents="activity.contents" v-if="showEditors"></editors>
    </el-col>
  </el-row>
  <el-row class="row-box">
    <el-col :span="3">
      报名留资
    </el-col>
    <el-col :span="2">
      必填项:
    </el-col>
    <el-col :span="2">
      <el-checkbox v-model="activity.Requiredplace" @change="placeChange">地点</el-checkbox>
    </el-col>
    <el-col :span="16">
      <div v-for="item in activity.place_AllUrbanData">
        <el-input v-model="item.place_address" size="small" placeholder="地点" style="display: inline-block;width:25%;" disabled></el-input>
        <el-input v-model="item.place_number" size="small" placeholder="人数" style="display: inline-block;width:10%;"></el-input>
        <span style="width:10%;">时间段:</span>
        <el-date-picker type="date" size="small" disabled v-model="item.place_start_time" style="display: inline-block;width:20%;"></el-date-picker>
        -
        <el-date-picker type="date" size="small" disabled v-model="item.place_end_time" style="display: inline-block;width:20%;"></el-date-picker>
      </div>
    </el-col>
  </el-row>
  <el-row class="row-box">
    <el-col :span="2" :offset="3" style="border-bottom:1px solid #dcdfe6;">
      <el-checkbox v-model="activity.Requiredfield_date" @change="fieldDataChange">场次时间</el-checkbox>
    </el-col>
    <el-col :span="2" style="border-bottom:1px solid #dcdfe6;">
      <el-checkbox v-model="activity.Requiredwechat_number" @change="wechatChange">微信号</el-checkbox>
    </el-col>
    <el-col :span="2" style="border-bottom:1px solid #dcdfe6;">
      <el-checkbox v-model="activity.Requiredemail" @change="emailChange">E-mail</el-checkbox>
    </el-col>
    <el-col :span="2" style="border-bottom:1px solid #dcdfe6;">
      <el-checkbox v-model="activity.Requiredmailing_address" @change="mailingaddressChange">邮寄地址</el-checkbox>
    </el-col>
    <el-col :span="3" style="border-bottom:1px solid #dcdfe6;">
      <el-checkbox v-model="activity.Requiredpersonnel_surname" @change="personnelSurnameChange">协同人员姓</el-checkbox>
    </el-col>
    <el-col :span="2" style="border-bottom:1px solid #dcdfe6;">
      <el-checkbox v-model="activity.Requiredintentional_vehicle" @change="intentionalChange">意向车型</el-checkbox>
    </el-col>
  </el-row>
  <el-row class="row-box">
    <el-col :span="2" :offset="3">
      选填项:
    </el-col>
    <el-col :span="2">
      <el-checkbox v-model="activity.Selectionplace" @change="isplaceChange">地点</el-checkbox>
    </el-col>
  </el-row>
  <el-row class="row-box">
    <el-col :span="2" :offset="3">
      <el-checkbox v-model="activity.Selectionfield_date" @change="isfieldDataChange">场次时间</el-checkbox>
    </el-col>
    <el-col :span="2">
      <el-checkbox v-model="activity.Selectionwechat_number" @change="iswechatChange">微信号</el-checkbox>
    </el-col>
    <el-col :span="2">
      <el-checkbox v-model="activity.Selectionemail" @change="isemailChange">E-mail</el-checkbox>
    </el-col>
    <el-col :span="2">
      <el-checkbox v-model="activity.Selectionmailing_address" @change="ismailingaddressChange">邮寄地址</el-checkbox>
    </el-col>
    <el-col :span="3">
      <el-checkbox v-model="activity.Selectionpersonnel_surname" @change="ispersonnelSurnameChange">协同人员姓</el-checkbox>
    </el-col>
    <el-col :span="2">
      <el-checkbox v-model="activity.Selectionintentional_vehicle" @change="isintentionalChange">意向车型</el-checkbox>
    </el-col>
  </el-row>
  <el-row class="row-box">
    <el-col :span="3">
      报名结果
    </el-col>
    <el-col :span="19">
      <el-select v-model="activity.popup_status" clearable placeholder="请选择报名结果"  class="select-row">
        <el-option  v-for="item in activeKnow" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-col>
  </el-row>
  <el-row class="row-box">
      <el-col :span="3">
        报名结果提示
      </el-col>
      <el-col :span="14" :offset="3">
        <editorEnd @article-changes="articleChangeEnd" :contentEnd="activity.contentEnd" v-if="showEditorEnd"></editorEnd>
      </el-col>
    </el-row>
  <el-row class="row-box">
    <el-col :span="3">
      是否开启报名
    </el-col>
    <el-col :span="19">
      <el-select v-model="activity.is_start_signup" clearable placeholder="请选择是否开启报名" style="width:100%">
        <el-option v-for="item in isStart" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
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
import Editors from "../../components/Editor/editors.vue";
import EditorEnd from "../../components/Editor/editorend.vue";
export default {
  components: {
    Editor,
    Editors,
    EditorEnd
  },
  data() {
    return {
      showEditor: false,
      showEditors:false,
      showEditorEnd: false,
      isDivision:false,
      action: "",
      host: "",
      fileList2: [],
      activity: {
        article_id: "",
        first_type: "",
        second_type: "",
        title: "",
        picture_path: "",
        content: "",
        contents:"",
        AllUrbanData: [],
        place_AllUrbanData: [],
        // city: "",
        // address: "",
        start_time: "",
        end_time: "",
        sponsor:"",
        maximum:"",
        small_title:"",
        start_registration_time: "",
        end_registration_time: "",
        popup_status:"",
        set_join_count:"",
        set_maximum:"",
        is_start_signup:"",
        // 报名留资
        // 地点
        place: 0,
        Requiredplace: '',
        Selectionplace: '',
        // 场次日期
        field_date: 0,
        Requiredfield_date: '',
        Selectionfield_date: '',
        // 微信号
        wechat_number: 0,
        Requiredwechat_number: '',
        Selectionwechat_number: '',
        // email
        email: 0,
        Requiredemail: '',
        Selectionemail: '',
        // 邮寄地址
        mailing_address: 0,
        Requiredmailing_address: '',
        Selectionmailing_address: '',
        // 协同人员姓
        personnel_surname: 0,
        Requiredpersonnel_surname: '',
        Selectionpersonnel_surname: '',
        // 意向车型
        intentional_vehicle: 0,
        Requiredintentional_vehicle: '',
        Selectionintentional_vehicle: ''
      },
      isStart: [
        {
          value: "1",
          label: "是"
        },
        {
          value: "0",
          label: "否"
        }
      ],
      activityFirstType: [
        {
          value: "FM",
          label: "挚享FM"
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
        },
        /*{
          value: "ACTIVITY",
          label: "活动详情"
        },
        {
          value: "REVIEW",
          label: "活动回顾"
        },*/
        {
          value: "OFFLINESELF",
          label: "线下活动自费"
        },
        {
          value: "OFFLINENONEED",
          label: "线下活动免费(无需0B Call)"
        },
        {
          value: "OFFLINENEED",
          label: "线下活动免费(需要0B Call)"
        },
        {
          value: "ONLINE",
          label: "线上活动"
        },
        {
          value: "SPLENDID",
          label: "精彩集锦"
        }
      ],
      activeKnow:[
        {
          value:"apply",
          label:"报名成功"
        },
        {
          value:"submit",
          label:"提交申请成功"
        }
      ]
    };
  },
  created() {
    var _this = this;
    let article_id = _this.$route.query.article_id;
    let result = post("/manager/activity/detail", { article_id: article_id });
    result.then(function(res) {
      if (res.data.code === "1001") {
        let row = res.data.data;
        console.log(1111, row);
        _this.activity.article_id = article_id;
        _this.activity.first_type = row.first_type;
        _this.activity.second_type = row.second_type;
        _this.activity.title = row.title;
        _this.activity.picture_path = row.picture_path;
        _this.activity.content = row.content;
        _this.activity.contents = row.notes;
        _this.activity.popup_status = row.popup_status;
        _this.activity.AllUrbanData = JSON.parse(row.allurban_data);
        _this.activity.place_AllUrbanData = row.all_site_limit ? JSON.parse(row.all_site_limit) : [];
        // _this.activity.city = row.city;
        // _this.activity.address = row.address;
        _this.activity.start_time = row.start_time;
        _this.activity.end_time = row.end_time;
        // 报名留资具体信息
        _this.activity.place = row.place;
          if (row.place === 0) {
            _this.activity.Requiredplace = false
            _this.activity.Selectionplace = false
          } else if (row.place === 1) {
            _this.activity.Requiredplace = false
            _this.activity.Selectionplace = true
          } else if (row.place ===2) {
            _this.activity.Requiredplace = true
            _this.activity.Selectionplace = false
          }
        _this.activity.field_date = row.field_date;
          if (row.field_date ===0) {
            _this.activity.Requiredfield_date = false
            _this.activity.Selectionfield_date = false
          } else if (row.field_date ===1) {
            _this.activity.Requiredfield_date = false
            _this.activity.Selectionfield_date = true
          } else if (row.field_date ===2) {
            _this.activity.Requiredfield_date = true
            _this.activity.Selectionfield_date = false
          }
        _this.activity.wechat_number = row.wechat_number;
          if (row.wechat_number ===0) {
            _this.activity.Requiredwechat_number = false
            _this.activity.Selectionwechat_number = false
          } else if (row.wechat_number ===1) {
              _this.activity.Requiredwechat_number = false
              _this.activity.Selectionwechat_number = true
          } else if (row.wechat_number ===2) {
              _this.activity.Requiredwechat_number = true
              _this.activity.Selectionwechat_number = false
          }
        _this.activity.email = row.email;
          if (row.email ===0) {
              _this.activity.Requiredemail = false
              _this.activity.Selectionemail = false
          } else if (row.email ===1) {
              _this.activity.Requiredemail = false
              _this.activity.Selectionemail = true
          } else if (row.email ===2) {
              _this.activity.Requiredemail = true
              _this.activity.Selectionemail = false
          }
        _this.activity.mailing_address = row.mailing_address;
          if (row.mailing_address ===0) {
              _this.activity.Requiredmailing_address = false
              _this.activity.Selectionmailing_address = false
          } else if (row.mailing_address ===1) {
              _this.activity.Requiredmailing_address = false
              _this.activity.Selectionmailing_address = true
          } else if (row.mailing_address ===2) {
              _this.activity.Requiredmailing_address = true
              _this.activity.Selectionmailing_address = false
          }
        _this.activity.personnel_surname = row.personnel_surname;
          if (row.personnel_surname ===0) {
              _this.activity.Requiredpersonnel_surname = false
              _this.activity.Selectionpersonnel_surname = false

          } else if (row.personnel_surname ===1) {
              _this.activity.Requiredpersonnel_surname = false
              _this.activity.Selectionpersonnel_surname = true
          } else if (row.personnel_surname ===2) {
              _this.activity.Requiredpersonnel_surname = true
              _this.activity.Selectionpersonnel_surname = false
          }
        _this.activity.intentional_vehicle = row.intentional_vehicle;
          if (row.intentional_vehicle ===0) {
              _this.activity.Requiredintentional_vehicle = false
              _this.activity.Selectionintentional_vehicle = false
          } else if (row.intentional_vehicle ===1) {
              _this.activity.Requiredintentional_vehicle = false
              _this.activity.Selectionintentional_vehicle = true
          } else if (row.intentional_vehicle ===2) {
              _this.activity.Requiredintentional_vehicle = true
              _this.activity.Selectionintentional_vehicle = false
          }
        _this.activity.sponsor = row.sponsor;
        _this.activity.maximum = row.maximum;
        _this.activity.set_join_count = row.set_join_count;
        _this.activity.set_maximum = row.set_maximum;
        _this.activity.small_title = row.small_title;
        _this.activity.start_registration_time = row.start_registration_time;
        _this.activity.end_registration_time = row.end_registration_time;
        _this.activity.is_start_signup = row.is_start_signup;
        _this.activity.contentEnd = row.sign_tips;
        _this.showEditor = true;
        _this.showEditors = true;
        _this.showEditorEnd = true;
        _this.fileList2.push({
          name: "test",
          url: _this.host + row.picture_path
        });

      }
        if (_this.activity.first_type === "FM") {
            _this.isDivision = true;
        }else{
            _this.isDivision = false;
        }
    });
  },
  mounted() {
    //do something after mounting vue instance
    this.host = PORSCHE_HOST;
    this.action = this.host + "/fileupload";
    // console.log(2222, this.action);
  },
  methods: {
      // 地点改变
      placeChange () {
          if (this.activity.Requiredplace === true) {
              if (this.activity.AllUrbanData) {
                  for (var m = 0; m < this.activity.AllUrbanData.length; m++) {
                      this.activity.place_AllUrbanData.push({
                          id: this.activity.AllUrbanData[m].id,
                          place_address: this.activity.AllUrbanData[m].address,
                          place_start_time: this.activity.AllUrbanData[m].current_start_time,
                          place_end_time: this.activity.AllUrbanData[m].current_end_time,
                          place_number: ''
                      })
                  }
              }
              this.activity.Selectionplace = false
              this.activity.place = 2
          } else if (this.activity.Requiredplace === false) {
              this.activity.place = 0
              this.activity.place_AllUrbanData = []
          }

      },
      isplaceChange () {
          if (this.activity.Selectionplace === true) {
              this.activity.Requiredplace = false
              this.activity.place_AllUrbanData = []
              this.activity.place = 1
          } else if (this.activity.Selectionplace === false) {
              this.activity.place = 0
              this.activity.place_AllUrbanData = []
          }
      },
      // 时间场次
      fieldDataChange () {
          if (this.activity.Requiredfield_date === true) {
              this.activity.Selectionfield_date = false
              this.activity.field_date = 2
          } else if (this.activity.Requiredfield_date === false) {
              this.activity.field_date = 0
          }
      },
      isfieldDataChange () {
          if (this.activity.Selectionfield_date === true) {
              this.activity.Requiredfield_date = false
              this.activity.field_date = 1
          } else if (this.activity.Selectionfield_date === false) {
              this.activity.field_date = 0
          }
      },
      // 微信号
      wechatChange () {
          if (this.activity.Requiredwechat_number === true) {
              this.activity.Selectionwechat_number = false
              this.activity.wechat_number = 2
          } else if (this.activity.Requiredwechat_number === false) {
              this.activity.wechat_number = 0
          }
      },
      iswechatChange () {
          if (this.activity.Selectionwechat_number === true) {
              this.activity.Requiredwechat_number = false
              this.activity.wechat_number = 1
          } else if (this.activity.Selectionwechat_number === false) {
              this.activity.wechat_number = 0
          }
      },
      // E-mail
      emailChange () {
          if (this.activity.Requiredemail === true) {
              this.activity.Selectionemail = false
              this.activity.email = 2
          } else if (this.activity.Requiredemail === false) {
              this.activity.email = 0
          }
      },
      isemailChange () {
          if (this.activity.Selectionemail === true) {
              this.activity.Requiredemail = false
              this.activity.email = 1
          } else if (this.activity.Selectionemail === false) {
              this.activity.email = 0
          }
      },
      // 邮寄地址
      mailingaddressChange () {
          if (this.activity.Requiredmailing_address === true) {
              this.activity.Selectionmailing_address = false
              this.activity.mailing_address = 2
          } else if (this.activity.Requiredmailing_address === false) {
              this.activity.mailing_address = 0
          }
      },
      ismailingaddressChange () {
          if (this.activity.Selectionmailing_address === true) {
              this.activity.Requiredmailing_address = false
              this.activity.mailing_address = 1
          } else if (this.activity.Selectionmailing_address === false) {
              this.activity.mailing_address = 0
          }
      },
      // 协同姓
      personnelSurnameChange () {
          if (this.activity.Requiredpersonnel_surname === true) {
              this.activity.Selectionpersonnel_surname = false
              this.activity.personnel_surname = 2
          } else if (this.activity.Requiredpersonnel_surname === false) {
              this.activity.personnel_surname = 0
          }
      },
      ispersonnelSurnameChange () {
          if (this.activity.Selectionpersonnel_surname === true) {
              this.activity.Requiredpersonnel_surname = false
              this.activity.personnel_surname = 1
          } else if (this.activity.Selectionpersonnel_surname === false) {
              this.activity.personnel_surname = 0
          }
      },
      // 意向车型
      intentionalChange () {
          if (this.activity.Requiredintentional_vehicle === true) {
              this.activity.Selectionintentional_vehicle = false
              this.activity.intentional_vehicle = 2
          } else if (this.activity.Requiredintentional_vehicle === false) {
              this.activity.intentional_vehicle = 0
          }
      },
      isintentionalChange () {
          if (this.activity.Selectionintentional_vehicle === true) {
              this.activity.Requiredintentional_vehicle = false
              this.activity.intentional_vehicle = 1
          } else if (this.activity.Selectionintentional_vehicle === false) {
              this.activity.intentional_vehicle = 0
          }
      },
      // 新增城市
      addCity () {
          console.log(1)
          const id = this.activity.AllUrbanData.length + 1
          this.activity.AllUrbanData.push(
              {
                  id: id,
                  city: '',
                  address: '',
                  current_start_time: '',
                  current_end_time: ''
              }
          )
      },
      // 删除其中的城市数据
      DelUrbanData (id) {
          for (var i = 0; i < this.activity.AllUrbanData.length; i++) {
              if (id === this.activity.AllUrbanData[i].id) {
                  this.activity.AllUrbanData.splice(i, 1)
              }
          }
      },
    articleChange(content) {
      // console.log(111, content);
      this.activity.content = this.escape2Html(content);
        console.log(this.activity.content,123456)
    },
    articleChanges(content) {
        this.activity.contents = this.escape2Html(content);
        console.log(this.activity.contents,123456)
    },
    articleChangeEnd(content) {
        this.activity.contentEnd = this.escape2Html(content);
        console.log(this.activity.contentEnd,123456)
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
    secondTypeSelect() {
      var _this = this;
      _this.activity.second_type = "";
      if (_this.activity.first_type === "FM") {
        _this.activitySecondType = [
          {
            value: "CONTENT",
            label: "资讯详情"
          }/*,
          {
            value: "ACTIVITY",
            label: "活动详情"
          },
          {
            value: "REVIEW",
            label: "活动回顾"
          }*/
        ];
          _this.isDivision = true;
      } else if (_this.activity.first_type === "OFFLINE") {
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
          _this.isDivision = false;
      }
    },

    add() {
      let _this = this;
        for (var j = 0; j < _this.activity.AllUrbanData.length; j++) {
            _this.activity.AllUrbanData[j].current_start_time = new Date(_this.activity.AllUrbanData[j].current_start_time).getTime()
            _this.activity.AllUrbanData[j].current_end_time = new Date(_this.activity.AllUrbanData[j].current_end_time).getTime()
        }
      console.log(111, this.activity.content, 222);
        console.log(111, this.activity.contents, 222);
      let result = post("/manager/activity/edit", {
          article_id: _this.activity.article_id,
          first_type: _this.activity.first_type,
          second_type: _this.activity.second_type,
          popup_status:_this.activity.popup_status,
          title: _this.activity.title,
          picture_path: _this.activity.picture_path,
          content: _this.activity.content,
          notes: _this.activity.contents,
          set_join_count: _this.activity.set_join_count,
          set_maximum: _this.activity.set_maximum,
          allurban_data: JSON.stringify(_this.activity.AllUrbanData),
          all_site_limit: JSON.stringify(_this.activity.place_AllUrbanData),
          // city: _this.activity.city,
          // address: _this.activity.address,
          start_time: new Date(_this.activity.start_time).getTime().toString(),
          end_time: new Date(_this.activity.end_time).getTime().toString(),
          place: _this.activity.place,
          field_date: _this.activity.field_date,
          wechat_number: _this.activity.wechat_number,
          email: _this.activity.email,
          mailing_address: _this.activity.mailing_address,
          personnel_surname: _this.activity.personnel_surname,
          intentional_vehicle: _this.activity.intentional_vehicle,
          sponsor:_this.activity.sponsor,
          maximum:_this.activity.maximum,
          small_title:_this.activity.small_title,
          start_registration_time: new Date(_this.activity.start_registration_time).getTime().toString(),
          end_registration_time: new Date(_this.activity.end_registration_time).getTime().toString(),
          is_start_signup: _this.activity.is_start_signup,
          sign_tips: _this.activity.contentEnd
      });
      result.then(res => {
        if (res.data.code === "1001") {
          _this.$message({
            message: res.data.message,
            type: "success"
          });
          _this.$router.push({
            path: "/activity/list"
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
    },
    handleChange(response, file, fileList) {
      this.activity.picture_path = file.response.data.picture_path;
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
.isDivision{
  width: 100%;
  border-bottom: 1px solid #000;
  margin-bottom: 20px;
  padding-bottom: 20px;
}
</style>
