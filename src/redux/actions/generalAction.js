import { pick as _pick } from 'lodash'
import { getListByKeyDanhMuc } from 'src/api/DanhMucApi'
import { DANH_MUC } from '../../../shared/constant/danhmuc'
// NOTE  Quản lý các store của danh mục
export const UPDATE_GENERAL_USER_INFO = 'GENERAL/UPDATE_GENERAL_USER_INFO'
export const CLEAR_GENERAL_USER_INFO = 'GENERAL/CLEAR_GENERAL_USER_INFO'

// NOTE  Quản lý các store của danh mục
export const GET_GENERAL_DANHMUC_PROVINCE = 'GENERAL/GET_GENERAL_DANHMUC_PROVINCE'
export const UPDATE_GENERAL_DANHMUC_CO_QUAN_CAP_PHEP = 'GENERAL/UPDATE_GENERAL_DANHMUC_CO_QUAN_CAP_PHEP'
export const GET_GENERAL_DANHMUC_CO_QUAN_THAM_QUYEN_QUAN_LY = 'GENERAL/GET_GENERAL_DANHMUC_CO_QUAN_THAM_QUYEN_QUAN_LY'
export const GET_GENERAL_DANHMUC_DAC_TRUNG_NUOC_THAI = 'GENERAL/GET_GENERAL_DANHMUC_DAC_TRUNG_NUOC_THAI'
export const GET_GENERAL_DANHMUC_KHU_CUM_CONG_NGHIEP = 'GENERAL/GET_GENERAL_DANHMUC_KHU_CUM_CONG_NGHIEP'
export const GET_GENERAL_DANHMUC_NGANH_NGHE = 'GENERAL/GET_GENERAL_DANHMUC_NGANH_NGHE'
export const GET_GENERAL_DANHMUC_NGUON_TIEP_NHAN = 'GENERAL/GET_GENERAL_DANHMUC_NGUON_TIEP_NHAN'
export const GET_GENERAL_DANHMUC_TINH_TRANG_HOAT_DONG = 'GENERAL/GET_GENERAL_DANHMUC_TINH_TRANG_HOAT_DONG'
export const SET_GENERAL_DANHMUC_IS_LOADED = 'GENERAL/SET_GENERAL_DANHMUC_IS_LOADED'

// NOTE  Quản lý các store menu & breadcrumb
export const SET_BREADCRUMB = 'GENERAL/SET_BREADCRUMB'

/* #region  ACTIONS cho user info  */
export function updateUserInfo(data) {
  return dispatch => {
    dispatch({ type: UPDATE_GENERAL_USER_INFO, payload: _pick(data, ['Email', 'FirstName', 'LastName']) })
  }
}
export function clearUserInfo() {
  return dispatch => {
    dispatch({ type: CLEAR_GENERAL_USER_INFO })
  }
}
/* #endregion */

/* #region  ACTIONS Danh mục */
export function setDanhMucIsLoaded() {
  return dispatch => {
    dispatch({ type: SET_GENERAL_DANHMUC_IS_LOADED, payload: true })
  }
}
export function setDanhMucIsLoading() {
  return dispatch => {
    dispatch({ type: SET_GENERAL_DANHMUC_IS_LOADED, payload: false })
  }
}

export function getDanhMucProvie() {
  return async dispatch => {
    const query = {
      KeyDanhmuc: DANH_MUC.PROVINCE,
      KeyExtra: 79 // NOTE  Chỉ lấy Hồ minh với mã 79
    }
    const res = await getListByKeyDanhMuc(query)
    if (res.data) {
      // console.log('data', res)
      dispatch({ type: GET_GENERAL_DANHMUC_PROVINCE, payload: res.data })
    }
  }
}

export function getDanhMucCoSoCapPhep() {
  return async dispatch => {
    const query = {
      KeyDanhmuc: DANH_MUC.CO_QUAN_CAP_PHEP
    }
    const res = await getListByKeyDanhMuc(query)
    if (res.data) {
      // console.log('data', res)
      dispatch({ type: UPDATE_GENERAL_DANHMUC_CO_QUAN_CAP_PHEP, payload: res.data })
    }
  }
}

export function getDanhMucCoQuanThamQuyenQuanLy() {
  return async dispatch => {
    const query = {
      KeyDanhmuc: DANH_MUC.CO_QUAN_THAM_QUYEN_QUAN_LY
    }
    const res = await getListByKeyDanhMuc(query)
    if (res.data) {
      // console.log('data', res)
      dispatch({ type: GET_GENERAL_DANHMUC_CO_QUAN_THAM_QUYEN_QUAN_LY, payload: res.data })
    }
  }
}

export function getDanhMucDacTrungNuocThai() {
  return async dispatch => {
    const query = {
      KeyDanhmuc: DANH_MUC.DAC_TRUNG_NUOC_THAI
    }
    const res = await getListByKeyDanhMuc(query)
    if (res.data) {
      // console.log('data', res)
      dispatch({ type: GET_GENERAL_DANHMUC_DAC_TRUNG_NUOC_THAI, payload: res.data })
    }
  }
}

export function getDanhMucKhuCongNghiep() {
  return async dispatch => {
    const query = {
      KeyDanhmuc: DANH_MUC.KHU_CUM_CONG_NGHIEP
    }
    const res = await getListByKeyDanhMuc(query)
    if (res.data) {
      // console.log('data', res)
      dispatch({ type: GET_GENERAL_DANHMUC_KHU_CUM_CONG_NGHIEP, payload: res.data })
    }
  }
}

export function getDanhMucNganhNghe() {
  return async dispatch => {
    const query = {
      KeyDanhmuc: DANH_MUC.NGANH_NGHE
    }
    const res = await getListByKeyDanhMuc(query)
    if (res.data) {
      // console.log('data', res)
      dispatch({ type: GET_GENERAL_DANHMUC_NGANH_NGHE, payload: res.data })
    }
  }
}

export function getDanhMucNguonTiepNhan() {
  return async dispatch => {
    const query = {
      KeyDanhmuc: DANH_MUC.NGUON_TIEP_NHAN
    }
    const res = await getListByKeyDanhMuc(query)
    if (res.data) {
      // console.log('data', res)
      dispatch({ type: GET_GENERAL_DANHMUC_NGUON_TIEP_NHAN, payload: res.data })
    }
  }
}

export function getDanhMucTinhTrangHoatDong() {
  return async dispatch => {
    const query = {
      KeyDanhmuc: DANH_MUC.TINH_TRANG_HOAT_DONG
    }
    const res = await getListByKeyDanhMuc(query)
    if (res.data) {
      dispatch({ type: GET_GENERAL_DANHMUC_TINH_TRANG_HOAT_DONG, payload: res.data })
    }
  }
}
/* #endregion */

/* #region  ACTIONS cho menu & breadcrumb */
export function setBreadCrumb(breadcrumbArr) {
  return dispatch => {
    const payload = Array.isArray(breadcrumbArr) ? breadcrumbArr : []
    dispatch({ type: SET_BREADCRUMB, payload })
  }
}
/* #endregion */
