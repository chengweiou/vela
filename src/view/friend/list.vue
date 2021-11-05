<template>
  <div>
    <topbar>
      <template #default>列表</template>
      <template #add><icon-circle-plus style="width: 12px; height: 12px;" @click="go('friendAdd')"/></template>
      <template #search>
        <el-input v-model="filter.k" style="margin-right: 20px;" placeholder="search" @keyup.enter="changeFilter" />
        <el-button type="primary" @click="resetFilter">重置</el-button>
      </template>
    </topbar>
    <el-container v-loading="loading" class="df-column">
      <el-table style="width: 100%" :data="list" @row-click="goRoom">
        <el-table-column prop="id" label="id" width="100"></el-table-column>
        <el-table-column prop="target.id" label="target.id"></el-table-column>
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
import { Delete as IconDelete, CirclePlus as IconCirclePlus } from '@element-plus/icons'
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
const total = computed(() => store.state.friend.total)
const page = computed(() => store.state.friend.page)
const filter = computed(() => store.state.friend.filter)
const list = computed(() => store.state.friend.list)
// tip: 定义 方法
const go = (v) => {
  store.dispatch('tab/changeAsider', v)
  router.push({ name: v })
}
const resetFilter = () => {
  store.dispatch('friend/resetFilter')
  count()
  find()
}
const changeFilter = () => {
  if (sort.value) {
    filter.value.sort = sort.value.split(',')[0]
    filter.value.sortAz = sort.value.split(',')[1]
  }
  store.dispatch('friend/changeFilter')
  find()
  count()
}
const changePage = (v) => {
  store.dispatch('friend/changePage', { curr: v })
  find()
}
const count = () => {
  store.dispatch('friend/count')
}
const find = async() => {
  loading.value = true
  await Promise.all([store.dispatch('friend/find'), wait(1000)])
  loading.value = false
}
const goRoom = async(e) => {
  await store.dispatch('room/findByKey', { personIdList: [e.target.id] })
  router.push({ name: 'room', params: { id: store.state.room.detail.id } })
}
const goDetail = (e) => {
  router.push({ name: 'friend', params: { id: e.id } })
}
const remove = async(e) => {
  await store.dispatch('friend/remove', {id: e.id})
  count()
  find()
}
// tip: 初始化空数据
resetFilter()
</script>
