import { storge } from "../utils";
import { BaseURL } from "./config"

const NFTDetailURL = { url: BaseURL + "/assets/NFT", method: "GET" };
const NFTListURL = { url: BaseURL + "/assets/NFT/", method: "GET" };
const BuyableNFTURL = { url: BaseURL + "/assets/NFT/Company", method: "GET" };

export const SearchNFTDetailAPI = async (uuid) => {
  let token = storge.getStorge(storge.TOKEN_NAME);

  const url = NFTDetailURL.url + '/' + uuid

  const response = await fetch(url, {
    method: NFTDetailURL.method,
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

export const SearchNFTListAPI = async () => {
  let token = storge.getStorge(storge.TOKEN_NAME);

  const response = await fetch(NFTListURL.url, {
    method: NFTListURL.method,
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


export const SearchBuyableNFTListAPI = async () => {
  let token = storge.getStorge(storge.TOKEN_NAME);

  const response = await fetch(BuyableNFTURL.url, {
    method: BuyableNFTURL.method,
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