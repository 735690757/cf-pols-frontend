import {http} from "../utils/http.ts";
import {useCommonStore} from "../store/CommonStore.ts";

/**
 * 获取评论
 * @param courseId
 */
export const getCommentRequest = (courseId: any) => {
    return http.get(useCommonStore().baseURL + `comment/getComment/${courseId}`)
}

/**
 * 添加评论
 * @param data
 */
export const addCommentRequest = (data: any) => {
    return http.post(useCommonStore().baseURL + "comment/addComment", data)
}
/**
 * 删除评论
 * @param id
 */
export const deleteCommentRequest = (id: any) => {
    return http.get(useCommonStore().baseURL + `comment/deleteComment/${id}`)
}

/**
 * 恢复评论
 * @param id
 */
export const recoverCommentRequest = (id: any) => {
    return http.get(useCommonStore().baseURL + `comment/recoverComment/${id}`)
}

/**
 * 点赞评论
 * @param id
 */
export const likeCommentRequest = (id: any) => {
    return http.get(useCommonStore().baseURL + `comment/likeComment/${id}`)
}

/**
 * 获取讲师评论
 * @param teacherId
 */
export const getTeacherCommentRequest = (teacherId: any) => {
    return http.get(useCommonStore().baseURL + `comment/getTeacherComment?teacherId=${teacherId}`)
}

/**
 * 获取课程评论
 * @param courseId
 */
export const getCourseCommentRequest = (courseId: any) => {
    return http.get(useCommonStore().baseURL + `comment/getCourseComment?courseId=${courseId}`)
}