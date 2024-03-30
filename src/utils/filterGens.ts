/**
 * Filters the given URL based on the ID number extracted from it.
 *
 * @param {string} url - The URL to be filtered.
 * @return {boolean} Returns true if the ID number in the URL is less than or equal to 807, otherwise returns false.
 */
const filterGens = (url: string) => {
  const idNumber = parseInt(url.match(/\/(\d+)\/$/)![1])
  return idNumber <= 807
}

export default filterGens
