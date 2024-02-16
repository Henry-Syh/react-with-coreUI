import { storge } from "../utils";
import { BaseURL } from "./config"

const ManagementURL = { url: BaseURL + "/box/", method: "GET" };
const MaintenanceRecordURL = { url: BaseURL + "/box/maintenance", method: "GET" };
const PersonalBillURL = { url: BaseURL + "/box/allBill", method: "GET" };



export const SearchPBManagementAPI = async () => {
  // 查詢個人購買的PowerBox相關資料
  let token = storge.getStorge(storge.TOKEN_NAME);

  const response = await fetch(ManagementURL.url, {
    method: ManagementURL.method,
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


export const SearchMaintenanceLogAPI = async () => {
  // 查詢個人購買的PowerBox維修紀錄
  let token = storge.getStorge(storge.TOKEN_NAME);

  const response = await fetch(MaintenanceRecordURL.url, {
    method: MaintenanceRecordURL.method,
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


export const SearchPersonalBillAPI = async () => {
  // 查詢個人購買的PowerBox所有帳單紀錄
  let token = storge.getStorge(storge.TOKEN_NAME);

  const response = await fetch(PersonalBillURL.url, {
    method: PersonalBillURL.method,
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
