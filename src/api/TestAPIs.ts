// 获取用户信息
import {http} from "../utils/http.ts";
import {useCommonStore} from "../store/CommonStore.ts";

// 获取用户信息测试
export const getUserIDTest = () => {
    http.get(useCommonStore().baseURL+'test/getUser').then((res) => {
        console.log(res)
    })
}