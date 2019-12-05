const slug = {
  basic: '/',
  login: '/auth/login',
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
    edit: '/real-estate-project/[_id]',
    contentWidthId: '/real-estate-project/content',
    content: '/real-estate-project/content/[_id]',
    create: '/real-estate-project/create'
  },
  report: {
    base: '/report',
    list: '/report',
    edit: '/report/edit'
  },
  trip: {
    base: '/trip',
    list: '/trip'
  }
}

// NOTE  cấu trúc item breadcrumb là 1 array object
// + object gồm: slug và name
// last item sẽ k0 có slug
export const breadcrumb = {
  // nhân sự
  [slug.manager.user.list]: [{ name: 'Danh sách nhân sự' }],
  [slug.manager.user.create]: [{ name: 'Nhân sự', slug: slug.manager.user.list }, { name: 'Thêm mới nhân sự' }],
  [slug.manager.user.edit]: [{ name: 'Nhân sự', slug: slug.manager.user.list }, { name: 'Cập nhật nhân sự' }],
  // Policy
  [slug.manager.policy.list]: [{ name: 'Chính sách công ty' }],
  // Department
  [slug.manager.department.list]: [{ name: 'Phòng ban' }],
  // Sơ đồ tổ chức organization
  [slug.manager.organization.info]: [{ name: 'Sơ đồ tổ chức' }],
  [slug.manager.organization.edit]: [
    { name: 'Sơ đồ tổ chức', slug: slug.manager.organization.info },
    { name: 'Cập nhật sơ đồ tổ chức' }
  ],
  // Dự án bất động sản
  [slug.project.list]: [{ name: 'Dự án bất động sản' }],
  [slug.project.edit]: [{ name: 'Dự án bất động sản', slug: slug.project.list }, { name: 'Cập nhật bất động sản' }],
  [slug.project.create]: [{ name: 'Dự án bất động sản', slug: slug.project.list }, { name: 'Thêm mới bất động sản' }],
  [slug.project.content]: [
    { name: 'Dự án bất động sản', slug: slug.project.list },
    { name: 'Tạo nội dung bất động sản' }
  ],
  // Kết quả kinh doanh REPORT
  [slug.report.base]: [{ name: 'Cập nhật kết quả kinh doanh' }],
  [slug.report.edit]: [
    { name: 'Cập nhật kết quả kinh doanh', slug: slug.report.list },
    { name: 'Cập nhật dữ liệu excel' }
  ],
  // Chuyến công tác TRIP
  [slug.trip.list]: [{ name: 'Chuyến công tác' }]
}

export default slug
