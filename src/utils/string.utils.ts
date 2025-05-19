// This is for capitalising the first letter of a word.
export const capitaliseFirstLetter = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

export const formatName = (name: string) => {
  // Split the name by hyphen to and capitalise the first letter of each word.
  const wordList = name?.split('-')
  let properWordList = wordList?.map(word => capitaliseFirstLetter(word))
  // If it's a mega evolution, reverse the array, then join them with spaces.
  if (properWordList?.includes('Mega')) {
    if (properWordList?.length === 3) {
      const [name, mega, suffix] = properWordList
      return `${mega} ${name} ${suffix}`
    }
    return properWordList?.reverse().join(' ')
  }
  return properWordList?.join(' ')
}

// Change to title text - first letter capitalised
export const formatText = (text: string) => {
  const wordList = text.split('-')
  const properWordList = wordList.map((word, index) => {
    if (index === 0) {
      return capitaliseFirstLetter(word)
    }
    return word
  })
  return properWordList.join(' ')
}
