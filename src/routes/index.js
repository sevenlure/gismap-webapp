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
      create: '/ttmoitruong/tacdongmoitruong/create'
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

export default slug
