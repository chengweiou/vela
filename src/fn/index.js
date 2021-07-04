import date from './filter/date'
import number from './filter/number'
import phone from './filter/phone'
import wait from './util/wait'
import storage from '@/sdk/util/storage'
import site from '@/sdk/config/site'
  globalProperties.$filter = {
  }
  globalProperties.$wait = wait
  globalProperties.$storage = storage
  globalProperties.$img = site.xxx
  globalProperties.$valid = valid
}
