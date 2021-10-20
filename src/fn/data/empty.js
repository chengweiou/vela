export default {
  person: { id: 0, type: 'GUEST', name: '', ip: '', createAt: '', updateAt: '' },
  friend: { person: {id: 0}, target: {id: 0} },
  personRoomRelate: { person: {id: 0}, room: {id: 0}, name: '', imgsrc: '', unread: 0, lastMessage: '' },
  room: { type: 'SOLO', personIdList: [] },
  history: { room: {id: 0}, person: {id: 0}, sender: {id: 0}, type: 'TEXT', v: '', unread: 0 },
}
