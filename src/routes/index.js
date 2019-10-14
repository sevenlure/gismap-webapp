const slug = {
  basic: '/',
  login: '/user/login',
  register: '/user/register',
  manager: {
    basic: '/manager',
    user: {
      base: '/manager/user',
      list: '/manager/user',
      create: '/manager/user/create',
      edit: '/manager/user/[_id]'
    },
    department: {
      base: '/manager/department',
      list: '/manager/department'
    },
    organization: {
      base: '/manager/organization',
      list: '/manager/organization'
    },
    policy: {
      base: '/manager/policy',
      list: '/manager/policy'
    }
  },

  project: {
    base: '/real-estate-project'
  },
  report: {
    base: '/report'
  }
}

// NOTE  cấu trúc item breadcrumb là 1 array object
// + object gồm: slug và name
// last item sẽ k0 có slug
export const breadcrumb = {
  // nhân sự
  [slug.manager.user.list]: [{ name: 'Danh sách nhân sự' }],
  [slug.manager.user.create]: [{ name: 'Nhân sự', slug: slug.manager.user.list }, { name: 'Thêm mới' }],
  [slug.manager.user.edit]: [{ name: 'Nhân sự', slug: slug.manager.user.list }, { name: 'Cập nhật' }]
}

export default slug
