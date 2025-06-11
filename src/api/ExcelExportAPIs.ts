import {useCommonStore} from "../store/CommonStore.ts";

/**
 * 管理员数据导出
 */
export const getAdminDataShowRequest = () => {
    window.location.href = useCommonStore().baseURL + "excel/admin";
}

/**
 * 教师数据导出
 */
export const getTeacherDataShowRequest = () => {
    window.location.href = useCommonStore().baseURL + "excel/teacher";
}
/**
 * 学生数据导出
 */
export const getStudentDataShowRequest = () => {
    window.location.href = useCommonStore().baseURL + "excel/student";
}

/**
 * 课程数据导出
 */
export const getCourseDataShowRequest = () => {
    window.location.href = useCommonStore().baseURL + "excel/course";
}