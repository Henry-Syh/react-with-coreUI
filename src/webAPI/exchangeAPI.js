import { getAuthToken, storge } from "../utils";
import { BaseURL } from "./config";

const eth_faucet = { url: BaseURL + "/exchange/eth_faucet", method: "POST" };
const btc_faucet = { url: BaseURL + "/exchange/btc_faucet", method: "POST" };
const btc_to_dctw = { url: BaseURL + "/exchange/btc_to_dctw", method: "POST" };
const dctw_to_nft = { url: BaseURL + "/exchange/dctw_to_nft", method: "POST" };
const bill_payfor_dctw = { url: BaseURL + "/exchange/billCheckout", method: "POST" };

export class eth_api {
  amount = 0;
  wallet = null;
  /**
   * @param {(arg0: number) => void} _amount
   */
  set setAmount(_amount) { this.amount = _amount; }
  /**
   * @param {(arg0: string) => void} _wallet
   */
  set setWallet(_wallet) { this.wallet = _wallet; }
  async do_eth_faucet_API() {
    if (this.wallet == null) { console.log("未設定錢包"); return; }
    if (this.amount < 0) { console.log("金額小於等於0"); return; }
    let token = getAuthToken();
    let resp = await fetch(eth_faucet.url, {
      method: eth_faucet.method,
      headers: {
        "Content-Type": "application/json",
        "Language": storge.getStorge(storge.LANG),
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(
        { "amount": this.amount, "user_wallet": this.wallet })
    });

    if (resp.ok) {
      let result = resp.json()
      return result
    }
    else { console.log("Error Reading data " + resp.text); }
  }
}

export class btc_api {
  amount = 0;
  wallet = null;
  /**
   * @param {(arg0: number) => void} _amount
   */
  set setAmount(_amount) { this.amount = _amount; }
  /**
   * @param {(arg0: string) => void} _wallet
   */
  set setWallet(_wallet) { this.wallet = _wallet; }

  async do_btc_faucet_API() {
    if (this.wallet == null) { console.log("未設定錢包"); return; }
    if (this.amount < 0) { console.log("金額小於等於0"); return; }
    let token = getAuthToken();
    let resp = await fetch(btc_faucet.url, {
      method: btc_faucet.method,
      headers: {
        "Content-Type": "application/json",
        "Language": storge.getStorge(storge.LANG),
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(
        { "amount": this.amount, "user_wallet": this.wallet })
    });

    if (resp.ok) {
      let result = resp.json()
      return result
    }
    else { console.log("Error Reading data " + resp.text); }
  }

  static async exchangeBTCtoDCTW(api_param) {
    let token = getAuthToken();
    let resp = await fetch(btc_to_dctw.url, {
      method: btc_to_dctw.method,
      headers: {
        "Content-Type": "application/json",
        "Language": storge.getStorge(storge.LANG),
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(api_param)
    });

    if (resp.ok) {
      let result = resp.json()
      return result
    }
    else
      console.log("Error Reading data " + resp.text);
  }
}

export class dctw_to_nft_api {
  DCTW_transactionID = null;
  tokenID = null;

  /**
   * @param {string} tr_hex
   */
  set setDCTW_transactionID(tr_hex) { this.DCTW_transactionID = tr_hex; }
  /**
   * @param {integer} id
   */
  set setTokenID(id) { this.tokenID = id; }

  async do_api() {
    let token = getAuthToken();
    let resp = await fetch(dctw_to_nft.url, {
      method: dctw_to_nft.method,
      headers: {
        "Content-Type": "application/json",
        "Language": storge.getStorge(storge.LANG),
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(
        {
          "DCTW_transactionID": this.DCTW_transactionID,
          "tokenID": this.tokenID
        }
      )
    });

    if (resp.ok) {
      let result = resp.json()
      return result
    }
    else
      console.log("Error Reading data " + resp.text);
  }
}

export const BillPaymentAPI = async (param) => {
  // 帳單繳費
  let token = storge.getStorge(storge.TOKEN_NAME);

  const response = await fetch(bill_payfor_dctw.url, {
    method: bill_payfor_dctw.method,
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
