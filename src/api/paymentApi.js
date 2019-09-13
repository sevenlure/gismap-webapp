import fetch from './fetch'

const SLUG = '/payment'
export function payTicket({ tour, bookingInfo, promotionCode, paymentInfo }) {
  return fetch.post(`${SLUG}`, { tour, bookingInfo, promotionCode, paymentInfo })
}

export default {
  payTicket
}
