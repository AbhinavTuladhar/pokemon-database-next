import fetchData from './fetchData'

const fetchMultipleData = async <T>(urls: string[]): Promise<T[]> => {
  const fetchRequests = urls.map(url => fetchData<T>(url))

  try {
    const responseData = await Promise.all(fetchRequests)
    return responseData
  } catch (error) {
    // Handle errors if needed
    console.error('Error fetching multiple data:', error)
    throw error
  }
}

export default fetchMultipleData
