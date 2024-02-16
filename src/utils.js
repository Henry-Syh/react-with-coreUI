const TOKEN_NAME = "access_token";

// 將 token 存到 localStorage
export const setAuthToken = (token) => {
  localStorage.setItem(TOKEN_NAME, token);
};

// 從 localStorage 讀取 token
export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_NAME);
};

// 從 localStorage 清除 token
export const clearAuthToken = () => {
  return localStorage.removeItem(TOKEN_NAME);
};

// 嘗試將localStorge方法寫成class
class Localstorge {
  constructor() {
    // this 指稱的是所建立的 instance
    this.TOKEN_NAME = "access_token";
    this.USERNAME = "userName";
    this.VERIFY = "verify"
    this.POWERBOX_BOUGHT = 'isPowerBox_Bought'
    this.LINEBINDED = 'line_binded'
    this.LANG = "language"
  }

  // 原型方法
  setStorge(sotrge_key, sotrge_value) {
    return localStorage.setItem(sotrge_key, sotrge_value);
  };

  getStorge(sotrge_key) {
    return localStorage.getItem(sotrge_key);
  };

  clearStorge(sotrge_key) {
    return localStorage.removeItem(sotrge_key);
  };
  // 清除所有localStorge
  clearAllStorge() {
    const classKeys = Object.values(storge);
    for (let i = 0; i < classKeys.length; i++) {
      localStorage.removeItem(classKeys[i])
    }
  }
}

// 只需要呼叫這個即可
export const storge = new Localstorge();


// 返回頂部function
export function pageTopScroll() {
  document.body.scrollTop = document.documentElement.scrollTop = 0;
}

// 輸出現在時間
export function DateToString(datediff) {

  function add0(target) {
    if (target < 10) {
      return '0' + target
    } else {
      return target
    }
  }

  let date = new Date();

  if (typeof datediff === 'undefined') {
    return date.getFullYear() + '-' + add0(date.getMonth() + 1) + '-' + add0(date.getDate()) + ' ' + add0(date.getHours()) + ':' + add0(date.getMinutes()) + ':' + add0(date.getSeconds())
  } else if (typeof datediff === 'number') {
    date.setDate(date.getDate() + datediff)
    return date.getFullYear() + '-' + add0(date.getMonth() + 1) + '-' + add0(date.getDate())
  }
}

// 將字串轉成JSX string
export function JSXString(text) {
  return (
    <div dangerouslySetInnerHTML={{ __html: text }}></div>
  )
}

// 獲取Cookie
export function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// 製作單一Antd Table Column 
export function makeColumnCell(title, width, dataIndex, args=[], render=null) {
  // 基本Antd Table 格式
  const cell = {
    title: title,
    width: width,
    dataIndex: dataIndex,
    key: dataIndex,
  }
  // 如果有需要額外變化(延展、搜尋等寫在args陣列中，多一項變化陣列長度就多一)
  if (Array.isArray(args) & args.lenth != 0)  {
    args.map((arg) => {
      Object.keys(arg).map((argKey) => {
        cell[argKey] = arg[argKey]
      })
    })
  } else {
    throw new TypeError('param args must be of type Array');
  }
  // 如果該Table的欄位值有想要做任何fn操作可以於此放入
  if (render !== null) {
    cell.render = render
  }
  return cell
}

export class numberUtils {
  static round(num, precision) {
    var m = Number((Math.abs(num) * (10 ** precision)).toPrecision(15));
    return Math.round(m) / (10 ** precision) * Math.sign(num);
  }
}