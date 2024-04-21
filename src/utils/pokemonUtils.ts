/**
 * Utility functions for working with individual Pokemon page
 */

export const getCatchRate = (catchRate: number) => {
  // Source: https://bulbapedia.bulbagarden.net/wiki/Catch_rate

  // Calculating the value of a - if no factors are considered then the catch rate has a very
  // simple formula
  const alpha = (4096 / 3) * catchRate

  // For beta the formula is for gen 6 onwards
  const exponentBase = alpha / 1044480
  const beta = 65536 * Math.pow(exponentBase, 0.25)

  // A random number between 0 and 65535 (inclusive) is rolled four times - for a successful
  // capture, the number generated should be less than beta four times in a row.
  // sp by simple probability the capture rate is a successful event four times.
  const captureProability = Math.pow(beta / 65536, 4)

  // Return a string form
  return `${(100 * captureProability).toFixed(1)}%`
}
