import {useCommonStore} from "../store/CommonStore.ts";
import {http} from "../utils/http.ts";


export function startStream() {
    const eventSource = new EventSource('http://localhost:8080/aiv1/chat-stream?message=帮我写一个c++的快速排序？');

    eventSource.onmessage = (event) => {
        const chunk = event.data;
        if (event.data === '[complete]') {
            eventSource.close();
            return
        }
        console.log('Received chunk:', chunk);
        // 实时追加到页面（例如聊天框）
        // document.getElementById('output').innerHTML += chunk;
    };

    eventSource.onerror = (error) => {
        console.error('EventSource failed:', error);
        eventSource.close();
    };

    // 当流结束时关闭连接（需要后端触发完成事件）
    eventSource.addEventListener('done', () => {
        eventSource.close();
    });
}

/**
 * 开始聊天流
 * @param msg
 */
export function startChatStream(msg: string) {
    let tokenLocal = localStorage.getItem('token');
    return new EventSource(useCommonStore().baseURL + `aiv1/chat-stream?message=${msg}&token=${tokenLocal}&agentName=智能客服小瑞`);
}

/**
 * AI起名
 */
export function getNickName() {
    return http.get(useCommonStore().baseURL + "aiv1/getNickName", {
        timeout: 100000
    })
}

/**
 * 获取课程描述
 * @param courseName 课程名
 */
export function getCourseDescRequest(courseName: string) {
    return http.get(useCommonStore().baseURL + "aiv1/getCourseDesc?courseName=" + courseName, {
        timeout: 100000
    })
}

/**
 * AI生成章节
 * @param courseName 课程名
 * @param courseDesc 课程描述
 */
export function getCourseChapter1(courseName: string, courseDesc: string) {
    return new EventSource(useCommonStore().baseURL + `aiv1/getCourseChapter1?courseName=${courseName}&courseDesc=${courseDesc}`);
}