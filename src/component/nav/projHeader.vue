<template>
  <div style="width: 100%;">
    <div class="df df-jcsb" style="height: 60px;">
      <section class="center pointer" style="font-size: 24px; " @click="go('home')">聊天测试系统</section>
      <div class="center" style="width: 100px;">
        <el-dropdown @command="handleCommand">
          <div class="center pointer link f-t1" style="width: 50px; height: 50px;">
            <el-badge :value="me.unread" :hidden="me.unread==0">
              <icon-user style="width: 12px;"/>
            </el-badge>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile" class="center">个人资料</el-dropdown-item>
              <el-dropdown-item command="logout" class="center">登出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>


<script setup>
// tip: 导入 component
import { User as IconUser } from '@element-plus/icons'
// tip: 导入 data
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { wait, empty, clone, storage } from '@/fn'
// tip: 定义 各种 use
const store = useStore(), router = useRouter(), route = useRoute(), { t, locale } = useI18n({ inheritLocale: true })
// tip: 定义 页面
// tip: 定义 不需要关联的
// tip: 定义 需要关联的
// tip: 定义 computed 计算的
const me = computed(() =>store.state.me.user)
// tip: 定义 方法
const handleCommand = (v) => {
  if (v == 'logout') {
    logout()
    return
  }
  go(v)
}
const go = (v) => {
  if (route.name == v) return
  store.dispatch('tab/changeAsider', v)
  router.push({ name: v })
}
const logout = async() => {
  // 处理在房间内登出的情况
  if (route.name == 'room') await store.dispatch('room/leave', {id: store.state.room.detail.id})
  await store.dispatch('me/logout')
  store.dispatch('ws/disconnect')
}
// tip: 初始化空数据
</script>

<style scoped>
</style>

<style>
</style>

<i18n>
en:
  login: login
zh:
  login: 登录
</i18n>
