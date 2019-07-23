const slug = {
  basic: '/',
  login: '/user/login',

  coso: {
    base: '/coso',
    list: '/',
    create: '/coso/create',
    edit: '/coso/[_id]'
  },
  ttmoitruong: {
    base: '/ttmoitruong',

    tacdongmoitruong: {
      base: '/ttmoitruong/tacdongmoitruong',
      list: '/ttmoitruong/tacdongmoitruong',
      create: '/ttmoitruong/tacdongmoitruong/create',
      edit: '/ttmoitruong/tacdongmoitruong/[_id]'
    },
    menu2: {
      base: '/ttmoitruong/menu2'
    }
  },
  bcgiamsatmoitruong: {
    base: '/bcgiamsatmoitruong'
  },
  manager: {
    base: '/manager'
  }
}

export const breadcrumb = {
  [slug.coso.list]: ['Cơ sở'],
  [slug.coso.create]: ['Cơ sở', 'Thêm mới'],
  [slug.coso.edit]: ['Cơ sở', 'Cập nhật'],

  [slug.ttmoitruong.tacdongmoitruong.list]: ['Tác động môi truờng'],
  [slug.ttmoitruong.tacdongmoitruong.create]: ['Tác động môi truờng', 'Thêm mới'],
  [slug.ttmoitruong.tacdongmoitruong.edit]: ['Tác động môi truờng', 'Cập nhật']
}

export default slug
