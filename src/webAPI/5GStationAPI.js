import { storge } from "../utils";
import { BaseURL } from "./config"

const ManagementURL = { url: BaseURL + "/5G/", method: "GET" };
const MaintenanceRecordURL = { url: BaseURL + "/5G/maintenance", method: "GET" };



export const Search5GManagementAPI = async () => {
  // 查詢個人購買的5G基地站發電機相關資料
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
  // 查詢個人購買的5G基地站發電機維修紀錄
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