// eventBus.ts
import mitt from 'mitt';

// 创建事件总线实例
const emitter = mitt();

// 导出事件总线
export default emitter;