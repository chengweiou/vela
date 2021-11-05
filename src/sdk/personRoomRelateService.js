import fetchUtil from './util/fetchUtil'
import site from './config/site'
import paramUtil from './util/paramUtil'

export default class {
  static all() { return All }
  static me() { return Me }
  static mg() { return Mg }
}
class All {
}
class Me {
  static save(e) {
    let url = `${site.carina}/me/personRoomRelate`
    let formData = paramUtil.createFormData(e)
    let options = {
      method: 'POST',
      body: formData,
    }
    return fetchUtil.run(url, options)
  }
  static update(e) {
    let url = `${site.carina}/me/personRoomRelate/${e.id}`
    let options = {
      method: 'PUT',
      body: e,
    }
    return fetchUtil.run(url, options)
  }
  static findById(e) {
    let url = `${site.carina}/me/personRoomRelate/${e.id}`
    let options = {
      method: 'GET',
    }
    return fetchUtil.run(url, options)
  }
  static count(filter) {
    let url = `${site.carina}/me/personRoomRelate/count?${paramUtil.createUrlEncode(filter)}`
    let options = {
      method: 'GET',
    }
    return fetchUtil.run(url, options)
  }
  static find(filter) {
    let url = `${site.carina}/me/personRoomRelate?${paramUtil.createUrlEncode(filter)}`
    let options = {
      method: 'GET',
    }
    return fetchUtil.run(url, options)
  }
}
class Mg {
}
