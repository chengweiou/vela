export default {
  // carina test login 接口，没这么多事，直接返回token了
  'POST /login': 'asdlfkjsdfkjsldfksd',
  'POST /logout': null,
  'POST /token/refresh': { token: 'alksdjfkljsadlf', refreshToken: 'aoivjioamweiwaopeif' },
  'POST /upload': '/upload/weapon/aaa.png',

  'POST /person': 4,
  'PUT /person/:id': 4,
  'GET /person/:id': { id: 1, type: 'SUPER', name: 'name', ip: 'ip', createAt: '2019-02-03 10:10:10', updateAt: '2019-02-03 10:10:10' },
  'GET /person/count': 2,
  'GET /person': [
    { id: 1, type: 'SUPER', name: 'name', ip: 'ip', createAt: '2019-02-03 10:10:10', updateAt: '2019-02-03 10:10:10' },
    { id: 2, type: 'SUPER', name: 'name', ip: 'ip', createAt: '2019-02-03 10:10:10', updateAt: '2019-02-03 10:10:10' },
    { id: 3, type: 'SUPER', name: 'name', ip: 'ip', createAt: '2019-02-03 10:10:10', updateAt: '2019-02-03 10:10:10' },
  ],
}
