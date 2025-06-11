import {http} from "../utils/http.ts";
import {useCommonStore} from "../store/CommonStore.ts";

/**
 * 根据课程ID获取课程小节
 * @param courseID
 */
export const getCourseSectionRequest = (courseID: any) => {
    return http.get(useCommonStore().baseURL + "courseContent/getCourseSection" + "?courseID=" + courseID)

}
/**
 * 添加课程小节
 * @param data
 */
export const addCourseSectionRequest = (data: any) => {
    return http.post(useCommonStore().baseURL + "courseContent/addCourseSection", data)
}
/**
 * 修改课程小节
 * @param data
 */
export const updateCourseSectionRequest = (data: any) => {
    return http.post(useCommonStore().baseURL + "courseContent/updateCourseSection", data)
}

/**
 * 修改删除状态
 * @param cCid
 * @param deleteFlag
 */
export const updateDeleteFlagRequest = (cCid: any, deleteFlag: any) => {
    return http.get(useCommonStore().baseURL + "courseContent/updateDeleteFlag?"+"id="+cCid+"&deleteStatus="+deleteFlag)
}

/**
 * 根据课程小节ID追加课程内容（MD5）
 * @param cid
 * @param courseContent
 */
export const addCourseContentRequest = (cid: any, courseContent: any) => {
    const formData = new FormData();
    formData.append("courseContent", courseContent.value[0].originFileObj as any);
    formData.append("cid", cid);
    return http.post(useCommonStore().baseURL + "courseContent/addCourseContent", formData)
}

/**
 * 根据课程小节ID获取课程内容数量
  * @param cid
 */
export const getCourseContentCountRequest = (cid: any) => {
    return http.get(useCommonStore().baseURL + "courseContent/getCourseContentCount" + "?courseId=" + cid)
}

/**
 * 上传课程内容学习进度
 * @param learningProgressD
 */
export const updateCourseContentProgressRequest = (learningProgressD: any) => {
    return http.post(useCommonStore().baseURL + "courseContent/updateCourseContentProgress", learningProgressD)
}