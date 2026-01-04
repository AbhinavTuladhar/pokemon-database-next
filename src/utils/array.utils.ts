/**
 * Generates all combinations of n elements from the given array.
 * @example for (const c of combinationN([1, 2, 3], 2)) {
 *   console.log(c)
 * }
 * Output:
 * [1, 2]
 * [1, 3]
 * [2, 3]
 * @param {Array<T>} array - The array to generate combinations from
 * @param {number} n - The number of elements to combine
 * @yields {Generator<Array<T>>} - A generator yielding all combinations of n elements from the given array
 */
export function* combinationN<T>(array: Array<T>, n: number): Generator<Array<T>> {
  if (n === 1) {
    for (const a of array) {
      yield [a]
    }
    return
  }

  for (let i = 0; i <= array.length - n; i++) {
    for (const c of combinationN(array.slice(i + 1), n - 1)) {
      yield [array[i], ...c]
    }
  }
}
