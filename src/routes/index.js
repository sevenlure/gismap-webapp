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
    },

    khaithacnuocduoidat: {
      base: '/ttmoitruong/khaithacnuocduoidat',
      list: '/ttmoitruong/khaithacnuocduoidat',
      create: '/ttmoitruong/khaithacnuocduoidat/create',
      edit: '/ttmoitruong/khaithacnuocduoidat/[_id]'
    },

    khaithacnuocmat: {
      base: '/ttmoitruong/khaithacnuocmat',
      list: '/ttmoitruong/khaithacnuocmat',
      create: '/ttmoitruong/khaithacnuocmat/create',
      edit: '/ttmoitruong/khaithacnuocmat/[_id]'
    },

    xulynuocthai: {
      base: '/ttmoitruong/xulynuocthai',
      list: '/ttmoitruong/xulynuocthai',
      create: '/ttmoitruong/xulynuocthai/create',
      edit: '/ttmoitruong/xulynuocthai/[_id]'
    },

    xulykhithai: {
      base: '/ttmoitruong/xulykhithai',
      list: '/ttmoitruong/xulykhithai',
      create: '/ttmoitruong/xulykhithai/create',
      edit: '/ttmoitruong/xulykhithai/[_id]'
    },

    sochunguonthai: {
      base: '/ttmoitruong/sochunguonthai',
      list: '/ttmoitruong/sochunguonthai',
      create: '/ttmoitruong/sochunguonthai/create',
      edit: '/ttmoitruong/sochunguonthai/[_id]'
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
  ],
  //Hiện trạng khai thác nuớc duới đất
  [slug.ttmoitruong.khaithacnuocduoidat.list]: [{ name: 'Hiện trạng khai thác nuớc duới đất' }],
  [slug.ttmoitruong.khaithacnuocduoidat.create]: [
    { name: 'Hiện trạng khai thác nuớc duới đất', slug: slug.ttmoitruong.khaithacnuocduoidat.list },
    { name: 'Thêm mới' }
  ],
  [slug.ttmoitruong.khaithacnuocduoidat.edit]: [
    { name: 'Hiện trạng khai thác nuớc duới đất', slug: slug.ttmoitruong.khaithacnuocduoidat.list },
    { name: 'Cập nhật' }
  ],
  //Hiện trạng khai thác nuớc mặt
  [slug.ttmoitruong.khaithacnuocmat.list]: [{ name: 'Hiện trạng khai thác nuớc mặt' }],
  [slug.ttmoitruong.khaithacnuocmat.create]: [
    { name: 'Hiện trạng khai thác nuớc mặt', slug: slug.ttmoitruong.khaithacnuocmat.list },
    { name: 'Thêm mới' }
  ],
  [slug.ttmoitruong.khaithacnuocmat.edit]: [
    { name: 'Hiện trạng khai thác nuớc mặt', slug: slug.ttmoitruong.khaithacnuocmat.list },
    { name: 'Cập nhật' }
  ],
  //Hệ thống xử lý nuớc thải
  [slug.ttmoitruong.xulynuocthai.list]: [{ name: 'Hệ thống xử lý nuớc thải' }],
  [slug.ttmoitruong.xulynuocthai.create]: [
    { name: 'Hệ thống xử lý nuớc thải', slug: slug.ttmoitruong.xulynuocthai.list },
    { name: 'Thêm mới' }
  ],
  [slug.ttmoitruong.xulynuocthai.edit]: [
    { name: 'Hệ thống xử lý nuớc thải', slug: slug.ttmoitruong.xulynuocthai.list },
    { name: 'Cập nhật' }
  ],
  //Hệ thống xử lý khí thải
  [slug.ttmoitruong.xulykhithai.list]: [{ name: 'Hệ thống xử lý khí thải' }],
  [slug.ttmoitruong.xulykhithai.create]: [
    { name: 'Hệ thống xử lý khí thải', slug: slug.ttmoitruong.xulykhithai.list },
    { name: 'Thêm mới' }
  ],
  [slug.ttmoitruong.xulykhithai.edit]: [
    { name: 'Hệ thống xử lý khí thải', slug: slug.ttmoitruong.xulykhithai.list },
    { name: 'Cập nhật' }
  ],
  //Sổ chủ nguồn thải
  [slug.ttmoitruong.sochunguonthai.list]: [{ name: 'Sổ chủ nguồn thải' }],
  [slug.ttmoitruong.sochunguonthai.create]: [
    { name: 'Sổ chủ nguồn thải', slug: slug.ttmoitruong.sochunguonthai.list },
    { name: 'Thêm mới' }
  ],
  [slug.ttmoitruong.sochunguonthai.edit]: [
    { name: 'Sổ chủ nguồn thải', slug: slug.ttmoitruong.sochunguonthai.list },
    { name: 'Cập nhật' }
  ]
}

export default slug
