const SLUG = `${process.env.HOST_MEDIA}`

export function getFilePrivate(url, token) {
  return `${SLUG}${url}?token=${token}`
}

export default {
  getFilePrivate
}
