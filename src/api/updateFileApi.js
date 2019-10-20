const SLUG = `${process.env.HOST_MEDIA}`

import pathParse from 'path-parse'

export function getFilePrivate(url, token) {
  const URL = `${SLUG}${url}?token=${token}`
  const result = pathParse(url)

  return {
    URL,
    ...result,
    ext: result.ext.replace('.', '')
  }
}

export default {
  getFilePrivate
}
