import update from 'react-addons-update'
import {
  SET_GENERAL_DANHMUC_IS_LOADED,
  UPDATE_GENERAL_USER_INFO,
  CLEAR_GENERAL_USER_INFO,
  GET_GENERAL_DANHMUC_PROVINCE,
  UPDATE_GENERAL_DANHMUC_CO_QUAN_CAP_PHEP,
  GET_GENERAL_DANHMUC_CO_QUAN_THAM_QUYEN_QUAN_LY,
  GET_GENERAL_DANHMUC_DAC_TRUNG_NUOC_THAI,
  GET_GENERAL_DANHMUC_KHU_CUM_CONG_NGHIEP,
  GET_GENERAL_DANHMUC_NGANH_NGHE,
  GET_GENERAL_DANHMUC_NGUON_TIEP_NHAN,
  GET_GENERAL_DANHMUC_TINH_TRANG_HOAT_DONG
} from '../actions/generalAction'
import { DANH_MUC } from '../../../shared/constant/danhmuc'

import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

const InitialState = {
  userInfo: null,
  danhMuc: {
    [DANH_MUC.PROVINCE]: null,
    [DANH_MUC.CO_QUAN_CAP_PHEP]: null,
    [DANH_MUC.CO_QUAN_THAM_QUYEN_QUAN_LY]: null,
    [DANH_MUC.DAC_TRUNG_NUOC_THAI]: null,
    [DANH_MUC.KHU_CUM_CONG_NGHIEP]: null,
    [DANH_MUC.NGANH_NGHE]: null,
    [DANH_MUC.NGUON_TIEP_NHAN]: null,
    [DANH_MUC.TINH_TRANG_HOAT_DONG]: null
  },
  danhMucIsLoaded: false
}

// REDUCERS
const generalReducer = (state = InitialState, action) => {
  switch (action.type) {
    /* #region  userInfo */
    case UPDATE_GENERAL_USER_INFO: {
      return update(state, {
        userInfo: { $set: action.payload }
      })
    }
    case CLEAR_GENERAL_USER_INFO: {
      return InitialState
    }
    /* #endregion */
    /* #region  Danh muc */
    case SET_GENERAL_DANHMUC_IS_LOADED: {
      return update(state, {
        danhMucIsLoaded: { $set: action.payload }
      })
    }
    case GET_GENERAL_DANHMUC_PROVINCE: {
      return update(state, {
        danhMuc: { [DANH_MUC.PROVINCE]: { $set: action.payload } }
      })
    }
    case UPDATE_GENERAL_DANHMUC_CO_QUAN_CAP_PHEP: {
      return update(state, {
        danhMuc: { [DANH_MUC.CO_QUAN_CAP_PHEP]: { $set: action.payload } }
      })
    }
    case GET_GENERAL_DANHMUC_CO_QUAN_THAM_QUYEN_QUAN_LY: {
      return update(state, {
        danhMuc: { [DANH_MUC.CO_QUAN_THAM_QUYEN_QUAN_LY]: { $set: action.payload } }
      })
    }
    case GET_GENERAL_DANHMUC_DAC_TRUNG_NUOC_THAI: {
      return update(state, {
        danhMuc: { [DANH_MUC.DAC_TRUNG_NUOC_THAI]: { $set: action.payload } }
      })
    }
    case GET_GENERAL_DANHMUC_KHU_CUM_CONG_NGHIEP: {
      return update(state, {
        danhMuc: { [DANH_MUC.KHU_CUM_CONG_NGHIEP]: { $set: action.payload } }
      })
    }
    case GET_GENERAL_DANHMUC_NGANH_NGHE: {
      return update(state, {
        danhMuc: { [DANH_MUC.NGANH_NGHE]: { $set: action.payload } }
      })
    }
    case GET_GENERAL_DANHMUC_NGUON_TIEP_NHAN: {
      return update(state, {
        danhMuc: { [DANH_MUC.NGUON_TIEP_NHAN]: { $set: action.payload } }
      })
    }
    case GET_GENERAL_DANHMUC_TINH_TRANG_HOAT_DONG: {
      return update(state, {
        danhMuc: { [DANH_MUC.TINH_TRANG_HOAT_DONG]: { $set: action.payload } }
      })
    }
    /* #endregion */
    default:
      return state
  }
}

const generalPersistConfig = {
  key: 'GeneralStore',
  storage: storage,
  blacklist: ['danhMuc', 'danhMucIsLoaded']
}

export default persistReducer(generalPersistConfig, generalReducer)
