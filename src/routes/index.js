const slug = {
  basic: '/',
  login: '/user/login',
  promotion: {
    base: '/promotion'
  },
  infoTour: {
    base: '/infoTour'
  },
  introduce: {
    base: '/introduce'
  },
  contact: {
    base: '/contact'
  }
}

// NOTE  cấu trúc item breadcrumb là 1 array object
// + object gồm: slug và name
// last item sẽ k0 có slug
export const breadcrumb = {
  // Cơ sở
  // [slug.coso.list]: [{ name: 'Cơ sở' }]
}

export default slug
