import {http} from "../utils/http.ts";
import {useCommonStore} from "../store/CommonStore.ts";

/**
 * 获取所有轮播图
 */
export const getAllCarouselRequest = () => {
    return http.get(useCommonStore().baseURL + "carousel/getAllCarousel")
}

/**
 * 获取所有已发布轮播图
 */
export const getAllPublishCarouselRequest = () => {
    return http.get(useCommonStore().baseURL + "carousel/getAllPublishCarousel")
}

/**
 * 修改轮播图状态
 * @param id
 * @param status
 */
export const updateCarouselStatusRequest = (id: any, status: any) => {
    return http.get(useCommonStore().baseURL + "carousel/updateCarouselStatus" + "?id=" + id + "&status=" + status)
}

/**
 * 删除轮播图
 * @param id
 */
export const deleteCarouselRequest = (id: any) => {
    return http.get(useCommonStore().baseURL + "carousel/deleteCarousel" + "?id=" + id)
}

/**
 * 修改轮播图排序
 * @param id
 * @param sort
 */
export const updateCarouselSortRequest = (id: any, sort: any) => {
    return http.get(useCommonStore().baseURL + "carousel/updateCarouselSort" + "?id=" + id + "&sort=" + sort)
}

/**
 * 上传图片
 * @param file
 */
export const uploadImageRequest = (file: any) => {
    return http.post(useCommonStore().baseURL + "minio/uploadImage", file)
}

/**
 * 新增轮播图
 * @param data
 */
export const addCarouselRequest = (data: any) => {
    return http.post(useCommonStore().baseURL + "carousel/addCarousel", data)
}