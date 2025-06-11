import {http} from "../utils/http.ts";
import {useCommonStore} from "../store/CommonStore.ts";

/**
 * 添加备忘录
 * @param memorandum 备忘录
 */
export const addMemorandum = (memorandum: any) => {
    return http.post(useCommonStore().baseURL + "memorandum/add", memorandum);
};

/**
 * 获取用户备忘录
 * @param userId 用户id
 */
export const getMemorandumRequest = (userId: any) => {
    return http.get(useCommonStore().baseURL + "memorandum/get/" + userId);
};

/**
 * 删除备忘录
 * @param id 用户ID
 */
export const deleteMemorandumRequest = (id: any) => {
    return http.delete(useCommonStore().baseURL + "memorandum/delete/" + id);
};