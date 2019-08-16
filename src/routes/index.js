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

    htxulynuocthai: {
      base: '/ttmoitruong/htxulynuocthai',
      list: '/ttmoitruong/htxulynuocthai',
      create: '/ttmoitruong/htxulynuocthai/create',
      edit: '/ttmoitruong/htxulynuocthai/[_id]'
    },

    htxulykhithai: {
      base: '/ttmoitruong/htxulykhithai',
      list: '/ttmoitruong/htxulykhithai',
      create: '/ttmoitruong/htxulykhithai/create',
      edit: '/ttmoitruong/htxulykhithai/[_id]'
    },

    sochunguonthai: {
      base: '/ttmoitruong/sochunguonthai',
      list: '/ttmoitruong/sochunguonthai',
      create: '/ttmoitruong/sochunguonthai/create',
      edit: '/ttmoitruong/sochunguonthai/[_id]'
    }
  },
  baocaogiamsatmoitruong: {
    base: '/baocaogiamsatmoitruong',
    list: '/baocaogiamsatmoitruong',
    create: '/baocaogiamsatmoitruong/create',
    edit: '/baocaogiamsatmoitruong/[_id]'
  },
  baocaoquanlychatthairan: {
    base: '/baocaoquanlychatthairan',
    list: '/baocaoquanlychatthairan',
    create: '/baocaoquanlychatthairan/create',
    edit: '/baocaoquanlychatthairan/[_id]'
  },
  thanhtrakiemtra: {
    base: '/thanhtrakiemtra',
    list: '/thanhtrakiemtra',
    create: '/thanhtrakiemtra/create',
    edit: '/thanhtrakiemtra/[_id]'
  },
  thuphi: {
    base: '/thuphi',
    list: '/thuphi',
    create: '/thuphi/create',
    edit: '/thuphi/[_id]'
  },
  manager: {
    base: '/manager',

    user: {
      base: '/manager/user',
      list: '/manager/user',
      create: '/manager/user/create',
      edit: '/manager/user/[_id]'
    }
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
  [slug.ttmoitruong.htxulynuocthai.list]: [{ name: 'Hệ thống xử lý nuớc thải' }],
  [slug.ttmoitruong.htxulynuocthai.create]: [
    { name: 'Hệ thống xử lý nuớc thải', slug: slug.ttmoitruong.htxulynuocthai.list },
    { name: 'Thêm mới' }
  ],
  [slug.ttmoitruong.htxulynuocthai.edit]: [
    { name: 'Hệ thống xử lý nuớc thải', slug: slug.ttmoitruong.htxulynuocthai.list },
    { name: 'Cập nhật' }
  ],
  //Hệ thống xử lý khí thải
  [slug.ttmoitruong.htxulykhithai.list]: [{ name: 'Hệ thống xử lý khí thải' }],
  [slug.ttmoitruong.htxulykhithai.create]: [
    { name: 'Hệ thống xử lý khí thải', slug: slug.ttmoitruong.htxulykhithai.list },
    { name: 'Thêm mới' }
  ],
  [slug.ttmoitruong.htxulykhithai.edit]: [
    { name: 'Hệ thống xử lý khí thải', slug: slug.ttmoitruong.htxulykhithai.list },
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
  ],
  //Báo cáo giám sát môi truờng
  [slug.baocaogiamsatmoitruong.list]: [{ name: 'Báo cáo giám sát môi truờng' }],
  [slug.baocaogiamsatmoitruong.create]: [
    { name: 'Báo cáo giám sát môi truờng', slug: slug.baocaogiamsatmoitruong.list },
    { name: 'Thêm mới' }
  ],
  [slug.baocaogiamsatmoitruong.edit]: [
    { name: 'Báo cáo giám sát môi truờng', slug: slug.baocaogiamsatmoitruong.list },
    { name: 'Cập nhật' }
  ],
  //Báo cáo quản lý chất thải rắn
  [slug.baocaoquanlychatthairan.list]: [{ name: 'Báo cáo quản lý chất thải rắn' }],
  [slug.baocaoquanlychatthairan.create]: [
    { name: 'Báo cáo quản lý chất thải rắn', slug: slug.baocaoquanlychatthairan.list },
    { name: 'Thêm mới' }
  ],
  [slug.baocaoquanlychatthairan.edit]: [
    { name: 'Báo cáo quản lý chất thải rắn', slug: slug.baocaoquanlychatthairan.list },
    { name: 'Cập nhật' }
  ],
  //Thanh Tra Kiem Tra
  [slug.thanhtrakiemtra.list]: [{ name: 'Thanh tra/Kiểm tra' }],
  [slug.thanhtrakiemtra.create]: [
    { name: 'Thanh tra/Kiểm tra', slug: slug.thanhtrakiemtra.list },
    { name: 'Thêm mới' }
  ],
  [slug.thanhtrakiemtra.edit]: [{ name: 'Thanh tra/Kiểm tra', slug: slug.thanhtrakiemtra.list }, { name: 'Cập nhật' }],
  //Thu Phi
  [slug.thuphi.list]: [{ name: 'Thu Phí' }],
  [slug.thuphi.create]: [{ name: 'Thu Phí', slug: slug.thuphi.list }, { name: 'Thêm mới' }],
  [slug.thuphi.edit]: [{ name: 'Thu Phí', slug: slug.thuphi.list }, { name: 'Cập nhật' }],
  //Quản lý nguời dùng
  [slug.manager.user.list]: [{ name: 'Nguời dùng' }],
  [slug.manager.user.create]: [{ name: 'Nguời dùng', slug: slug.thuphi.list }, { name: 'Thêm mới' }],
  [slug.manager.user.edit]: [{ name: 'Nguời dùng', slug: slug.thuphi.list }, { name: 'Cập nhật' }]
}

export default slug
