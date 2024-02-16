import { storge, getAuthToken } from "../utils";
import { BaseURL } from "./config";

const RegisterURL = { url: BaseURL + "/account/register", method: "POST" };
const LoginURL = { url: BaseURL + "/account/login", method: "POST" };
const AccountInfoURL = { url: BaseURL + "/account/info", method: "GET" };
const AccountUpdateURL = { url: BaseURL + "/account/info", method: "POST" };
const VerifyEmailURL = { url: BaseURL + "/account/send", method: "GET" };
const LostPWDURL = { url: BaseURL + "/account/lost", method: "POST" };
const VerifyAccountURL = { url: BaseURL + "/account/verify?code=", method: "GET" };

export const loginAPI = async (username, password) => {
  let param = { account_name: username, account_passwd: password };

  const response = await fetch(LoginURL.url, {
    method: LoginURL.method,
    headers: { 
      "Content-Type": "application/json",
      "Language": storge.getStorge(storge.LANG)
    },
    body: JSON.stringify(param),
  });
  if (response.ok) {
    return response.json(); // 輸出成 json
  } else {
    return alert("api錯誤");
  }
};

export const registerAPI = async (param) => {
  const response = await fetch(RegisterURL.url, {
    method: RegisterURL.method,
    headers: { 
      "Content-Type": "application/json",
      "Language": storge.getStorge(storge.LANG) 
    },
    body: JSON.stringify(param),
  });
  if (response.ok) {
    return response.json(); // 輸出成 json
  } else {
    return alert("api錯誤");
  }
};

export const LostPWDAPI = async(param) => {
  const response = await fetch(LostPWDURL.url, {
    method: LostPWDURL.method,
    headers: { 
      "Content-Type": "application/json",
      "Language": storge.getStorge(storge.LANG)
    },
    body: JSON.stringify(param),
  });
  if (response.ok) {
    return response.json(); // 輸出成 json
  } else {
    return alert("api錯誤");
  }
};

export const getAccountInfoAPI = async () => {
  let token = getAuthToken();

  const response = await fetch(AccountInfoURL.url, {
    method: AccountInfoURL.method,
    headers: {
      "Content-Type": "application/json",
      "Language": storge.getStorge(storge.LANG),
      Authorization: "Bearer " + token,
    }
  });
  if (response.ok) {
    return response.json(); // 輸出成 json
  } else {
    return alert("api錯誤");
  }
};

export const updateAccountInfoAPI = async (param) => {
  let token = getAuthToken();

  const response = await fetch(AccountUpdateURL.url, {
    method: AccountUpdateURL.method,
    headers: {
      "Content-Type": "application/json",
      "Language": storge.getStorge(storge.LANG),
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(param),
  });

  if (response.ok) {
    return response.json(); // 輸出成 json
  } else {
    return alert("api錯誤");
  }
};

export const sendVerifyMailAPI = async () => {
  let token = getAuthToken();

  const response = await fetch(VerifyEmailURL.url, {
    method: VerifyEmailURL.method,
    headers: {
      "Content-Type": "application/json",
      "Language": storge.getStorge(storge.LANG),
      Authorization: "Bearer " + token,
    }
  });

  if (response.ok) {
    return response.json(); // 輸出成 json
  } else {
    return alert("api錯誤");
  }
};

export const VerifyAccountAPI = async (v_code) => {
  // let token = getAuthToken();

  const response = await fetch(VerifyAccountURL.url+v_code, {
    method: VerifyAccountURL.method,
    headers: {
      "Content-Type": "application/json",
      "Language": storge.getStorge(storge.LANG),
    }
  });

  if (response.ok) {
    return response.json(); // 輸出成 json
  } else {
    return alert("api錯誤");
  }
};