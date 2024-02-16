import { storge, getAuthToken } from "../utils";
import { BaseURL } from "./config";

const createWalletURL = { url: BaseURL + "/btc/createWallet", method: "GET" };

export class btcAPI {
    
    // 創錢包
    async createWallet() {
        console.log('create wallet');

        let token = getAuthToken();
        let resp = await fetch(createWalletURL.url, {
            method: createWalletURL.method,
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

    // 讀錢包
    // 更改錢包
    // 交易轉帳
}