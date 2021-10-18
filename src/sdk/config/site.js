const host = import.meta.env.VITE_APP_HOST
// const wormholePort = import.meta.env.VITE_APP_WORMHOLE_PORT
const wsHost = import.meta.env.VITE_APP_HOST_WS


const site = {
  carina: `${host}:60006/carina`,
  carinaWs: `${wsHost}:60006/carina`,
//  milkyway: `${host}${wormholePort?`:${wormholePort}`:''}/wormhole/milkyway`,
//  andromeda: `${host}${wormholePort?`:${wormholePort}`:''}/wormhole/andromeda`,
//  triangulum: `${host}${wormholePort?`:${wormholePort}`:''}/wormhole/triangulum`,
//  mothallah: `${host}${wormholePort?`:${wormholePort}`:''}/wormhole/mothallah`,
}

export default site
