import {defineStore} from "pinia";

export const useUserStore = defineStore('UserStore', {
    state: () => {
        return {
            userInfo: {
                id: '',
                userName: '',
                nickName: '',
                avatar: '',
                identity: '',
                fund: 0,
                isDisabled: '',
            },
            token: '',
        }
    }
    ,
    actions: {}
})