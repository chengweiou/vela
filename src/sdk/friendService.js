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
    let url = `${site.carina}/me/friend`
    let formData = paramUtil.createFormData(e)
    let options = {
      method: 'POST',
      body: formData,
    }
    return fetchUtil.run(url, options)
  }
  static remove(e) {
    let url = `${site.carina}/me/friend/${e.id}`
    let options = {
      method: 'DELETE',
    }
    return fetchUtil.run(url, options)
  }
  static update(e) {
    let url = `${site.carina}/me/friend/${e.id}`
    let options = {
      method: 'PUT',
      body: e,
    }
    return fetchUtil.run(url, options)
  }
  static findById(e) {
    let url = `${site.carina}/me/friend/${e.id}`
    let options = {
      method: 'GET',
    }
    return fetchUtil.run(url, options)
  }
  static check(e) {
    let url = `${site.carina}/me/friend/check?${paramUtil.createUrlEncode(e)}`
    let options = {
      method: 'GET',
    }
    return fetchUtil.run(url, options)
  }
  static count(filter) {
    let url = `${site.carina}/me/friend/count?${paramUtil.createUrlEncode(filter)}`
    let options = {
      method: 'GET',
    }
    return fetchUtil.run(url, options)
  }
  static find(filter) {
    let url = `${site.carina}/me/friend?${paramUtil.createUrlEncode(filter)}`
    let options = {
      method: 'GET',
    }
    return fetchUtil.run(url, options)
  }
}
class Mg {
}
