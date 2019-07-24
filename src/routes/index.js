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

    kehoachbaovemoitruong: {
      base: '/ttmoitruong/kehoachbaovemoitruong',
      list: '/ttmoitruong/kehoachbaovemoitruong',
      create: '/ttmoitruong/kehoachbaovemoitruong/create',
      edit: '/ttmoitruong/kehoachbaovemoitruong/[_id]'
    },

    giayphepxathai: {
      base: '/ttmoitruong/giayphepxathai',
      list: '/ttmoitruong/giayphepxathai',
      create: '/ttmoitruong/giayphepxathai/create',
      edit: '/ttmoitruong/giayphepxathai/[_id]'
    }
  },
  bcgiamsatmoitruong: {
    base: '/bcgiamsatmoitruong'
  },
  manager: {
    base: '/manager'
  }
}

// NOTE  cấu trúc item breadcrumb là 1 array object
// + object gồm: slug và name
// last item sẽ k0 có slug
export const breadcrumb = {
  // Cơ sở
  [slug.coso.list]: [{ name: 'Cơ sở' }],
  [slug.coso.create]: [{ name: 'Cơ sở', slug: slug.coso.list }, { name: 'Thêm mới' }],
  [slug.coso.edit]: [{ name: 'Cơ sở', slug: slug.coso.list }, { name: 'Cập nhật' }],
  // Tác động môi truờng
  [slug.ttmoitruong.tacdongmoitruong.list]: [{ name: 'Tác động môi truờng' }],
  [slug.ttmoitruong.tacdongmoitruong.create]: [
    { name: 'Tác động môi truờng', slug: slug.ttmoitruong.tacdongmoitruong.list },
    { name: 'Thêm mới' }
  ],
  [slug.ttmoitruong.tacdongmoitruong.edit]: [
    { name: 'Tác động môi truờng', slug: slug.ttmoitruong.tacdongmoitruong.list },
    { name: 'Cập nhật' }
  ],
  // Kế Hoạch Bảo Vệ Môi Truờng
  [slug.ttmoitruong.kehoachbaovemoitruong.list]: [{ name: 'Kế Hoạch Bảo Vệ Môi Truờng' }],
  [slug.ttmoitruong.kehoachbaovemoitruong.create]: [
    { name: 'Kế Hoạch Bảo Vệ Môi Truờng', slug: slug.ttmoitruong.kehoachbaovemoitruong.list },
    { name: 'Thêm mới' }
  ],
  [slug.ttmoitruong.kehoachbaovemoitruong.edit]: [
    { name: 'Kế Hoạch Bảo Vệ Môi Truờng', slug: slug.ttmoitruong.kehoachbaovemoitruong.list },
    { name: 'Cập nhật' }
  ],
  // Giấy phép môi truờng
  [slug.ttmoitruong.giayphepxathai.list]: [{ name: 'Giấy phép xả thải' }],
  [slug.ttmoitruong.giayphepxathai.create]: [
    { name: 'Giấy phép xả thải', slug: slug.ttmoitruong.giayphepxathai.list },
    { name: 'Thêm mới' }
  ],
  [slug.ttmoitruong.giayphepxathai.edit]: [
    { name: 'Giấy phép xả thải', slug: slug.ttmoitruong.giayphepxathai.list },
    { name: 'Cập nhật' }
  ]
}

export default slug
