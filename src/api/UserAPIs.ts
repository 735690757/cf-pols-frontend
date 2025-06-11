import {http} from "../utils/http.ts";
import {useCommonStore} from "../store/CommonStore.ts";
import router from "../router";
import {notification} from "ant-design-vue";
import {h} from "vue";
import {SmileOutlined} from "@ant-design/icons-vue";

// 封装一个通知
const aliNotification = (message: string, description: string, duration: number) => {
    notification.open(
        {
            message: message,
            description: description,
            duration: duration,
            icon: () => h(SmileOutlined, {style: 'color: #108ee9'}),
            top: 100
        }
    )
}
/**
 * 用户注册
 * @param data
 */
export const register = (data: any) => {
    const commonStore = useCommonStore();
    return http.post(commonStore.baseURL + 'user/register', data)
}

/**
 * 用户登录
 * @param data
 */
export const login = (data: any) => {
    const commonStore = useCommonStore();
    return http.post(commonStore.baseURL + 'user/login', data)
}

/**
 * 检测登录状态
 */
export const checkLogin = () => {
    let token = localStorage.getItem("token");
    if (token === null) {
        aliNotification("登录信息有误或过期", "请重新登录", 6)
        router.push('/')
    }
    const commonStore = useCommonStore();
    http.get(commonStore.baseURL + 'user/checkLogin', {
        headers: {
            satoken: token
        }
    }).then((res: any) => {
        if (res.data.code === 200) {
            aliNotification("登录校验成功", "欢迎回来", 1)
        } else {
            aliNotification("登录信息有误或过期", "请重新登录", 6)
            router.push('/')
        }
    })
}

/**
 * 退出登录
 */
export const logOut = () => {
    let token = localStorage.getItem("token");
    localStorage.removeItem('token')
    return http.get(useCommonStore().baseURL + 'user/logout', {
        headers: {
            satoken: token
        }
    })
}

/**
 * 获取当前用户信息
 */
export const getUserInfo = () => {
    let token = localStorage.getItem("token");
    return http.get(useCommonStore().baseURL + 'user/getCurrentUser', {
        headers: {
            satoken: token
        }
    })
}

/**
 * 更新用户信息
 * @param data
 */
export const updateUserInfo = (data: any) => {
    return http.post(useCommonStore().baseURL + 'user/updateCurrentUser', data,)
}

/**
 * 获取用户登录日志
 */
export const getUserLoginLog = () => {
    return http.get(useCommonStore().baseURL + 'user/getUserLoginLog')
}

/**
 * 获取所有用户
 */
export const getAllUser = () => {
    return http.get(useCommonStore().baseURL + 'user/getAllAdminUser')
}

/**
 * 切换用户封禁状态
 * @param id
 * @param status
 */
export const switchBanStatus = (id: any, status: any) => {
    return http.get(useCommonStore().baseURL + 'user/switchBanStatus' + '?id=' + id + '&banStatus=' + status)
}

/**
 * 添加管理员用户
 * @param data
 */
export const addAdminUserRequest = (data: any) => {
    return http.post(useCommonStore().baseURL + 'user/addAdminUser', data)
}

/**
 * 删除用户
 * @param id
 */
export const deleteUserRequest = (id: any) => {
    return http.get(useCommonStore().baseURL + 'user/deleteUser' + '?id=' + id)
}

/**
 * 模糊搜索用户
 * @param data
 */
export const searchUserRequest = (data: any) => {
    return http.get(useCommonStore().baseURL + 'user/searchUser' + '?keyword=' + data)
}

/**
 * 获取身份为教师的用户
 */
export const getAllTeacherUser = () => {
    return http.get(useCommonStore().baseURL + 'user/getAllTeacherUser')
}

/**
 * 获取身份为教师的用户分页
 * @param pageModel
 */
export const getAllTeacherUserByPage = (pageModel: any) => {
    return http.post(useCommonStore().baseURL + 'user/getAllTeacherUserByPage', pageModel)
}

/**
 * 添加教师
 * @param data
 */
export const addTeacherUserRequest = (data: any) => {
    return http.post(useCommonStore().baseURL + 'user/addTeacherUser', data)
}

/**
 * 模糊搜索教师用户
 * @param data
 */
export const searchTeacherUserRequest = (data: any) => {
    return http.get(useCommonStore().baseURL + 'user/searchTeacherUser' + '?keyword=' + data)
}

/**
 * 获取身份为学生的用户
 */
export const getAllStudentUser = () => {
    return http.get(useCommonStore().baseURL + 'user/getAllStudentUser')
}

/**
 * 获取身份为学生的用户分页
 * @param pageModel
 */
export const getAllStudentUserByPage = (pageModel: any) => {
    return http.post(useCommonStore().baseURL + 'user/getAllStudentUserByPage', pageModel)
}

/**
 * 添加学生
 * @param data
 */
export const addStudentUserRequest = (data: any) => {
    return http.post(useCommonStore().baseURL + 'user/addStudentUser', data)
}

/**
 * 模糊搜索学生用户
 * @param data
 */
export const searchStudentUserRequest = (data: any) => {
    return http.get(useCommonStore().baseURL + 'user/searchStudentUser' + '?keyword=' + data)
}

/**
 * 获取用户学习点
 */
export const getFundRequest = () => {
    return http.get(useCommonStore().baseURL + 'user/getFund')
}

/**
 * 根据用户ID获取用户头像
 * @param id
 */
export const getUserAvatarByIdRequest = (id: any) => {
    return http.get(useCommonStore().baseURL + 'user/getUserAvatarById' + '?id=' + id)
}

/**
 * 获取当前用户信息
 */
export const whoAmIRequest = () => {
    return http.get(useCommonStore().baseURL + 'user/whoami')
}

/**
 * 获取用户登录日志次数
 */
export const getUserLoginLogTimes = () => {
    return http.get(useCommonStore().baseURL + 'user/getUserLoginLogTimes')
}

/**
 * 根据用户名获取用户头像
  * @param username
 */
export const getUserAvatarByUsernameRequest = (username: any) => {
    return http.get(useCommonStore().baseURL + 'user/getUserAvatarByUsername' + '?username=' + username)
}
/**
 * 获取用户学习点
  */
export const getUserFundRequest = () => {
    return http.get(useCommonStore().baseURL + 'user/getUserFund')
}

/**
 * 根据用户ID获取用户头像
  * @param id
 */
export const getTeacherInfoByIdRequest = (id: any) => {
    return http.get(useCommonStore().baseURL + 'user/getTeacherInfoById' + '?id=' + id)
}
/**
 * 获取教师学习点
 * @param teacherId
 */
export const getTeacherFundRequest = (teacherId: any) => {
    return http.get(useCommonStore().baseURL + 'user/getTeacherFund' + '?teacherId=' + teacherId)
}

/**
 * 获取用户成分
 */
export const getUserRatioRequest = () => {
    return http.get(useCommonStore().baseURL + 'user/getUserRatio')
}