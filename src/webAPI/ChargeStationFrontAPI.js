import { storge } from "../utils";
import { BaseURL } from "./config"

const ManageDataURL = { url: BaseURL + "/ChargeStation/getManageData", method: "GET" };
const GenerateReceiptURL = { url: BaseURL + "/ChargeStation/ReceiptGenerate", method: "POST" };
const CheckURL = { url: BaseURL + "/ChargeStation/PaymentCheckout", method: "POST" };
const RealDataURL = { url: BaseURL + "/ChargeStation/RunTime", method: "POST" };

export const SearchManageDataAPI = async (searchYM) => {
  // 查詢充電站管理資料列表(管理頁面初次載入)
  let token = storge.getStorge(storge.TOKEN_NAME);

  const response = await fetch(ManageDataURL.url, {
    method: ManageDataURL.method,
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


export const GenerateReceiptAPI = async (param) => {
  // 產生收據
  let token = storge.getStorge(storge.TOKEN_NAME);

  const response = await fetch(GenerateReceiptURL.url, {
    method: GenerateReceiptURL.method,
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


export const CheckAPI = async (param) => {
  // 檢查此次繳費金額以及收款人是否正確(確認OK寄Email+Line)
  let token = storge.getStorge(storge.TOKEN_NAME);

  const response = await fetch(CheckURL.url, {
    method: CheckURL.method,
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


export const RealTimeDataAPI = async (param, stationID) => {
  // 即時發送充電槍狀態
  let token = storge.getStorge(storge.TOKEN_NAME);

  const url = RealDataURL.url + '/' + stationID 

  const response = await fetch(url, {
    method: RealDataURL.method,
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