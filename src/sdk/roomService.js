import fetchUtil from './util/fetchUtil'
import site from './config/site'
import paramUtil from './util/paramUtil'

export default class {
  static me() { return Me }
  static mg() { return Mg }
}
class Me {
  static enter(e) {
    let url = `${site.carina}/me/room`
    let formData = paramUtil.createFormData(e)
    let options = {
      method: 'POST',
      body: formData,
    }
    return fetchUtil.run(url, options)
  }

  static leave(e) {
    let url = `${site.carina}/me/room/${e.id}/leave`
    let options = {
      method: 'POST',
    }
    return fetchUtil.run(url, options)
  }
  static findByKey(e) {
    let url = `${site.carina}/me/room/key?${paramUtil.createUrlEncode(e)}`
    let options = {
      method: 'GET',
    }
    return fetchUtil.run(url, options)
  }
}

class Mg {
}
