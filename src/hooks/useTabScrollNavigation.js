import { ref, computed, watch } from 'vue'
import { useScroll } from './useScroll'
/**
 * Tab导航与滚动联动Hook
 * @param {Ref<HTMLElement>} containerRef - 容器元素引用
 * @param {Object} options - 配置选项
 * @param {number} options.offsetCorrection - 滚动位置修正值，默认44px
 * @param {number} options.tabVisibilityThreshold - Tab显示阈值，默认300px
 * @returns {Object} Tab导航状态和方法
 */
export function useTabScrollNavigation(containerRef, options = {}) {
    const {
        offsetCorrection = 44, // 滚动位置修正值
        tabVisibilityThreshold = 300, // Tab显示阈值
    } = options

    // 区域引用集合
    const sectionEls = ref({})

    // 计算属性, 收集组件的name
    const names = computed(() => Object.keys(sectionEls.value))

    // 滚动状态
    const { scrollTop } = useScroll(containerRef)
    const showTabControl = computed(() => scrollTop.value >= tabVisibilityThreshold)

    // Tab导航栏引用
    const TabNavigatorRef = ref(null)

    // 点击状态控制
    const isClick = ref(false)
    const currentDistance = ref(-1)

    // 注册后收集区域元素
    const registedSection = (value) => {
        if(!value) return
        const name = value.$el.getAttribute("name")
        sectionEls.value[name] = value.$el
    }

    // 处理Tab点击，滚动到对应区域
    const handleTabClick = (index) => {
        const key = names.value[index]
        const el = sectionEls.value[key]
        if (!el) return

        // 计算滚动至目标位置
        let distance = el.offsetTop
        if (index !== 0) {
            distance = distance - offsetCorrection
        }

        // 设置点击状态 
        isClick.value = true
        currentDistance.value = distance

        // 滚动到目标位置
        containerRef.value?.scrollTo({
            top: distance,
            behavior: "smooth"
        })

        return distance
    }

    // 监听滚动更新Tab
    watch(scrollTop, (newValue) => {
        // 到达滚动目标重置点击状态
        if (newValue === currentDistance.value) {
            isClick.value = false
        }

        // 如果是点击引起的滚动, 在滚动中, 不处理
        if (isClick.value) return

        // 计算当前应激活的Tab
        const els = Object.values(sectionEls.value)
        const positions = els.map(el => el.offsetTop)

        let activeIndex = positions.length - 1
        for (let i=0; i<positions.length; i++) {
            if (positions[i] > newValue + offsetCorrection) {
                activeIndex = i-1
                break
            }
        }
        // 更新Tab控制器
        TabNavigatorRef.value?.setCurrentIndex(activeIndex)
    })

    return {
        // 状态
        sectionEls,
        names,
        showTabControl,
        scrollTop,
        TabNavigatorRef,
        
        // 方法
        registedSection,
        handleTabClick
      }
}