import { onMounted, onUnmounted, ref } from 'vue'
import { throttle } from 'underscore'
/**
 * 滚动监听Hook
 * @param {Ref} elRef - 要监听的元素引用，默认为window
 * @returns {Object} 滚动状态
 */
export function useScroll(elRef = null) {
  // 滚动状态
  const isReachBottom = ref(false)
  const clientHeight = ref(0)
  const scrollTop = ref(0)
  const scrollHeight = ref(0)

  // 默认监听window
  let el = window

  // 计算滚动位置
  const scrollListenerHandler = throttle(() => {
    if (el === window) {
      clientHeight.value = document.documentElement.clientHeight
      scrollTop.value = document.documentElement.scrollTop
      scrollHeight.value = document.documentElement.scrollHeight
    } else {
      clientHeight.value = el.clientHeight // 视口高度
      scrollTop.value = el.scrollTop // 滚动高度
      scrollHeight.value = el.scrollHeight // 内容滚动总高度
    }

    // 判断是否到达底部
    if (clientHeight.value + scrollTop.value >= scrollHeight.value - 1) {
      console.log("到达底部");
      isReachBottom.value = true
    }
  }, 100)

  // 挂载监听
  onMounted(() => {
    if (elRef) el = elRef.value
    el.addEventListener("scroll", scrollListenerHandler)
  })

  // 卸载监听
  onUnmounted(() => {
    el.removeEventListener("scroll", scrollListenerHandler)
  })
  return { isReachBottom, clientHeight, scrollTop, scrollHeight }
  
}