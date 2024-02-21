const getMoveImage = (damageClass: string) => {
  if (damageClass === 'physical') return 'move-physical.png'
  else if (damageClass === 'special') return 'move-special.png'
  else if (damageClass === 'status') return 'move-status.png'
  else return ''
}

export default getMoveImage
