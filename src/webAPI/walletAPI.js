import { storge, getAuthToken } from "../utils";
import { BaseURL } from "./config";

const get_wallet_URL = { url: BaseURL + "/wallet/fetchWallet", method: "GET" };
const update_wallet_URL = { url: BaseURL + "/wallet/updateWallet", method: "POST" };
const add_wallet_URL = { url: BaseURL + "/wallet/new", method: "POST" };

export const getWalletAPI = async () => {

  let token = getAuthToken();
  let resp = await fetch(get_wallet_URL.url, {
    method: get_wallet_URL.method,
    headers: {
      "Content-Type": "application/json",
      "Language": storge.getStorge(storge.LANG),
      Authorization: "Bearer " + token,
    }
  });

  if (resp.ok) {
    let result = resp.json()
    return result
  }
  else
    console.log("Error Reading data " + resp.text);

}

export const addWalletAPI = async (param) => {

  let token = getAuthToken();
  let resp = await fetch(add_wallet_URL.url, {
    method: add_wallet_URL.method,
    headers: {
      "Content-Type": "application/json",
      "Language": storge.getStorge(storge.LANG),
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(param)
  });

  if (resp.ok) {
    let result = resp.json()
    return result
  }
  else
    console.log("Error Reading data " + resp.text);

}


export const updateWalletAPI = async (param) => {

  let token = getAuthToken();
  let resp = await fetch(update_wallet_URL.url, {
    method: update_wallet_URL.method,
    headers: {
      "Content-Type": "application/json",
      "Language": storge.getStorge(storge.LANG),
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(param)
  });

  if (resp.ok) {
    let result = resp.json()
    return result
  }
  else
    console.log("Error Reading data " + resp.text);

}