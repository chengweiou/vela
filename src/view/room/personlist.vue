<template>
  <el-container class="df-column c-black" style="margin: 0 20px;">
    <list-th-row>
      <list-th>id</list-th>
      <list-th>avatar</list-th>
      <list-th>name</list-th>
      <list-th>isFriend</list-th>
    </list-th-row>
    <list-td-row v-for="(e, i) in list" :key="i" @click="goRoom(e)">
      <list-td>{{e.id}}</list-td>
      <list-td><div style="width: 30px; height: 30px;"><avatar :src="e.imgsrc" /></div></list-td>
      <list-td>{{e.name}}</list-td>
      <list-td>{{e.isFriend}}<el-button v-if="e.isFriend" @click="save(e)">add friend</el-button></list-td>
    </list-td-row>
  </el-container>
</template>

<script setup>
// tip: 导入 component
import { ListThRow, ListTdRow, ListTh, ListTd } from '@/component/proj/list'
import avatar from '@/component/image/avatar.vue'
import { ElNotification } from 'element-plus'
// tip: 导入 data
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
// tip: 定义 各种 use
const store = useStore(), router = useRouter(), route = useRoute()
// tip: 定义 页面
// tip: 定义 不需要关联的
// tip: 定义 需要关联的
// tip: 定义 computed 计算的
const list = computed(() => store.state.room.personList)
// tip: 定义 方法
const save = async(e) => {
  let success = await store.dispatch('friend/save', {target: {id: e.id}})
  if (!success) {
    ElNotification({ type: 'fail', title: '好友添加失败' })
    return
  }
  ElNotification({ type: 'success', title: '好友添加成功' })
}
// tip: 初始化空数据
</script>

<style scoped>
</style>
