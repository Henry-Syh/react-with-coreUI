import { storge, getCookie } from "../utils";
import { BaseURL } from "./config"

const SaveUserLineURL = { url: BaseURL + "/line/bind", method: "POST" };
const GetOnlyAuthLinkURL = { url: BaseURL + "/line/AuthLink", method: "GET" };


export const GetOnlyAuthLinkAPI = async () => {
  // 使用者獲取專屬的LineNotify綁定URL
  let token = storge.getStorge(storge.TOKEN_NAME);

  const response = await fetch(GetOnlyAuthLinkURL.url, {
    method: GetOnlyAuthLinkURL.method,
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


export const SaveUserLineAPI = async (param) => {
  // 將使用者的Line Notify code轉換成token並與富泰username做綁定儲存
  let token = storge.getStorge(storge.TOKEN_NAME);
  
  const response = await fetch(SaveUserLineURL.url, {
    method: SaveUserLineURL.method,
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
