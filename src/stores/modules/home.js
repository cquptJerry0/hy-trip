import { defineStore } from "pinia"
import { getHotSuggestions, getCategories, getHomeHouseList } from "@/services"

const useHomeStore = defineStore("home", {
    state: () => ({
        hotSuggests: [],
        categories: [], //分类
        
        houselist: [], // 房屋列表
        currentPage: 1, // 当前页码
    }),

    actions: {
        async fetchHotSuggestData() {
            const res = await getHotSuggestions()
            this.hotSuggests = res.data
        },
        async fetchCategoriesData() {
            const res = await getCategories()
            this.categories = res.data
        },
        async fetchHouselistData() {
            const res = await getHomeHouseList(this.currentPage)
            this.houselist.push(...res.data)
            this.currentPage++
        }
    }
})

export default useHomeStore

