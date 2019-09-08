// NOTE
export const SET_PAYMENT_INFO_TICKET = 'PAYMENT/SET_PAYMENT_INFO_TICKET'
export const CLEAR_PAYMENT_INFO_TICKET = 'PAYMENT/CLEAR_PAYMENT_INFO_TICKET'

export function setPaymentInfoTicket(data) {
  return async dispatch => {
    dispatch({ type: SET_PAYMENT_INFO_TICKET, payload: data })
  }
}
export function clearBookingNowInfoCustomer() {
  return async dispatch => {
    dispatch({ type: CLEAR_PAYMENT_INFO_TICKET })
  }
}
