import {http} from "../utils/http.ts";
import {useCommonStore} from "../store/CommonStore.ts";

/**
 * 获取所有订单
 */
export const getAllOrderRequest = () => {
    return http.get(useCommonStore().baseURL + "alipay/getAllOrder")
}