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
  static send(e) {
    let url = `${site.carina}/me/msg`
    let formData = paramUtil.createFormData(e)
    let options = {
      method: 'POST',
      body: formData,
    }
    return fetchUtil.run(url, options)
  }
  static readById(e) {
    let url = `${site.carina}/me/msg/${e.id}/read`
    let options = {
      method: 'POST',
    }
    return fetchUtil.run(url, options)
  }
  static read(filter) {
    let url = `${site.carina}/me/msg?${paramUtil.createUrlEncode(filter)}`
    let options = {
      method: 'GET',
    }
    return fetchUtil.run(url, options)
  }
}
class Mg {
}
