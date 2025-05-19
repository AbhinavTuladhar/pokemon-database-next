/**
 * Retrieves the resource ID from a given URL.
 *
 * @param url - The URL from which to extract the resource ID.
 * @return The extracted resource ID.
 */
export const getResourceId = (url: string): string => {
  const matchResult = url.match(/\/(\d+)\/$/)
  return matchResult![1]
}
