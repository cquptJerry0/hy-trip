import { defineStore } from 'pinia'
import { getDetailInfos } from '@/services'

export const useDetailStore = defineStore('detail', {
    state: () => ({
        detailInfos: {}, // 房屋详情原始数据
    }),

    getters: {
        // 主数据
        mainPart: state => state.detailInfos.mainPart,
        
        // 轮播图数据
        swipeData: state => state.mainPart?.topModule?.housePicture?.housePics || [],
        
        // 顶部信息
        topInfos: state => state.mainPart?.topModule || {},
        
        // 设施信息
        houseFacility: state => state.mainPart?.dynamicModule?.facilityModule?.houseFacility || {},
        
        // 房东信息
        landlord: state => state.mainPart?.dynamicModule?.landlordModule || {},
        
        // 评论信息
        comment: state => state.mainPart?.dynamicModule?.commentModule || {},
        
        // 规则信息
        orderRules: state => state.mainPart?.dynamicModule?.rulesModule?.orderRules || [],
        
        // 位置信息
        position: state => state.mainPart?.dynamicModule?.positionModule || {},
        
        // 价格介绍
        priceIntro: state => state.mainPart?.introductionModule || {}
    },

    actions: {
        async fetchDetailInfos(houseId) {
            const res = await getDetailInfos(houseId)
            this.detailInfos = res.data
        }
      
    }
})


