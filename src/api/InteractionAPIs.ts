import {http} from "../utils/http.ts";
import {useCommonStore} from "../store/CommonStore.ts";

/**
 * 用户对课程产生互动
 * @param userId
 * @param courseId
 */
export const getInteractionACTRequest = (userId: any, courseId: any) => {
    return http.post(useCommonStore().baseURL + "interaction/interactionACT", {
        userId: userId,
        courseId: courseId
    })
}

