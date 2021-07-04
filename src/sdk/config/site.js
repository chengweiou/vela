const host = import.meta.env.VITE_APP_HOST
const wsHost = import.meta.env.VITE_APP_HOST_WS

const site = {
  carina: `${host}:60006/carina`,
  carinaWs: `${wsHost}:60006/carina`,
}

export default site
