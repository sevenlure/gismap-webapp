const SLUG = `${process.env.HOST_MEDIA}`

import pathParse from 'path-parse'

export function getFilePrivate(src, token) {
  const URL = `${SLUG}${src}?token=${token}`
  // console.log("getFilePrivate",token)
  const result = pathParse(src)

  return {
    URL,
    ...result,
    ext: result.ext.replace('.', '')
  }
}

export default {
  getFilePrivate
}
