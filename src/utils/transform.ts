export function byteTransform(bytes: number, decimal = 0) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB']

  let i = 0
  let n = bytes

  while (n >= 1024 && i < units.length - 1) {
    n = n / 1024
    i++
  }

  return n.toFixed(decimal) + units[i]
}
