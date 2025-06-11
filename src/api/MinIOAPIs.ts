import {http} from "../utils/http.ts";
import {useCommonStore} from "../store/CommonStore.ts";

export const getBannerVideo = () => {
    return http.get(useCommonStore().baseURL + 'minio/bannerVideo')
}

/**
 * 获取视频播放地址
  */
export const getVideoUrl = (filename: any) => {
    return http.get(useCommonStore().baseURL + 'minio/get-url' + "?filename=" + filename)
}

/**
 * 获取服务器ip
 */
export const getHostIp = () => {
    return http.get(useCommonStore().baseURL + 'minio/getHostIp')
}