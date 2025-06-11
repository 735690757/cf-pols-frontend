import {http} from "../utils/http.ts";
import {useCommonStore} from "../store/CommonStore.ts";


/**
 * 检查用户是否购买了该课程
 * @param userId
 * @param courseId
 */
export const checkBuyCourseRequest = (userId: any, courseId: any) => {
    return http.get(useCommonStore().baseURL + "order/checkBuyCourse" + "?userId=" + userId + "&courseId=" + courseId)
}
/**
 * 购买课程
 * @param userId
 * @param courseId
 */
export const buyCourseRequest = (userId: any, courseId: any) => {
    return http.post(useCommonStore().baseURL + "order/buyCourse", {
        userId: userId,
        courseId: courseId
    })
}
/**
 * 根据用户ID获取已购买的课程
 * @param userId
 */
export const getBuyCourseRequest = (userId: any) => {
    return http.get(useCommonStore().baseURL + "order/getBuyCourse?userId=" + userId)
}

/**
 * 评价课程
 * @param rateOrderVO
 */
export const rateCourseRequest = (rateOrderVO: any) => {
    return http.post(useCommonStore().baseURL + "order/rateCourse", rateOrderVO)
}

/**
 * 获取课程评价
 * @param rateOrderVO
 */
export const getCourseRateRequest = (rateOrderVO: any) => {
    return http.post(useCommonStore().baseURL + "order/getCourseRate?", rateOrderVO)
}

/**
 * 获取老师收入
 * @param teacherId
 */
export const getTeacherEarningRequest = (teacherId: any) => {
    return http.get(useCommonStore().baseURL + "order/getTeacherEarning" + "?teacherId=" + teacherId)
}

/**
 * 获取老师订单数量
 * @param teacherId
 */
export const getTeacherOrderCountRequest = (teacherId: any) => {
    return http.get(useCommonStore().baseURL + "order/getTeacherOrderCount" + "?teacherId=" + teacherId)
}

/**
 * 获取用户已购买课程
 * @param uid
 */
export const getBuyCourseByUidRequest = (uid: any) => {
    return http.get(useCommonStore().baseURL + "order/getBuyCourseByUid" + "?uid=" + uid)
}

/**
 * 获取用户已购买课程
 * @param uid
 */
export const getTeacherCourseByUidRequest = (uid: any) => {
    return http.get(useCommonStore().baseURL + "order/getTeacherCourseByUid" + "?uid=" + uid)
}

/**
 * 获取系统订单
 */
export const getSystemOrderRequest = () => {
    return http.get(useCommonStore().baseURL + "order/getSystemOrder")
}

/**
 * 获取我的订单
 */
export const getMyOrderRequest = () => {
    return http.get(useCommonStore().baseURL + "alipay/getMyOrder")
}