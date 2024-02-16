import { storge } from "../utils";
import { BaseURL } from "./config"

const ReceiptDataURL = { url: BaseURL + "/Charge/getReceipt", method: "GET" };

export const SearchReceiptDataAPI = async (searchYM) => {
  // 查詢個人充電收據
  let token = storge.getStorge(storge.TOKEN_NAME);

  const response = await fetch(ReceiptDataURL.url, {
    method: ReceiptDataURL.method,
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