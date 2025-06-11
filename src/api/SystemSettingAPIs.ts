import {http} from "../utils/http.ts";
import {useCommonStore} from "../store/CommonStore.ts";

/**
 * 更新系统设置
 * @param data
 */
export const updateSystemSettingRequest = (data: any) => {
    return http.post(useCommonStore().baseURL + "setting/update", data)
}
/**
 * 获取系统设置
 */
export const getSystemSettingRequest = () => {
    return http.get(useCommonStore().baseURL + "setting/get")
}

/**
 * 获取CPU使用率
 */
export const getCpuUsageRequest = () => {
    return http.get(useCommonStore().baseURL+ "setting/getCpuUsage")
}

/**
 * 获取内存使用率
 */
export const getMemoryUsageRequest = () => {
    return http.get(useCommonStore().baseURL + "setting/getMemoryUsage")
}