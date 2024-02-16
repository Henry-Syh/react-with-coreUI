import { storge, getAuthToken } from "../utils";
import { BaseURL } from "./config";

export class transferAPI {

  static user_transfer = { url: BaseURL + "/transfer/log", method: "GET" };
  static all_transfer = { url: BaseURL + "/transfer/log/all", method: "GET" };
  static trdNo_transfer = { url: BaseURL + "/transfer/log", method: "GET" };

  async do_user_transfer_API() {
    let token = getAuthToken();
    let resp = await fetch(transferAPI.user_transfer.url, {
      method: transferAPI.user_transfer.method,
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
    else { console.log("Error Reading data " + resp.text); }
  }

  async do_all_transfer_API() {
    let token = getAuthToken();
    let resp = await fetch(transferAPI.all_transfer.url, {
      method: transferAPI.all_transfer.method,
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
    else { console.log("Error Reading data " + resp.text); }
  }

  async do_trdNo_transfer_API(trdNO) {
    let token = getAuthToken();
    let resp = await fetch(transferAPI.trdNo_transfer.url, {
      method: transferAPI.trdNo_transfer.method,
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
    else { console.log("Error Reading data " + resp.text); }
  }
}