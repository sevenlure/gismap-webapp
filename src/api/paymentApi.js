import fetch from './fetch'

const SLUG = '/payment'
export function payTicket({ tour, bookingInfo, promotionCode, paymentInfo }) {
  return fetch.post(`${SLUG}`, { tour, bookingInfo, promotionCode, paymentInfo })
}

export function paymentBooking({ token }) {
  return fetch.get(`${SLUG}/booking?token=${token}`)
}

export function paymentBoked({ token }) {
  return fetch.get(`${SLUG}/booked?token=${token}`)
}
export default {
  payTicket,
  paymentBooking,
  paymentBoked
}
