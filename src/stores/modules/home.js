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
        async fetchHotSuggestions() {
            const res = await getHotSuggestions()
            this.hotSuggests = res.data
        },
        async fetchCategories() {
            const res = await getCategories()
            this.categories = res.data
        },
        async fetchHomeHouselist() {
            const res = await getHomeHouseList(this.currentPage)
            this.houselist.push(...res.data)
            this.currentPage++
        }
    }
})

export default useHomeStore

