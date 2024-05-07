/**
 *
 */

const buildTimeArray = (conditionValues: Array<string>) => {
  const newArray: [string, string, string] = ['', '', '']

  conditionValues.forEach(condition => {
    let index = 0

    switch (condition) {
      case 'time-morning':
        index = 0
        break
      case 'time-day':
        index = 1
        break
      case 'time-night':
        index = 2
        break
      default:
        break
    }

    newArray[index] = condition
  })
  return newArray
}

const buildConditionArray = (conditionType: string, conditionValues: Array<string>) => {
  const emptyArray: [string, string, string] = ['', '', '']
  switch (conditionType) {
    case 'time':
      return buildTimeArray(conditionValues)
    default:
      return emptyArray
  }
}

export default buildConditionArray
