<template>
  <div class="intro">
    <h2 class="title">{{ priceIntro.title }}</h2>
    <div class="content">
      {{ priceIntro.introduction }}
    </div>
  </div>

  <div class="bottom-spacer">
    <div class="spacer-content">
      <h3>感谢浏览</h3>
      <p>浏览更多类似房源</p>
      <div class="action-buttons">
        <button @click="handleFavorite">收藏房源</button>
        <button @click="handleShare">分享房源</button>
      </div>
      <div class="copyright">© 弘源旅途 提供技术支持</div>
    </div>
  </div>
</template>

<script setup name="home">
import { useDetailStore } from '@/stores/modules/detail'
import { storeToRefs } from 'pinia'

const detailStore = useDetailStore()
const { priceIntro } = storeToRefs(detailStore)

// defineProps({
//   priceIntro: {
//     type: Object,
//     default: () => ({})
//   }
// })

</script>

<style lang="less" scoped>
.intro {
  padding: 16px 12px;
  border-top: 5px solid #f2f3f4;

  .title {
    font-size: 14px;
    color: #000;
    font-weight: 700;
  }

  .content {
    margin-top: 10px;
    font-size: 12px;
    line-height: 1.5;
    color: #666;
  }
}

.bottom-spacer {
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 20px;
  text-align: center;
  background: linear-gradient(to bottom, #f8f9fa, #ffffff);
}

.spacer-content {
  max-width: 600px;
}

.action-buttons {
  margin: 20px 0;
  display: flex;
  gap: 15px;
  justify-content: center;
}

.action-buttons button {
  padding: 8px 15px;
  border: 1px solid #ccc;
  border-radius: 20px;
  background: white;
  color: #666;
}

.copyright {
  margin-top: 30px;
  font-size: 12px;
  color: #999;
}
</style>