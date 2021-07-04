<template>
  <div>
    <basic />
    <account v-if="me.type=='SUPER' || detail.type=='MEMBER' || detail.type=='GUEST'" />
    <censorRecord v-if="me.type=='SUPER' || detail.type=='MEMBER' || detail.type=='GUEST'" />
  </div>
</template>

<script>
import basic from './basic.vue'
import account from './account.vue'
import censorRecord from './censorRecord.vue'
export default {
  components: {
    basic, account, censorRecord,
  },
  data() {
    return {
    }
  },
  computed: {
    me() { return this.$store.state.me.user },
    detail() { return this.$store.state.person.detail },
  },
  created() {
    this.findById()
    this.findAccount()
    this.countLoginRecord()
    this.findLoginRecord()
    this.countCensorRecord()
    this.findCensorRecord()
  },
  methods: {
    async findById() {
      this.$store.dispatch('person/findById', { id: this.$route.params.id })
    },
    async findAccount() {
      this.$store.dispatch('account/findComb', { person: {id: this.$route.params.id} })
    },
    async countLoginRecord() {
      this.$store.dispatch('loginRecord/count', { account: {person: {id: this.$route.params.id}} })
    },
    async findLoginRecord() {
      this.$store.dispatch('loginRecord/find', { account: {person: {id: this.$route.params.id}} })
    },
    async countCensorRecord() {
      this.$store.dispatch('censorRecord/count', { person: {id: this.$route.params.id} })
    },
    async findCensorRecord() {
      this.loading = true
      await Promise.all([this.$store.dispatch('censorRecord/find', { person: {id: this.$route.params.id} }), this.$wait(1000)])
      this.loading = false
    },
    go(v) {
      this.$store.dispatch('tab/changeAsider', v)
      this.$router.push({ name: v })
    },
  },
}
</script>
<style>
</style>
