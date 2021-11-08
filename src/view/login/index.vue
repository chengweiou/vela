<template>
  <div class="center bg-dark c-white" style="width: 100%; height: 100%;">
    <el-form style="width: 500px; height: 500px;" size="medium">
      <div style="font-size: 42px;">Vela聊天系统</div>
      <div style="margin-bottom: 10px;">聊天测试系统模板</div>
      <div style="height: 58px;"></div>
      <div style="height: 66px;"></div>
      <section class="df" style="height: 50px;">
        <el-button v-loading="loading" :disabled="loading" style="flex: 1;" type="primary" size="large" @click="login(1)">登录-1</el-button>
        <el-button v-loading="loading" :disabled="loading" style="flex: 1;" type="primary" size="large" @click="login(2)">登录-2</el-button>
        <el-button v-loading="loading" :disabled="loading" style="flex: 1;" type="primary" size="large" @click="login(2)">登录-3</el-button>
      </section>
    </el-form>

  </div>


</template>

<script setup>
// tip: 导入 component
import { ElNotification } from 'element-plus'
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
const loading = ref(false)
// tip: 定义 computed 计算的
const show = computed(() => store.state.me.showLogin)
// tip: 定义 方法
const login = async(personId) => {
  loading.value = true
  let pList = await Promise.all([store.dispatch('me/login', {person: {id: personId}}), wait(1000)])
  loading.value = false
  if (!pList[0]) return
  store.dispatch('ws/connect')
  ElNotification({ type: 'success', title: '成功' })
  router.push({ name: 'personRoomRelateList' })
}
// tip: 初始化空数据
</script>

<style scoped>
</style>

<style>

</style>
