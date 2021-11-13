<template>
  <el-card style="margin: 0 20px 20px;">
    <div class="df df-column" style="flex: 1;">
      <div ref="historyAreaDom" style="margin-right: 20px; height: 300px; overflow-y: scroll;">
        <div v-if="isServerHistory">
          <div v-if="moreHistory" class="center link pointer" @click="find">加载更多...</div>
          <div v-else class="center">已经是全部记录了</div>
        </div>
        <section v-for="(e, i) in historyList" :key="i">
          <div v-if="e.showTime" class="center" style="margin: 10px;">{{ date(e.updateAt) }}</div>
          <div class="df" :class="e.sender.id == me.id ? 'selfPosition' : 'otherPosition'">
            <!-- <div style="width: 30px; height: 30px;"><avatar :src="personList.find(p=>p.id=e.sender.id).imgsrc" /></div> -->
            <div>
              <!-- // todo 显示图片 地图 -->
              <section :class="e.sender.id == me.id ? 'selfV' : 'otherV'" style="margin-bottom: 10px; padding: 6px; border-radius: 3px;">
                <div v-if="e.type=='TEXT'">{{e.v}}</div>
                <div v-else-if="e.type=='IMG'"><centerImage :src="e.v"/></div>
                <div v-else-if="e.type=='MAP'"><img :src="`https://maps.googleapis.com/maps/api/staticmap?center=${e.v}&size=300x200&key=YOUR_API_KEY`"></div>
              </section>
            </div>
          </div>
        </section>
      </div>
      <div class="center df-wrap" style="margin: 0 100px;">
        <div class="df">
          <el-button v-loading="loading" :disabled="loading" style="margin-right: 20px; margin-bottom: 20px; width: 160px;" type="primary" @click="sendImg">image</el-button>
          <el-button v-loading="loading" :disabled="loading" style="margin-right: 20px; margin-bottom: 20px; width: 160px;" type="primary" @click="sendMap">map</el-button>
        </div>
        <div class="df" style="flex: 1;">
          <el-input v-model="form.v" style="margin-right: 20px; margin-bottom: 20px; flex: 1;" @keyup.enter="send" />
          <el-button v-loading="loading" :disabled="loading" style="margin-bottom: 20px; width: 160px;" type="primary" @click="send">send</el-button>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup>
// tip: 导入 component
import centerImage from '@/component/image/centerImage.vue'
import avatar from '@/component/image/avatar.vue'
import { ElNotification } from 'element-plus'
// tip: 导入 data
import { ref, computed, onBeforeUnmount, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { wait, empty, clone, date } from '@/fn'
// tip: 定义 各种 use
const store = useStore(), router = useRouter(), route = useRoute()
// tip: 定义 页面
const historyAreaDom = ref(null)
// tip: 定义 不需要关联的
const isServerHistory = import.meta.env.VITE_APP_HOST.VUE_APP_SERVER_HISTORY
const cleanForm = {
  v: '',
}
// tip: 定义 需要关联的
const form = ref(clone(cleanForm))
const loading = ref(false)
// tip: 定义 computed 计算的
const me = computed(() => store.state.me.user)
const detail = computed(() => store.state.room.detail)
const personList = computed(() => store.state.room.personList)
const historyList = computed(() => store.state.room.historyList)
// todo 判断server history的时候才出现
const moreHistory = computed(() => store.state.room.historyFilter.skip < store.state.room.historyTotal)
const scroll = computed(() => store.state.room.scroll)
// tip: 定义 方法
const find = async() => {
  loading.value = true
  let pList = await Promise.all([store.dispatch('room/find', {room: {id: detail.value.id}}), wait(1000)])
  loading.value = false
  if (!pList[0]) return
}
const send = async() => {
  if (!form.value.v.trim()) return
  let msg = {
    id: 0,
    room: {id: route.params.id},
    sender: {id: me.value.id},
    type: 'TEXT',
    v: form.value.v,
  }
  await store.dispatch('room/sendText', msg)
  store.dispatch('room/changeScroll', true)
  form.value.v = ''
}
const sendImg = async() => {
  // todo
  // let msg = {
  //   id: 0,
  //   room: {id: route.params.id},
  //   sender: {id: me.value.id},
  //   type: 'IMG',
  // }
  // await store.dispatch('room/sendImg', msg)
}
const sendMap = () => {
  navigator.geolocation.getCurrentPosition(async(position) => {
    let msg = {
      id: 0,
      room: {id: route.params.id},
      sender: {id: me.value.id},
      type: 'MAP',
      v: `${position.coords.latitude},${position.coords.longitude}`,
    }
    await store.dispatch('room/sendText', msg)
    store.dispatch('room/changeScroll', true)
  })

}
const toBottom = () => {
  historyAreaDom.value.scrollTop = historyAreaDom.value.scrollHeight
}
// tip: 初始化空数据

// tip 其他生命周期
watch(scroll, (v, prevV) => {
  if (scroll.value) toBottom()
  store.dispatch('room/changeScroll', false)
})
</script>

<style scoped>
.selfPosition { flex-direction: row-reverse; }
.otherPosition { flex-direction: row; }
.selfV { background: #070B34; }
.otherV { background: white; color: #070B34; }
</style>
