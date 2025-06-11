import {http} from "../utils/http.ts";
import {useCommonStore} from "../store/CommonStore.ts";

/**
 * 提现申请
 * @param data 提现信息
 */
export const addPayoutRequest = (data: any) => {
    return http.post(useCommonStore().baseURL + "payout/addPayout", data);
}

/**
 * 获取教师提现记录
 * @param teacherId 教师ID
 */
export const getTeacherPayoutRequest = (teacherId: any) => {
    return http.get(useCommonStore().baseURL + "payout/getTeacherPayout?teacherId=" + teacherId);
}

/**
 * 获取提现记录
 */
export const getPayoutRequest = () => {
    return http.get(useCommonStore().baseURL + "payout/getPayout?");
}

/**
 * 同意提现
 * @param payoutId 提现ID
 */
export const agreePayoutRequest = (payoutId: any) => {
    return http.get(useCommonStore().baseURL + "payout/agreePayout?payoutId=" + payoutId);
}

/**
 * 提现成功
 * @param payoutId 提现ID
 */
export const successPayoutRequest = (payoutId: any) => {
    return http.get(useCommonStore().baseURL + "payout/successPayout?payoutId=" + payoutId);
}