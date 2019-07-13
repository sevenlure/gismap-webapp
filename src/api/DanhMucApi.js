import fetch from './fetch'

const SLUG = '/danhmucListItem'
export function getListByKeyDanhMuc(query) {
  return fetch.get(`${SLUG}/getByKeyDanhmuc`, {
    params: {
      ...query
    }
  })
}

export default {
  getListByKeyDanhMuc
}
