const slug = {
  basic: '/',
  login: '/user/login',
  promotion: {
    base: '/promotion'
  },
  infoTour: {
    base: '/infoTour'
  },
  auth: {
    forgot_password: '/auth/forgot-password'
  },
  about: {
    base: '/about'
  },
  contact: {
    base: '/contact'
  },
  booking: {
    base: '/booking'
  },
  result: {
    base: '/result/register-success',
    success: '/result/success',
    registerSuccess: '/result/register-success',
    registerError: '/result/register-error'
  },
  user: {
    forgetPassword: '/user/forget-password',
    forgetPasswordNew: '/user/forget-password-new'
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
