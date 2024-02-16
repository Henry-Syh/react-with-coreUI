import { createStore } from 'redux'

const initialState = {
  sidebarShow: true,
  token: "",
  userName: "",
  verify: null,
  orderList: [],  // 尚未購買前的資料先存放在這[{購買NFT資料/數量等等},{}...]
  pb_bought: false,  // 使用者是否有購買PowerBox
  lineBind: false,  // 使用者是否已經綁定LineNotify
  languageChange: false,  // 是否更改語言
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    case 'UPDATE_TOKEN':
      return { ...state, ...rest }
    case 'UPDATE_USERNAME':
      return { ...state, ...rest }
    case 'ISVERIFY':
      return { ...state, ...rest }
    case 'BUY':
      return { ...state, ...rest }
    case 'POWERBOX_BOUGHT':
      return { ...state, ...rest }
    case 'LINENOTIFY':
      return { ...state, ...rest }
    default:
      return state
  }
}

const store = createStore(changeState)
export default store
