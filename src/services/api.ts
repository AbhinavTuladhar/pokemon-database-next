import { MainClient as MainPokeNodeClient } from 'pokenode-ts'

const Api = new MainPokeNodeClient({
  cacheOptions: {
    ttl: Infinity,
  },
})

export default Api
