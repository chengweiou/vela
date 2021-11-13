<template>
  <proj-header :has-back="true" @back="go('personRoomRelateList')">{{detail.name}}</proj-header>
  <div style="margin-bottom: 20px;"></div>
  <div>
    <tab v-model:tab="tab" name="room" :list="tabNameList"/>
    <component :is="
      loading ? LoadingCard
    : tab==0 ? Historylist
    : tab==1 ? Personlist
    : LoadingFail "/>
  </div>
</template>

<script setup>
// tip: 导入 component
import ProjHeader from '@/component/nav/projHeader.vue'
import Tab from '@/component/proj/tab.vue'
import Historylist from './historylist.vue'
import Personlist from './personlist.vue'
import LoadingCard from '@/component/loadingIcon/loadingCard.vue'
import LoadingFail from '@/component/loadingIcon/loadingFail.vue'
import { ElNotification } from 'element-plus'
// tip: 导入 data
import { ref, computed, onBeforeUnmount, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { wait, empty } from '@/fn'
// tip: 定义 各种 use
const store = useStore(), router = useRouter(), route = useRoute()
// tip: 定义 页面
// tip: 定义 不需要关联的
const tabNameList = ['聊天消息', '房间成员']
const isServerHistory = import.meta.env.VITE_APP_HOST.VUE_APP_SERVER_HISTORY
// tip: 定义 需要关联的
const loading = ref(true)
// tip: 定义 computed 计算的
const me = computed(() => store.state.me.user)
const detail = computed(() => store.state.room.detail)
const tab = computed(() => store.state.tab.room)
// todo 判断server history的时候才出现
// tip: 定义 方法
const go = (v) => {
  store.dispatch('tab/changeAsider', v)
  router.push({ name: v })
}
const enterRoom = async() => {
  loading.value = true
  let pList = await Promise.all([store.dispatch('room/enter', {id: route.params.id}), wait(1000)])
  loading.value = false
  if (!pList[0]) return
  ElNotification({ type: 'success', title: '进入房间成功' })
  findRelate()
  findPerson()
  read()
}
const findRelate = async() => {
  loading.value = true
  let pList = await Promise.all([store.dispatch('personRoomRelate/findByKey', { room: {id: route.params.id} }), wait(1000)])
  loading.value = false
  if (!pList[0]) return
  checkFriend()
}
const findPerson = async() => {
  loading.value = true
  let pList = await Promise.all([store.dispatch('room/findPerson', {idList: detail.value.personIdList}), wait(1000)])
  loading.value = false
  if (!pList[0]) return
  ElNotification({ type: 'success', title: '读取成员列表成功' })
  checkFriend()
}
const checkFriend = () => {
  store.dispatch('room/checkFriend', {targetIdList: detail.value.personIdList.filter(e=>e!=me.value.id)})
}
const read = async() => {
  loading.value = true
  let pList = await Promise.all([store.dispatch('room/read', {room: {id: detail.value.id}}), wait(1000)])
  loading.value = false
  if (!pList[0]) return
  ElNotification({ type: 'success', title: '读取未读消息成功' })
  store.dispatch('room/changeScroll', true)
  // 需要maxId
  if (isServerHistory) count()
}
// todo 判断server history的时候才出现
const count = () => {
  store.dispatch('room/count')
}

// tip: 初始化空数据
store.state.room.detail = empty.room()
store.state.room.personList = []
store.dispatch('room/resetHistoryFilter')
enterRoom()

// tip 其他生命周期
onBeforeUnmount(() => {
  // 处理在房间内登出的情况
  if (detail.value.id) store.dispatch('room/leave', {id: detail.value.id})
})
</script>

<style scoped>
</style>
