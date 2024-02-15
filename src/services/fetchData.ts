import { api } from './axiosConfig'
import { AxiosRequestConfig } from 'axios'
import baseURL from './baseUrl'

// const fetchData = async <T>(url: string, options?: AxiosRequestConfig) => {
//   try {
//     const response = await api.request<T>({
//       ...options,
//       url: url,
//       method: 'GET',

//     })
//     return response.data
//   } catch (error) {
//     throw new Error(`Failed to fetch data from ${url}`)
//   }
// }

const fetchData = async <T>(url: string) => {
  const response = await fetch(`${baseURL}${url}`, { cache: 'force-cache' })

  console.log('The requested url is', `${baseURL}${url}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch data from {url}`)
  }

  const data = (await response.json()) as T

  return data
}

export default fetchData
