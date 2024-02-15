import baseURL from '@/services/baseUrl'

/**
 * A simple function which trims off the redundant part of the supplied URL. The files in the API
 * layer used the trimmed versions.
 * @param url The long url to trim
 * @returns A cut-off url which doesn't contain the redundant `https://pokeapi.. something`
 */
const trimUrl = (url: string) => {
  const offset = baseURL.length
  return url.slice(offset)
}

export default trimUrl
