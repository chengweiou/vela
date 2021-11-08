export default {
  // carina test login 接口，没这么多事，直接返回token了
  'POST /login': 'asdlfkjsdfkjsldfksd',
  'POST /logout': null,
  'POST /token/refresh': { token: 'alksdjfkljsadlf', refreshToken: 'aoivjioamweiwaopeif' },
  'POST /upload/image': '/upload/weapon/aaa.png',
  'POST /upload/file': '/upload/weapon/aaa.png',

  'GET /me': { id: 1, name: 'name', imgsrc: 'a.png', unread: 3, createAt: '2019-02-03 10:10:10', updateAt: '2019-02-03 10:10:10' },

  'POST /person': 4,
  'PUT /person/:id': 4,
  'GET /person/:id': { id: 1, name: 'name', imgsrc: 'a.png', unread: 3, createAt: '2019-02-03 10:10:10', updateAt: '2019-02-03 10:10:10' },
  'GET /person/count': 2,
  'GET /person': [
    { id: 1, name: 'name', imgsrc: 'a.png', unread: 3, createAt: '2019-02-03 10:10:10', updateAt: '2019-02-03 10:10:10' },
    { id: 2, name: 'name', imgsrc: 'a.png', unread: 3, createAt: '2019-02-03 10:10:10', updateAt: '2019-02-03 10:10:10' },
    { id: 3, name: 'name', imgsrc: 'a.png', unread: 3, createAt: '2019-02-03 10:10:10', updateAt: '2019-02-03 10:10:10' },
  ],

  'GET /friend/count': 2,
  'GET /friend': [
    { id: 1, person: {id: 1}, target: {id: 2}, createAt: '2019-02-03 10:10:10', updateAt: '2019-02-03 10:10:10' },
    { id: 2, person: {id: 1}, target: {id: 2}, createAt: '2019-02-03 10:10:10', updateAt: '2019-02-03 10:10:10' },
    { id: 3, person: {id: 1}, target: {id: 2}, createAt: '2019-02-03 10:10:10', updateAt: '2019-02-03 10:10:10' },
  ],
  'GET /friend/check': false,

  'GET /personRoomRelate/count': 2,
  'GET /personRoomRelate': [
    { id: 1, person: {id: 1}, room: {id: 1}, name: 'name', imgsrc: 'a.png', unread: 3, lastMessage: 'last message...', lastMessageAt: '2019-02-03 10:10:10', createAt: '2019-02-03 10:10:10', updateAt: '2019-02-03 10:10:10' },
    { id: 2, person: {id: 1}, room: {id: 1}, name: 'name', imgsrc: 'a.png', unread: 3, lastMessage: 'last message...', lastMessageAt: '2019-02-03 10:10:10', createAt: '2019-02-03 10:10:10', updateAt: '2019-02-03 10:10:10' },
    { id: 3, person: {id: 1}, room: {id: 1}, name: 'name', imgsrc: 'a.png', unread: 3, lastMessage: 'last message...', lastMessageAt: '2019-02-03 10:10:10', createAt: '2019-02-03 10:10:10', updateAt: '2019-02-03 10:10:10' },
  ],

  'POST /me/room': { id: 1, type: 'SOLO', personIdList: [1, 2], createAt: '2019-02-03 10:10:10', updateAt: '2019-02-03 10:10:10' },
  'POST /me/room/:id/leave': true,
  'GET /me/room/key': { id: 1, type: 'SOLO', personIdList: [1, 2], createAt: '2019-02-03 10:10:10', updateAt: '2019-02-03 10:10:10' },

  'GET /history/count': 2,
  'GET /history': [
    { id: 1, room: {id: 1}, person: {id: 1}, sender: {id: 1}, type: 'TEXT', v: 'this is v', unread: true, createAt: '2019-02-03 10:10:10', updateAt: '2019-02-03 10:10:10' },
    { id: 2, room: {id: 1}, person: {id: 2}, sender: {id: 2}, type: 'TEXT', v: 'this is v', unread: true, createAt: '2019-02-03 10:10:10', updateAt: '2019-02-03 10:10:10' },
    { id: 3, room: {id: 1}, person: {id: 2}, sender: {id: 2}, type: 'TEXT', v: 'this is v', unread: true, createAt: '2019-02-03 10:10:10', updateAt: '2019-02-03 10:10:10' },
  ],
  'POST /me/msg': 2,
  'POST /me/msg/:id/read': 1,
  'GET /me/msg': [
    { id: 1, room: {id: 1}, person: {id: 1}, sender: {id: 1}, type: 'TEXT', v: 'this is v', unread: true, createAt: '2019-02-03 10:10:10', updateAt: '2019-02-03 10:10:10' },
    { id: 2, room: {id: 1}, person: {id: 1}, sender: {id: 2}, type: 'TEXT', v: 'this is v', unread: true, createAt: '2019-02-03 10:10:10', updateAt: '2019-02-03 10:10:10' },
    { id: 3, room: {id: 1}, person: {id: 2}, sender: {id: 2}, type: 'TEXT', v: 'this is v', unread: true, createAt: '2019-02-03 10:10:10', updateAt: '2019-02-03 10:10:10' },
  ],
}
