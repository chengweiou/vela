<template>
  <proj-header><icon-pie-chart style="margin-right: 10px; width: 24px;"/>{{total}} 房间</proj-header>
  <list-search-bar>
    <el-input v-model="filter.k" style="width: 300px;" placeholder="关键字" @keyup.enter="changeFilter"></el-input>
    <el-select v-model="sort" placeholder="请选择" @change="changeFilter">
      <el-option v-for="e in sortList" :key="e.value" :label="e.label" :value="e.value"></el-option>
    </el-select>
  </list-search-bar>
  <el-container v-loading="loading" class="df-column c-black" style="margin: 0 20px;">
    <list-th-row>
      <list-th>id</list-th>
      <list-th>room.id</list-th>
      <list-th>name</list-th>
      <list-th>imgsrc</list-th>
      <list-th>unread</list-th>
      <list-th>lastMessage</list-th>
      <list-th>lastMessageAt</list-th>
      <list-th-delete></list-th-delete>
    </list-th-row>
    <list-td-row v-for="(e, i) in list" :key="i" @click="goRoom(e)">
      <list-td>{{e.id}}</list-td>
      <list-td>{{e.room.id}}</list-td>
      <list-td>{{e.name}}</list-td>
      <list-td>{{e.imgsrc}}</list-td>
      <list-td>{{e.unread}}</list-td>
      <list-td>{{e.lastMessage}}</list-td>
      <list-td>{{e.lastMessageAt}}</list-td>
      <list-td-delete @click="remove(e)"></list-td-delete>
    </list-td-row>
    <div class="df df-jcfe df-aic" style="margin-bottom: 20px;">
      <el-pagination layout="prev, pager, next" :current-page="page.curr" :page-size="filter.limit" :total="total" @current-change="changePage"></el-pagination>
    </div>
  </el-container>
</template>

<script setup>
// tip: 导入 component
import ProjHeader from '@/component/nav/projHeader.vue'
import { PieChart as IconPieChart } from '@element-plus/icons-vue'
import { ListThRow, ListTdRow, ListTh, ListTd, ListTdDelete, ListThDelete } from '@/component/proj/list'
import ListSearchBar from '@/component/proj/listSearchBar.vue'
// tip: 导入 data
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { wait, empty, clone, date } from '@/fn'
// tip: 定义 各种 use
const store = useStore(), router = useRouter(), route = useRoute()
// tip: 定义 页面
// tip: 定义 不需要关联的
const sortList = [
  { label: '日期排序 - 新->旧', value: 'updateAt,false' },
  { label: '日期排序 - 旧->新', value: 'updateAt,true' },
]
// tip: 定义 需要关联的
const sort = ref('')
const loading = ref(false)
// tip: 定义 computed 计算的
const total = computed(() => store.state.personRoomRelate.total)
const page = computed(() => store.state.personRoomRelate.page)
const filter = computed(() => store.state.personRoomRelate.filter)
const list = computed(() => store.state.personRoomRelate.list)
// tip: 定义 方法
const go = (v) => {
  store.dispatch('tab/changeAsider', v)
  router.push({ name: v })
}
const changeFilter = () => {
  if (sort.value) {
    filter.value.sort = sort.value.split(',')[0]
    filter.value.sortAz = sort.value.split(',')[1]
  }
  store.dispatch('personRoomRelate/changeFilter')
  find()
  count()
}
const changePage = (v) => {
  store.dispatch('personRoomRelate/changePage', { curr: v })
  find()
}
const count = () => {
  store.dispatch('personRoomRelate/count')
}
const find = async() => {
  loading.value = true
  await Promise.all([store.dispatch('personRoomRelate/find'), wait(1000)])
  loading.value = false
}
const goRoom = async(e) => {
  router.push({ name: 'room', params: { id: e.room.id } })
}
const goDetail = (e) => {
  router.push({ name: 'personRoomRelate', params: { id: e.id } })
}
const remove = async(e) => {
  await store.dispatch('personRoomRelate/remove', {id: e.id})
  count()
  find()
}
// tip: 初始化空数据
store.dispatch('personRoomRelate/resetFilter')
count()
find()
</script>

<style>
</style>
