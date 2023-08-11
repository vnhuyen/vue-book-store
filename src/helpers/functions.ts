export function truncateText(text: string) {
  return text.substring(0, 100) + '...'
}


export function shortenAddress(address: string) {
    const prefix = address.slice(0, 5)
    const suffix = address.slice(-4)
    return `${prefix}...${suffix}`
}