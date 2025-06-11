import {http} from "../utils/http.ts";
import {useCommonStore} from "../store/CommonStore.ts";

/**
 * 获取壁纸
 * @param keyword
 */
export const getWallpaper = () => {
    return http.get(useCommonStore().baseURL + 'proxy/wallpaper')
}