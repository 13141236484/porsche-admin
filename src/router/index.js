import Vue from 'vue';
import Router from 'vue-router';
import Home from '../Containers/Home/index.vue';
import UserRegisterList from '../Containers/UserRegister/index.vue';
import UserRegisterDetail from '../Containers/UserRegister/detail.vue';
import UserNotification from '../Containers/UserRegister/notification';
import UserAllList from "../Containers/UserAll";
import UserUpdateList from "../Containers/UserUpdate";
import UserInvite from "../Containers/UserInvite";
import UserUpdateDetail from "../Containers/UserUpdate/detail.vue";
import NotificationFeedBackList from "../Containers/NotificationFeedback/index";
import NotificationFeedBackUserDetail from "../Containers/NotificationFeedback/userDetail";
import NotificationFeedBackReply from "../Containers/NotificationFeedback/msgreply.vue";
import NotificationPush from "../Containers/NotificationPush";
import DealerQueryList from "../Containers/DealerQuery";
import DealerQueryUserDetail from "../Containers/DealerQuery/userDetail";
import DealerQueryNotificationList from "../Containers/DealerQuery/NotificationList";
import DealerTrailDriveList from "../Containers/DealerTrailDrive";
import DealerTrailUserDetail from "../Containers/DealerTrailDrive/userDetail";
import DealerTrailNotificationList from "../Containers/DealerTrailDrive/NotificationList";
import ActivityList from "../Containers/ActivityList";
import ActivityNotificationPush from "../Containers/ActivityList/Notification";
import ActivityUserList from "../Containers/ActivityList/userList.vue";
import ActivityCommentList from "../Containers/ActivityList/commentList.vue";
import ActivityEdit from "../Containers/ActivityList/activityEdit.vue";
import ActivityCreate from "../Containers/ActivityCreate";
import ReviewShowList from "../Containers/Review/MemberShow";
import ReviewShowEdit from "../Containers/Review/MemberShowEdit";

import ShowCommentList from "../Containers/Review/ShowCommentList";

import ReviewDriveList from "../Containers/Review/DriveStar";
import DriverCommentList from "../Containers/Review/DriverCommentList";
import DriverEdit from "../Containers/Review/DriverEdit";
import DriverAdd from "../Containers/Review/DriverAdd";

import PictureList from "../Containers/PictureList";
import PictureUpdate from "../Containers/PictureList/pictureUpdate";
import PictureAdd from "../Containers/PictureAdd";
import content from '../components/content/index.vue';
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'content',
      component: content,
      redirect: '/home',
      children: [

        {
          path: 'home',
          component: Home
        },
        {
          path: 'user/register/list',
          component: UserRegisterList
        },
        {
          path: 'user/register/detail',
          component: UserRegisterDetail
        },
        {
          path: 'user/register/notification',
          component: UserNotification
        },
        {
          path: 'user/all/list',
          component: UserAllList
        },
        {
          path: 'user/invite',
          component: UserInvite
        },
        {
          path: 'user/update/list',
          component: UserUpdateList
        },
        {
          path: 'user/update/detail',
          component: UserUpdateDetail
        },
        {
          path: 'notification/feedback/list',
          component: NotificationFeedBackList
        },
        {
          path: 'notification/feedback/user/detail',
          component: NotificationFeedBackUserDetail
        },
        {
          path: 'notification/feedback/reply',
          component: NotificationFeedBackReply
        },
        {
          path: 'notification/push',
          component: NotificationPush
        },
        {
          path: 'dealer/query/list',
          component: DealerQueryList
        },
        {
          path: 'dealer/query/user/detail',
          component: DealerQueryUserDetail
        },
        {
          path: 'dealer/query/notification/list',
          component: DealerQueryNotificationList
        },
        {
          path: 'dealer/trail/drive/list',
          component: DealerTrailDriveList
        },
        {
          path: 'dealer/trail/user/detail',
          component: DealerTrailUserDetail
        },
        {
          path: 'dealer/trail/notification/list',
          component: DealerTrailNotificationList
        },
        {
          path: 'activity/list',
          component: ActivityList
        },
        {
          path: 'activity/user/list',
          component: ActivityUserList
        },
        {
          path: 'activity/notification/push',
          component: ActivityNotificationPush
        },
        {
          path: 'activity/comment/list',
          component: ActivityCommentList
        },
        {
          path: 'activity/edit',
          component: ActivityEdit
        },
        {
          path: 'activity/create',
          component: ActivityCreate
        },


        {
          path: 'review/show/list',
          component: ReviewShowList
        },
        {
          path: 'review/show/edit',
          component: ReviewShowEdit
        },
        {
          path: 'review/show/comment/list',
          component: ShowCommentList
        },
        {
          path: 'review/driver/list',
          component: ReviewDriveList
        },
        {
          path: 'review/driver/comment/list',
          component: DriverCommentList
        },
        {
          path: 'review/driver/edit',
          component: DriverEdit
        },
        {
          path: 'review/driver/add',
          component: DriverAdd
        },
        {
          path: 'picture/list',
          component: PictureList
        },
        {
          path: 'picture/update',
          component: PictureUpdate
        },
        {
          path: 'picture/add',
          component: PictureAdd
        }
      ]
    }
  ]
});
