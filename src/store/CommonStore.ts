import {defineStore} from "pinia";

export const useCommonStore = defineStore('common', {
    state: () => {
        return {
            minioURLPre: 'http://localhost:9090/cf-pols-minio/',
            minioURLPreX: 'http://127.0.0.1:9090/cf-pols-minio/',
            baseURL: 'http://localhost:8080/',
        }
    }
 })