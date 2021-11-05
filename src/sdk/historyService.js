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
  static count(filter) {
    let url = `${site.carina}/me/history/count?${paramUtil.createUrlEncode(filter)}`
    let options = {
      method: 'GET',
    }
    return fetchUtil.run(url, options)
  }
  static find(filter) {
    let url = `${site.carina}/me/history?${paramUtil.createUrlEncode(filter)}`
    let options = {
      method: 'GET',
    }
    return fetchUtil.run(url, options)
  }
}
class Mg {
}
