import {http} from "../utils/http.ts";
import {useCommonStore} from "../store/CommonStore.ts";

/**
 * 获取推荐课程
 * @param userId 用户id
 */
export const getRecommendCourseRequest = (userId: any) => {
    return http.get(useCommonStore().baseURL + "courseRecommendCont/getRecommendCourse" + "?userId=" + userId)
}

/**
 * 获取热度矩阵
 */
export const getHeatMatrixRequest = () => {
    return http.get(useCommonStore().baseURL + "courseRecommendCont/getHeatMatrix")
}