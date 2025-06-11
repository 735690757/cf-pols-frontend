import {http} from "../utils/http.ts";
import {useCommonStore} from "../store/CommonStore.ts";

/**
 * 获取管理员数据展示
 */
export const getAdminDataShowRequest = () => {
    return http.get(useCommonStore().baseURL + "dataVisual/adminDataShow")
}

/**
 * 获取课程数据展示
 * @param courseId 课程ID
 */
export const getCourseScoreRequest = (courseId: any) => {
    return http.get(useCommonStore().baseURL + "dataVisual/getCourseScore?courseId=" + courseId)
}

/**
 * 获取所有课程评分数据展示
 */
export const getAllCourseScoreRequest = () => {
    return http.get(useCommonStore().baseURL + "dataVisual/getAllCourseScore")
}

/**
 * 获取课程资金趋势数据展示
 * @param courseId 课程ID
 */
export const getCourseFundTrendRequest = (courseId: any) => {
    return http.get(useCommonStore().baseURL + "dataVisual/getCourseFundTrend?courseId=" + courseId)
}