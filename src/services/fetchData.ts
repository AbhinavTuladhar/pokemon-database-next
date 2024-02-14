import { api } from './axiosConfig'
import { AxiosRequestConfig } from 'axios'

const fetchData = async <T>(url: string, options?: AxiosRequestConfig) => {
  try {
    const response = await api.request<T>({
      ...options,
      url: url,
      method: 'GET',
    })
    return response.data
  } catch (error) {
    throw new Error(`Failed to fetch data from ${url}`)
  }
}

export default fetchData
