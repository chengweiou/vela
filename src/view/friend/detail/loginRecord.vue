<template>
  <div>
    <topbar>
      <template #default><span class="f-t2">登录记录</span></template>
      <template #add>
        <el-radio-group v-model="show" size="mini">
          <el-radio-button :label="true">开启</el-radio-button>
          <el-radio-button :label="false">关闭</el-radio-button>
        </el-radio-group>
      </template>
      <template v-if="show" #search>
        <el-input v-model="filter.k" style="margin-right: 20px;" placeholder="search" @keyup.enter="changeFilter" />
        <el-button type="primary" @click="reset">重置</el-button>
      </template>
    </topbar>
    <el-container v-show="show" v-loading="loading" class="df-column">
      <el-table style="width: 100%" :data="list" size="mini">
        <el-table-column prop="id" label="id" width="100"></el-table-column>
        <el-table-column prop="account.username" label="account.username">
          <template #default="scope">{{accountList.find(e => e.id==scope.row.account.id).username}}</template>
        </el-table-column>
        <el-table-column prop="platform" label="platform"></el-table-column>
        <el-table-column prop="ip" label="ip"></el-table-column>
        <el-table-column prop="updateAt" label="update Time" width="200"><template #default="scope">{{ $filter.date(scope.row.updateAt) }}</template></el-table-column>
      </el-table>
      <div class="df df-jcfe df-aic">
        <div>Total: {{total}}</div>
        <el-pagination layout="prev, pager, next" :current-page="page.curr" :page-size="filter.limit" :total="total" @current-change="changePage"></el-pagination>
      </div>
    </el-container>
  </div>
</template>

<script>
import topbar from '@/component/proj/list/topbar.vue'
export default {
  components: {
    topbar,
  },
  data() {
    return {
      show: false,
      sortList: [
        { label: 'Date - Oldest first', value: 'updateAt,true' },
      ],
      sort: '',
      loading: false,
    }
  },
  computed: {
    total() { return this.$store.state.loginRecord.total },
    page() { return this.$store.state.loginRecord.page },
    filter() { return this.$store.state.loginRecord.filter },
    list() { return this.$store.state.loginRecord.list },
    detailPerson() { return this.$store.state.person.detail },
    accountList() { return this.$store.state.account.list },
  },
  created() {
  },
  methods: {
    changeShow(v) {
      this.show = v
    },
    reset() {
      this.$store.dispatch('loginRecord/reset')
      this.count()
      this.find()
    },
    changeSort() {
      if (!this.sort) return
      this.filter.sort = this.sort.split(',')[0]
      this.filter.sortAz = this.sort.split(',')[1]
      this.$store.dispatch('loginRecord/changeFilter')
      this.find()
      this.count()
    },
    changeFilter() {
      this.$store.dispatch('loginRecord/changeFilter')
      this.find()
      this.count()
    },
    changePage(v) {
      this.$store.dispatch('loginRecord/changePage', { curr: v })
      this.find()
    },
    async count() {
      this.$store.dispatch('loginRecord/count', { account: {person: {id: this.detailPerson.id}} })
    },
    async find() {
      this.loading = true
      await Promise.all([this.$store.dispatch('loginRecord/find', { account: {person: {id: this.detailPerson.id}} }), this.$wait(1000)])
      this.loading = false
    },
  },
}
</script>
