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
      info: '/manager/organization',
      edit: '/manager/organization/edit'
    },
    policy: {
      base: '/manager/policy',
      list: '/manager/policy',
      create: '/manager/policy/create',
      edit: '/manager/policy/[_id]'
    }
  },
  project: {
    base: '/real-estate-project',
    list: '/real-estate-project',
    edit: '/real-estate-project/[_id]'
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
  [slug.manager.user.edit]: [{ name: 'Nhân sự', slug: slug.manager.user.list }, { name: 'Cập nhật' }],
  // Policy
  [slug.manager.policy.list]: [{ name: 'Chính sách công ty' }],
  // Department
  [slug.manager.department.list]: [{ name: 'Phòng ban' }],
  // Sơ đồ tổ chức organization
  [slug.manager.organization.info]: [{ name: 'Sơ đồ tổ chức' }],
  [slug.manager.organization.edit]: [
    { name: 'Sơ đồ tổ chức', slug: slug.manager.organization.info },
    { name: 'Cập nhật' }
  ],
  // Dự án bất động sản
  [slug.project.list]: [{ name: 'Dự án bất động sản' }]
}

export default slug
