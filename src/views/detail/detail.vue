<template>
  <div class="detail top-page" ref="detailRef">
    <tab-control
      v-if="showTabControl"
      class="tabs"
      :titles="names"
      @tabItemClick="hanleClick"
      ref="TabNavigatorRef"
    />
    <van-nav-bar
      title="房屋详情"
      left-text="旅途"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="main" v-if="mainPart" v-memo="[mainPart]">
      <detail-swipe />
      <detail-infos name="描述" :ref="registedSection" />
      <detail-facility name="设施" :ref="registedSection" />
      <detail-landlord name="房东" :ref="registedSection" />
      <detail-comment name="评论" :ref="registedSection" />
      <detail-notice name="须知" :ref="registedSection" />
      <detail-map name="周边" :ref="registedSection" />
      <detail-intro />
    </div>
    <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="">
      <div class="text">弘源旅途, 永无止境!</div>
    </div>

  </div>
</template>

<script setup>

import { useRoute, useRouter } from 'vue-router'
import { useDetailStore } from '@/stores/modules/detail'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useTabScrollNavigation } from '@/hooks/useTabScrollNavigation'
import TabControl from "@/components/tab-control/tab-control.vue"
import DetailSwipe from "./cpns/detail_01-swipe.vue"
import DetailInfos from "./cpns/detail_02-infos.vue"
import DetailFacility from "./cpns/detail_03-facility.vue"
import DetailLandlord from "./cpns/detail_04-landlord.vue"
import DetailComment from "./cpns/detail_05-comment.vue"
import DetailNotice from "./cpns/detail_06-notice.vue"
import DetailMap from "./cpns/detail_07-map.vue"
import DetailIntro from "./cpns/detail_08-intro.vue"


// ===== 【数据获取与路由模块】=====
// 获取路由参数
const router = useRouter()
const route = useRoute()
const houseId = route.params.id

const onClickLeft = () => {
  route.back()
}

// 发送网络请求获取数据
const detailStore = useDetailStore()
detailStore.fetchDetailInfos(houseId)
const { mainPart } = storeToRefs(detailStore)


// ===== 【滚动和导航双向绑定模块】=====
const detailRef = ref(null)

const {
  showTabControl,
  names,
  TabNavigatorRef,
  registedSection,
  hanleClick
} = useTabScrollNavigation(detailRef, {
  offsetCorrection: 44,
  tabVisibilityThreshold: 300
})


</script>

<style lang="less" scoped>
.tabs {
  position: fixed;
  z-index: 9;
  left: 0;
  right: 0;
  top: 0;
}

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;

  img {
    width: 123px;
  }

  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}
</style>
