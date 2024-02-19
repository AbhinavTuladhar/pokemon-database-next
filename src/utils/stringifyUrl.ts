/**
 * A function which replaces the numerical id at the end of an api url with a string identifier.
 * @param url The url to operate on
 * @param replacement The string to use as a replacement for the id number
 */

const stringifyUrl = (url: string, replacement: string) => {
  const replaced = url.replace(/\d+\/?$/, replacement.toLowerCase())
  return replaced
}

export default stringifyUrl
