import {http} from "../utils/http.ts";
import {useCommonStore} from "../store/CommonStore.ts";

/**
 * 开课
 * @param data
 */
export const openCourseRequest = (data: any) => {
    return http.post(useCommonStore().baseURL + "course/addCourse", data)
}

/**
 * 上传课程封面
 * @param fromData
 */
export const addCourseCoverRequest = (fromData: any) => {
    return http.post(useCommonStore().baseURL + "course/addCourseCover", fromData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}

/**
 * 获取课程列表
 * @param data
 */
export const getCourseListRequest = () => {
    return http.get(useCommonStore().baseURL + "course/getCourseList")
}
/**
 * 更新课程
 * @param data
 */
export const updateCourseRequest = (data: any) => {
    return http.post(useCommonStore().baseURL + "course/updateCourse", data)
}
/**
 * 根据课程ID更新课程状态
 * @param data
 */
export const updateCourseStatusRequest = (data: any) => {
    return http.post(useCommonStore().baseURL + "course/updateCourseStatus", data)
}
/**
 * 根据课程ID删除课程(逻辑删除)
 * @param data
 */
export const deleteCourseRequest = (data: any) => {
    return http.get(useCommonStore().baseURL + "course/deleteCourse" + "?courseID=" + data)
}

/**
 * 获得该教师的课程名及浏览量等数据（ECharts）
 */
export const getCourseDataECharts = () => {
    return http.get(useCommonStore().baseURL + "course/getCourseDataECharts")
}

/**
 * 获得所有已发布课程
 */
export const getAllPublishCourseRequest = () => {
    return http.get(useCommonStore().baseURL + "course/getAllPublishCourse")
}

/**
 * 根据课程ID获取课程信息
 * @param id
 */
export const getCourseByIdRequest = (id: any) => {
    return http.get(useCommonStore().baseURL + "course/getCourseById" + "?courseId=" + id)
}

/**
 * 课程浏览量 + 1
 * @param id
 */
export const addViewCountRequest = (id: any) => {
    return http.get(useCommonStore().baseURL + "course/addViewCount" + "?courseId=" + id)
}

/**
 * 根据课程ID获取课程价格
 * @param id
 */
export const getCoursePriceRequest = (id: any) => {
    return http.get(useCommonStore().baseURL + "course/getCoursePrice/" + id)
}

/**
 * 根据课程ID获取课程信息
 * @param courseId
 */
export const getCourseInfoRequest = (courseId: any) => {
    return http.get(useCommonStore().baseURL + "course/getCourseInfo/" + courseId)
}


/**
 * 获得所有课程数据（ECharts）
 */
export const getAllCourseDataECharts = () => {
    return http.get(useCommonStore().baseURL + "course/getAllCourseDataECharts")
}

/**
 * 获得所有课程
 */
export const getAllCourseRequest = () => {
    return http.get(useCommonStore().baseURL + "course/getAllCourse")
}

/**
 * 根据课程名模糊查询课程
 * @param courseName
 */
export const getCourseByFuzzyRequest = (courseName: any) => {
    return http.get(useCommonStore().baseURL + "course/getCourseByFuzzy" + "?courseName=" + courseName)
}

/**
 * 获得所有付费课程
 */
export const getPayCourseRequest = () => {
    return http.get(useCommonStore().baseURL + "course/getPayCourse")
}

/**
 * 添加推荐课程
 * @param courseId
 */
export const addRecommendCourseRequest = (courseId: any) => {
    return http.get(useCommonStore().baseURL + "course/addRecommendCourse" + "?courseId=" + courseId)
}

/**
 * 将指定课程从推荐列表中移除
 * @param courseId
 */
export const removeRecommendCourseRequest = (courseId: any) => {
    return http.get(useCommonStore().baseURL + "course/removeRecommendCourse" + "?courseId=" + courseId)
}

/**
 * 检查课程是否在推荐列表中
 * @param courseId
 */
export const checkRecommendCourseRequest = (courseId: any) => {
    return http.get(useCommonStore().baseURL + "course/checkRecommendCourse" + "?courseId=" + courseId)
}

/**
 * 获得推荐课程
 */
export const getRecommendCourseRequest = () => {
    return http.get(useCommonStore().baseURL + "course/getRecommendCourse")
}

/**
 * 获得课程分页数据
 *
 * @param pageVO
 */
export const getCourseByPageRequest = (pageVO: any) => {
    return http.post(useCommonStore().baseURL + "course/getCourseByPage", pageVO)
}

/**
 * 根据用户ID和课程ID查询用户是否已购买该课程
 *
 * @param userId1 用户ID1
 * @param userId2 用户ID2
 */
export const getUserCourseDoubleIDRequest = (userId1: any, userId2: any) => {
    return http.get(useCommonStore().baseURL + "course/getUserCourseDoubleID" + "?userId1=" + userId1 + "&userId2=" + userId2)
}

