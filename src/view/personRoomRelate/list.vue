<template>
  <div>
    <topbar>
      <template #default>列表</template>
      <template #search>
        <el-input v-model="filter.k" style="margin-right: 20px;" placeholder="search" @keyup.enter="changeFilter" />
        <el-button type="primary" @click="resetFilter">重置</el-button>
      </template>
    </topbar>
    <el-container v-loading="loading" class="df-column">
      <el-table style="width: 100%" :data="list" @row-click="goRoom">
        <el-table-column prop="id" label="id" width="100"></el-table-column>
        <el-table-column prop="room.id" label="room.id" width="100"></el-table-column>
        <el-table-column prop="name" label="name"></el-table-column>
        <el-table-column prop="imgsrc" label="imgsrc"></el-table-column>
        <el-table-column prop="unread" label="unread"></el-table-column>
        <el-table-column prop="lastMessage" label="lastMessage"></el-table-column>
        <el-table-column prop="updateAt" label="update Time" width="200"><template #default="scope">{{ date(scope.row.updateAt) }}</template></el-table-column>
        <el-table-column width="100"><template #default="scope">
          <el-popconfirm title="确认删除" @confirm="remove(scope.row)">
            <template #reference><icon-delete style="width: 12px;"/></template>
          </el-popconfirm>
        </template></el-table-column>
      </el-table>
      <div class="df df-jcfe df-aic">
        <div>Total: {{total}}</div>
        <el-pagination layout="prev, pager, next" :current-page="page.curr" :page-size="filter.limit" :total="total" @current-change="changePage"></el-pagination>
      </div>
    </el-container>
  </div>
</template>

<script setup>
// tip: 导入 component
import topbar from '@/component/proj/list/topbar.vue'
import { Delete as IconDelete } from '@element-plus/icons'
// tip: 导入 data
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { wait, emptyFn, clone, date } from '@/fn'
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
const resetFilter = () => {
  store.dispatch('personRoomRelate/resetFilter')
  count()
  find()
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
resetFilter()
</script>

<style>
</style>
