import fetchUtil from './util/fetchUtil'
import site from './config/site'
import storage from './util/storage'
import paramUtil from './util/paramUtil'


export default class accountService {
  static all() { return All }
  static me() { return Me }
  static mg() { return Mg }
}
class All {
  // todo tip: 这个项目的登录特殊
  static login(e) {
    let url = `${site.carina}/test/login`
    let formData = paramUtil.createFormData(e)
    let options = {
      method: 'POST',
      body: formData,
    }
    return fetchUtil.run(url, options).then(rest => {
      if (rest.code !== 'OK') return rest
      storage.set('token', rest.data)
      storage.set('loginAccount', JSON.stringify(e))
      return rest
    })
  }
}

class Me {
}

class Mg {
}
