import { storge } from "../utils";
import { BaseURL } from "./config"

const ProductListURL = { url: BaseURL + "/production/list/", method: "GET" };
const ProductDetailURL = { url: BaseURL + "/production/", method: "GET" };
const TransDetailURL = { url: BaseURL + "/production/transactiondetail", method: "GET" };
const PersonalAssetsListURL = { url: BaseURL + "/production/assetslist", method: "GET" };
const PersonalTransListURL = { url: BaseURL + "/production/transaction", method: "GET" };
const PurchaseURL = { url: BaseURL + "/production/purchase", method: "POST" };

export const SearchProductListAPI = async (type) => {
  // 查詢所有可購買實體商品列表
  let token = storge.getStorge(storge.TOKEN_NAME);

  const url = ProductListURL.url + type

  const response = await fetch(url, {
    method: ProductListURL.method,
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

export const SearchProductDetailAPI = async (prodID) => {
  // 查詢可購買實體的單筆商品明細
  let token = storge.getStorge(storge.TOKEN_NAME);
  
  const SearchParams = {production_id: prodID}

  const searchString = new URLSearchParams(SearchParams).toString();

  const url = ProductDetailURL.url + '?' + searchString

  const response = await fetch(url, {
    method: ProductDetailURL.method,
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

export const SearchPersonalAssetsListAPI = async () => {
  // 查詢個人帳號商品資產列表
  let token = storge.getStorge(storge.TOKEN_NAME);

  const response = await fetch(PersonalAssetsListURL.url, {
    method: PersonalAssetsListURL.method,
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

export const SearchPersonalTransListAPI = async () => {
  // 查詢個人帳號商品交易紀錄列表
  let token = storge.getStorge(storge.TOKEN_NAME);

  const response = await fetch(PersonalTransListURL.url, {
    method: PersonalTransListURL.method,
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

export const SearchTransDetailAPI = async (tradeSN) => {
  // 查詢單筆交易紀錄
  let token = storge.getStorge(storge.TOKEN_NAME);
  
  const SearchParams = {trade_SN: tradeSN}

  const searchString = new URLSearchParams(SearchParams).toString();

  const url = TransDetailURL.url + '?' + searchString

  const response = await fetch(url, {
    method: TransDetailURL.method,
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