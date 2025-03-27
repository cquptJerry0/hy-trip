<template>
  <div class="home">
    <detail-section title="位置周边" more-text="查看更多周边信息">
      <div class="baidu" ref="mapRef"></div>
    </detail-section>
  </div>
</template>

<script setup>
import DetailSection from "@/components/detail-section/detail-section.vue"
import { onMounted, ref } from "vue";
import { useDetailStore } from '@/stores/modules/detail'
import { storeToRefs } from 'pinia'

const detailStore = useDetailStore()
const { position } = storeToRefs(detailStore)

// const props = defineProps({
//   position: {
//     type: Object,
//     default: () => ({})
//   }
// })

const mapRef = ref()

onMounted(() => {
  // 创建3D地图实例
  const map = new BMapGL.Map(mapRef.value, {
    enableMapClick: true,
    heading: 0,     // 地图旋转角度
    tilt: 40,       // 地图倾斜角度 - 3D效果的关键
    zoom: 17        // 更大的缩放比例
  }); 
  
  // 创建点坐标 
  const point = new BMapGL.Point(position.value.longitude, position.value.latitude);
  
  // 初始化地图，设置中心点坐标和地图级别
  map.centerAndZoom(point, 17);
  
  // 启用滚轮缩放
  map.enableScrollWheelZoom(true);
  
  // 添加3D控件
  map.addControl(new BMapGL.ZoomControl());      // 缩放控件
  map.addControl(new BMapGL.NavigationControl3D()); // 3D导航控件
  map.addControl(new BMapGL.ScaleControl());     // 比例尺控件
  
  // 启用键盘操作
  map.enableKeyboard();
  
  // 添加自定义标记
  const marker = new BMapGL.Marker(point);
  map.addOverlay(marker);
  
  // 添加信息窗口
  const infoWindow = new BMapGL.InfoWindow("弘源旅途 - 精品住宿", {
    width: 200,
    height: 60,
    title: "位置信息"
  });
  
  // 点击标记显示信息窗口
  marker.addEventListener('click', function() {
    map.openInfoWindow(infoWindow, point);
  });
  
  // 设置地图样式 - 清新蓝色风格
  map.setMapStyleV2({
    styleId: '2d12097e4960c4113c966f29a958bb2f'
  });
})

</script>

<style lang="less" scoped>
.baidu {
  height: 300px; // 增加高度以更好地显示3D效果
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
}
</style>
