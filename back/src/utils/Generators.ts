export const GenerateCode = (
  characters: string,
  length: number,
) => {
  let result = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(
      Math.random() * characters.length,
    )
    result += characters[randomIndex]
  }
  return result
}

export function generateUniqueID() {
  const timestamp = new Date().getTime()
  const randomPart = Math.floor(Math.random() * 1000)
  return `${timestamp}${randomPart}`
}
