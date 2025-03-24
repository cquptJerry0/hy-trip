import { onMounted, onUnmounted, ref } from "vue";
import { throttle } from "underscore"


export default function useScroll() {
 
    // 监听window创建的滚动
    // 1. 当我们离开页面时候, 移除监听
    // 2. 会重复代码

    const isReacBottom = ref(false)
    const scrollTop = ref(0)
    const scrollHeight = ref(0)
    const clientHeight = ref(0)

    const scrollListenerHandler = throttle(() => {
        // 获取滚动高度
        scrollTop.value = document.documentElement.scrollTop
        scrollHeight.value = document.documentElement.scrollHeight
        clientHeight.value = document.documentElement.clientHeight
        // 判断是否滚动到底部
        if(scrollTop.value + clientHeight.value >= scrollHeight.value) {
            isReacBottom.value = true
            console.log("达到底部");
        }
    }, 100)
    
    onMounted(() => {
        window.addEventListener("scroll", scrollListenerHandler)
    })
    
    onUnmounted(() => {
        window.removeEventListener("scroll", scrollListenerHandler)
    })
  
    return { isReacBottom, clientHeight, scrollHeight, scrollTop }
}

