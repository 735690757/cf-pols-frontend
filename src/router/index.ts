import {createRouter, createWebHistory} from 'vue-router'
import LoginView from "../view/LoginView.vue";
import SuccessView from "../view/SuccessView.vue";
import PrivacyPolicyView from "../view/PrivacyPolicyView.vue";
import AdminMainView from "../view/AdminMainView.vue";
import StudentMainView from "../view/StudentMainView.vue";
import TeacherMainView from "../view/TeacherMainView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/test',
            name: 'test',
            component: () => import('../view/TestView.vue')
        },
        {
            path: '/',
            name: 'login',
            component: LoginView

        }, {
            path: '/login',
            name: 'loginX',
            component: LoginView,
        }, {
            path: '/success',
            name: 'success',
            component: SuccessView
        },
        {
            path: '/privacy',
            name: 'privacy',
            component: PrivacyPolicyView
        }, {
            path: '/admin',
            name: 'adminView',
            component: AdminMainView,
            children: [
                {
                    path: 'DataVisualizationA',
                    name: 'DataVisualizationA',
                    component: () => import('../view/AdminView/DataVisualizationView.vue')
                }, {
                    path: 'YourselfA',
                    name: 'YourselfA',
                    component: () => import('../view/AdminView/YourselfView.vue')
                }, {
                    path: 'AdminManagement',
                    name: 'AdminManagement',
                    component: () => import('../view/AdminView/UserManagement/AdminManagementView.vue')
                }, {
                    path: 'StudentManagement',
                    name: 'StudentManagement',
                    component: () => import('../view/AdminView/UserManagement/StudentManagementView.vue')
                }, {
                    path: 'TeacherManagement',
                    name: 'TeacherManagement',
                    component: () => import('../view/AdminView/UserManagement/TeacherManagementView.vue')
                }, {
                    path: 'BannerManagement',
                    name: 'BannerManagement',
                    component: () => import('../view/AdminView/BannerManagement.vue')
                }, {
                    path: 'chatroom',
                    name: 'chatroomAdmin',
                    component: () => import('../view/CommonView/ChatRoomForATView.vue')
                }, {
                    path: 'SystemSettings',
                    name: 'SystemSettings',
                    component: () => import('../view/AdminView/SystemSettingsView.vue')
                }, {
                    path: 'PayoutManagement',
                    name: 'PayoutManagement',
                    component: () => import('../view/AdminView/PayoutManagementView.vue')
                }, {
                    path: 'AllCourseView',
                    name: 'AllCourseView',
                    component: () => import('../view/AdminView/AllCoursesView.vue')
                }, {
                    path: 'AdminCourseContentView',
                    name: 'AdminCourseContentView',
                    component: () => import('../view/AdminView/AdminCourseContentView.vue')
                }, {
                    path: 'InnerOrderView',
                    name: 'InnerOrderView',
                    component: () => import('../view/AdminView/InnerOrderView.vue')
                }, {
                    path: 'OuterOrderView',
                    name: 'OuterOrderView',
                    component: () => import('../view/AdminView/OuterOrderView.vue')
                }, {
                    path: 'RecommendManagement',
                    name: 'RecommendManagement',
                    component: () => import('../view/AdminView/RecommendManagementView.vue')
                }, {
                    path: 'CorrelationHeaMap',
                    name: 'CorrelationHeaMap',
                    component: () => import('../view/AdminView/UserCourseRexView.vue')
                }
            ]
        }, {
            path: '/student',
            name: 'studentView',
            component: StudentMainView
        }, {
            path: '/student/pe',
            name: 'pe',
            component: () => import('../view/StudentView/PaintedEggshellView.vue')

        }, {
            path: '/student/recharge',
            name: 'recharge',
            component: () => import('../view/StudentView/RechargeView.vue')
        }, {
            path: '/student/courseDetail',
            name: 'courseDetail',
            component: () => import('../view/StudentView/CourseDetailView.vue')
        }, {
            path: '/student/aiChat',
            name: 'aiChat',
            component: () => import('../view/StudentView/AIChatView.vue')
        }, {
            path: '/student/chatroom',
            name: 'chatroom',
            component: () => import('../view/CommonView/ChatRoomView.vue')
        }, {
            path: '/student/yourself',
            name: 'course',
            component: () => import('../view/StudentView/StudentYourselfView.vue'),
            children: [
                {
                    path: 'changenickname',
                    name: 'ChangeNickname',
                    component: () => import('../view/StudentView/Yourself/ChangeNicknameView.vue')
                },
                {
                    path: 'changepassword',
                    name: 'ChangePassword',
                    component: () => import('../view/StudentView/Yourself/ChangePasswordView.vue')
                }, {
                    path: 'changeavatar',
                    name: 'ChangeAvatar',
                    component: () => import('../view/StudentView/Yourself/ChangeAvatarView.vue')
                }
            ]
        }, {
            path: '/student/pay',
            name: 'pay',
            component: () => import('../view/StudentView/PaymentView.vue')
        }, {
            path: '/student/coursePlay',
            name: 'coursePlay',
            component: () => import('../view/StudentView/CoursePlayCoreView.vue')
        }, {
            path: '/student/myCourse',
            name: 'myCourse',
            component: () => import('../view/StudentView/MyCourseView.vue')
        }, {
            path: '/student/memorandum',
            name: 'memorandum-core',
            component: () => import('../view/StudentView/MyMemorandumView.vue')
        }, {
            path: '/teacher',
            name: 'teacherView',
            component: TeacherMainView,
            children: [
                {
                    path: 'DataVisualizationT',
                    name: 'DataVisualizationT',
                    component: () => import('../view/TeacherView/TeacherDataVisualizationView.vue')
                }, {
                    path: 'YourselfT',
                    name: 'YourselfT',
                    component: () => import('../view/TeacherView/TeacherYourselfView.vue')
                }, {
                    path: 'FreeCourse',
                    name: 'FreeCourse',
                    component: () => import('../view/TeacherView/MyCourse/MyCoursesView.vue')
                }, {
                    path: 'MyCourseContent',
                    name: 'MyCourseContent',
                    component: () => import('../view/TeacherView/MyCourse/EditCourseContent.vue')
                }, {
                    path: 'CommentManagement',
                    name: 'CommentManagement',
                    component: () => import('../view/TeacherView/MyCourse/CommentManagementView.vue')
                }, {
                    path: 'chatroom',
                    name: 'chatroomTeacher',
                    component: () => import('../view/CommonView/ChatRoomForATView.vue')
                }, {
                    path: 'earnings',
                    name: 'earnings',
                    component: () => import('../view/TeacherView/EarningsView.vue')
                }, {
                    path: 'earningHistory',
                    name: 'earningHistory',
                    component: () => import('../view/TeacherView/EarningsHistoryView.vue')
                }
            ]
        }
    ]
})

export default router
